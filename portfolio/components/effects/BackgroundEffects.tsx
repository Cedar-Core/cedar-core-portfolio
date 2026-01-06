"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundEffects() {
    const [dots, setDots] = useState<{ id: number; x: number; y: number; size: number; color: string; duration: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate static metadata for dots on mount to avoid hydration mismatch
        const newDots = [...Array(25)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            color: i % 2 === 0 ? "#60A5FA" : "#A855F7",
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
        }));
        setDots(newDots);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
            {/* Soft Drifting Glows */}
            <motion.div
                className="absolute top-[-20%] left-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/2 blur-[120px]"
                animate={{
                    x: [0, 20, -10, 0],
                    y: [0, -20, 30, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.div
                className="absolute bottom-[-20%] right-[-20%] w-[40%] h-[40%] rounded-full bg-purple-500/2 blur-[120px]"
                animate={{
                    x: [0, -30, 20, 0],
                    y: [0, 30, -10, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Floating Particles (Dots) */}
            {dots.map((dot) => (
                <motion.div
                    key={dot.id}
                    className="absolute rounded-full opacity-0"
                    style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: dot.size,
                        height: dot.size,
                        backgroundColor: dot.color,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: dot.duration,
                        repeat: Infinity,
                        delay: dot.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
