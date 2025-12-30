"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type GhibliFilm = "totoro" | "spirited" | "howl" | "mononoke" | "laputa";

export interface GhibliThemeConfig {
  id: GhibliFilm;
  name: string;
  japaneseName: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundDark: string;
    card: string;
    cardDark: string;
    text: string;
    textMuted: string;
  };
  particles: "dust" | "leaves" | "spirits" | "clouds" | "crystals";
  gradient: string;
  gradientDark: string;
}

export const GHIBLI_THEMES: Record<GhibliFilm, GhibliThemeConfig> = {
  totoro: {
    id: "totoro",
    name: "My Neighbor Totoro",
    japaneseName: "となりのトトロ",
    description: "Summer countryside magic",
    colors: {
      primary: "#5B8C5A", // Authentic forest green from film
      secondary: "#B8D8BA", // Soft sage green
      accent: "#FFD966", // Warm sunshine yellow
      background: "#F8FBF3", // Creamy off-white
      backgroundDark: "#1C2E1C", // Deep forest night
      card: "rgba(248, 251, 243, 0.95)",
      cardDark: "rgba(28, 46, 28, 0.85)",
      text: "#2F4538", // Rich forest text
      textMuted: "#6B8E76", // Muted moss green
    },
    particles: "dust",
    gradient: "linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 35%, #FFF9E6 75%, #FFFDE7 100%)",
    gradientDark: "linear-gradient(135deg, #1C2E1C 0%, #2F4538 40%, #3A4F3D 70%, #1A2818 100%)",
  },
  spirited: {
    id: "spirited",
    name: "Spirited Away",
    japaneseName: "千と千尋の神隠し",
    description: "Mystical spirit realm",
    colors: {
      primary: "#8B6BA8", // Mystical purple from bathhouse
      secondary: "#C5A8D6", // Soft lavender
      accent: "#FFB84D", // Golden lantern glow
      background: "#F5F0FA", // Soft purple-tinted white
      backgroundDark: "#1A1229", // Deep spirit realm night
      card: "rgba(245, 240, 250, 0.95)",
      cardDark: "rgba(26, 18, 41, 0.85)",
      text: "#3D2E52", // Deep purple text
      textMuted: "#7A6B8F", // Muted purple
    },
    particles: "spirits",
    gradient: "linear-gradient(135deg, #E8D4F8 0%, #F0E6FF 40%, #FFF3E0 75%, #FFFBEA 100%)",
    gradientDark: "linear-gradient(135deg, #1A1229 0%, #2D1F45 40%, #3D2E52 70%, #1F1A2B 100%)",
  },
  howl: {
    id: "howl",
    name: "Howl's Moving Castle",
    japaneseName: "ハウルの動く城",
    description: "European romance & sky",
    colors: {
      primary: "#7BA5C9", // Soft sky blue from film
      secondary: "#B8D4E6", // Gentle cloud blue
      accent: "#F5C391", // Warm peach/coral
      background: "#F8FAFD", // Light sky white
      backgroundDark: "#182433", // Deep twilight blue
      card: "rgba(248, 250, 253, 0.95)",
      cardDark: "rgba(24, 36, 51, 0.85)",
      text: "#2E3D4F", // Slate blue text
      textMuted: "#6A7D91", // Muted blue-gray
    },
    particles: "clouds",
    gradient: "linear-gradient(135deg, #E3F2FD 0%, #F0F4F8 35%, #FFF0F0 75%, #FFF8F0 100%)",
    gradientDark: "linear-gradient(135deg, #182433 0%, #2E3D4F 40%, #3A4A5D 70%, #1A2838 100%)",
  },
  mononoke: {
    id: "mononoke",
    name: "Princess Mononoke",
    japaneseName: "もののけ姫",
    description: "Ancient forest spirits",
    colors: {
      primary: "#4A7C59", // Deep forest green
      secondary: "#7AA989", // Moss and lichen green
      accent: "#D45D5D", // Blood red accent
      background: "#F0F5ED", // Natural stone white
      backgroundDark: "#0D1F15", // Ancient forest darkness
      card: "rgba(240, 245, 237, 0.95)",
      cardDark: "rgba(13, 31, 21, 0.85)",
      text: "#1F3829", // Deep forest text
      textMuted: "#556B5E", // Stone gray-green
    },
    particles: "leaves",
    gradient: "linear-gradient(135deg, #C8E6C9 0%, #E8F0EB 40%, #EFF5E8 75%, #F5F8F0 100%)",
    gradientDark: "linear-gradient(135deg, #0D1F15 0%, #1F3829 40%, #2D4538 70%, #152820 100%)",
  },
  laputa: {
    id: "laputa",
    name: "Castle in the Sky",
    japaneseName: "天空の城ラピュタ",
    description: "Sky adventure & ruins",
    colors: {
      primary: "#5AA3CC", // Bright sky blue
      secondary: "#91C7E6", // Cloud white-blue
      accent: "#E5B676", // Ancient gold/bronze
      background: "#F5FAFF", // Bright sky white
      backgroundDark: "#0F1D2B", // Night sky dark
      card: "rgba(245, 250, 255, 0.95)",
      cardDark: "rgba(15, 29, 43, 0.85)",
      text: "#1E3A52", // Deep sky text
      textMuted: "#5A7A94", // Weathered blue
    },
    particles: "crystals",
    gradient: "linear-gradient(135deg, #E1F5FE 0%, #E8F4FC 35%, #FFF3E0 75%, #FFF8E1 100%)",
    gradientDark: "linear-gradient(135deg, #0F1D2B 0%, #1E3A52 40%, #2D4A63 70%, #1A2C3D 100%)",
  },
};

interface GhibliThemeContextType {
  film: GhibliFilm;
  theme: GhibliThemeConfig;
  setFilm: (film: GhibliFilm) => void;
}

const GhibliThemeContext = createContext<GhibliThemeContextType | undefined>(undefined);

export function GhibliThemeProvider({ children }: { children: ReactNode }) {
  const [film, setFilm] = useState<GhibliFilm>("totoro");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("ghibli-film") as GhibliFilm | null;
    if (stored && GHIBLI_THEMES[stored]) {
      setFilm(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ghibli-film", film);
      // Apply CSS variables
      const theme = GHIBLI_THEMES[film];
      const root = document.documentElement;
      root.style.setProperty("--ghibli-primary", theme.colors.primary);
      root.style.setProperty("--ghibli-secondary", theme.colors.secondary);
      root.style.setProperty("--ghibli-accent", theme.colors.accent);
      root.style.setProperty("--ghibli-background", theme.colors.background);
      root.style.setProperty("--ghibli-background-dark", theme.colors.backgroundDark);
      root.style.setProperty("--ghibli-gradient", theme.gradient);
      root.style.setProperty("--ghibli-gradient-dark", theme.gradientDark);
      root.setAttribute("data-ghibli-film", film);
    }
  }, [film, mounted]);

  return (
    <GhibliThemeContext.Provider value={{ film, theme: GHIBLI_THEMES[film], setFilm }}>
      {children}
    </GhibliThemeContext.Provider>
  );
}

export function useGhibliTheme() {
  const context = useContext(GhibliThemeContext);
  if (!context) {
    throw new Error("useGhibliTheme must be used within a GhibliThemeProvider");
  }
  return context;
}
