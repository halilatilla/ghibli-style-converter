import { useCallback } from "react";
import { toast } from "sonner";
import { type ApiError, apiService } from "@/shared/services/api.service";
import type { GenerationRequest } from "@/shared/types";
import { useGenerationState } from "./useGenerationState";

export function useVideoGeneration() {
  const state = useGenerationState();

  const generate = useCallback(
    async (request: GenerationRequest, apiKey?: string) => {
      state.setProcessing("Starting video generation...");

      try {
        const { video, remaining } = await apiService.generateVideo(request, apiKey);
        state.setSuccess({ video, image: null });

        const description = apiKey 
          ? "Using your personal API key ✨" 
          : remaining ? `Remaining quota: ${remaining}` : undefined;

        toast.success("🎬 Your Ghibli video is ready!", {
          description,
        });
      } catch (e: unknown) {
        const err = e as ApiError;
        state.setFailure(err.message);

        toast.error("❌ Video generation failed", {
          description: err.message,
        });
      }
    },
    [state]
  );

  return {
    ...state,
    generate,
  };
}
