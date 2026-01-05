"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionBackgroundV2 } from "@/components/shared/SectionBackgroundV2";
import { SectionHeadingV2 } from "@/components/shared/SectionHeadingV2";
import { MonoText } from "@/components/shared/MonoText";
import { staggerContainer, EASE_PREMIUM } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Layer {
  id: string;
  name: string;
  description: string;
  metric?: string;
  color: string;
  glowColor: string;
  borderColor: string;
  width: string;
}

// Improved proportions: 100% → 88% → 76% → 64% → 52% → 40%
const layers: Layer[] = [
  {
    id: "frontend",
    name: "Frontend Experiences",
    description: "Websites • Web Apps • Mobile",
    metric: "100%",
    color: "from-cyan-500/15 to-cyan-600/5",
    glowColor: "rgba(34, 211, 238, 0.3)",
    borderColor: "border-cyan-500/40",
    width: "w-full",
  },
  {
    id: "backend",
    name: "Backend Systems",
    description: "APIs • Auth • Logic",
    metric: "88%",
    color: "from-blue-500/15 to-blue-600/5",
    glowColor: "rgba(59, 130, 246, 0.3)",
    borderColor: "border-blue-500/40",
    width: "w-[88%]",
  },
  {
    id: "data",
    name: "Data Layer",
    description: "Databases • Analytics",
    metric: "76%",
    color: "from-indigo-500/15 to-indigo-600/5",
    glowColor: "rgba(99, 102, 241, 0.3)",
    borderColor: "border-indigo-500/40",
    width: "w-[76%]",
  },
  {
    id: "integrations",
    name: "Integrations",
    description: "Payments • CRMs • APIs",
    metric: "64%",
    color: "from-violet-500/15 to-violet-600/5",
    glowColor: "rgba(139, 92, 246, 0.3)",
    borderColor: "border-violet-500/40",
    width: "w-[64%]",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Hosting • Security",
    metric: "52%",
    color: "from-purple-500/15 to-purple-600/5",
    glowColor: "rgba(168, 85, 247, 0.3)",
    borderColor: "border-purple-500/40",
    width: "w-[52%]",
  },
  {
    id: "operations",
    name: "Operations",
    description: "Automation • Monitoring",
    metric: "40%",
    color: "from-fuchsia-500/15 to-fuchsia-600/5",
    glowColor: "rgba(217, 70, 239, 0.3)",
    borderColor: "border-fuchsia-500/40",
    width: "w-[40%]",
  },
];

/**
 * EcosystemLayersV2 — Enhanced visual layered architecture diagram
 * Blueprint background with animated connections
 */
export function EcosystemLayersV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="layers"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Blueprint background variant */}
      <SectionBackgroundV2
        variant="blueprint"
        showGrid={true}
        gridOpacity="light"
        showNoise={true}
        showTopBorder={true}
        topBorderColor="cyan"
        glowPosition="corners"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeadingV2
          eyebrow="System Architecture"
          title="Architecture Layers"
          subtitle="Every layer connects. Every system communicates. One unified ecosystem."
          align="center"
          size="lg"
          weight="bold"
          titleTracking="tight"
          accentColor="cyan"
        />

        {/* Layered Stack Visualization */}
        <motion.div
          className="max-w-4xl mx-auto relative"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Central animated data flow line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Static line */}
            <div className="absolute inset-0 bg-linear-to-b from-cyan-500/50 via-purple-500/20 to-transparent" />

            {/* Animated pulse */}
            <motion.div
              className="absolute w-full h-16 bg-linear-to-b from-transparent via-cyan-400/60 to-transparent"
              animate={{
                y: ["-100%", "700%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Layers */}
          <div className="flex flex-col items-center gap-5">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className={cn("relative", layer.width)}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.12,
                      ease: EASE_PREMIUM,
                    },
                  },
                }}
              >
                {/* Layer card with perspective tilt on hover */}
                <motion.div
                  className={cn(
                    "relative px-5 py-4 rounded-xl border backdrop-blur-sm",
                    "bg-linear-to-r",
                    layer.color,
                    layer.borderColor,
                    "transform-gpu"
                  )}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 30px ${layer.glowColor}`,
                    transition: { duration: 0.25, ease: EASE_PREMIUM },
                  }}
                >
                  {/* Connection nodes */}
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full border border-white/40"
                      style={{ backgroundColor: layer.glowColor }}
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 hidden lg:block">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full border border-white/40"
                      style={{ backgroundColor: layer.glowColor }}
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Layer number - monospace */}
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-black/30 border border-white/10">
                        <MonoText size="sm" color="cyan" tracking="wide">
                          {String(index + 1).padStart(2, "0")}
                        </MonoText>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                        {layer.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 pl-12 sm:pl-0">
                      <p className="text-sm text-white/50">
                        {layer.description}
                      </p>
                      {/* Coverage metric shown on hover */}
                      {layer.metric && (
                        <MonoText
                          size="xs"
                          color="muted"
                          className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {layer.metric}
                        </MonoText>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Vertical connector between layers */}
                {index < layers.length - 1 && (
                  <motion.div
                    className="absolute left-1/2 -bottom-5 -translate-x-1/2 w-px h-5 overflow-hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { delay: index * 0.12 + 0.3 },
                      },
                    }}
                  >
                    {/* Dotted connection */}
                    <div className="w-full h-full border-l border-dashed border-white/20" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom annotation with monospace styling */}
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <MonoText size="sm" color="muted" className="italic">
              ↕ Each layer communicates seamlessly with adjacent layers
            </MonoText>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
