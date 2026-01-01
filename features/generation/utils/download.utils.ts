import type { Mode } from "@/shared/types";

export function downloadGeneration(mode: Mode, url: string | null) {
  if (!url) return;

  const link = document.createElement("a");
  link.href = url;

  if (mode === "video") {
    link.download = `ghibli-video-${Date.now()}.mp4`;
  } else {
    link.download = `ghibli-image-${Date.now()}.png`;
  }

  link.click();
}
