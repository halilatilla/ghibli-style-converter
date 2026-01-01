import type {
  ApiErrorResponse,
  GenerationRequest,
  ImageGenerationResponse,
  VideoGenerationResponse,
} from "@/shared/types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public retryAfter?: string | null,
    public remaining?: string | null
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function postJson<T>(
  url: string,
  body: unknown
): Promise<{ data: T; remaining?: string | null }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const retryAfter = res.headers.get("Retry-After");
  const remaining = res.headers.get("X-RateLimit-Remaining");

  const payload = (await res.json().catch(() => ({}))) as ApiErrorResponse;

  if (!res.ok) {
    const message = payload.error || "Request failed";
    throw new ApiError(message, res.status, payload.code, retryAfter, remaining);
  }

  return { data: payload as T, remaining };
}

export const apiService = {
  async generateImage(
    request: GenerationRequest
  ): Promise<{ image: string; remaining?: string | null }> {
    const { data, remaining } = await postJson<ImageGenerationResponse>("/api/generate", request);
    return { image: data.image, remaining };
  },

  async generateVideo(
    request: GenerationRequest
  ): Promise<VideoGenerationResponse & { remaining?: string | null }> {
    const { data, remaining } = await postJson<VideoGenerationResponse>(
      "/api/generate-video",
      request
    );
    return { ...data, remaining };
  },
};
