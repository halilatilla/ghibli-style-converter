import { motion } from "framer-motion";
import { Film, Image as ImageIcon } from "lucide-react";
import type { Mode } from "@/shared/types";

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  theme: any;
};

export default function ModeSwitcher({ mode, onModeChange, theme }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center gap-3 mt-8"
    >
      <motion.button
        onClick={() => onModeChange("photo")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-base transition-all cursor-pointer ${
          mode === "photo"
            ? "text-white shadow-lg"
            : "bg-slate-800/70 text-slate-300 hover:bg-slate-700/80"
        }`}
        style={
          mode === "photo"
            ? {
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              }
            : {}
        }
      >
        <ImageIcon className="w-5 h-5" />
        Transform Photo
      </motion.button>
      <motion.button
        onClick={() => onModeChange("video")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-base transition-all cursor-pointer ${
          mode === "video"
            ? "text-white shadow-lg"
            : "bg-slate-800/70 text-slate-300 hover:bg-slate-700/80"
        }`}
        style={
          mode === "video"
            ? {
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary})`,
              }
            : {}
        }
      >
        <Film className="w-5 h-5" />
        Create Video
      </motion.button>
    </motion.div>
  );
}
