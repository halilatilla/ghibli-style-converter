import type { Mode } from "@/shared/types";
import { useImageGeneration } from "./useImageGeneration";
import { useVideoGeneration } from "./useVideoGeneration";

export function useGeneration(mode: Mode) {
  const imageGen = useImageGeneration();
  const videoGen = useVideoGeneration();

  const activeGen = mode === "video" ? videoGen : imageGen;

  return {
    status: activeGen.status,
    generationStatus: activeGen.generationStatus,
    generatedImage: mode === "photo" ? imageGen.generatedImage : null,
    generatedVideo: mode === "video" ? videoGen.generatedVideo : null,
    error: activeGen.error,
    generate: activeGen.generate,
    reset: activeGen.reset,
  };
}
