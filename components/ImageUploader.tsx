"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useGhibliTheme } from "./GhibliThemeContext";
import { TotoroSVG } from "./TotoroSVG";

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  selectedImage: string | null;
  onClear: () => void;
  disabled: boolean;
  className?: string;
}

export default function ImageUploader({
  onImageSelected,
  selectedImage,
  onClear,
  disabled,
  className,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useGhibliTheme();

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
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
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        disabled={disabled}
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
