"use client"

import { useState } from "react"
import { Download, RefreshCw, AlertCircle, Wand2, Sparkles } from "lucide-react"
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm mr-3">1</span>
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

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm mr-3">2</span>
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
                    className="pr-12"
                  />
                  <Wand2 className="absolute top-3 right-3 text-slate-400 w-5 h-5" />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedImage || status === "processing"}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {status === "processing" ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                      Dreaming...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Transform
                    </>
                  )}
                </Button>
                {status === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl min-h-[500px]">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm mr-3">3</span>
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center">
                <div className="w-full h-80 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group">
                  {status === "processing" ? (
                    <div className="text-center p-8">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
                        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto text-emerald-500 w-8 h-8 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">Creating Magic</h3>
                      <p className="text-slate-500">This usually takes 5-10 seconds.</p>
                    </div>
                  ) : generatedImage ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                      <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                      <Button
                        onClick={handleDownload}
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-12 text-slate-400">
                      <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Wand2 className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="font-medium">No artwork generated yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
              <h3 className="font-bold text-emerald-800 mb-2">Tips for best results</h3>
              <ul className="list-disc list-inside text-sm text-emerald-700 space-y-1">
                <li>Landscapes and scenic shots work exceptionally well.</li>
                <li>Selfies will be stylized significantly.</li>
                <li>Try adding weather conditions to the prompt.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
