"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, fadeSlideUp, EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Layer {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
  width: string;
}

const layers: Layer[] = [
  {
    id: "frontend",
    name: "Frontend Experiences",
    description: "Websites • Web Apps • Mobile Apps",
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/30",
    width: "w-full",
  },
  {
    id: "backend",
    name: "Backend Systems",
    description: "APIs • Authentication • Business Logic",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    width: "w-[92%]",
  },
  {
    id: "data",
    name: "Data Layer",
    description: "Databases • Analytics • Reporting",
    color: "from-indigo-500/20 to-indigo-500/5",
    borderColor: "border-indigo-500/30",
    width: "w-[84%]",
  },
  {
    id: "integrations",
    name: "Integrations",
    description: "Payments • CRMs • Third-party Services",
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/30",
    width: "w-[76%]",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Hosting • Storage • Security • Scalability",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    width: "w-[68%]",
  },
  {
    id: "operations",
    name: "Operations",
    description: "Automation • Monitoring • Maintenance",
    color: "from-fuchsia-500/20 to-fuchsia-500/5",
    borderColor: "border-fuchsia-500/30",
    width: "w-[60%]",
  },
];

/**
 * EcosystemLayers — Visual layered architecture diagram
 * Shows the connected stack from Frontend down to Operations
 */
export function EcosystemLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="layers"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <SectionBackground
        showGrid
        showNoise
        showTopBorder
        topBorderColor="cyan"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="Architecture Layers"
          subtitle="Every layer connects. Every system communicates. One unified ecosystem."
          align="center"
          size="lg"
        />

        {/* Layered Stack Visualization */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Connection line */}
          <div className="absolute left-1/2 top-70 bottom-32 w-px bg-linear-to-b from-cyan-500/50 via-blue-500/30 to-transparent hidden lg:block" />

          {/* Layers */}
          <div className="flex flex-col items-center gap-4">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className={cn("relative", layer.width)}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: EASE_SMOOTH,
                    },
                  },
                }}
              >
                {/* Layer card */}
                <div
                  className={cn(
                    "relative px-6 py-5 rounded-2xl border backdrop-blur-sm",
                    "bg-linear-to-r",
                    layer.color,
                    layer.borderColor,
                    "hover:scale-[1.02] transition-transform duration-300"
                  )}
                >
                  {/* Connection dots on sides */}
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/20 border border-white/30 hidden lg:block" />
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/20 border border-white/30 hidden lg:block" />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Layer number */}
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white/60 text-sm font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {layer.name}
                      </h3>
                    </div>
                    <p className="text-sm text-white/50 sm:text-right pl-11 sm:pl-0">
                      {layer.description}
                    </p>
                  </div>
                </div>

                {/* Vertical connector between layers */}
                {index < layers.length - 1 && (
                  <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-px h-4 bg-linear-to-b from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom annotation */}
          <motion.div className="mt-12 text-center" variants={fadeSlideUp}>
            <p className="text-blue-200/40 text-sm font-light italic">
              Each layer is designed to communicate seamlessly with the others
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
