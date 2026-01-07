"use client";

import { memo } from "react";

interface CircuitCedarProps {
  className?: string;
}

export const CircuitCedar = memo(function CircuitCedar({ className = "" }: CircuitCedarProps) {
  return (
    <svg
      viewBox="0 0 800 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`circuit-cedar ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Intense White Glow for Nodes */}
        <filter id="node-glow-intense" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feGaussianBlur stdDeviation="15" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft Blue Glow for Lines */}
        <filter id="line-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#3b82f6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <linearGradient id="gradient-trunk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="gradient-fade-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="20%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>

        {/* Energy Pulse Gradient (animated) */}
        <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* === BACKGROUND STRUCTURE LINES (Darker/Subtle) === */}
      <g stroke="#1e3a8a" strokeWidth="1" strokeOpacity="0.3">
        {/* Horizontal grid lines extending out */}
        <path d="M50 200 L750 200" />
        <path d="M50 350 L750 350" />
        <path d="M50 500 L750 500" />
        <path d="M50 650 L750 650" />
        <path d="M50 800 L750 800" />
      </g>

      {/* === MAIN CIRCUIT STRUCTURE === */}
      <g stroke="url(#gradient-trunk)" strokeWidth="1.5" filter="url(#line-glow-blue)">
        {/* Central Spine */}
        <path d="M400 50 L400 950" strokeWidth="2" stroke="#ffffff" strokeOpacity="0.6" />

        {/* Branches - Level 1 (Top) */}
        <path d="M400 100 L350 150" />
        <path d="M400 100 L450 150" />

        {/* Branches - Level 2 */}
        <path d="M400 200 L300 300" />
        <path d="M400 200 L500 300" />
        <path d="M350 250 L320 250" /> {/* Horizontal connector */}
        <path d="M450 250 L480 250" />

        {/* Branches - Level 3 */}
        <path d="M400 350 L250 500" />
        <path d="M400 350 L550 500" />
        <path d="M325 425 L200 425" /> {/* Long horizontal extension */}
        <path d="M475 425 L600 425" />

        {/* Branches - Level 4 */}
        <path d="M400 500 L200 700" />
        <path d="M400 500 L600 700" />
        <path d="M300 600 L150 600" />
        <path d="M500 600 L650 600" />

        {/* Branches - Level 5 (Base) */}
        <path d="M400 650 L150 900" />
        <path d="M400 650 L650 900" />
        <path d="M275 775 L100 775" />
        <path d="M525 775 L700 775" />

        {/* Vertical Drop Lines (Simulating hanging connections) */}
        <path d="M350 150 L350 220" strokeOpacity="0.4" />
        <path d="M450 150 L450 220" strokeOpacity="0.4" />
        <path d="M300 300 L300 400" strokeOpacity="0.4" />
        <path d="M500 300 L500 400" strokeOpacity="0.4" />
        <path d="M250 500 L250 650" strokeOpacity="0.4" />
        <path d="M550 500 L550 650" strokeOpacity="0.4" />
      </g>

      {/* === ANIMATED DATA PATHS (Active "Energy" flowing) === */}
      <g className="data-flow" stroke="#ffffff" strokeWidth="2">
        {/* Path 1: Down center spine */}
        <path d="M400 0 L400 1000" strokeDasharray="100 900" className="flow-vertical-fast" opacity="0.8" />

        {/* Path 2: Diagonal Left */}
        <path d="M400 200 L200 400" strokeDasharray="50 500" className="flow-diagonal-1" opacity="0.6" />

        {/* Path 3: Diagonal Right */}
        <path d="M400 350 L600 550" strokeDasharray="50 500" className="flow-diagonal-2" opacity="0.6" />

        {/* Path 4: Horizontal sweep */}
        <path d="M100 500 L700 500" strokeDasharray="50 800" className="flow-horizontal" opacity="0.5" />
      </g>

      {/* === GLOWING NODES (Intersections) === */}
      <g filter="url(#node-glow-intense)" fill="white">
        {/* Central Nodes */}
        <circle cx="400" cy="50" r="4" className="pulse-node-fast" />
        <circle cx="400" cy="200" r="5" className="pulse-node-medium" />
        <circle cx="400" cy="350" r="5" className="pulse-node-slow" />
        <circle cx="400" cy="500" r="6" className="pulse-node-medium" />
        <circle cx="400" cy="650" r="5" className="pulse-node-slow" />
        <circle cx="400" cy="800" r="4" className="pulse-node-fast" />

        {/* Level 1 Nodes */}
        <circle cx="350" cy="150" r="3" className="pulse-node-random-1" />
        <circle cx="450" cy="150" r="3" className="pulse-node-random-2" />

        {/* Level 2 Nodes */}
        <circle cx="300" cy="300" r="4" className="pulse-node-random-3" />
        <circle cx="500" cy="300" r="4" className="pulse-node-random-1" />
        <circle cx="320" cy="250" r="2.5" className="pulse-node-random-2" />
        <circle cx="480" cy="250" r="2.5" className="pulse-node-random-3" />

        {/* Level 3 Nodes */}
        <circle cx="250" cy="500" r="4.5" className="pulse-node-random-1" />
        <circle cx="550" cy="500" r="4.5" className="pulse-node-random-2" />
        <circle cx="200" cy="425" r="3" className="pulse-node-random-3" />
        <circle cx="600" cy="425" r="3" className="pulse-node-random-1" />

        {/* Level 4 Nodes */}
        <circle cx="200" cy="700" r="4" className="pulse-node-random-2" />
        <circle cx="600" cy="700" r="4" className="pulse-node-random-3" />
        <circle cx="150" cy="600" r="3" className="pulse-node-random-1" />
        <circle cx="650" cy="600" r="3" className="pulse-node-random-2" />

        {/* Scattered "Constellation" Nodes */}
        <circle cx="100" cy="200" r="2" opacity="0.5" className="twinkle-node" />
        <circle cx="700" cy="300" r="2" opacity="0.5" className="twinkle-node-alt" />
        <circle cx="50" cy="500" r="2" opacity="0.5" className="twinkle-node" />
        <circle cx="750" cy="600" r="2" opacity="0.5" className="twinkle-node-alt" />
      </g>

      <style>{`
        /* --- Node Pulsing --- */
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }

        .pulse-node-fast { animation: pulse-opacity 2s ease-in-out infinite; }
        .pulse-node-medium { animation: pulse-opacity 3s ease-in-out infinite; }
        .pulse-node-slow { animation: pulse-opacity 4s ease-in-out infinite; }
        
        .pulse-node-random-1 { animation: pulse-opacity 3.5s ease-in-out infinite 0.5s; }
        .pulse-node-random-2 { animation: pulse-opacity 3.2s ease-in-out infinite 1.2s; }
        .pulse-node-random-3 { animation: pulse-opacity 3.8s ease-in-out infinite 2.1s; }
        
        .twinkle-node { animation: twinkle 4s ease-in-out infinite; }
        .twinkle-node-alt { animation: twinkle 5s ease-in-out infinite 1.5s; }

        /* --- Data Flow Animation --- */
        @keyframes flow-move {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        
        .flow-vertical-fast {
          animation: flow-move 3s linear infinite;
        }
        .flow-diagonal-1 {
          animation: flow-move 4s linear infinite;
        }
        .flow-diagonal-2 {
          animation: flow-move 5s linear infinite;
        }
        .flow-horizontal {
          animation: flow-move 6s linear infinite;
        }

        /* Responsive & Reduced Motion */
        @media (max-width: 768px) or (prefers-reduced-motion: reduce) {
          .pulse-node-fast, .pulse-node-medium, .pulse-node-slow, 
          .pulse-node-random-1, .pulse-node-random-2, .pulse-node-random-3,
          .flow-vertical-fast, .flow-diagonal-1, .flow-diagonal-2, .flow-horizontal,
          .twinkle-node, .twinkle-node-alt {
            animation: none;
            opacity: 0.8;
          }
        }
      `}</style>
    </svg>
  );
});

export default CircuitCedar;
