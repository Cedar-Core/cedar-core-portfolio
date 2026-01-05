"use client";

import { motion } from "framer-motion";

export function NeonBeam() {
    return (
        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.8] overflow-hidden">
            <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="beam-gradient-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                    <filter id="beam-blur-hero" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                    </filter>
                </defs>

                {/* Animated Beam Path - Primary */}
                <motion.path
                    d="M-10,80 Q50,20 110,80"
                    stroke="url(#beam-gradient-hero)"
                    strokeWidth="3.0"
                    fill="none"
                    filter="url(#beam-blur-hero)"
                    initial={{ pathLength: 1, opacity: 0.8 }}
                    animate={{
                        d: [
                            "M-10,80 Q50,20 110,80",   // Start curve
                            "M-10,70 Q50,30 110,70",   // Shifted curve
                            "M-10,80 Q50,20 110,80"    // Back to start
                        ]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ vectorEffect: "non-scaling-stroke" }}
                />

                {/* Secondary subtle beam */}
                <motion.path
                    d="M-10,30 Q50,90 110,30"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#beam-blur-hero)"
                    opacity="0.5"
                    animate={{
                        d: [
                            "M-10,30 Q50,90 110,30",
                            "M-10,40 Q50,80 110,40",
                            "M-10,30 Q50,90 110,30"
                        ]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </svg>
        </div>
    );
}
