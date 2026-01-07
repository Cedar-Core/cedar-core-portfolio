"use client";

import { memo } from "react";

interface CedarCircuitHeroProps {
    className?: string;
}

/**
 * CedarCircuitHero - "The Living Backbone"
 * 
 * Design Principles:
 * 1. TRUNK: Single continuous organic spine (Bezier curve).
 * 2. DIVERGENCE: Branches peel off tangentially, they don't simple "attach".
 * 3. HIERARCHY: Stroke width decays from Trunk (4px) -> Primary (2.5px) -> Secondary (1px).
 * 4. CEDAR SILHOUETTE: Asymmetrical, reaching wide, not pyramidal.
 * 5. BIO-TECH: Glow, subtle pulse, grown aesthetic.
 */
export const CedarCircuitHero = memo(function CedarCircuitHero({
    className = "",
}: CedarCircuitHeroProps) {

    return (
        <div className={`cedar-hero relative w-full h-full ${className}`}>
            <svg
                viewBox="0 0 800 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
            >
                <defs>
                    {/* Deep Bio-Luminescence */}
                    <filter id="living-glow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="core" />
                        <feGaussianBlur stdDeviation="10" result="aura" />
                        <feMerge>
                            <feMergeNode in="aura" />
                            <feMergeNode in="core" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Living Gradient: Roots (Deep Blue) -> Crown (Ethereal White) */}
                    <linearGradient id="spine-grad" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#1864ab" />
                        <stop offset="50%" stopColor="#4dabf7" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>

                    {/* Branch Flow: Energy dissipating outward */}
                    <linearGradient id="branch-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#74c0fc" />
                        <stop offset="100%" stopColor="#1864ab" stopOpacity="0.5" />
                    </linearGradient>
                </defs>

                <g filter="url(#living-glow)" strokeLinecap="round" strokeLinejoin="round">

                    {/* === THE SPINE (Trunk) === */}
                    {/* Not rigid straight line. Slight organic S-curve for life. */}
                    {/* Thickest weight (4px) */}
                    <path
                        d="M400 980 C400 800, 395 600, 400 50"
                        stroke="url(#spine-grad)"
                        strokeWidth="4"
                        className="growth-flow"
                    />

                    {/* === DIVERGING BRANCHES (Asymmetrical, Tangential) === */}

                    {/* -- TIER 1 (Base - Wide Reach) -- */}
                    <g stroke="url(#branch-grad)" strokeWidth="3">
                        {/* Left Branch (Emerges ~850) - Peels Left */}
                        <path d="M400 850 C400 820, 300 830, 150 780" />

                        {/* Right Branch (Emerges ~800) - Peels Right - Not mirrored */}
                        <path d="M400 800 C400 770, 550 780, 720 740" />
                    </g>

                    {/* -- TIER 2 (Mid-Lower - Structural) -- */}
                    <g stroke="url(#branch-grad)" strokeWidth="2.5">
                        {/* Left (Emerges ~680) */}
                        <path d="M400 680 C400 650, 320 650, 180 620" />

                        {/* Right (Emerges ~620) */}
                        <path d="M400 620 C400 590, 520 600, 680 580" />
                    </g>

                    {/* -- TIER 3 (Core - Density) -- */}
                    <g stroke="url(#branch-grad)" strokeWidth="2">
                        {/* Left (Emerges ~500) */}
                        <path d="M398 500 C398 470, 340 480, 220 450" />

                        {/* Right (Emerges ~450) */}
                        <path d="M402 450 C402 420, 480 430, 600 410" />
                    </g>

                    {/* -- TIER 4 (Upper Canopy) -- */}
                    <g stroke="#a5d8ff" strokeWidth="1.5">
                        {/* Left (Emerges ~350) */}
                        <path d="M400 350 C400 330, 350 330, 260 300" />

                        {/* Right (Emerges ~300) */}
                        <path d="M400 300 C400 280, 460 280, 540 260" />
                    </g>

                    {/* === SECONDARY GROWTH (Finer Details) === */}
                    <g stroke="#d0ebff" strokeWidth="1" opacity="0.8">
                        {/* Tiny shoots diverging from main branches */}
                        <path d="M280 805 C280 820, 240 830, 200 840" /> {/* Off T1 Left */}
                        <path d="M550 760 C550 780, 600 790, 640 800" /> {/* Off T1 Right */}

                        <path d="M300 645 C300 660, 260 670, 230 680" /> {/* Off T2 Left */}
                        <path d="M500 600 C500 620, 540 630, 580 640" /> {/* Off T2 Right */}

                        <path d="M300 470 C300 485, 270 495, 240 500" /> {/* Off T3 Left */}
                        <path d="M480 430 C480 445, 510 455, 540 460" /> {/* Off T3 Right */}
                    </g>
                </g>

                {/* === NERVE NODES (System Junctions) === */}
                {/* Placed at divergences and tips. Sparse. */}
                <g filter="url(#living-glow)" fill="#ffffff">
                    {/* Spine Nodes - The Chakras */}
                    <circle cx="400" cy="50" r="3.5" className="pulse-slow" />
                    <circle cx="400" cy="300" r="3" className="pulse-med" />
                    <circle cx="400" cy="620" r="3.5" className="pulse-slow" />
                    <circle cx="400" cy="980" r="4" className="pulse-rooted" />

                    {/* Branch Tips - Connection Points */}
                    <circle cx="150" cy="780" r="2.5" className="pulse-med" />
                    <circle cx="720" cy="740" r="3" className="pulse-fast" />
                    <circle cx="180" cy="620" r="2.5" className="pulse-med" />
                    <circle cx="680" cy="580" r="2.5" className="pulse-fast" />

                    {/* Subtle mid-branch nodes */}
                    <circle cx="280" cy="805" r="2" className="pulse-slow" opacity="0.8" />
                    <circle cx="550" cy="760" r="2" className="pulse-slow" opacity="0.8" />
                </g>
            </svg>

            <style jsx>{`
        .cedar-hero {
          opacity: 0;
          animation: fade-in 2s ease-out forwards;
        }

        @keyframes fade-in {
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); filter: brightness(1.4); }
        }

        .pulse-rooted { animation: pulse 6s ease-in-out infinite; }
        .pulse-slow { animation: pulse 4s ease-in-out infinite; }
        .pulse-med { animation: pulse 3s ease-in-out infinite; }
        .pulse-fast { animation: pulse 2.5s ease-in-out infinite; }

        .growth-flow {
           stroke-dasharray: 1200;
           stroke-dashoffset: 1200;
           animation: grow 3.5s ease-out forwards;
        }

        @keyframes grow {
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
           .cedar-hero, .growth-flow, .pulse-rooted, .pulse-slow, .pulse-med, .pulse-fast {
             animation: none !important;
             opacity: 1;
             stroke-dashoffset: 0;
           }
        }
      `}</style>
        </div>
    );
});

export default CedarCircuitHero;
