import { GoogleGenAI } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { ALLOWED_IMAGE_TYPES, estimateBase64Bytes, validatePrompt } from "@/lib/imageValidation";

const env = getEnv();

// Helper to create AI client with the appropriate API key
function createAiClient(apiKey?: string) {
  const key = apiKey || env.GEMINI_API_KEY;
  return new GoogleGenAI({ apiKey: key });
}

// Check if using user's own API key
function isUserApiKey(apiKey?: string): boolean {
  return Boolean(apiKey && apiKey.trim().length > 0);
}

// Redis client for daily usage tracking
const redis = env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

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

function validatePayload(body: unknown) {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      status: 400,
      error: "Invalid request body.",
      code: "INVALID_INPUT",
    } as const;
  }

  const { image, mimeType, prompt, apiKey } = body as {
    image?: string;
    mimeType?: string;
    prompt?: string;
    apiKey?: string;
  };

  if (!image || typeof image !== "string") {
    return {
      ok: false,
      status: 400,
      error: "Image data is required.",
      code: "INVALID_INPUT",
    } as const;
  }

  if (
    !mimeType ||
    !ALLOWED_IMAGE_TYPES.includes(mimeType as (typeof ALLOWED_IMAGE_TYPES)[number])
  ) {
    return {
      ok: false,
      status: 415,
      error: "Unsupported image type. Use JPG, PNG, or WEBP.",
      code: "UNSUPPORTED_MEDIA_TYPE",
    } as const;
  }

  const size = estimateBase64Bytes(image);
  if (size > env.MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      status: 413,
      error: `Image too large. Max size is ${Math.round(env.MAX_UPLOAD_BYTES / (1024 * 1024))}MB.`,
      code: "PAYLOAD_TOO_LARGE",
    } as const;
  }

  const promptResult = validatePrompt(prompt ?? "");
  if (!promptResult.ok) {
    return {
      ok: false,
      status: 400,
      error: promptResult.error,
      code: "INVALID_INPUT",
    } as const;
  }

  return {
    ok: true,
    value: { image, mimeType, prompt: promptResult.value, apiKey: apiKey?.trim() },
  } as const;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    const body = await req.json().catch(() => null);
    const validation = validatePayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error, code: validation.code },
        { status: validation.status }
      );
    }
    const { image, mimeType, prompt, apiKey } = validation.value;
    const usingOwnKey = isUserApiKey(apiKey);

    // Check rate limit (skip if user is using their own API key)
    let rateLimitResult: { success: boolean; remaining: number } = {
      success: true,
      remaining: 999,
    };

    if (!usingOwnKey) {
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
            code: "RATE_LIMITED",
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

      // Check daily limit (only for default API key users)
      const dailyAllowed = await checkDailyLimit();
      if (!dailyAllowed) {
        return NextResponse.json(
          {
            error:
              "🌸 Oh no! Our free daily magic has run out for today. But don't worry - you can add your own Gemini API key above to keep creating! Get one free at ai.google.dev 🎨",
            code: "DAILY_LIMIT",
          },
          { status: 429 }
        );
      }
    }

    // Create AI client with the appropriate API key
    const ai = createAiClient(apiKey);

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
        code: "GENERATION_FAILED",
      },
      { status: 500 }
    );
  } catch (e: any) {
    console.error("API Error:", e);

    // Parse the error message for user-friendly responses
    const errorMessage = e.message || "";

    // Handle API key related errors
    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("invalid API key")) {
      return NextResponse.json(
        {
          error:
            "🔑 Hmm, that API key doesn't seem to work. Double-check it's a valid Gemini API key from ai.google.dev",
          code: "INVALID_API_KEY",
        },
        { status: 401 }
      );
    }

    // Handle quota exceeded errors
    if (
      errorMessage.includes("RESOURCE_EXHAUSTED") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("rate limit")
    ) {
      return NextResponse.json(
        {
          error:
            "🌙 The magic spirits are resting! API quota exceeded. If using your own key, check your Google AI Studio usage. Otherwise, try again later or add your own API key.",
          code: "QUOTA_EXCEEDED",
        },
        { status: 429 }
      );
    }

    // Handle permission errors
    if (errorMessage.includes("PERMISSION_DENIED")) {
      return NextResponse.json(
        {
          error:
            "🚫 This API key doesn't have permission to use the image generation model. Make sure you've enabled the Gemini API in your Google Cloud project.",
          code: "PERMISSION_DENIED",
        },
        { status: 403 }
      );
    }

    // Handle safety/content filter errors
    if (errorMessage.includes("SAFETY") || errorMessage.includes("blocked")) {
      return NextResponse.json(
        {
          error:
            "🛡️ The spirits couldn't transform this image. Try a different photo or adjust your prompt.",
          code: "CONTENT_BLOCKED",
        },
        { status: 400 }
      );
    }

    // Generic error with friendly message
    return NextResponse.json(
      {
        error:
          "✨ Something magical went wrong! Please try again. If this keeps happening, try using your own API key.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
