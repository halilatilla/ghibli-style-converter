import { motion } from "framer-motion";
import { Download, Maximize2, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { KodamaSilhouette, SootSprite, TotoroSilhouette } from "@/components/GhibliBackground";
import { LoadingSootSprites } from "@/components/SootSprites";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoPreview } from "@/components/VideoUploader";
import type { Mode } from "@/shared/types";

type Props = {
  mode: Mode;
  theme: any;
  status: "idle" | "processing" | "success" | "error";
  generationStatus: string;
  generatedImage: string | null;
  generatedVideo: string | null;
  onDownload: () => void;
  onFullscreen: () => void;
};

function FloatingSpirits() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${60 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SootSprite className="w-6 h-6 text-slate-500" />
        </motion.div>
      ))}
    </div>
  );
}

export default function ResultCard({
  mode,
  theme,
  status,
  generationStatus,
  generatedImage,
  generatedVideo,
  onDownload,
  onFullscreen,
}: Props) {
  const cardGlow = useMemo(
    () =>
      status === "success"
        ? [
            `0 4px 12px ${theme.colors.secondary}40, 0 0 0px ${theme.colors.accent}`,
            `0 4px 16px ${theme.colors.accent}60, 0 0 24px ${theme.colors.accent}`,
            `0 4px 12px ${theme.colors.secondary}40, 0 0 0px ${theme.colors.accent}`,
          ]
        : `0 4px 12px ${theme.colors.secondary}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
    [status, theme.colors.accent, theme.colors.secondary]
  );

  return (
    <Card className="ghibli-card flex flex-col overflow-hidden dappled-light wobbly-box border-none sketch-border">
      <CardHeader className="border-b-2 border-slate-700/40 pb-5 pt-6 px-7 shrink-0 relative">
        <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none" />
        <CardTitle className="flex items-center text-lg font-bold text-slate-100">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg mr-4 text-white shadow-lg wobbly-circle"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
              boxShadow: `0 4px 12px ${theme.colors.secondary}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
            }}
            animate={{
              boxShadow: cardGlow,
              scale: status === "success" ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: status === "success" ? Infinity : 0,
              ease: "easeInOut",
            }}
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <Sparkles className="w-6 h-6 drop-shadow-md" />
          </motion.div>
          <span className="font-display text-2xl" style={{ color: theme.colors.secondary }}>
            Your Masterpiece
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="w-full aspect-[4/3] flex items-center justify-center relative rounded-2xl overflow-hidden bg-slate-950/30 border-2 border-dashed border-slate-800/50">
          {mode === "video" ? (
            <VideoPreview
              generatedVideo={generatedVideo}
              isGenerating={status === "processing"}
              generationStatus={generationStatus}
              onDownload={onDownload}
              theme={theme}
            />
          ) : status === "processing" ? (
            <div className="text-center p-6 relative z-10 max-w-md w-full">
              <LoadingSootSprites />
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-2xl mb-2 mt-4"
                style={{ color: theme.colors.primary }}
              >
                Creating Your Ghibli Character...
              </motion.h3>
              <p className="text-slate-300 text-sm mb-2 font-display">
                The soot sprites are painting your transformation
              </p>
              <p className="text-slate-500 text-xs font-display">This usually takes 5-15 seconds</p>
              <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.colors.accent }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : generatedImage ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  bounce: 0.3,
                }}
                className="w-full h-full flex items-center justify-center p-2 relative group/image cursor-pointer"
                onClick={onFullscreen}
              >
                <img
                  src={generatedImage}
                  alt="Generated Ghibli Character"
                  className="w-full h-full object-contain rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-full p-3 border border-slate-700/50 shadow-xl">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 right-4 z-10 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onDownload}
                  size="lg"
                  className="rounded-full h-10 w-10 group-hover:w-auto group-hover:px-5 bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 shadow-xl border border-slate-700/50 font-semibold ghibli-button text-sm transition-all duration-300 flex items-center justify-center overflow-hidden"
                  type="button"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span className="w-0 group-hover:w-auto group-hover:ml-2 overflow-hidden transition-all duration-300 whitespace-nowrap">
                    Download
                  </span>
                </Button>
              </motion.div>
            </>
          ) : (
            <div className="text-center p-6 relative">
              <FloatingSpirits />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TotoroSilhouette className="w-20 h-24 mx-auto mb-3 text-slate-600" />
              </motion.div>
              <p className="font-display text-xl mb-1" style={{ color: theme.colors.primary }}>
                Waiting for Magic
              </p>
              <p className="text-slate-500 text-xs">
                Upload your photo to begin the transformation
              </p>
              <div className="flex justify-center gap-3 mt-4 opacity-40">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <KodamaSilhouette className="w-6 h-6 text-slate-700" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
