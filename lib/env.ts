type Env = {
  GEMINI_API_KEY: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  MAX_UPLOAD_BYTES: number;
  MAX_PROMPT_CHARS: number;
};

const DEFAULT_MAX_UPLOAD_MB = Number(
  process.env.MAX_UPLOAD_MB ?? process.env.NEXT_PUBLIC_MAX_UPLOAD_MB ?? "5"
);

const MAX_UPLOAD_MB =
  Number.isFinite(DEFAULT_MAX_UPLOAD_MB) && DEFAULT_MAX_UPLOAD_MB > 0
    ? Math.min(DEFAULT_MAX_UPLOAD_MB, 15) // cap to prevent accidental huge limits
    : 5;

const MAX_UPLOAD_BYTES = Math.round(MAX_UPLOAD_MB * 1024 * 1024);

const REQUIRED_ENV_VARS = ["GEMINI_API_KEY"] as const;

export function getEnv(): Env {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    MAX_UPLOAD_BYTES,
    MAX_PROMPT_CHARS: 500,
  };
}
