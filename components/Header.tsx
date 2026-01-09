"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, EyeOff, Key, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useGhibliTheme } from "./GhibliThemeContext";
import GhibliThemeSelector from "./GhibliThemeSelector";

type Props = {
  apiKey?: string;
  hasApiKey?: boolean;
  onApiKeyChange?: (key: string) => void;
  onClearApiKey?: () => void;
};

export default function Header({ apiKey = "", hasApiKey = false, onApiKeyChange, onClearApiKey }: Props) {
  const { theme } = useGhibliTheme();
  const [showKey, setShowKey] = useState(false);
  const [inputValue, setInputValue] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (inputValue.trim() && onApiKeyChange) {
      onApiKeyChange(inputValue.trim());
      setIsEditing(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    onClearApiKey?.();
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(apiKey);
    }
  };

  return (
    <header className="bg-slate-900/85 backdrop-blur-xl sticky top-0 z-50 border-b-2 border-slate-700/50 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Animated logo with Ghibli glow */}
          <motion.div
            className="p-3 rounded-2xl shadow-2xl relative"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: `0 8px 20px ${theme.colors.primary}50, inset 0 2px 4px rgba(255,255,255,0.2)`,
            }}
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -4, 0],
              boxShadow: [
                `0 8px 20px ${theme.colors.primary}50, inset 0 2px 4px rgba(255,255,255,0.2)`,
                `0 12px 28px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.25)`,
                `0 8px 20px ${theme.colors.primary}50, inset 0 2px 4px rgba(255,255,255,0.2)`,
              ],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>

          <div className="flex flex-col">
            <h1
              className="text-2xl font-bold bg-clip-text text-transparent font-display"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
                textShadow: `0 2px 8px ${theme.colors.primary}40`,
              }}
            >
              GhibliStyle
            </h1>
            <span className="text-[10px] font-bold text-slate-400 -mt-0.5 tracking-[0.2em] uppercase">
              Converter
            </span>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, type: "spring" }}
        >
          {/* API Key Input */}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Paste API key..."
                    autoFocus
                    className="w-48 px-3 py-2 pr-8 bg-slate-800/80 border border-slate-600/50 focus:border-emerald-500/50 text-slate-200 rounded-lg text-xs shadow-sm transition-all placeholder:text-slate-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button
                  onClick={handleSave}
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  title="Save"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setInputValue(apiKey);
                  }}
                  className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300 transition-all"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditing(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  hasApiKey
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                    : "bg-slate-800/60 text-slate-400 border border-slate-600/50 hover:bg-slate-700/60 hover:text-slate-300"
                }`}
                title={hasApiKey ? "API key active - click to edit" : "Add your Gemini API key"}
              >
                <Key className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {hasApiKey ? "Key Active" : "Add API Key"}
                </span>
                {hasApiKey && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Clear key button when key is active and not editing */}
          {hasApiKey && !isEditing && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleClear}
              className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Remove API key"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}

          <GhibliThemeSelector />
        </motion.div>
      </div>
    </header>
  );
}
