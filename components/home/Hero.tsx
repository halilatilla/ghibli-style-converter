import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Mode } from "@/shared/types";
import ModeSwitcher from "./ModeSwitcher";

type Props = {
  theme: any;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export default function Hero({ theme, mode, onModeChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="text-center mb-12 relative"
    >
      <motion.div
        className="absolute -top-8 left-1/4 opacity-30 hidden sm:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-8 h-8" style={{ color: theme.colors.accent }} />
      </motion.div>
      <motion.div
        className="absolute -top-6 right-1/4 opacity-30 hidden sm:block"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="w-6 h-6" style={{ color: theme.colors.secondary }} />
      </motion.div>

      <h2
        className="font-display text-5xl md:text-6xl mb-3 relative inline-block"
        style={{
          color: theme.colors.primary,
          textShadow: `0 2px 12px ${theme.colors.primary}40, 0 4px 24px ${theme.colors.accent}20`,
        }}
      >
        Become a Ghibli Character
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 rounded-full opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
      </h2>
      <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed mb-6">
        Upload your photo and transform into a{" "}
        <span className="font-display text-xl font-semibold" style={{ color: theme.colors.accent }}>
          Miyazaki character
        </span>{" "}
        from your favorite Studio Ghibli film
      </p>

      <ModeSwitcher mode={mode} onModeChange={onModeChange} theme={theme} />
    </motion.div>
  );
}
