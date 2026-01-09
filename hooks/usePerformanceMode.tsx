"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type PerformanceMode = "high" | "medium" | "low";

interface PerformanceConfig {
  mode: PerformanceMode;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  particleCount: number;
  enableParticles: boolean;
  enableBlur: boolean;
  enableComplexAnimations: boolean;
  enableMouseTracking: boolean;
}

const HIGH_CONFIG: PerformanceConfig = {
  mode: "high",
  isMobile: false,
  prefersReducedMotion: false,
  particleCount: 40,
  enableParticles: true,
  enableBlur: true,
  enableComplexAnimations: true,
  enableMouseTracking: true,
};

const MEDIUM_CONFIG: PerformanceConfig = {
  mode: "medium",
  isMobile: false,
  prefersReducedMotion: false,
  particleCount: 15,
  enableParticles: true,
  enableBlur: true,
  enableComplexAnimations: true,
  enableMouseTracking: false,
};

const LOW_CONFIG: PerformanceConfig = {
  mode: "low",
  isMobile: true,
  prefersReducedMotion: false,
  particleCount: 0,
  enableParticles: false,
  enableBlur: false,
  enableComplexAnimations: false,
  enableMouseTracking: false,
};

const REDUCED_MOTION_CONFIG: PerformanceConfig = {
  mode: "low",
  isMobile: false,
  prefersReducedMotion: true,
  particleCount: 0,
  enableParticles: false,
  enableBlur: true,
  enableComplexAnimations: false,
  enableMouseTracking: false,
};

export function usePerformanceMode(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>(MEDIUM_CONFIG);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setConfig(REDUCED_MOTION_CONFIG);
      return;
    }

    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    // Check for low-end device hints
    const nav = navigator as any;
    const isLowEndDevice = 
      (nav.deviceMemory && nav.deviceMemory < 4) ||
      (nav.hardwareConcurrency && nav.hardwareConcurrency < 4);

    // Check connection speed
    const connection = nav.connection;
    const isSlowConnection = connection && 
      (connection.saveData || connection.effectiveType === "2g" || connection.effectiveType === "slow-2g");

    if (isMobile || isLowEndDevice || isSlowConnection) {
      setConfig({ ...LOW_CONFIG, isMobile });
    } else {
      // Desktop with good specs
      const isHighEnd = 
        (nav.deviceMemory && nav.deviceMemory >= 8) &&
        (nav.hardwareConcurrency && nav.hardwareConcurrency >= 8);

      setConfig(isHighEnd ? HIGH_CONFIG : MEDIUM_CONFIG);
    }

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setConfig(REDUCED_MOTION_CONFIG);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return config;
}

// Context for global access
const PerformanceContext = createContext<PerformanceConfig>(MEDIUM_CONFIG);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const config = usePerformanceMode();
  return (
    <PerformanceContext.Provider value={config}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
