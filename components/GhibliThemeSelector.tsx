"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Sparkles, TreePine, Ghost, Castle, CloudSun } from "lucide-react"
import { useGhibliTheme, GHIBLI_THEMES, GhibliFilm } from "./GhibliThemeContext"

const FILM_ICONS: Record<GhibliFilm, React.ReactNode> = {
  totoro: <TreePine className="w-4 h-4" />,
  spirited: <Ghost className="w-4 h-4" />,
  howl: <CloudSun className="w-4 h-4" />,
  mononoke: <Sparkles className="w-4 h-4" />,
  laputa: <Castle className="w-4 h-4" />,
}

export default function GhibliThemeSelector() {
  const { film, setFilm, theme } = useGhibliTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 transition-all group"
      >
        <div 
          className="w-5 h-5 rounded-full ring-2 ring-slate-700 shadow-sm"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <span className="text-sm font-medium text-slate-200 hidden sm:inline">
          {theme.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

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
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden z-50"
            >
              <div className="p-3 border-b border-slate-800">
                <h3 className="font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Choose Your World
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Each film brings its own magic
                </p>
              </div>
              
              <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                {Object.values(GHIBLI_THEMES).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setFilm(t.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                      film === t.id
                        ? "bg-slate-800"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    {/* Color indicator */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: t.colors.primary }}
                    >
                      {FILM_ICONS[t.id]}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-100 text-sm truncate">
                          {t.name}
                        </span>
                        {film === t.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-emerald-500"
                          />
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {t.japaneseName}
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t.description}
                      </p>
                    </div>
                    
                    {/* Color swatches */}
                    <div className="flex -space-x-1 shrink-0">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-slate-800"
                        style={{ backgroundColor: t.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-slate-800"
                        style={{ backgroundColor: t.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-slate-800"
                        style={{ backgroundColor: t.colors.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

