"use client"

import { Sparkles } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export default function Header() {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50 border-b border-emerald-100/50 dark:border-slate-800/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20 animate-float-slow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400">
            GhibliStyle Converter
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
