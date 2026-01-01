"use client";

import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GHIBLI_THEMES } from "@/shared/constants/themes";
import type { GhibliFilm, GhibliThemeConfig } from "@/shared/types";

interface GhibliThemeContextType {
  film: GhibliFilm;
  theme: GhibliThemeConfig;
  setFilm: (film: GhibliFilm) => void;
}

const GhibliThemeContext = createContext<GhibliThemeContextType | undefined>(undefined);

export function GhibliThemeProvider({ children }: { children: ReactNode }): ReactElement {
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
