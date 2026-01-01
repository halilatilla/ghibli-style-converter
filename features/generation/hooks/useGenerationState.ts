import { useCallback, useState } from "react";
import type { GenerationResult, ProcessingStatus } from "@/shared/types";

export function useGenerationState() {
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [generationStatus, setGenerationStatus] = useState("");
  const [result, setResult] = useState<GenerationResult>({});
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setGenerationStatus("");
    setResult({});
    setError(null);
  }, []);

  const setProcessing = useCallback((message = "") => {
    setStatus("processing");
    setGenerationStatus(message);
    setError(null);
  }, []);

  const setSuccess = useCallback((data: GenerationResult) => {
    setResult(data);
    setStatus("success");
    setGenerationStatus("");
  }, []);

  const setFailure = useCallback((errorMessage: string) => {
    setStatus("error");
    setError(errorMessage);
    setGenerationStatus("");
  }, []);

  return {
    status,
    generationStatus,
    generatedImage: result.image ?? null,
    generatedVideo: result.video ?? null,
    error,
    setProcessing,
    setSuccess,
    setFailure,
    reset,
  };
}
