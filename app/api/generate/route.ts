import { GoogleGenAI } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Redis client for daily usage tracking
const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

// Daily usage cap - adjust this number based on your budget
const DAILY_LIMIT = 30; // Total requests per day

// Create rate limiter - 5 requests per user per minute
// Uses Upstash Redis for persistent rate limiting (works with serverless)
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
      analytics: true,
    })
  : null;

// Simple in-memory fallback rate limiter (for development without Redis)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

// In-memory daily usage (for development)
let dailyUsage = { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 };

function checkInMemoryRateLimit(ip: string): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { success: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: RATE_LIMIT - record.count };
}

async function checkDailyLimit(): Promise<boolean> {
  if (!redis) {
    // In-memory fallback for development
    const now = Date.now();
    if (now > dailyUsage.resetTime) {
      dailyUsage = { count: 0, resetTime: now + 24 * 60 * 60 * 1000 };
    }
    if (dailyUsage.count >= DAILY_LIMIT) {
      return false;
    }
    dailyUsage.count++;
    return true;
  }

  // Redis-based daily limit
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dailyKey = `daily_usage:${today}`;

  const count = await redis.incr(dailyKey);

  // Set expiry on first increment
  if (count === 1) {
    await redis.expire(dailyKey, 24 * 60 * 60); // 24 hours
  }

  return count <= DAILY_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    // Check rate limit
    let rateLimitResult: { success: boolean; remaining: number };

    if (ratelimit) {
      // Use Upstash Redis rate limiter (production)
      const result = await ratelimit.limit(ip);
      rateLimitResult = {
        success: result.success,
        remaining: result.remaining,
      };
    } else {
      // Use in-memory fallback (development)
      rateLimitResult = checkInMemoryRateLimit(ip);
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a minute before trying again.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "60",
          },
        }
      );
    }

    // Check daily limit
    const dailyAllowed = await checkDailyLimit();
    if (!dailyAllowed) {
      return NextResponse.json(
        {
          error:
            "Daily usage limit reached. This demo has a daily cap to manage costs. Please try again tomorrow!",
        },
        { status: 429 }
      );
    }

    const { image, mimeType, prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: image,
              mimeType: mimeType,
            },
          },
          {
            text: `${prompt}. The output must be a high-quality image. Do not output text, only the image.`,
          },
        ],
      },
      config: {
        // No responseModalities needed for this model
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData?.data) {
            return NextResponse.json(
              {
                image: `data:${
                  part.inlineData.mimeType || "image/png"
                };base64,${part.inlineData.data}`,
              },
              {
                headers: {
                  "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
                },
              }
            );
          }
        }
      }
    }

    return NextResponse.json(
      {
        error:
          "No image generated. The model might have refused the request or returned text only.",
      },
      { status: 500 }
    );
  } catch (e: any) {
    console.error("API Error:", e);
    return NextResponse.json({ error: e.message || "Failed to generate image." }, { status: 500 });
  }
}
