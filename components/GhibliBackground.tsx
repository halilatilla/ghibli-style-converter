"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useGhibliTheme } from "./GhibliThemeContext"

// Helper to generate stable random values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Floating particles based on theme
function DustParticles() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useGhibliTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1) * 100,
      y: seededRandom(i * 2) * 100,
      size: seededRandom(i * 3) * 3 + 1.5,
      duration: seededRandom(i * 4) * 25 + 18,
      delay: seededRandom(i * 5) * 12,
      blur: seededRandom(i * 6) * 2 + 1,
    })), []
  )

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${theme.colors.accent}80 0%, ${theme.colors.accent}30 70%, transparent 100%)`,
            filter: `blur(${p.blur}px)`,
          }}
          animate={{
            y: [0, -40, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.1, 0.5, 0.3, 0.1],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function SpiritParticles() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useGhibliTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const spirits = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 10) * 100,
      y: seededRandom(i * 20) * 100,
      size: seededRandom(i * 30) * 10 + 6,
      duration: seededRandom(i * 40) * 18 + 12,
      delay: seededRandom(i * 50) * 10,
    })), []
  )

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {spirits.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
          animate={{
            y: [0, -60, -30, 0],
            x: [0, 25, -15, 10, 0],
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.3, 1.1, 0.8, 0.3],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Spirit orb with authentic Ghibli glow */}
          <div 
            className="rounded-full blur-[2px]"
            style={{ 
              width: s.size, 
              height: s.size,
              background: `radial-gradient(circle, ${theme.colors.accent} 0%, ${theme.colors.primary}80 50%, transparent 100%)`,
              boxShadow: `0 0 ${s.size}px ${theme.colors.accent}60`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

function LeafParticles() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const leaves = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 100) * 100,
      startY: -10,
      size: seededRandom(i * 200) * 12 + 8,
      duration: seededRandom(i * 300) * 15 + 20,
      delay: seededRandom(i * 400) * 15,
      rotation: seededRandom(i * 500) * 360,
    })), []
  )

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((l) => (
        <motion.div
          key={l.id}
          className="absolute text-green-600/50 dark:text-green-400/30"
          style={{
            left: `${l.x}%`,
            top: `${l.startY}%`,
            fontSize: l.size,
          }}
          animate={{
            y: [0, window?.innerHeight + 100 || 1000],
            x: [0, 50, -30, 20, 0],
            rotate: [l.rotation, l.rotation + 720],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  )
}

function CloudParticles() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const clouds = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1000) * 120 - 20,
      y: seededRandom(i * 2000) * 60 + 10,
      scale: seededRandom(i * 3000) * 0.5 + 0.5,
      duration: seededRandom(i * 4000) * 60 + 40,
      delay: seededRandom(i * 5000) * 20,
    })), []
  )

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: `scale(${c.scale})`,
          }}
          animate={{
            x: [0, 200],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="120" height="60" viewBox="0 0 120 60" className="fill-white/30 dark:fill-white/10">
            <ellipse cx="30" cy="40" rx="25" ry="15" />
            <ellipse cx="55" cy="35" rx="30" ry="20" />
            <ellipse cx="85" cy="40" rx="25" ry="15" />
            <ellipse cx="60" cy="25" rx="20" ry="15" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function CrystalParticles() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const crystals = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 10000) * 100,
      y: seededRandom(i * 20000) * 100,
      size: seededRandom(i * 30000) * 6 + 3,
      duration: seededRandom(i * 40000) * 8 + 4,
      delay: seededRandom(i * 50000) * 5,
    })), []
  )

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {crystals.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div 
            className="rotate-45 bg-gradient-to-br from-cyan-300/60 to-blue-400/60 dark:from-cyan-400/40 dark:to-blue-500/40"
            style={{ width: c.size, height: c.size }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Decorative cloud shapes at bottom
function BottomClouds() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg 
        viewBox="0 0 1440 200" 
        className="w-full h-auto fill-white/50 dark:fill-slate-800/50"
        preserveAspectRatio="none"
      >
        <path d="M0,200 L0,120 Q80,80 160,100 Q240,120 320,90 Q400,60 480,80 Q560,100 640,70 Q720,40 800,60 Q880,80 960,50 Q1040,20 1120,40 Q1200,60 1280,30 Q1360,0 1440,20 L1440,200 Z" />
      </svg>
    </div>
  )
}

// Decorative grass/foliage at bottom - organic Ghibli style
function BottomGrass() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-80">
      <svg 
        viewBox="0 0 1440 120" 
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:var(--ghibli-primary)] [stop-opacity:0.5]" />
            <stop offset="50%" className="[stop-color:var(--ghibli-secondary)] [stop-opacity:0.7]" />
            <stop offset="100%" className="[stop-color:var(--ghibli-primary)] [stop-opacity:0.9]" />
          </linearGradient>
          <linearGradient id="grassGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:var(--ghibli-secondary)] [stop-opacity:0.3]" />
            <stop offset="100%" className="[stop-color:var(--ghibli-primary)] [stop-opacity:0.6]" />
          </linearGradient>
        </defs>
        {/* Back layer - softer */}
        <path 
          d="M0,120 L0,70 Q30,50 60,65 Q90,80 120,60 Q150,40 180,55 Q210,70 240,50 Q270,30 300,45 Q330,60 360,40 Q390,20 420,35 Q450,50 480,30 Q510,10 540,25 Q570,40 600,20 Q630,35 660,25 Q690,15 720,30 Q750,45 780,35 Q810,25 840,40 Q870,55 900,45 Q930,35 960,50 Q990,65 1020,55 Q1050,45 1080,60 Q1110,75 1140,65 Q1170,55 1200,70 Q1230,85 1260,75 Q1290,65 1320,80 Q1350,95 1380,85 Q1410,75 1440,90 L1440,120 Z" 
          fill="url(#grassGradient2)"
          opacity="0.6"
        />
        {/* Front layer - more defined */}
        <path 
          d="M0,120 L0,75 Q25,55 50,68 Q75,81 100,63 Q125,45 150,58 Q175,71 200,53 Q225,35 250,48 Q275,61 300,43 Q325,25 350,38 Q375,51 400,33 Q425,45 450,38 Q475,31 500,43 Q525,55 550,48 Q575,41 600,53 Q625,65 650,58 Q675,51 700,63 Q725,75 750,68 Q775,61 800,73 Q825,85 850,78 Q875,71 900,83 Q925,95 950,88 Q975,81 1000,93 Q1025,100 1050,93 Q1075,86 1100,98 Q1125,100 1150,93 Q1175,86 1200,98 Q1225,100 1250,93 Q1275,86 1300,98 Q1325,100 1350,93 Q1375,86 1400,98 Q1425,100 1440,95 L1440,120 Z" 
          fill="url(#grassGradient)"
        />
      </svg>
    </div>
  )
}

// Totoro silhouette for empty states
export function TotoroSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 120" 
      className={`fill-current ${className}`}
    >
      {/* Totoro body */}
      <ellipse cx="50" cy="70" rx="35" ry="40" />
      {/* Ears */}
      <ellipse cx="25" cy="25" rx="8" ry="15" />
      <ellipse cx="75" cy="25" rx="8" ry="15" />
      {/* Inner ears */}
      <ellipse cx="25" cy="25" rx="4" ry="8" className="fill-current opacity-50" />
      <ellipse cx="75" cy="25" rx="4" ry="8" className="fill-current opacity-50" />
      {/* Belly */}
      <ellipse cx="50" cy="75" rx="22" ry="25" className="fill-current opacity-30" />
      {/* Eyes */}
      <circle cx="38" cy="55" r="6" className="fill-white dark:fill-slate-200" />
      <circle cx="62" cy="55" r="6" className="fill-white dark:fill-slate-200" />
      <circle cx="40" cy="55" r="3" className="fill-slate-800 dark:fill-slate-900" />
      <circle cx="64" cy="55" r="3" className="fill-slate-800 dark:fill-slate-900" />
      {/* Nose */}
      <ellipse cx="50" cy="65" rx="4" ry="3" className="fill-slate-700 dark:fill-slate-300" />
      {/* Whiskers */}
      <line x1="20" y1="60" x2="35" y2="62" className="stroke-current stroke-1 opacity-50" />
      <line x1="20" y1="65" x2="35" y2="65" className="stroke-current stroke-1 opacity-50" />
      <line x1="20" y1="70" x2="35" y2="68" className="stroke-current stroke-1 opacity-50" />
      <line x1="80" y1="60" x2="65" y2="62" className="stroke-current stroke-1 opacity-50" />
      <line x1="80" y1="65" x2="65" y2="65" className="stroke-current stroke-1 opacity-50" />
      <line x1="80" y1="70" x2="65" y2="68" className="stroke-current stroke-1 opacity-50" />
      {/* Belly markings */}
      <path d="M35,70 Q50,65 65,70" className="stroke-current stroke-2 fill-none opacity-40" />
      <path d="M38,78 Q50,73 62,78" className="stroke-current stroke-2 fill-none opacity-40" />
      <path d="M40,86 Q50,81 60,86" className="stroke-current stroke-2 fill-none opacity-40" />
    </svg>
  )
}

// Kodama (forest spirit) for empty states
export function KodamaSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" className={`fill-current ${className}`}>
      {/* Head */}
      <ellipse cx="20" cy="15" rx="12" ry="14" />
      {/* Body */}
      <ellipse cx="20" cy="40" rx="8" ry="18" />
      {/* Eyes */}
      <ellipse cx="15" cy="12" rx="3" ry="4" className="fill-slate-800 dark:fill-slate-200" />
      <ellipse cx="25" cy="12" rx="3" ry="4" className="fill-slate-800 dark:fill-slate-200" />
      {/* Mouth */}
      <ellipse cx="20" cy="20" rx="4" ry="3" className="fill-slate-800 dark:fill-slate-200" />
    </svg>
  )
}

// Soot sprite
export function SootSprite({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={`fill-current ${className}`}>
      <circle cx="25" cy="25" r="20" />
      {/* Eyes */}
      <circle cx="18" cy="22" r="4" className="fill-white" />
      <circle cx="32" cy="22" r="4" className="fill-white" />
      <circle cx="19" cy="22" r="2" className="fill-slate-800" />
      <circle cx="33" cy="22" r="2" className="fill-slate-800" />
      {/* Legs */}
      <line x1="10" y1="40" x2="15" y2="48" className="stroke-current stroke-2" />
      <line x1="18" y1="42" x2="20" y2="50" className="stroke-current stroke-2" />
      <line x1="32" y1="42" x2="30" y2="50" className="stroke-current stroke-2" />
      <line x1="40" y1="40" x2="35" y2="48" className="stroke-current stroke-2" />
    </svg>
  )
}

export default function GhibliBackground() {
  const { theme } = useGhibliTheme()

  const ParticleComponent = useMemo(() => {
    switch (theme.particles) {
      case "dust": return DustParticles
      case "spirits": return SpiritParticles
      case "leaves": return LeafParticles
      case "clouds": return CloudParticles
      case "crystals": return CrystalParticles
      default: return DustParticles
    }
  }, [theme.particles])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic gradient background with watercolor effect */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ 
          background: "var(--ghibli-gradient)",
        }}
      />
      <div 
        className="absolute inset-0 transition-all duration-1000 dark:opacity-100 opacity-0"
        style={{ 
          background: "var(--ghibli-gradient-dark)",
        }}
      />
      
      {/* Watercolor wash overlay - authentic Ghibli background feel */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 30%, ${theme.colors.primary}12 0%, transparent 50%),
            radial-gradient(ellipse 600px 800px at 80% 70%, ${theme.colors.secondary}10 0%, transparent 50%),
            radial-gradient(ellipse 700px 500px at 50% 90%, ${theme.colors.accent}08 0%, transparent 50%)
          `,
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Soft light accents - Ghibli lighting style */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle 400px at 70% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
            radial-gradient(circle 300px at 30% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)
          `,
          mixBlendMode: 'soft-light',
        }}
      />
      
      {/* Particles */}
      <ParticleComponent />
      
      {/* Bottom decorative elements - show different based on theme */}
      {theme.particles === "clouds" ? <BottomClouds /> : <BottomGrass />}
    </div>
  )
}

