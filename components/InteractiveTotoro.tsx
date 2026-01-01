"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const spores = [
  { x: 26, y: 26, size: 3, delay: 0 },
  { x: 42, y: 60, size: 2.8, delay: 0.4 },
  { x: 18, y: 90, size: 2.5, delay: 0.9 },
  { x: 180, y: 24, size: 3.2, delay: 0.2 },
  { x: 164, y: 72, size: 2.6, delay: 0.8 },
  { x: 182, y: 108, size: 2.4, delay: 1.1 },
];

const grasses = [
  { x: 48, h: 16, tilt: -3 },
  { x: 62, h: 20, tilt: 2 },
  { x: 76, h: 18, tilt: -1 },
  { x: 96, h: 22, tilt: 1 },
  { x: 118, h: 19, tilt: -2 },
  { x: 138, h: 17, tilt: 3 },
  { x: 156, h: 21, tilt: -1.5 },
];

interface InteractiveTotoroProps {
  state?: "idle" | "curious" | "excited" | "happy" | "sleeping";
  className?: string;
  onInteract?: () => void;
}

/**
 * Interactive Totoro that feels ALIVE
 * - Breathes naturally when idle
 * - Eyes follow cursor
 * - Ears twitch occasionally
 * - Reacts to hover and interactions
 * - Falls asleep if user inactive too long
 * - Celebrates on success
 */
