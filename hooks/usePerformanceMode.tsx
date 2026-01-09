"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

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

// Check if running on mobile device or small viewport
function checkIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  
  // Check user agent for mobile devices
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check viewport width (responsive breakpoint)
  const isSmallViewport = window.innerWidth < 768;
  
  // Check touch capability
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  
  return isMobileUA || isSmallViewport || (hasTouch && isSmallViewport);
}

export function usePerformanceMode(): PerformanceConfig {
  // Always start with MEDIUM_CONFIG to avoid hydration mismatch
  // The useEffect will update it on the client
  const [config, setConfig] = useState<PerformanceConfig>(MEDIUM_CONFIG);
  const [isHydrated, setIsHydrated] = useState(false);

  const updateConfig = useCallback(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setConfig(REDUCED_MOTION_CONFIG);
      return;
    }

    const isMobile = checkIsMobile();

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
  }, []);

  useEffect(() => {
    // Mark as hydrated and do initial check
    setIsHydrated(true);
    updateConfig();

    // Listen for viewport resize (debounced)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateConfig, 150);
    };
    window.addEventListener("resize", handleResize);

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setConfig(REDUCED_MOTION_CONFIG);
      } else {
        updateConfig();
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      clearTimeout(resizeTimeout);
    };
  }, [updateConfig]);

  // Return config with hydration info
  // Before hydration, return MEDIUM config to match server render
  return isHydrated ? config : MEDIUM_CONFIG;
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
