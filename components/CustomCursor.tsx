"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePerformance } from "@/hooks/usePerformanceMode";
import { useGhibliTheme } from "./GhibliThemeContext";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useGhibliTheme();
  const { isMobile, enableMouseTracking } = usePerformance();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Skip on mobile or when mouse tracking is disabled
    if (isMobile || !enableMouseTracking) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, [cursorX, cursorY, isVisible, isMobile, enableMouseTracking]);

  // Don't render on mobile or when disabled
  if (isMobile || !enableMouseTracking) {
    return null;
  }

  // Also hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Main Cursor Dot - simplified */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white border border-slate-200"
          style={{
            boxShadow: `0 0 8px ${theme.colors.accent}`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
