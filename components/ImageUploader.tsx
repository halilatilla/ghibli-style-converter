"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGhibliTheme } from "./GhibliThemeContext";

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
  const { theme } = useGhibliTheme();

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onImageSelected(result.split(",")[1], file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  }, []);

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
            className="absolute top-3 right-3 p-2 bg-slate-800/90 backdrop-blur-sm rounded-full text-slate-300 hover:text-red-400 shadow-lg transition-colors z-10"
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
      animate={{
        borderColor: isDragging
          ? theme.colors.primary
          : "rgba(148, 163, 184, 0.3)",
        backgroundColor: isDragging
          ? `${theme.colors.primary}10`
          : "rgba(0, 0, 0, 0)",
      }}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer group",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={disabled}
      />

      <div className="flex flex-col items-center space-y-4">
        {/* Icon container */}
        <motion.div
          animate={{
            y: isDragging ? -5 : 0,
            scale: isDragging ? 1.1 : 1,
          }}
          className={cn(
            "p-5 rounded-full transition-all",
            isDragging
              ? "text-white shadow-lg"
              : "bg-slate-800/80 text-slate-500 group-hover:text-slate-300"
          )}
          style={isDragging ? { backgroundColor: theme.colors.primary } : {}}
        >
          {isDragging ? (
            <ImageIcon className="w-10 h-10" />
          ) : (
            <Camera className="w-10 h-10" />
          )}
        </motion.div>

        {/* Text */}
        <div>
          <p
            className="text-lg font-semibold transition-colors"
            style={{ color: isDragging ? theme.colors.primary : undefined }}
          >
            {isDragging ? "Drop it like it's hot! 🔥" : "Drop your photo here"}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            or click to browse your files
          </p>
        </div>

        {/* Supported formats */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
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
