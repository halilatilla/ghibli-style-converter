"use client"

import { useState } from "react"
import { Download, RefreshCw, AlertCircle, Wand2, Sparkles, Star } from "lucide-react"
import Header from "@/components/Header"
import ImageUploader from "@/components/ImageUploader"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ProcessingStatus = "idle" | "processing" | "success" | "error"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [mimeType, setMimeType] = useState("image/jpeg")
  const [prompt, setPrompt] = useState("Recreate this image in the style of Studio Ghibli anime, vibrant colors, detailed background, hand-drawn aesthetic.")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [error, setError] = useState("")

  const handleImageSelected = (base64: string, type: string) => {
    setSelectedImage(base64)
    setMimeType(type)
    setGeneratedImage(null)
    setStatus("idle")
  }

  const handleClear = () => {
    setSelectedImage(null)
    setGeneratedImage(null)
    setStatus("idle")
  }

  const handleGenerate = async () => {
    if (!selectedImage) return
    setStatus("processing")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedImage, mimeType, prompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to generate")
      setGeneratedImage(data.image)
      setStatus("success")
    } catch (e: any) {
      setError(e.message)
      setStatus("error")
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return
    const link = document.createElement("a")
    link.href = generatedImage
    link.download = "ghibli-style-image.png"
    link.click()
  }

  return (
    <div className="min-h-screen flex flex-col ghibli-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 dark:opacity-10 animate-float-slow">
        <Star className="w-8 h-8 text-amber-400" fill="currentColor" />
      </div>
      <div className="absolute top-40 right-20 opacity-20 dark:opacity-10 animate-float" style={{ animationDelay: "1s" }}>
        <Star className="w-6 h-6 text-emerald-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20 dark:opacity-10 animate-float-slow" style={{ animationDelay: "2s" }}>
        <Star className="w-5 h-5 text-purple-400" fill="currentColor" />
      </div>
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Hero text */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-3">
            Transform Your Photos Into
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent"> Magic</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Upload any photo and watch it transform into beautiful Studio Ghibli-style artwork
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <Card className="rounded-3xl dark:bg-slate-900/80 dark:border-slate-800 backdrop-blur-sm card-hover shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg dark:text-slate-100">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm font-bold mr-3 shadow-md">1</span>
                  Upload Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  onImageSelected={handleImageSelected}
                  selectedImage={selectedImage}
                  onClear={handleClear}
                  disabled={status === "processing"}
                />
              </CardContent>
            </Card>

            <Card className="rounded-3xl dark:bg-slate-900/80 dark:border-slate-800 backdrop-blur-sm card-hover shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg dark:text-slate-100">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-sm font-bold mr-3 shadow-md">2</span>
                  Style Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    disabled={status === "processing"}
                    className="pr-12 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                  <Wand2 className="absolute top-3 right-3 text-slate-400 dark:text-slate-500 w-5 h-5" />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedImage || status === "processing"}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 btn-shine"
                >
                  {status === "processing" ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                      Creating Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Transform
                    </>
                  )}
                </Button>
                {status === "error" && (
                  <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl min-h-[500px] dark:bg-slate-900/80 dark:border-slate-800 backdrop-blur-sm card-hover shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg dark:text-slate-100">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white flex items-center justify-center text-sm font-bold mr-3 shadow-md">3</span>
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center">
                <div className="w-full h-80 flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden relative group transition-all">
                  {status === "processing" ? (
                    <div className="text-center p-8">
                      <div className="relative w-28 h-28 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full" />
                        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
                        <div className="absolute inset-2 border-4 border-teal-400 rounded-full border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                        <Sparkles className="absolute inset-0 m-auto text-emerald-500 w-10 h-10 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Creating Magic</h3>
                      <p className="text-slate-500 dark:text-slate-400">Transforming your photo...</p>
                    </div>
                  ) : generatedImage ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
                      <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Button
                        onClick={handleDownload}
                        size="sm"
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 text-slate-900 hover:bg-white shadow-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-12 text-slate-400 dark:text-slate-500">
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-float-slow">
                        <Wand2 className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                      </div>
                      <p className="font-semibold text-lg">Your artwork will appear here</p>
                      <p className="text-sm mt-1">Upload a photo and click Transform</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200 dark:border-emerald-900 p-6 rounded-2xl shadow-md">
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Tips for best results
              </h3>
              <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">🏞️</span>
                  Landscapes and scenic shots work exceptionally well
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🤳</span>
                  Selfies will be stylized significantly
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌤️</span>
                  Try adding weather conditions to the prompt
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Made with ✨ magic and a sprinkle of Totoro dust</p>
      </footer>
    </div>
  )
}
