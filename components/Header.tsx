"use client"

import { Sparkles } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            GhibliStyle Converter
          </h1>
        </div>
        <div className="text-sm text-slate-500 hidden sm:block">AI-Powered Style Transfer</div>
      </div>
    </header>
  )
}
