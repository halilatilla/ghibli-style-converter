"use client";

import { motion } from "framer-motion";
import { Download, Loader2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { MAX_UPLOAD_MB, validateClientFile } from "@/lib/imageValidation";
import { cn } from "@/lib/utils";
import { KodamaSilhouette, SootSprite, TotoroSilhouette } from "./GhibliBackground";
import { useGhibliTheme } from "./GhibliThemeContext";
import { TotoroSVG } from "./TotoroSVG";

interface VideoUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  selectedImage: string | null;
  onClear: () => void;
  disabled: boolean;
  className?: string;
}

export default function VideoUploader({
  onImageSelected,
  selectedImage,
  onClear,
  disabled,
  className,
}: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useGhibliTheme();

  const processFile = useCallback(
    (file: File) => {
      const validation = validateClientFile(file);
      if (!validation.ok) {
        toast.error("Upload blocked", { description: validation.error });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageSelected(result.split(",")[1], file.type);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
    },
    [processFile]
  );

  if (selectedImage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative group rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-slate-900 p-2",
          className
        )}
      >
        <img
          src={`data:image/jpeg;base64,${selectedImage}`}
          alt="Original"
          className="w-full h-full object-contain rounded-xl"
        />
        {!disabled && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClear}
            className="absolute top-3 right-3 p-2 bg-slate-800/90 backdrop-blur-sm rounded-full text-slate-300 hover:text-red-400 shadow-lg transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={{
        borderColor: isDragging ? theme.colors.primary : "rgba(148, 163, 184, 0.3)",
        backgroundColor: isDragging ? `${theme.colors.primary}10` : "rgba(0, 0, 0, 0)",
      }}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer group wobbly-box",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 touch-manipulation"
        disabled={disabled}
        aria-label="Upload photo for video"
      />

      <div className="flex flex-col items-center space-y-4 relative z-10">
        {/* Totoro Container */}
        <motion.div
          animate={{
            y: isDragging ? -10 : 0,
            scale: isDragging ? 1.1 : 1,
          }}
          className="p-2 transition-all"
        >
          <div className="w-32 h-32 relative">
            <TotoroSVG
              state={isDragging ? "drag" : isHovering ? "hover" : "idle"}
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Text */}
        <div>
          <p
            className="text-lg font-display font-semibold transition-colors"
            style={{ color: isDragging ? theme.colors.primary : undefined }}
          >
            {isDragging ? "I'll catch it!" : "Give it to Totoro"}
          </p>
          <p className="text-sm text-slate-400 mt-1 font-display">or click to choose a memory</p>
        </div>

        {/* Supported formats */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
          <span className="px-2 py-1 rounded-full bg-slate-800/80">JPG</span>
          <span className="px-2 py-1 rounded-full bg-slate-800/80">PNG</span>
          <span className="px-2 py-1 rounded-full bg-slate-800/80">WEBP</span>
          <span className="px-2 py-1 rounded-full bg-slate-800/80">Max {MAX_UPLOAD_MB}MB</span>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg opacity-30 transition-opacity group-hover:opacity-60"
        style={{ borderColor: theme.colors.primary }}
      />
      <div
        className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg opacity-30 transition-opacity group-hover:opacity-60"
        style={{ borderColor: theme.colors.primary }}
      />
      <div
        className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg opacity-30 transition-opacity group-hover:opacity-60"
        style={{ borderColor: theme.colors.primary }}
      />
      <div
        className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-lg opacity-30 transition-opacity group-hover:opacity-60"
        style={{ borderColor: theme.colors.primary }}
      />
    </motion.div>
  );
}

// Video preview component with progress tracking
interface VideoPreviewProps {
  generatedVideo: string | null;
  isGenerating: boolean;
  generationStatus: string;
  onDownload: () => void;
  theme: any;
}

export function VideoPreview({
  generatedVideo,
  isGenerating,
  generationStatus,
  onDownload,
  theme,
}: VideoPreviewProps) {
  if (isGenerating) {
    return (
      <div className="w-full aspect-video flex items-center justify-center relative rounded-2xl overflow-hidden bg-slate-950/30 border-2 border-dashed border-slate-800/50">
        <div className="text-center p-6 relative z-10 max-w-md w-full">
          {/* Loading animation */}
          <motion.div
            className="w-16 h-16 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-full h-full" style={{ color: theme.colors.primary }} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-2xl mb-2"
            style={{ color: theme.colors.primary }}
          >
            Creating Your Video...
          </motion.h3>

          <p className="text-slate-300 text-sm mb-3 font-display">{generationStatus}</p>

          <p className="text-slate-500 text-xs font-display">
            This usually takes 1-3 minutes. Don't close this window!
          </p>

          {/* Animated progress dots */}
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
      </div>
    );
  }

  if (generatedVideo) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="w-full aspect-video relative rounded-2xl overflow-hidden bg-slate-950/30"
      >
        <video controls autoPlay loop className="w-full h-full object-contain rounded-xl">
          <source src={generatedVideo} type="video/mp4" />
          <track
            kind="captions"
            label="English captions (placeholder)"
            srcLang="en"
            src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:02.000%0ACaptions%20will%20be%20available%20soon."
            default
          />
        </video>

        {/* Download button overlay */}
        <motion.div
          className="absolute bottom-4 right-4 z-10 group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={onDownload}
            type="button"
            className="rounded-full h-10 w-10 group-hover:w-auto group-hover:px-5 bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 shadow-xl border border-slate-700/50 font-semibold text-sm transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="w-0 group-hover:w-auto group-hover:ml-2 overflow-hidden transition-all duration-300 whitespace-nowrap">
              Download
            </span>
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // Empty state - waiting for video generation
  return (
    <div className="text-center p-6 relative">
      {/* Floating spirits background */}
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

      {/* Totoro waiting */}
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
        Waiting for Animation
      </p>
      <p className="text-slate-500 text-xs">
        Upload your photo to begin creating your Ghibli video
      </p>

      {/* Decorative Kodama */}
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
              delay: i * 0.3,
            }}
          >
            <KodamaSilhouette className="w-5 h-6 text-slate-600" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
