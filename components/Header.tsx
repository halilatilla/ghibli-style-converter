"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useGhibliTheme } from "./GhibliThemeContext";
import GhibliThemeSelector from "./GhibliThemeSelector";

export default function Header() {
  const { theme } = useGhibliTheme();

  return (
    <header className="bg-slate-900/85 backdrop-blur-xl sticky top-0 z-50 border-b-2 border-slate-700/50 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Animated logo with Ghibli glow */}
          <motion.div
            className="p-3 rounded-2xl shadow-2xl relative"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: `0 8px 20px ${theme.colors.primary}50, inset 0 2px 4px rgba(255,255,255,0.2)`,
            }}
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -4, 0],
              boxShadow: [
                `0 8px 20px ${theme.colors.primary}50, inset 0 2px 4px rgba(255,255,255,0.2)`,
                `0 12px 28px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.25)`,
                `0 8px 20px ${theme.colors.primary}50, inset 0 2px 4px rgba(255,255,255,0.2)`,
              ],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>

          <div className="flex flex-col">
            <h1
              className="text-2xl font-bold bg-clip-text text-transparent font-display"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
                textShadow: `0 2px 8px ${theme.colors.primary}40`,
              }}
            >
              GhibliStyle
            </h1>
            <span className="text-[10px] font-bold text-slate-400 -mt-0.5 tracking-[0.2em] uppercase">
              Converter
            </span>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, type: "spring" }}
        >
          <GhibliThemeSelector />
        </motion.div>
      </div>
    </header>
  );
}
