"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  RefreshCw,
  AlertCircle,
  Wand2,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Leaf,
  Wind,
  X,
  Maximize2,
} from "lucide-react";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import GhibliBackground from "@/components/GhibliBackground";
import {
  TotoroSilhouette,
  KodamaSilhouette,
  SootSprite,
} from "@/components/GhibliBackground";
import { LoadingSootSprites } from "@/components/SootSprites";
import { useGhibliTheme } from "@/components/GhibliThemeContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ProcessingStatus = "idle" | "processing" | "success" | "error";

const STYLE_PRESETS = [
  {
    name: "Spirited Away",
    emoji: "🌸",
    prompt:
      "Transform this person into a Studio Ghibli character in the style of Spirited Away. Hand-drawn anime character with expressive eyes, soft features, Miyazaki's signature art style, vibrant colors, whimsical and magical atmosphere.",
  },
  {
    name: "Totoro Adventure",
    emoji: "🌳",
    prompt:
      "Transform this person into a Studio Ghibli character like Satsuki or Mei from My Neighbor Totoro. Innocent and cheerful expression, simple countryside clothing, hand-drawn anime style with warm earthy tones.",
  },
  {
    name: "Howl's Moving Castle",
    emoji: "✨",
    prompt:
      "Transform this person into an elegant Studio Ghibli character from Howl's Moving Castle. Detailed Victorian-style clothing, flowing hair, expressive features, magical and romantic atmosphere, Miyazaki's beautiful watercolor-like style.",
  },
  {
    name: "Princess Mononoke",
    emoji: "🐺",
    prompt:
      "Transform this person into a fierce Studio Ghibli character like Princess Mononoke. Strong and determined expression, tribal/warrior attire, bold colors, connection with nature, epic and adventurous atmosphere.",
  },
  {
    name: "Kiki's Delivery",
    emoji: "🧹",
    prompt:
      "Transform this person into a charming Studio Ghibli character like Kiki. Youthful and optimistic expression, simple clothing style, bright and cheerful colors, coming-of-age story aesthetic.",
  },
];

