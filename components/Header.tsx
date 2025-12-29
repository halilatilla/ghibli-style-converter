"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import GhibliThemeSelector from "./GhibliThemeSelector"
import { useGhibliTheme } from "./GhibliThemeContext"

export default function Header() {
  const { theme } = useGhibliTheme()

  return (
    <header className="bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-700/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated logo */}
          <motion.div 
            className="p-2.5 rounded-xl shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: `0 4px 14px ${theme.colors.primary}40`
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          
          <div className="flex flex-col">
            <h1 
              className="text-xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`
              }}
            >
              GhibliStyle
            </h1>
            <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-wider">
              CONVERTER
            </span>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GhibliThemeSelector />
        </motion.div>
      </div>
    </header>
  )
}
