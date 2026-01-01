import { useCallback } from "react";
import { toast } from "sonner";
import { type ApiError, apiService } from "@/shared/services/api.service";
import type { GenerationRequest } from "@/shared/types";
import { useGenerationState } from "./useGenerationState";

export function useVideoGeneration() {
  const state = useGenerationState();

  const generate = useCallback(
    async (request: GenerationRequest) => {
      state.setProcessing("Starting video generation...");

      try {
        const { video, remaining } = await apiService.generateVideo(request);
        state.setSuccess({ video, image: null });

        toast.success("🎬 Your Ghibli video is ready!", {
          description: remaining ? `Remaining quota: ${remaining}` : undefined,
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
