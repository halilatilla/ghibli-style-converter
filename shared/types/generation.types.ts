export type Mode = "photo" | "video";

export type ProcessingStatus = "idle" | "processing" | "success" | "error";

export interface GenerationRequest {
  image: string;
  mimeType: string;
  prompt: string;
  apiKey?: string;
}

export interface GenerationResult {
  image?: string | null;
  video?: string | null;
}

export interface ImageGenerationResponse {
  image: string;
  remaining?: string | null;
}

export interface VideoGenerationResponse {
  video: string;
  size?: number;
  duration?: number;
  remaining?: string | null;
}

export interface ApiErrorResponse {
  error?: string;
  code?: string;
}
