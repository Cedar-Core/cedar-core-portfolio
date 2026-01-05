"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FlowStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const flowSteps: FlowStep[] = [
  {
    id: "user",
    label: "User",
    description: "Interacts with your product",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "app",
    label: "App",
    description: "Delivers the experience",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "api",
    label: "API",
    description: "Processes requests",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "data",
    label: "Data",
    description: "Stores and retrieves",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
        />
      </svg>
    ),
  },
  {
    id: "automation",
    label: "Automation",
    description: "Triggers workflows",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    id: "growth",
    label: "Growth",
    description: "Drives optimization",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
];

/**
 * EcosystemFlow — Visual representation of how data flows through the system
 * Shows the connected journey from User to Growth
 */
export function EcosystemFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <SectionBackground
        showGrid
        showNoise
        showTopBorder
        topBorderColor="blue"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="How It All Connects"
          subtitle="From user interaction to business growth—a seamless flow through every layer."
          align="center"
          size="lg"
        />

        {/* Flow Diagram */}
        <motion.div
          className="max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Desktop: Horizontal Flow */}
          <div className="hidden lg:block">
            <div className="relative flex items-center justify-between">
              {/* Connection line */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-linear-to-r from-cyan-500/50 via-blue-500/30 to-purple-500/50 -translate-y-1/2" />

              {/* Animated pulse along the line */}
              <motion.div
                className="absolute top-1/2 left-[10%] w-4 h-4 rounded-full bg-cyan-400 -translate-y-1/2 blur-sm"
                animate={{
                  left: ["10%", "90%"],
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.15,
                        ease: EASE_SMOOTH,
                      },
                    },
                  }}
                >
                  {/* Node */}
                  <div
                    className={cn(
                      "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center",
                      "bg-linear-to-br from-white/10 to-white/5",
                      "border border-white/20",
                      "backdrop-blur-sm",
                      "hover:border-cyan-500/50 hover:from-cyan-500/20 hover:to-cyan-500/5",
                      "transition-all duration-300"
                    )}
                  >
                    <span className="text-white/80">{step.icon}</span>
                  </div>

                  {/* Label */}
                  <div className="mt-4 text-center">
                    <div className="text-sm font-semibold text-white mb-1">
                      {step.label}
                    </div>
                    <div className="text-xs text-white/40 max-w-25">
                      {step.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Flow */}
          <div className="lg:hidden">
            <div className="relative flex flex-col items-center gap-4">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative w-full max-w-xs"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: EASE_SMOOTH,
                      },
                    },
                  }}
                >
                  {/* Connection line */}
                  {index < flowSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-px h-8 bg-linear-to-b from-white/30 to-transparent" />
                  )}

                  {/* Card */}
                  <div
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "hover:bg-white/8 transition-colors"
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        "bg-linear-to-br from-white/10 to-white/5",
                        "border border-white/20"
                      )}
                    >
                      <span className="text-white/80">{step.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {step.label}
                      </div>
                      <div className="text-xs text-white/40">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom annotation */}
          <motion.div
            className="mt-16 text-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.8 } },
            }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/60">
                Continuous feedback loop — every interaction improves the system
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
