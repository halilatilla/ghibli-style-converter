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
            error:
              "🎬 Too many video requests. You can generate 2 videos per hour. Add your own API key for unlimited access!",
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

      // Check daily limit (only for default API key users)
      const dailyAllowed = await checkDailyLimit();
      if (!dailyAllowed) {
        return NextResponse.json(
          {
            error:
              "🎥 Daily video magic has run out! Add your own Gemini API key above to keep creating videos. Get one free at ai.google.dev 🌟",
            code: "DAILY_LIMIT",
          },
          { status: 429 }
        );
      }
    }

    // Create AI client with the appropriate API key
    const ai = createAiClient(apiKey);

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

    // Download video from URI (use provided API key or fall back to env key)
    const downloadKey = apiKey || env.GEMINI_API_KEY;
    const response = await fetch(`${videoUri}&key=${downloadKey}`);
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
            "🌙 The magic spirits are resting! API quota exceeded. If using your own key, check your Google AI Studio usage. Otherwise, add your own API key to continue.",
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
            "🚫 This API key doesn't have permission for video generation. Make sure you've enabled the Veo API in your Google Cloud project.",
          code: "PERMISSION_DENIED",
        },
        { status: 403 }
      );
    }

    // Handle timeout errors
    if (errorMessage.includes("timeout")) {
      return NextResponse.json(
        {
          error:
            "⏳ Video generation took too long. Try with a different photo or a simpler prompt.",
          code: "TIMEOUT",
        },
        { status: 504 }
      );
    }

    // Handle safety/content filter errors
    if (errorMessage.includes("SAFETY") || errorMessage.includes("blocked")) {
      return NextResponse.json(
        {
          error:
            "🛡️ The spirits couldn't transform this video. Try a different photo or adjust your prompt.",
          code: "CONTENT_BLOCKED",
        },
        { status: 400 }
      );
    }

    // Generic error with friendly message
    return NextResponse.json(
      {
        error: "✨ Something magical went wrong with video generation! Please try again.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
