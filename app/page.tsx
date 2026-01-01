"use client";

import GhibliBackground from "@/components/GhibliBackground";
import Header from "@/components/Header";
import FullscreenPreview from "@/components/home/FullscreenPreview";
import Hero from "@/components/home/Hero";
import PromptCard from "@/components/home/PromptCard";
import ResultCard from "@/components/home/ResultCard";
import UploadCard from "@/components/home/UploadCard";
import { useHomeController } from "@/features/home/hooks/useHomeController";
import { useGhibliTheme } from "@/features/theme/hooks/useGhibliTheme";

export default function Home() {
  const { theme } = useGhibliTheme();
  const controller = useHomeController();

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-noise" />
      <GhibliBackground />
      <Header />

      <main className="grow container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <Hero theme={theme} mode={controller.mode} onModeChange={controller.handleModeChange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <UploadCard
              mode={controller.mode}
              theme={theme}
              selectedImage={controller.selectedImage}
              onImageSelected={controller.handleImageSelected}
              onClear={controller.handleClearImage}
              disabled={controller.status === "processing"}
            />

            <PromptCard
              mode={controller.mode}
              theme={theme}
              prompt={controller.prompt}
              onPromptChange={controller.handlePromptChange}
              selectedPreset={controller.selectedPreset}
              onPresetSelect={controller.handlePresetSelect}
              status={controller.status}
              selectedImage={controller.selectedImage}
              onSubmit={controller.handleGenerate}
            />
          </div>

          <ResultCard
            mode={controller.mode}
            theme={theme}
            status={controller.status}
            generationStatus={controller.generationStatus}
            generatedImage={controller.generatedImage}
            generatedVideo={controller.generatedVideo}
            onDownload={controller.handleDownload}
            onFullscreen={controller.openFullscreen}
          />
        </div>
      </main>

      <FullscreenPreview
        open={controller.isFullscreen}
        image={controller.generatedImage}
        onClose={controller.closeFullscreen}
      />
    </div>
  );
}
