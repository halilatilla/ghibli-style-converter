import { useCallback } from "react";
import { toast } from "sonner";
import { type ApiError, apiService } from "@/shared/services/api.service";
import type { GenerationRequest } from "@/shared/types";
import { useGenerationState } from "./useGenerationState";

export function useImageGeneration() {
  const state = useGenerationState();

  const generate = useCallback(
    async (request: GenerationRequest, apiKey?: string) => {
      state.setProcessing();

      try {
        const { image, remaining } = await apiService.generateImage(request, apiKey);
        state.setSuccess({ image, video: null });

        const description = apiKey 
          ? "Using your personal API key ✨" 
          : remaining ? `Remaining quota: ${remaining}` : undefined;

        toast.success("🎨 Your Ghibli character is ready!", {
          description,
        });
      } catch (e: unknown) {
        const err = e as ApiError;
        state.setFailure(err.message);

        toast.error("❌ Transformation failed", {
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
