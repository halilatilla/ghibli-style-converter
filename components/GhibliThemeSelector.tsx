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
  DoorOpen,
} from "lucide-react";
import {
  useGhibliTheme,
  GHIBLI_THEMES,
  GhibliFilm,
} from "./GhibliThemeContext";

const FILM_ICONS: Record<GhibliFilm, React.ReactNode> = {
  totoro: <TreePine className="w-5 h-5" />,
  spirited: <Ghost className="w-5 h-5" />,
  howl: <CloudSun className="w-5 h-5" />,
  mononoke: <Sparkles className="w-5 h-5" />,
  laputa: <Castle className="w-5 h-5" />,
};

export default function GhibliThemeSelector() {
  const { film, setFilm, theme } = useGhibliTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/70 backdrop-blur-md border-2 border-slate-700/50 hover:bg-slate-800/90 hover:border-slate-600/60 transition-all group shadow-lg wobbly-box cursor-pointer"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="w-8 h-8 rounded-full shadow-md flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: theme.colors.primary,
          }}
        >
          <div className="absolute inset-0 opacity-20 bg-white mix-blend-overlay animate-pulse" />
          {FILM_ICONS[film]}
        </motion.div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs text-slate-400 font-display">
            Current World
          </span>
          <span className="text-sm font-bold text-slate-100 font-display">
            {theme.name}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, rotateX: 10 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="absolute right-0 top-full mt-4 w-96 bg-slate-900/95 backdrop-blur-2xl rounded-4xl shadow-2xl border-2 border-slate-700/50 overflow-hidden z-50 origin-top-right"
            >
              <div className="p-6 border-b-2 border-slate-800/50 relative overflow-hidden">
                {/* Dynamic header background based on hovered theme */}
                <motion.div
                  className="absolute inset-0 opacity-20 transition-colors duration-500"
                  style={{
                    background: hoveredTheme
                      ? `linear-gradient(135deg, ${
                          GHIBLI_THEMES[hoveredTheme as GhibliFilm].colors
                            .primary
                        }, ${
                          GHIBLI_THEMES[hoveredTheme as GhibliFilm].colors
                            .secondary
                        })`
                      : "transparent",
                  }}
                />

                <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2 relative z-10">
                  <DoorOpen className="w-5 h-5 text-amber-400" />
                  Select a Portal
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed relative z-10 font-display">
                  Step into another world...
                </p>
              </div>

              <div className="p-3 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {Object.values(GHIBLI_THEMES).map((t, index) => (
                  <motion.button
                    key={t.id}
                    onClick={() => {
                      setFilm(t.id);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHoveredTheme(t.id)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full relative overflow-hidden rounded-2xl group transition-all duration-300 cursor-pointer ${
                      film === t.id
                        ? "ring-2 ring-offset-2 ring-offset-slate-900"
                        : "hover:ring-1 hover:ring-slate-700"
                    }`}
                    style={{
                      borderColor: t.colors.primary,
                    }}
                  >
                    {/* Portal Background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${t.colors.primary}20, ${t.colors.secondary}20)`,
                      }}
                    />

                    <div className="relative p-4 flex items-center gap-4 z-10">
                      {/* Icon Circle */}
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shrink-0 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`,
                          boxShadow: `0 4px 12px ${t.colors.primary}40`,
                        }}
                      >
                        {FILM_ICONS[t.id]}
                      </div>

                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-bold text-slate-100 text-lg">
                            {t.name}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium block mb-1 font-sans opacity-70">
                          {t.japaneseName}
                        </span>
                        <p className="text-xs text-slate-300/80 leading-snug line-clamp-2 font-display">
                          {t.description}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      {film === t.id && (
                        <motion.div
                          layoutId="active-portal"
                          className="absolute right-4 w-2 h-2 rounded-full"
                          style={{ backgroundColor: t.colors.accent }}
                        />
                      )}
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
