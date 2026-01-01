import { useState } from "react";
import {
  DEFAULT_PHOTO_PROMPT,
  DEFAULT_VIDEO_PROMPT,
  STYLE_PRESETS,
  type StylePreset,
} from "@/shared/constants/prompts";
import type { Mode } from "@/shared/types";

export function usePromptState(_initialMode: Mode = "photo") {
  const [prompt, setPrompt] = useState(DEFAULT_PHOTO_PROMPT);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const updatePrompt = (value: string) => {
    setPrompt(value);
    setSelectedPreset(null);
  };

  const selectPreset = (preset: StylePreset, mode: Mode) => {
    setPrompt(mode === "video" ? preset.videoPrompt : preset.prompt);
    setSelectedPreset(preset.name);
  };

  const resetForMode = (mode: Mode, currentPreset?: string | null) => {
    if (currentPreset) {
      const preset = STYLE_PRESETS.find((p) => p.name === currentPreset);
      if (preset) {
        setPrompt(mode === "video" ? preset.videoPrompt : preset.prompt);
        return;
      }
    }
    setPrompt(mode === "video" ? DEFAULT_VIDEO_PROMPT : DEFAULT_PHOTO_PROMPT);
  };

  return {
    prompt,
    selectedPreset,
    updatePrompt,
    selectPreset,
    resetForMode,
  };
}
