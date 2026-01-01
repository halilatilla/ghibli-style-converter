import { useEffect, useState } from "react";

export function useFullscreenPreview() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return {
    isFullscreen,
    openFullscreen: () => setIsFullscreen(true),
    closeFullscreen: () => setIsFullscreen(false),
  };
}
