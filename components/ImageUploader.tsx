"use client"

import { useCallback, useState } from "react"
import { Upload, Image as ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void
  selectedImage: string | null
  onClear: () => void
  disabled: boolean
}

export default function ImageUploader({ onImageSelected, selectedImage, onClear, disabled }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      onImageSelected(result.split(",")[1], file.type)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0])
  }, [])

  if (selectedImage) {
    return (
      <div className="relative group rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700">
        <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Original" className="w-full h-auto max-h-[500px] object-cover" />
        {!disabled && (
          <button onClick={onClear} className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 shadow-sm">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false) }}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all",
        isDragging 
          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50" 
          : "border-slate-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={disabled}
      />
      <div className="flex flex-col items-center space-y-4">
        <div className={cn(
          "p-4 rounded-full", 
          isDragging 
            ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300" 
            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
        )}>
          {isDragging ? <ImageIcon className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{isDragging ? "Drop it here!" : "Upload a photo"}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Click to browse or drag and drop</p>
        </div>
      </div>
    </div>
  )
}
