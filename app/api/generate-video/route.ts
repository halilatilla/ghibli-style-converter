import { GoogleGenAI } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { ALLOWED_IMAGE_TYPES, estimateBase64Bytes, validatePrompt } from "@/lib/imageValidation";

const env = getEnv();
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// Redis client for daily usage tracking
const redis = env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

// More restrictive limits for video (expensive operation)
const VIDEO_DAILY_LIMIT = 10; // vs 30 for images
const VIDEO_RATE_LIMIT = 2; // 2 videos per hour per user

// Create rate limiter - 2 requests per user per hour
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, "60 m"), // 2 requests per hour
      analytics: true,
      prefix: "video_ratelimit",
    })
  : null;

// Simple in-memory fallback rate limiter (for development without Redis)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

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
    return { success: true, remaining: VIDEO_RATE_LIMIT - 1 };
  }

  if (record.count >= VIDEO_RATE_LIMIT) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: VIDEO_RATE_LIMIT - record.count };
}

async function checkDailyLimit(): Promise<boolean> {
  if (!redis) {
    // In-memory fallback for development
    const now = Date.now();
    if (now > dailyUsage.resetTime) {
      dailyUsage = { count: 0, resetTime: now + 24 * 60 * 60 * 1000 };
    }
    if (dailyUsage.count >= VIDEO_DAILY_LIMIT) {
      return false;
    }
    dailyUsage.count++;
    return true;
  }

  // Redis-based daily limit
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dailyKey = `video_daily_usage:${today}`;

  const count = await redis.incr(dailyKey);

  // Set expiry on first increment
  if (count === 1) {
    await redis.expire(dailyKey, 24 * 60 * 60); // 24 hours
  }

  return count <= VIDEO_DAILY_LIMIT;
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

  const { image, mimeType, prompt } = body as {
    image?: string;
    mimeType?: string;
    prompt?: string;
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
    value: { image, mimeType, prompt: promptResult.value },
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
    const { image, mimeType, prompt } = validation.value;

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
          error:
            "Too many video requests. You can generate 2 videos per hour. Please try again later.",
          code: "RATE_LIMITED",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "3600",
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
            "Daily video limit reached. This demo has a daily cap to manage costs. Please try again tomorrow!",
          code: "DAILY_LIMIT",
        },
        { status: 429 }
      );
    }

    console.log("Starting video generation with Veo 3.1...");

    // Start video generation
    let operation = await ai.models.generateVideos({
      model: "veo-3.1-fast-generate-preview",
      prompt: `${prompt}. Create a cinematic Studio Ghibli style video. Hand-drawn animation aesthetic, soft watercolor colors, magical atmosphere, smooth natural movement, high quality.`,
      image: {
        imageBytes: image,
        mimeType: mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: "16:9",
      },
    });

    console.log("Video generation started, polling for completion...");

    // Poll for completion with timeout
    const startTime = Date.now();
    const timeout = 5 * 60 * 1000; // 5 minutes timeout

    while (!operation.done) {
      // Check timeout
      if (Date.now() - startTime > timeout) {
        console.error("Video generation timeout");
        return NextResponse.json(
          {
            error:
              "Video generation timed out. Please try with a different photo or try again later.",
          },
          { status: 504 }
        );
      }

      // Wait 10 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 10000));

      try {
        operation = await ai.operations.getVideosOperation({ operation: operation });
        console.log(`Operation status: ${operation.done ? "done" : "in progress"}`);
      } catch (e: any) {
        if (e.message?.includes("Requested entity was not found")) {
          return NextResponse.json(
            {
              error: "Video generation session expired. Please try again.",
            },
            { status: 401 }
          );
        }
        throw e;
      }
    }

    // Get download URI
    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      console.error("No video URI in response");
      return NextResponse.json(
        {
          error: "Video generation failed - no video returned. Please try again.",
        },
        { status: 500 }
      );
    }

    console.log("Video generated successfully, downloading...");

    // Download video from URI
    const response = await fetch(`${videoUri}&key=${env.GEMINI_API_KEY}`);
    if (!response.ok) {
      console.error("Failed to download video:", response.statusText);
      return NextResponse.json(
        {
          error: "Failed to download generated video. Please try again.",
        },
        { status: 500 }
      );
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    console.log(`Video downloaded successfully (${blob.size} bytes)`);

    return NextResponse.json(
      {
        video: `data:video/mp4;base64,${base64}`,
        size: blob.size,
        duration: 8, // seconds
      },
      {
        headers: {
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        },
      }
    );
  } catch (e: any) {
    console.error("Video Generation Error:", e);

    // Handle specific error types
    if (e.message?.includes("quota")) {
      return NextResponse.json(
        {
          error: "API quota exceeded. Please try again tomorrow.",
          code: "QUOTA_EXCEEDED",
        },
        { status: 429 }
      );
    }

    if (e.message?.includes("timeout")) {
      return NextResponse.json(
        {
          error: "Video generation timed out. Please try with a different photo.",
          code: "TIMEOUT",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        error: e.message || "Failed to generate video. Please try again.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
