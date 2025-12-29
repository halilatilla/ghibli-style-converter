"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  RefreshCw,
  AlertCircle,
  Wand2,
  Sparkles,
  Image as ImageIcon,
  Palette,
  CloudFog,
  Sun,
  Leaf,
} from "lucide-react";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

type ProcessingStatus = "idle" | "processing" | "success" | "error";

const STYLE_PRESETS = [
  {
    name: "Classic Ghibli",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
    prompt:
      "Studio Ghibli style, detailed hand-drawn background, vibrant colors, whimsical atmosphere, Miyazaki art style.",
  },
  {
    name: "Watercolor Dream",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-200",
    prompt:
      "Soft watercolor style, dreamy atmosphere, pastel colors, gentle lighting, Studio Ghibli inspired landscapes.",
  },
  {
    name: "Retro Anime",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200",
    prompt:
      "90s anime aesthetic, cel shaded, retro grain, nostalgic vibe, detailed clouds and sky.",
  },
  {
    name: "Forest Spirit",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
    prompt:
      "Lush green forest, mossy textures, dappled sunlight, magical nature atmosphere, Totoro style background.",
  },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [prompt, setPrompt] = useState(
    "Recreate this image in the style of Studio Ghibli anime, vibrant colors, detailed background, hand-drawn aesthetic."
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [error, setError] = useState("");

  const handleImageSelected = (base64: string, type: string) => {
    setSelectedImage(base64);
    setMimeType(type);
    setGeneratedImage(null);
    setStatus("idle");
  };

  const handleClear = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setStatus("idle");
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    setStatus("processing");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedImage, mimeType, prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setGeneratedImage(data.image);
      setStatus("success");
    } catch (e: any) {
      setError(e.message);
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "ghibli-style-image.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      <div className="bg-noise" />

      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fdfbf7] via-[#e6f4f1] to-[#f0f9ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] -z-10" />

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Upload Card */}
            <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xl shadow-emerald-900/5 dark:shadow-black/20 overflow-hidden flex flex-col h-[500px]">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4 pt-6 px-6 shrink-0">
                <CardTitle className="flex items-center text-xl font-bold text-slate-800 dark:text-slate-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mr-4 ring-4 ring-white dark:ring-slate-800 shadow-sm">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  1. Upload Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col h-full">
                <div className="flex-grow flex flex-col h-full">
                  <ImageUploader
                    onImageSelected={handleImageSelected}
                    selectedImage={selectedImage}
                    onClear={handleClear}
                    disabled={status === "processing"}
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prompt Card */}
            <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xl shadow-emerald-900/5 dark:shadow-black/20 flex-grow flex flex-col">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4 pt-6 px-6 shrink-0">
                <CardTitle className="flex items-center text-xl font-bold text-slate-800 dark:text-slate-100">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-lg mr-4 ring-4 ring-white dark:ring-slate-800 shadow-sm">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  2. Style Magic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 flex-grow flex flex-col justify-center">
                {/* Presets */}
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Pick a Mood
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STYLE_PRESETS.map((preset) => (
                      <Badge
                        key={preset.name}
                        className={`cursor-pointer transition-all py-2 px-4 rounded-xl border-2 border-transparent hover:border-current hover:scale-105 ${preset.color}`}
                        onClick={() => setPrompt(preset.prompt)}
                      >
                        {preset.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="relative group flex-grow">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    disabled={status === "processing"}
                    className="h-full min-h-[120px] pr-12 resize-none bg-white dark:bg-slate-950/50 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-0 text-slate-800 dark:text-slate-100 rounded-2xl text-base shadow-sm transition-all placeholder:text-slate-400"
                    placeholder="Describe the magical transformation..."
                  />
                  <div className="absolute top-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!selectedImage || status === "processing"}
                  className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0"
                >
                  {status === "processing" ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin mr-3" />
                      Painting your dream...
                    </>
                  ) : (
                    <>
                      <Leaf className="w-6 h-6 mr-3" />
                      Transform to Ghibli Style
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert
                        variant="destructive"
                        className="rounded-2xl border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6 h-full"
          >
            <Card className="rounded-[2rem] flex flex-col border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xl shadow-emerald-900/5 dark:shadow-black/20 overflow-hidden h-[500px]">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4 pt-6 px-6 shrink-0">
                <CardTitle className="flex items-center text-xl font-bold text-slate-800 dark:text-slate-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mr-4 ring-4 ring-white dark:ring-slate-800 shadow-sm">
                    <Sun className="w-5 h-5" />
                  </div>
                  3. Your Masterpiece
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center p-6 h-full">
                <div className="w-full h-full flex items-center justify-center relative rounded-3xl overflow-hidden bg-slate-100/50 dark:bg-slate-950/30 border-2 border-dashed border-slate-200 dark:border-slate-800 group">
                  {status === "processing" ? (
                    <div className="text-center p-8 relative z-10 max-w-sm">
                      <div className="relative w-32 h-32 mx-auto mb-8">
                        <motion.div className="absolute inset-0 border-[6px] border-slate-200 dark:border-slate-700 rounded-full opacity-30" />
                        <motion.div
                          className="absolute inset-0 border-[6px] border-emerald-500 rounded-full border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 m-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shadow-inner"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Sparkles className="text-emerald-600 dark:text-emerald-400 w-10 h-10" />
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                        Creating Magic...
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Spirits are gathering to paint your scene. <br />
                        This usually takes 5-10 seconds.
                      </p>
                    </div>
                  ) : generatedImage ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.3,
                      }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={generatedImage}
                        alt="Generated Ghibli Style"
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-2xl shadow-black/20 p-2"
                      />

                      {/* Action Bar */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                          onClick={handleDownload}
                          size="lg"
                          className="rounded-full h-12 px-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xl border border-slate-200 dark:border-slate-700 font-bold"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        </div>
                      </div>
                      <p className="font-bold text-xl text-slate-400 dark:text-slate-500">
                        Canvas Empty
                      </p>
                      <p className="text-slate-400 dark:text-slate-500 mt-2">
                        Upload an image to awaken the spirits
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white/60 dark:bg-slate-900/60 border border-emerald-100 dark:border-emerald-900/30 p-6 rounded-[2rem] backdrop-blur-sm shadow-lg shadow-emerald-900/5 dark:shadow-black/20"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl shrink-0">
                  <CloudFog className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
                    Pro Tips for Magic
                  </h3>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside marker:text-emerald-500">
                    <li>
                      Landscapes and nature shots get the best "Miyazaki" look.
                    </li>
                    <li>
                      Try using the <b>"Forest Spirit"</b> preset for lush
                      greenery.
                    </li>
                    <li>
                      Ensure your uploaded image is well-lit for best details.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
