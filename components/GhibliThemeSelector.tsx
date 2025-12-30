"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  TreePine,
  Ghost,
  Castle,
  CloudSun,
} from "lucide-react";
import {
  useGhibliTheme,
  GHIBLI_THEMES,
  GhibliFilm,
} from "./GhibliThemeContext";

const FILM_ICONS: Record<GhibliFilm, React.ReactNode> = {
  totoro: <TreePine className="w-4 h-4" />,
  spirited: <Ghost className="w-4 h-4" />,
  howl: <CloudSun className="w-4 h-4" />,
  mononoke: <Sparkles className="w-4 h-4" />,
  laputa: <Castle className="w-4 h-4" />,
};

export default function GhibliThemeSelector() {
  const { film, setFilm, theme } = useGhibliTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-800/70 backdrop-blur-md border-2 border-slate-700/50 hover:bg-slate-800/90 hover:border-slate-600/60 transition-all group shadow-lg"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="w-6 h-6 rounded-full shadow-md"
          style={{
            backgroundColor: theme.colors.primary,
            boxShadow: `0 0 12px ${theme.colors.primary}40, 0 0 0 2px ${theme.colors.secondary}40, 0 0 0 4px rgba(30, 41, 59, 0.5)`,
          }}
          animate={{
            boxShadow: [
              `0 0 12px ${theme.colors.primary}40, 0 0 0 2px ${theme.colors.secondary}40, 0 0 0 4px rgba(30, 41, 59, 0.5)`,
              `0 0 20px ${theme.colors.accent}50, 0 0 0 2px ${theme.colors.accent}60, 0 0 0 4px rgba(30, 41, 59, 0.5)`,
              `0 0 12px ${theme.colors.primary}40, 0 0 0 2px ${theme.colors.secondary}40, 0 0 0 4px rgba(30, 41, 59, 0.5)`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-sm font-semibold text-slate-100 hidden sm:inline">
          {theme.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="absolute right-0 top-full mt-3 w-80 bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-slate-700/50 overflow-hidden z-50"
            >
              <div className="p-5 border-b-2 border-slate-800/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </motion.div>
                  Choose Your World
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Each film brings its own magical atmosphere
                </p>
              </div>

              <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                {Object.values(GHIBLI_THEMES).map((t, index) => (
                  <motion.button
                    key={t.id}
                    onClick={() => {
                      setFilm(t.id);
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group relative overflow-hidden ${
                      film === t.id
                        ? "bg-slate-800/80 shadow-lg"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    {/* Background gradient on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`,
                      }}
                    />

                    {/* Color indicator */}
                    <motion.div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`,
                        boxShadow: `0 4px 12px ${t.colors.primary}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                      }}
                      whileHover={{ rotate: 8 }}
                    >
                      {FILM_ICONS[t.id]}
                    </motion.div>

                    <div className="flex-1 min-w-0 relative z-10">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-slate-100 text-sm truncate">
                          {t.name}
                        </span>
                        {film === t.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full shadow-lg"
                            style={{
                              backgroundColor: t.colors.accent,
                              boxShadow: `0 0 8px ${t.colors.accent}`,
                            }}
                          />
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium block mb-1">
                        {t.japaneseName}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {t.description}
                      </p>
                    </div>

                    {/* Color swatches */}
                    <div className="flex gap-1 shrink-0 relative z-10">
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 border-slate-700 shadow-sm"
                        style={{ backgroundColor: t.colors.primary }}
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 border-slate-700 shadow-sm"
                        style={{ backgroundColor: t.colors.secondary }}
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 border-slate-700 shadow-sm"
                        style={{ backgroundColor: t.colors.accent }}
                        whileHover={{ scale: 1.2 }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
