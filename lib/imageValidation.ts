export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const DEFAULT_MAX_UPLOAD_MB = Number(
  process.env.NEXT_PUBLIC_MAX_UPLOAD_MB ?? process.env.MAX_UPLOAD_MB ?? "5"
);

export const MAX_UPLOAD_MB =
  Number.isFinite(DEFAULT_MAX_UPLOAD_MB) && DEFAULT_MAX_UPLOAD_MB > 0
    ? Math.min(DEFAULT_MAX_UPLOAD_MB, 15)
    : 5;

export const MAX_UPLOAD_BYTES = Math.round(MAX_UPLOAD_MB * 1024 * 1024);
export const MAX_PROMPT_CHARS = 500;

export function estimateBase64Bytes(base64: string): number {
  // Base64 size = (len * 3) / 4 minus padding
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

export function validateClientFile(file: File): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return {
      ok: false,
      error: "Unsupported file type. Please upload a JPG, PNG, or WEBP image.",
    };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `Image is too large. Max size is ${MAX_UPLOAD_MB}MB.`,
    };
  }

  return { ok: true };
}

export function validatePrompt(
  prompt: string
): { ok: true; value: string } | { ok: false; error: string } {
  const trimmed = (prompt ?? "").trim();

  if (!trimmed) {
    return { ok: false, error: "Please enter a prompt describing your style." };
  }

  if (trimmed.length > MAX_PROMPT_CHARS) {
    return {
      ok: false,
      error: `Prompt is too long. Max length is ${MAX_PROMPT_CHARS} characters.`,
    };
  }

  return { ok: true, value: trimmed };
}
