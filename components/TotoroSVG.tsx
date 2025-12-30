import React from "react";
import { motion } from "framer-motion";

export const TotoroSVG = ({
  state = "idle",
  className = "",
}: {
  state?: "idle" | "hover" | "drag" | "drop" | "success";
  className?: string;
}) => {
  // Simple state-based variations
  const isHappy = state === "success" || state === "drop";
  const isCurious = state === "hover";
  const isExcited = state === "drag";

  return (
    <svg
      viewBox="0 0 200 240"
      className={`totoro-svg ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="sketch">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>

      <g filter="url(#sketch)">
        {/* Body - Hand drawn wobble */}
        <path
          d="M40,200 C20,200 10,150 20,100 C30,40 60,10 100,10 C140,10 170,40 180,100 C190,150 180,200 160,200 Z"
          fill="#8A9A9A"
          stroke="#4A5A5A"
          strokeWidth="3"
        >
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            values="
              M40,200 C20,200 10,150 20,100 C30,40 60,10 100,10 C140,10 170,40 180,100 C190,150 180,200 160,200 Z;
              M42,202 C22,198 12,152 22,102 C32,42 62,12 102,12 C142,12 172,42 182,102 C192,152 182,202 162,202 Z;
              M40,200 C20,200 10,150 20,100 C30,40 60,10 100,10 C140,10 170,40 180,100 C190,150 180,200 160,200 Z"
          />
        </path>

        {/* Belly */}
        <path
          d="M50,200 C45,160 55,80 100,80 C145,80 155,160 150,200"
          fill="#F5F5F0"
          stroke="#4A5A5A"
          strokeWidth="2"
        />

        {/* Belly Marks */}
        <g fill="none" stroke="#8A9A9A" strokeWidth="3" strokeLinecap="round">
          <path d="M80,110 l10,-5 l10,5" />
          <path d="M110,110 l10,-5 l10,5" />
          <path d="M95,130 l10,-5 l10,5" />
          <path d="M65,130 l10,-5 l10,5" />
          <path d="M125,130 l10,-5 l10,5" />
        </g>

        {/* Arms - Move based on state */}
        <motion.g
          className="arms"
          initial={false}
          animate={{
            rotate: isExcited ? 10 : 0,
            y: isExcited ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {isExcited ? (
            <>
              <path
                d="M25,120 Q5,100 10,70"
                stroke="#8A9A9A"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M175,120 Q195,100 190,70"
                stroke="#8A9A9A"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              <path
                d="M25,120 Q15,140 25,160"
                stroke="#8A9A9A"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M175,120 Q185,140 175,160"
                stroke="#8A9A9A"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
        </motion.g>

        {/* Eyes */}
        <g transform={isCurious ? "translate(0, -5)" : ""}>
          <circle
            cx="70"
            cy="50"
            r="8"
            fill="white"
            stroke="#4A5A5A"
            strokeWidth="2"
          />
          <circle
            cx="130"
            cy="50"
            r="8"
            fill="white"
            stroke="#4A5A5A"
            strokeWidth="2"
          />

          <circle cx={isCurious ? "72" : "70"} cy="50" r="2.5" fill="black">
            {isHappy && (
              <animate
                attributeName="r"
                values="2.5;0.5;2.5"
                dur="0.2s"
                repeatCount="2"
              />
            )}
          </circle>
          <circle cx={isCurious ? "132" : "130"} cy="50" r="2.5" fill="black">
            {isHappy && (
              <animate
                attributeName="r"
                values="2.5;0.5;2.5"
                dur="0.2s"
                repeatCount="2"
              />
            )}
          </circle>
        </g>

        {/* Nose */}
        <ellipse cx="100" cy="55" rx="5" ry="3" fill="#333" />

        {/* Mouth - Changes with state */}
        {isHappy ? (
          <path
            d="M85,70 Q100,85 115,70"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
        ) : (
          <path d="M95,70 L105,70" fill="none" stroke="#333" strokeWidth="2" />
        )}

        {/* Leaf on head (optional) */}
        <path
          d="M100,10 Q90,0 80,-5 Q100,-15 120,-5 Q110,0 100,10"
          fill="#6B8E23"
          stroke="#4A5A5A"
          strokeWidth="2"
          transform="rotate(-10 100 10)"
        />
      </g>
    </svg>
  );
};
