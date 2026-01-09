import { motion } from "framer-motion";
import { Film, Palette, RefreshCw, Sparkles, Wand2, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MAX_PROMPT_CHARS } from "@/lib/imageValidation";
import { STYLE_PRESETS } from "@/shared/constants/prompts";
import type { Mode } from "@/shared/types";

type Props = {
  mode: Mode;
  theme: any;
  prompt: string;
  onPromptChange: (value: string) => void;
  selectedPreset: string | null;
  onPresetSelect: (preset: (typeof STYLE_PRESETS)[number]) => void;
  status: "idle" | "processing" | "success" | "error";
  selectedImage: string | null;
  onSubmit: () => void;
};

export default function PromptCard({
  mode,
  theme,
  prompt,
  onPromptChange,
  selectedPreset,
  onPresetSelect,
  status,
  selectedImage,
  onSubmit,
}: Props) {
  return (
    <Card className="ghibli-card flex flex-col md:dappled-light md:wobbly-box border-none md:sketch-border rounded-2xl">
      <CardHeader className="border-b-2 border-slate-700/40 pb-5 pt-6 px-7 shrink-0 relative">
        <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none hidden md:block" />
        <CardTitle className="flex items-center text-lg font-bold text-slate-100">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg mr-4 text-white shadow-lg relative wobbly-circle"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary})`,
              boxShadow: `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
            }}
            whileHover={{ rotate: -12, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                `0 4px 16px ${theme.colors.accent}60, inset 0 2px 4px rgba(255,255,255,0.25)`,
                `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
              ],
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer touch-manipulation ${
                  selectedPreset === preset.name
                    ? "text-white shadow-lg"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
                }`}
                style={
                  selectedPreset === preset.name ? { backgroundColor: theme.colors.primary } : {}
                }
                onClick={() => onPresetSelect(preset)}
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
            onChange={(e) => onPromptChange(e.target.value)}
            rows={3}
            disabled={status === "processing"}
            maxLength={MAX_PROMPT_CHARS}
            className="min-h-[80px] pr-12 resize-none bg-slate-950/50 border-2 border-slate-700/50 focus:border-(--ghibli-primary) text-slate-100 rounded-2xl text-sm shadow-sm transition-all placeholder:text-slate-500"
            placeholder="Describe how you want to become a Ghibli character..."
          />
          <div className="absolute top-3 right-3 p-1.5 bg-slate-800/80 rounded-lg text-slate-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-right text-xs text-slate-500 mt-1">
            {prompt.trim().length}/{MAX_PROMPT_CHARS}
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onSubmit}
            disabled={
              !selectedImage ||
              status === "processing" ||
              !prompt.trim() ||
              prompt.trim().length > MAX_PROMPT_CHARS
            }
            className="w-full h-14 text-lg font-bold rounded-2xl text-white shadow-lg transition-all duration-300 ghibli-button"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          >
            {status === "processing" ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin mr-3" />
                {mode === "video" ? "Spirits are animating..." : "Spirits are painting..."}
              </>
            ) : (
              <>
                {mode === "video" ? (
                  <Film className="w-5 h-5 mr-3" />
                ) : (
                  <Wind className="w-5 h-5 mr-3" />
                )}
                {mode === "video" ? "Create Ghibli Video" : "Transform Into Character"}
              </>
            )}
          </Button>
        </motion.div>
        {mode === "video" && (
          <p className="text-xs text-slate-400 text-center mt-2 font-display">
            ⏱️ Video generation takes 1-3 minutes
          </p>
        )}
      </CardContent>
    </Card>
  );
}