// Floating decorative elements
function FloatingSpirits() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${60 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SootSprite className="w-6 h-6 text-slate-500" />
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [prompt, setPrompt] = useState(
    "Transform this person into a Studio Ghibli anime character in Miyazaki's signature art style. Expressive anime eyes, soft facial features, hand-drawn aesthetic, vibrant colors, whimsical and magical atmosphere. Keep the person's essence but reimagine them as a Ghibli character."
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [error, setError] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { theme } = useGhibliTheme();

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

  const handlePresetSelect = (preset: (typeof STYLE_PRESETS)[0]) => {
    setPrompt(preset.prompt);
    setSelectedPreset(preset.name);
  };

  // Keyboard support for fullscreen (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Noise texture */}
      <div className="bg-noise" />

      {/* Dynamic Ghibli Background */}
      <GhibliBackground />

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Hero section with handwritten title - authentic Ghibli feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12 relative"
        >
          {/* Decorative floating elements */}
          <motion.div
            className="absolute -top-8 left-1/4 opacity-30"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8" style={{ color: theme.colors.accent }} />
          </motion.div>
          <motion.div
            className="absolute -top-6 right-1/4 opacity-30"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Sparkles className="w-6 h-6" style={{ color: theme.colors.secondary }} />
          </motion.div>

          <h2
            className="font-display text-5xl md:text-6xl mb-3 relative inline-block"
            style={{ 
              color: theme.colors.primary,
              textShadow: `0 2px 12px ${theme.colors.primary}40, 0 4px 24px ${theme.colors.accent}20`
            }}
          >
            Become a Ghibli Character
            {/* Hand-drawn underline */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full opacity-60"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            Upload your photo and transform into a{" "}
            <span 
              className="font-display text-xl font-semibold"
              style={{ color: theme.colors.accent }}
            >
              Miyazaki character
            </span>
            {" "}from your favorite Studio Ghibli film
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Upload Card - matches height with Your Masterpiece */}
            <Card className="ghibli-card flex flex-col dappled-light wobbly-box border-none">
              <CardHeader className="border-b-2 border-slate-700/40 pb-5 pt-6 px-7 shrink-0 relative">
                <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none" />
                <CardTitle className="flex items-center text-lg font-bold text-slate-100">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg mr-4 text-white shadow-lg wobbly-circle"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                      boxShadow: `0 4px 12px ${theme.colors.primary}40, inset 0 2px 4px rgba(255,255,255,0.2)`
                    }}
                    whileHover={{ rotate: 12, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ImageIcon className="w-6 h-6 drop-shadow-md" />
                  </motion.div>
                  <span className="font-display text-2xl" style={{ color: theme.colors.primary }}>
                    Upload Your Photo
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <ImageUploader
                  onImageSelected={handleImageSelected}
                  selectedImage={selectedImage}
                  onClear={handleClear}
                  disabled={status === "processing"}
                  className="aspect-video"
                />
              </CardContent>
            </Card>

            {/* Prompt Card */}
            <Card className="ghibli-card flex flex-col dappled-light wobbly-box border-none">
              <CardHeader className="border-b-2 border-slate-700/40 pb-5 pt-6 px-7 shrink-0 relative">
                <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none" />
                <CardTitle className="flex items-center text-lg font-bold text-slate-100">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg mr-4 text-white shadow-lg relative wobbly-circle"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary})`,
                      boxShadow: `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`
                    }}
                    whileHover={{ rotate: -12, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: [
                        `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                        `0 4px 16px ${theme.colors.accent}60, inset 0 2px 4px rgba(255,255,255,0.25)`,
                        `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Wand2 className="w-6 h-6 drop-shadow-md" />
                  </motion.div>
                  <span className="font-display text-2xl" style={{ color: theme.colors.accent }}>
                    Style Magic
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-5">
                {/* Presets */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Pick a Mood
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STYLE_PRESETS.map((preset) => (
                      <motion.button
                        key={preset.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          selectedPreset === preset.name
                            ? "text-white shadow-lg"
                            : "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
                        }`}
                        style={
                          selectedPreset === preset.name
                            ? { backgroundColor: theme.colors.primary }
                            : {}
                        }
                        onClick={() => handlePresetSelect(preset)}
                      >
                        <span className="mr-1">{preset.emoji}</span>
                        {preset.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <Textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setSelectedPreset(null);
                    }}
                    rows={3}
                    disabled={status === "processing"}
                    className="min-h-[80px] pr-12 resize-none bg-slate-950/50 border-2 border-slate-700/50 focus:border-[var(--ghibli-primary)] text-slate-100 rounded-2xl text-sm shadow-sm transition-all placeholder:text-slate-500"
                    placeholder="Describe how you want to become a Ghibli character..."
                  />
                  <div className="absolute top-3 right-3 p-1.5 bg-slate-800/80 rounded-lg text-slate-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleGenerate}
                    disabled={!selectedImage || status === "processing"}
                    className="w-full h-14 text-lg font-bold rounded-2xl text-white shadow-lg transition-all duration-300 ghibli-button"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  >
                    {status === "processing" ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin mr-3" />
                        Spirits are painting...
                      </>
                    ) : (
                      <>
                        <Wind className="w-5 h-5 mr-3" />
                        Transform Into Character
                      </>
                    )}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert
                        variant="destructive"
                        className="rounded-2xl border-red-900/50 bg-red-900/20 text-red-300"
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
            className="flex flex-col gap-6"
          >
            {/* Result Card - same aspect ratio as Upload Card */}
            <Card className="ghibli-card flex flex-col overflow-hidden dappled-light wobbly-box border-none">
              <CardHeader className="border-b-2 border-slate-700/40 pb-5 pt-6 px-7 shrink-0 relative">
                <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none" />
                <CardTitle className="flex items-center text-lg font-bold text-slate-100">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg mr-4 text-white shadow-lg wobbly-circle"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
                      boxShadow: `0 4px 12px ${theme.colors.secondary}40, inset 0 2px 4px rgba(255,255,255,0.2)`
                    }}
                    animate={{
                      boxShadow:
                        status === "success"
                          ? [
                              `0 4px 12px ${theme.colors.secondary}40, 0 0 0px ${theme.colors.accent}`,
                              `0 4px 16px ${theme.colors.accent}60, 0 0 24px ${theme.colors.accent}`,
                              `0 4px 12px ${theme.colors.secondary}40, 0 0 0px ${theme.colors.accent}`,
                            ]
                          : `0 4px 12px ${theme.colors.secondary}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                      scale: status === "success" ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: status === "success" ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                    whileHover={{ rotate: 10, scale: 1.05 }}
                  >
                    <Sparkles className="w-6 h-6 drop-shadow-md" />
                  </motion.div>
                  <span className="font-display text-2xl" style={{ color: theme.colors.secondary }}>
                    Your Masterpiece
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="w-full aspect-video flex items-center justify-center relative rounded-2xl overflow-hidden bg-slate-950/30 border-2 border-dashed border-slate-800/50">
                  {status === "processing" ? (
                    <div className="text-center p-6 relative z-10 max-w-sm w-full">
                      {/* Magical loading animation */}
                      <LoadingSootSprites />
                      
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-display text-2xl mb-1 mt-4"
                        style={{ color: theme.colors.primary }}
                      >
                        Creating Magic...
                      </motion.h3>
                      <p className="text-slate-400 text-xs font-display">
                        The soot sprites are hard at work!
                      </p>
                    </div>
                  ) : generatedImage ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          bounce: 0.3,
                        }}
                        className="w-full h-full flex items-center justify-center p-2 relative group/image cursor-pointer"
                        onClick={() => setIsFullscreen(true)}
                      >
                        <img
                          src={generatedImage}
                          alt="Generated Ghibli Character"
                          className="w-full h-full object-contain rounded-xl shadow-2xl"
                        />
                        
                        {/* Fullscreen hint overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                          >
                            <div className="bg-slate-800/90 backdrop-blur-sm rounded-full p-3 border border-slate-700/50 shadow-xl">
                              <Maximize2 className="w-6 h-6 text-white" />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Download button - positioned over the image */}
                      <motion.div
                        className="absolute bottom-4 right-4 z-10 group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleDownload}
                          size="lg"
                          className="rounded-full h-10 w-10 group-hover:w-auto group-hover:px-5 bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 shadow-xl border border-slate-700/50 font-semibold ghibli-button text-sm transition-all duration-300 flex items-center justify-center overflow-hidden"
                        >
                          <Download className="w-4 h-4 shrink-0" />
                          <span className="w-0 group-hover:w-auto group-hover:ml-2 overflow-hidden transition-all duration-300 whitespace-nowrap">
                            Download
                          </span>
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    <div className="text-center p-6 relative">
                      <FloatingSpirits />

                      {/* Empty state with Totoro */}
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <TotoroSilhouette className="w-20 h-24 mx-auto mb-3 text-slate-600" />
                      </motion.div>

                      <p
                        className="font-display text-xl mb-1"
                        style={{ color: theme.colors.primary }}
                      >
                        Waiting for Magic
                      </p>
                      <p className="text-slate-500 text-xs">
                        Upload your photo to begin the transformation
                      </p>

                      {/* Decorative Kodama */}
                      <div className="flex justify-center gap-3 mt-4 opacity-40">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -5, 0],
                              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                            }}
                            transition={{
                              duration: 2 + i * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.3,
                            }}
                          >
                            <KodamaSilhouette className="w-5 h-6 text-slate-600" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Section - Enhanced Ghibli style */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="ghibli-card p-6 dappled-light relative overflow-hidden wobbly-box border-none"
            >
              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full"
                style={{ background: `radial-gradient(circle, ${theme.colors.accent}, transparent)` }}
              />
              
              <div className="flex items-start gap-5 relative z-10">
                <motion.div
                  className="p-4 rounded-2xl shrink-0 text-white shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    boxShadow: `0 4px 12px ${theme.colors.primary}40, inset 0 2px 4px rgba(255,255,255,0.2)`
                  }}
                  animate={{ 
                    rotate: [0, 6, -6, 0],
                    y: [0, -3, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Leaf className="w-6 h-6 drop-shadow-md" />
                </motion.div>
                <div>
                  <h3
                    className="font-display text-2xl mb-3"
                    style={{ 
                      color: theme.colors.primary,
                      textShadow: `0 2px 8px ${theme.colors.primary}30`
                    }}
                  >
                    Pro Tips for Magic
                  </h3>
                  <ul className="text-slate-300 space-y-2.5 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <motion.span 
                        className="text-lg mt-0.5 shrink-0"
                        style={{ color: theme.colors.accent }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        ✦
                      </motion.span>
                      <span>Clear, front-facing photos work best for <span className="font-semibold text-slate-200">character transformation</span>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <motion.span 
                        className="text-lg mt-0.5 shrink-0"
                        style={{ color: theme.colors.accent }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      >
                        ✦
                      </motion.span>
                      <span>Try the <span className="font-bold" style={{ color: theme.colors.secondary }}>"Spirited Away"</span> preset for classic Miyazaki style.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <motion.span 
                        className="text-lg mt-0.5 shrink-0"
                        style={{ color: theme.colors.accent }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      >
                        ✦
                      </motion.span>
                      <span>Well-lit photos with visible facial features give the best results.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer - Enhanced with Ghibli charm */}
      <footer className="relative z-10 py-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-sm text-slate-400 leading-relaxed">
            Inspired by the magic of{" "}
            <motion.span
              className="font-display text-xl inline-block"
              style={{ 
                color: theme.colors.primary,
                textShadow: `0 2px 8px ${theme.colors.primary}40`
              }}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                textShadow: `0 4px 12px ${theme.colors.accent}60`
              }}
            >
              Studio Ghibli
            </motion.span>
          </p>
          <motion.div 
            className="flex justify-center gap-2 mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{ color: theme.colors.accent }}
              >
                ✦
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </footer>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && generatedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              className="absolute top-6 right-6 z-10 p-3 bg-slate-800/90 backdrop-blur-sm rounded-full text-white hover:bg-slate-700 hover:text-red-400 shadow-xl border border-slate-700/50 transition-all cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Download button in fullscreen */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 right-6 z-10 group flex items-center gap-2 px-6 py-3 bg-slate-800/90 backdrop-blur-sm rounded-full text-white hover:bg-slate-700 shadow-xl border border-slate-700/50 transition-all cursor-pointer font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </motion.button>

            {/* Image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.1 
              }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={generatedImage}
                alt="Generated Ghibli Character - Fullscreen"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                style={{
                  boxShadow: `0 20px 60px ${theme.colors.primary}40, 0 0 100px ${theme.colors.accent}20`
                }}
              />
            </motion.div>

            {/* ESC hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 text-slate-400 text-sm font-display flex items-center gap-2"
            >
              <kbd className="px-2 py-1 bg-slate-800/90 backdrop-blur-sm rounded border border-slate-700/50 text-xs font-mono">
                ESC
              </kbd>
              <span>to close</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
