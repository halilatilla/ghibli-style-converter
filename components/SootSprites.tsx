import React from 'react';
import { motion } from 'framer-motion';

export const SootSpriteSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <filter id="fuzzy">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feDisplacementMap in="SourceGraphic" scale="5" />
      </filter>
    </defs>
    <g filter="url(#fuzzy)">
      <circle cx="50" cy="50" r="40" fill="#1a1a1a" />
      <g className="eyes">
        <circle cx="35" cy="45" r="12" fill="white" />
        <circle cx="35" cy="45" r="4" fill="black" />
        <circle cx="65" cy="45" r="12" fill="white" />
        <circle cx="65" cy="45" r="4" fill="black" />
      </g>
    </g>
  </svg>
);

export const LoadingSootSprites = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12"
          initial={{ x: -100, y: Math.random() * 40 }}
          animate={{ 
            x: ['100%', '0%'],
            y: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          <SootSpriteSVG />
        </motion.div>
      ))}
    </div>
  );
};

