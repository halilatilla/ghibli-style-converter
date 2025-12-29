"use client"

import { Sparkles } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
            GhibliStyle Converter
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