export default function InteractiveTotoro({
  state = "idle",
  className = "",
  onInteract,
}: InteractiveTotoroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [blinkLeft, setBlinkLeft] = useState(false);
  const [blinkRight, setBlinkRight] = useState(false);
  const [earTwitch, setEarTwitch] = useState<"left" | "right" | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Eye tracking - smooth spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const eyeX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-3, 3]), {
    stiffness: 150,
    damping: 15,
  });
  const eyeY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-2, 2]), {
    stiffness: 150,
    damping: 15,
  });

  // Track mouse for eye movement
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setLastInteraction(Date.now());
      if (isSleeping) setIsSleeping(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY, isSleeping]);

  // Natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        // Blink eyes independently for more natural feel
        if (Math.random() > 0.7) {
          setBlinkLeft(true);
          setTimeout(() => setBlinkLeft(false), 150);
        }

        setTimeout(() => {
          if (Math.random() > 0.7) {
            setBlinkRight(true);
            setTimeout(() => setBlinkRight(false), 150);
          }
        }, 50);
      },
      3000 + Math.random() * 2000
    );

    return () => clearInterval(blinkInterval);
  }, []);

  // Ear twitching
  useEffect(() => {
    const twitchInterval = setInterval(
      () => {
        if (Math.random() > 0.6) {
          setEarTwitch(Math.random() > 0.5 ? "left" : "right");
          setTimeout(() => setEarTwitch(null), 300);
        }
      },
      4000 + Math.random() * 3000
    );

    return () => clearInterval(twitchInterval);
  }, []);

  // Fall asleep if inactive
  useEffect(() => {
    const sleepTimer = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction;
      if (timeSinceLastInteraction > 30000 && state === "idle") {
        setIsSleeping(true);
      }
    }, 5000);

    return () => clearInterval(sleepTimer);
  }, [lastInteraction, state]);

  const handleInteraction = () => {
    setLastInteraction(Date.now());
    if (isSleeping) setIsSleeping(false);
    onInteract?.();
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => {
        setIsHovered(true);
        handleInteraction();
      }}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleInteraction}
      animate={
        state === "happy"
          ? {
              y: [0, -20, 0, -10, 0],
              rotate: [0, -5, 5, -3, 0],
            }
          : state === "excited"
            ? {
                scale: [1, 1.1, 1, 1.05, 1],
                y: [0, -8, 0],
              }
            : {
                // Gentle breathing
                scale: [1, 1.02, 1],
                y: [0, -2, 0],
              }
      }
      transition={
        state === "happy"
          ? { duration: 1.2, ease: "easeInOut" }
          : state === "excited"
            ? { duration: 0.6, repeat: 2 }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <div className="absolute inset-0 rounded-[30px] bg-linear-to-b from-[#f2e9d9] via-[#e8f1e3] to-[#dbe7d5] opacity-80 blur-xl" />
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-40 mix-blend-soft-light" />

      <svg
        viewBox="0 0 200 240"
        className="w-full h-full relative drop-shadow-[0_8px_18px_rgba(21,32,26,0.25)]"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7d7a1" />
            <stop offset="55%" stopColor="#dbe7d5" />
            <stop offset="100%" stopColor="#c6d7c5" />
          </linearGradient>
          <linearGradient id="hillGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8ba48a" />
            <stop offset="100%" stopColor="#6f8c73" />
          </linearGradient>
          <linearGradient id="bodyGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8d9c9b" />
            <stop offset="60%" stopColor="#6f7f7e" />
            <stop offset="100%" stopColor="#5c6a69" />
          </linearGradient>
          <linearGradient id="bellyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f1e7" />
            <stop offset="100%" stopColor="#e0d9c8" />
          </linearGradient>
          <filter id="softPaper" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="12" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.4" />
              <feFuncG type="linear" slope="0.4" />
              <feFuncB type="linear" slope="0.4" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>

        {/* Warm Ghibli sky and hills */}
        <rect x="0" y="0" width="200" height="240" fill="url(#skyGradient)" rx="36" />
        <motion.path
          d="M-10 180 C 30 150, 70 150, 110 180 S 190 190, 230 170 L 230 240 L -10 240 Z"
          fill="url(#hillGradient)"
          initial={{ y: 8 }}
          animate={{ y: [8, 4, 8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          opacity={0.9}
        />
        <motion.path
          d="M-20 195 C 30 185, 80 190, 130 200 S 200 210, 230 195 L 230 240 L -20 240 Z"
          fill="#7b8f78"
          initial={{ y: 10 }}
          animate={{ y: [10, 6, 10] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          opacity={0.85}
        />

        {/* Ambient spores / dust motes */}
        <g>
          {spores.map((spore, idx) => (
            <motion.circle
              key={idx}
              cx={spore.x}
              cy={spore.y}
              r={spore.size}
              fill="rgba(255,255,255,0.8)"
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={{
                opacity: [0.15, 0.5, 0],
                y: [6, -10, -18],
                scale: [0.6, 1, 0.8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: spore.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Dappled light overlay */}
        <motion.rect
          x="0"
          y="0"
          width="200"
          height="240"
          rx="36"
          fill="url(#skyGradient)"
          opacity={0.18}
          filter="url(#softPaper)"
          animate={{ opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft sun */}
        <motion.circle
          cx="42"
          cy="36"
          r="18"
          fill="rgba(255, 215, 171, 0.65)"
          animate={{ r: [17, 19, 17] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Foreground mossy ground */}
        <motion.rect
          x="-10"
          y="192"
          width="220"
          height="60"
          rx="24"
          fill="url(#hillGradient)"
          initial={{ y: 0 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <g>
          {grasses.map((blade, idx) => (
            <motion.line
              key={idx}
              x1={blade.x}
              y1={208}
              x2={blade.x + blade.tilt}
              y2={208 - blade.h}
              stroke="#edf3e5"
              strokeWidth={1.8}
              strokeLinecap="round"
              initial={{ rotate: blade.tilt }}
              animate={{ rotate: [blade.tilt - 1.5, blade.tilt + 1.5, blade.tilt] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
            />
          ))}
        </g>

        {/* Totoro */}
        {/* Totoro Body */}
        <motion.ellipse
          cx="100"
          cy="140"
          rx="70"
          ry="80"
          fill="url(#bodyGradient)"
          stroke="rgba(31, 38, 35, 0.28)"
          strokeWidth="3.2"
          animate={{
            ry: state === "excited" || isHovered ? [80, 82, 80] : 80,
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left Ear */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="16"
          ry="30"
          fill="url(#bodyGradient)"
          stroke="rgba(31, 38, 35, 0.28)"
          strokeWidth="2"
          animate={{
            rotate: earTwitch === "left" ? [0, -8, 0] : 0,
            x: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ originX: "50px", originY: "50px" }}
        />
        <ellipse cx="50" cy="50" rx="8" ry="16" fill="#cdd5cc" />

        {/* Right Ear */}
        <motion.ellipse
          cx="150"
          cy="50"
          rx="16"
          ry="30"
          fill="url(#bodyGradient)"
          stroke="rgba(31, 38, 35, 0.28)"
          strokeWidth="2"
          animate={{
            rotate: earTwitch === "right" ? [0, 8, 0] : 0,
            x: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ originX: "150px", originY: "50px" }}
        />
        <ellipse cx="150" cy="50" rx="8" ry="16" fill="#cdd5cc" />

        {/* Belly - lighter area */}
        <ellipse
          cx="100"
          cy="150"
          rx="44"
          ry="50"
          fill="url(#bellyGradient)"
          stroke="rgba(50, 56, 52, 0.25)"
          strokeWidth="2"
        />

        {/* Belly markings - authentic Totoro chevrons */}
        <motion.path
          d="M70,140 Q100,135 130,140"
          className="fill-none stroke-3"
          stroke="#7b887f"
          opacity={0.45}
          animate={{ opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M76,156 Q100,151 124,156"
          className="fill-none stroke-3"
          stroke="#7b887f"
          opacity={0.45}
          animate={{ opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path
          d="M80,172 Q100,167 120,172"
          className="fill-none stroke-3"
          stroke="#7b887f"
          opacity={0.45}
          animate={{ opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        {/* Eyes - white background */}
        <ellipse cx="76" cy="110" rx="14" ry="16" className="fill-white" />
        <ellipse cx="124" cy="110" rx="14" ry="16" className="fill-white" />

        {/* Eye pupils that follow cursor */}
        {!isSleeping && (
          <>
            <motion.circle
              cx="76"
              cy="110"
              r={blinkLeft ? 1 : 7}
              className="fill-slate-800"
              style={{
                x: isHovered ? 2 : eyeX,
                y: isHovered ? -1 : eyeY,
              }}
              animate={{
                r: blinkLeft ? 1 : 7,
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.circle
              cx="124"
              cy="110"
              r={blinkRight ? 1 : 7}
              className="fill-slate-800"
              style={{
                x: isHovered ? 2 : eyeX,
                y: isHovered ? -1 : eyeY,
              }}
              animate={{
                r: blinkRight ? 1 : 7,
              }}
              transition={{ duration: 0.1 }}
            />
          </>
        )}

        {/* Sleeping eyes (ZZZ) */}
        {isSleeping && (
          <>
            <motion.path
              d="M68,110 Q76,106 84,110"
              className="stroke-slate-700 fill-none stroke-[2.5]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M116,110 Q124,106 132,110"
              className="stroke-slate-700 fill-none stroke-[2.5]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            {/* ZZZ animation */}
            <motion.text
              x="140"
              y="85"
              className="fill-slate-500 text-xl font-bold"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -15] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              Z
            </motion.text>
            <motion.text
              x="150"
              y="75"
              className="fill-slate-500 text-base font-bold"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -12] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
            >
              Z
            </motion.text>
          </>
        )}

        {/* Eye sparkles when excited/happy */}
        {(state === "excited" || state === "happy") && !isSleeping && (
          <>
            <motion.circle
              cx="82"
              cy="105"
              r="2.5"
              className="fill-white"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.circle
              cx="130"
              cy="105"
              r="2.5"
              className="fill-white"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}

        {/* Nose */}
        <ellipse cx="100" cy="130" rx="8" ry="6" className="fill-[#3a403b]" />

        {/* Whiskers */}
        <line
          x1="40"
          y1="120"
          x2="70"
          y2="124"
          className="stroke-[#5d655e] stroke-[1.5] opacity-50"
        />
        <line
          x1="40"
          y1="130"
          x2="70"
          y2="130"
          className="stroke-[#5d655e] stroke-[1.5] opacity-50"
        />
        <line
          x1="40"
          y1="140"
          x2="70"
          y2="136"
          className="stroke-[#5d655e] stroke-[1.5] opacity-50"
        />
        <line
          x1="160"
          y1="120"
          x2="130"
          y2="124"
          className="stroke-[#5d655e] stroke-[1.5] opacity-50"
        />
        <line
          x1="160"
          y1="130"
          x2="130"
          y2="130"
          className="stroke-[#5d655e] stroke-[1.5] opacity-50"
        />
        <line
          x1="160"
          y1="140"
          x2="130"
          y2="136"
          className="stroke-[#5d655e] stroke-[1.5] opacity-50"
        />

        {/* Mouth - smile when happy/excited */}
        {(state === "happy" || state === "excited" || isHovered) && (
          <motion.path
            d="M88,140 Q100,148 112,140"
            className="stroke-[#3a403b] fill-none stroke-2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </svg>

      {/* Hover hint tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#243229]/85 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#f6f1e8] whitespace-nowrap pointer-events-none shadow-lg border border-white/10"
        >
          Hello! 👋
        </motion.div>
      )}
    </motion.div>
  );
}
