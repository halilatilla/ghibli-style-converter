import { useState } from "react";
import { toast } from "sonner";
import { useApiKey } from "@/features/apiKey/hooks/useApiKey";
import { useGeneration } from "@/features/generation/hooks";
import { downloadGeneration } from "@/features/generation/utils/download.utils";
import { validateGenerationRequest } from "@/features/generation/utils/validation.utils";
import { usePromptState } from "@/features/prompt/hooks/usePromptState";
import { useImageUpload } from "@/features/upload/hooks/useImageUpload";
import type { STYLE_PRESETS } from "@/shared/constants/prompts";
import type { Mode } from "@/shared/types";
import { useFullscreenPreview } from "./useFullscreenPreview";

export function useHomeController() {
  const [mode, setMode] = useState<Mode>("photo");
  const upload = useImageUpload();
  const promptState = usePromptState(mode);
  const generation = useGeneration(mode);
  const fullscreen = useFullscreenPreview();
  const apiKeyState = useApiKey();

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    generation.reset();
    promptState.resetForMode(newMode, promptState.selectedPreset);
  };

  const handleImageSelected = (base64: string, type: string) => {
    upload.handleImageSelected(base64, type);
    generation.reset();
  };

  const handleClearImage = () => {
    upload.clearImage();
    generation.reset();
  };

  const handleGenerate = async () => {
    const validation = validateGenerationRequest(upload.selectedImage, promptState.prompt);

    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    if (generation.status === "processing") return;

    await generation.generate(
      {
        image: upload.selectedImage!,
        mimeType: upload.mimeType,
        prompt: promptState.prompt.trim(),
      },
      apiKeyState.apiKey || undefined
    );
  };

  const handleDownload = () => {
    const url = mode === "video" ? generation.generatedVideo : generation.generatedImage;
    downloadGeneration(mode, url);
  };

  const handlePresetSelect = (preset: (typeof STYLE_PRESETS)[number]) => {
    promptState.selectPreset(preset, mode);
  };

  return {
    mode,
    selectedImage: upload.selectedImage,
    mimeType: upload.mimeType,
    prompt: promptState.prompt,
    selectedPreset: promptState.selectedPreset,
    status: generation.status,
    generationStatus: generation.generationStatus,
    generatedImage: generation.generatedImage,
    generatedVideo: generation.generatedVideo,
    isFullscreen: fullscreen.isFullscreen,
    // API Key state
    apiKey: apiKeyState.apiKey,
    hasApiKey: apiKeyState.hasApiKey,
    isApiKeyLoaded: apiKeyState.isLoaded,
    setApiKey: apiKeyState.setApiKey,
    clearApiKey: apiKeyState.clearApiKey,
    // Handlers
    handleModeChange,
    handleImageSelected,
    handleClearImage,
    handlePromptChange: promptState.updatePrompt,
    handlePresetSelect,
    handleGenerate,
    handleDownload,
    openFullscreen: fullscreen.openFullscreen,
    closeFullscreen: fullscreen.closeFullscreen,
  };
}
