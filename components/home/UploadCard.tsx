import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoUploader from "@/components/VideoUploader";
import type { Mode } from "@/shared/types";

type Props = {
  mode: Mode;
  theme: any;
  selectedImage: string | null;
  onImageSelected: (base64: string, mimeType: string) => void;
  onClear: () => void;
  disabled: boolean;
};

export default function UploadCard({
  mode,
  theme,
  selectedImage,
  onImageSelected,
  onClear,
  disabled,
}: Props) {
  return (
    <Card className="ghibli-card flex flex-col md:dappled-light md:wobbly-box border-none md:sketch-border rounded-2xl">
      <CardHeader className="border-b-2 border-slate-700/40 pb-5 pt-6 px-7 shrink-0 relative">
        <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none hidden md:block" />
        <CardTitle className="flex items-center text-lg font-bold text-slate-100">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg mr-4 text-white shadow-lg wobbly-circle"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: `0 4px 12px ${theme.colors.primary}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
            }}
            whileHover={{ rotate: 12, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ImageIcon className="w-6 h-6 drop-shadow-md" />
          </motion.div>
          <span className="font-display text-2xl" style={{ color: theme.colors.primary }}>
            Upload Your Photo
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {mode === "photo" ? (
          <ImageUploader
            onImageSelected={onImageSelected}
            selectedImage={selectedImage}
            onClear={onClear}
            disabled={disabled}
            className="aspect-[4/3]"
          />
        ) : (
          <VideoUploader
            onImageSelected={onImageSelected}
            selectedImage={selectedImage}
            onClear={onClear}
            disabled={disabled}
            className="aspect-[4/3]"
          />
        )}
      </CardContent>
    </Card>
  );
}
