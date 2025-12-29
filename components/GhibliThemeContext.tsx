"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type GhibliFilm = 
  | "totoro" 
  | "spirited" 
  | "howl" 
  | "mononoke" 
  | "laputa"

export interface GhibliThemeConfig {
  id: GhibliFilm
  name: string
  japaneseName: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    backgroundDark: string
    card: string
    cardDark: string
    text: string
    textMuted: string
  }
  particles: "dust" | "leaves" | "spirits" | "clouds" | "crystals"
  gradient: string
  gradientDark: string
}

export const GHIBLI_THEMES: Record<GhibliFilm, GhibliThemeConfig> = {
  totoro: {
    id: "totoro",
    name: "My Neighbor Totoro",
    japaneseName: "となりのトトロ",
    description: "Summer countryside magic",
    colors: {
      primary: "#4a7c59",
      secondary: "#8fbc8f",
      accent: "#f4d03f",
      background: "#f5f7e8",
      backgroundDark: "#1a2e1a",
      card: "rgba(245, 247, 232, 0.8)",
      cardDark: "rgba(26, 46, 26, 0.8)",
      text: "#2d3b2d",
      textMuted: "#5a6b5a",
    },
    particles: "dust",
    gradient: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #fffde7 100%)",
    gradientDark: "linear-gradient(135deg, #1a2e1a 0%, #2d3b2d 50%, #1a1a0f 100%)",
  },
  spirited: {
    id: "spirited",
    name: "Spirited Away",
    japaneseName: "千と千尋の神隠し",
    description: "Mystical spirit realm",
    colors: {
      primary: "#4a3a6b",
      secondary: "#7b68a6",
      accent: "#ffc107",
      background: "#f0e6ff",
      backgroundDark: "#1a1428",
      card: "rgba(240, 230, 255, 0.8)",
      cardDark: "rgba(26, 20, 40, 0.8)",
      text: "#2d2440",
      textMuted: "#6b5b7a",
    },
    particles: "spirits",
    gradient: "linear-gradient(135deg, #e8d4f8 0%, #f0e6ff 50%, #fff8e1 100%)",
    gradientDark: "linear-gradient(135deg, #1a1428 0%, #2d2440 50%, #1a1a0f 100%)",
  },
  howl: {
    id: "howl",
    name: "Howl's Moving Castle",
    japaneseName: "ハウルの動く城",
    description: "European romance & sky",
    colors: {
      primary: "#6b8cae",
      secondary: "#a8c5db",
      accent: "#e8a87c",
      background: "#f5f8fc",
      backgroundDark: "#1a2333",
      card: "rgba(245, 248, 252, 0.8)",
      cardDark: "rgba(26, 35, 51, 0.8)",
      text: "#2d3a4a",
      textMuted: "#6b7a8a",
    },
    particles: "clouds",
    gradient: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 50%, #fff8e1 100%)",
    gradientDark: "linear-gradient(135deg, #1a2333 0%, #2d3a4a 50%, #1a1a0f 100%)",
  },
  mononoke: {
    id: "mononoke",
    name: "Princess Mononoke",
    japaneseName: "もののけ姫",
    description: "Ancient forest spirits",
    colors: {
      primary: "#2d5a4a",
      secondary: "#5a8a7a",
      accent: "#c94c4c",
      background: "#e8f0eb",
      backgroundDark: "#0f1f1a",
      card: "rgba(232, 240, 235, 0.8)",
      cardDark: "rgba(15, 31, 26, 0.8)",
      text: "#1a3028",
      textMuted: "#4a6058",
    },
    particles: "leaves",
    gradient: "linear-gradient(135deg, #c8e6c9 0%, #e8f0eb 50%, #f1f8e9 100%)",
    gradientDark: "linear-gradient(135deg, #0f1f1a 0%, #1a3028 50%, #0f1f0f 100%)",
  },
  laputa: {
    id: "laputa",
    name: "Castle in the Sky",
    japaneseName: "天空の城ラピュタ",
    description: "Sky adventure & ruins",
    colors: {
      primary: "#4a90b8",
      secondary: "#7fc4e8",
      accent: "#d4a574",
      background: "#e8f4fc",
      backgroundDark: "#0f1a28",
      card: "rgba(232, 244, 252, 0.8)",
      cardDark: "rgba(15, 26, 40, 0.8)",
      text: "#1a3040",
      textMuted: "#5a7a8a",
    },
    particles: "crystals",
    gradient: "linear-gradient(135deg, #e1f5fe 0%, #e8f4fc 50%, #fff3e0 100%)",
    gradientDark: "linear-gradient(135deg, #0f1a28 0%, #1a3040 50%, #1a1a0f 100%)",
  },
}

interface GhibliThemeContextType {
  film: GhibliFilm
  theme: GhibliThemeConfig
  setFilm: (film: GhibliFilm) => void
}

const GhibliThemeContext = createContext<GhibliThemeContextType | undefined>(undefined)

export function GhibliThemeProvider({ children }: { children: ReactNode }) {
  const [film, setFilm] = useState<GhibliFilm>("totoro")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("ghibli-film") as GhibliFilm | null
    if (stored && GHIBLI_THEMES[stored]) {
      setFilm(stored)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ghibli-film", film)
      // Apply CSS variables
      const theme = GHIBLI_THEMES[film]
      const root = document.documentElement
      root.style.setProperty("--ghibli-primary", theme.colors.primary)
      root.style.setProperty("--ghibli-secondary", theme.colors.secondary)
      root.style.setProperty("--ghibli-accent", theme.colors.accent)
      root.style.setProperty("--ghibli-background", theme.colors.background)
      root.style.setProperty("--ghibli-background-dark", theme.colors.backgroundDark)
      root.style.setProperty("--ghibli-gradient", theme.gradient)
      root.style.setProperty("--ghibli-gradient-dark", theme.gradientDark)
      root.setAttribute("data-ghibli-film", film)
    }
  }, [film, mounted])

  return (
    <GhibliThemeContext.Provider value={{ film, theme: GHIBLI_THEMES[film], setFilm }}>
      {children}
    </GhibliThemeContext.Provider>
  )
}

export function useGhibliTheme() {
  const context = useContext(GhibliThemeContext)
  if (!context) {
    throw new Error("useGhibliTheme must be used within a GhibliThemeProvider")
  }
  return context
}

