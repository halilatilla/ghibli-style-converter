import { useCallback } from "react";
import { toast } from "sonner";
import { type ApiError, apiService } from "@/shared/services/api.service";
import type { GenerationRequest } from "@/shared/types";
import { useGenerationState } from "./useGenerationState";

export function useImageGeneration() {
  const state = useGenerationState();

  const generate = useCallback(
    async (request: GenerationRequest) => {
      state.setProcessing();

      try {
        const { image, remaining } = await apiService.generateImage(request);
        state.setSuccess({ image, video: null });

        toast.success("🎨 Your Ghibli character is ready!", {
          description: remaining ? `Remaining quota: ${remaining}` : undefined,
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
