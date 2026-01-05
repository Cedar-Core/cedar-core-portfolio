"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface EcosystemComponent {
  id: string;
  title: string;
  purpose: string;
  capabilities: string[];
  icon: React.ReactNode;
  accentColor: string;
}

const ecosystemComponents: EcosystemComponent[] = [
  {
    id: "frontend",
    title: "Frontend",
    purpose: "User-facing experiences that engage and convert",
    capabilities: [
      "Responsive web applications",
      "Native mobile experiences",
      "Progressive web apps (PWA)",
    ],
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
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    accentColor: "cyan",
  },
  {
    id: "backend",
    title: "Backend",
    purpose: "Robust systems that power your business logic",
    capabilities: [
      "RESTful & GraphQL APIs",
      "Secure authentication",
      "Business rule engines",
    ],
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
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
    accentColor: "blue",
  },
  {
    id: "data",
    title: "Data",
    purpose: "Structured storage and intelligent insights",
    capabilities: [
      "Scalable databases",
      "Real-time analytics",
      "Automated reporting",
    ],
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
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    accentColor: "indigo",
  },
  {
    id: "integrations",
    title: "Integrations",
    purpose: "Seamless connections to external services",
    capabilities: [
      "Payment processing",
      "CRM synchronization",
      "Third-party APIs",
    ],
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
    accentColor: "violet",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    purpose: "Reliable foundation that scales with demand",
    capabilities: [
      "Cloud hosting",
      "CDN & edge delivery",
      "Security hardening",
    ],
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
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    accentColor: "purple",
  },
  {
    id: "operations",
    title: "Operations",
    purpose: "Continuous improvement and monitoring",
    capabilities: [
      "Workflow automation",
      "Performance monitoring",
      "Maintenance & updates",
    ],
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    accentColor: "fuchsia",
  },
];

const ACCENT_COLORS = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  },
  fuchsia: {
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    text: "text-fuchsia-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
  },
} as const;

/**
 * EcosystemComponents — Detailed breakdown of each layer
 * Each card explains purpose and capabilities
 */
export function EcosystemComponents() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="components"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <SectionBackground showGrid showNoise showTopFade />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="Ecosystem Components"
          subtitle="Each layer is purpose-built, production-ready, and designed to integrate seamlessly."
          align="center"
          size="lg"
        />

        {/* Component Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {ecosystemComponents.map((component, index) => {
            const colors =
              ACCENT_COLORS[
                component.accentColor as keyof typeof ACCENT_COLORS
              ];

            return (
              <motion.div
                key={component.id}
                className={cn(
                  "group relative p-6 lg:p-8 rounded-2xl border backdrop-blur-sm",
                  "bg-white/2 border-white/10",
                  "hover:bg-white/4 hover:border-white/20",
                  "transition-all duration-500",
                  colors.glow
                )}
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
                {/* Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                    colors.bg,
                    colors.border,
                    "border"
                  )}
                >
                  <span className={colors.text}>{component.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {component.title}
                </h3>

                {/* Purpose */}
                <p className="text-blue-200/50 text-sm mb-5 leading-relaxed">
                  {component.purpose}
                </p>

                {/* Capabilities */}
                <ul className="space-y-2.5">
                  {component.capabilities.map((capability, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className={cn("w-4 h-4 mt-0.5 shrink-0", colors.text)}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white/70">{capability}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
