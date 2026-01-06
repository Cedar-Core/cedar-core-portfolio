"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ValueProp {
  id: string;
  title: string;
  description: string;
  metric?: string;
  icon: React.ReactNode;
}

const valueProps: ValueProp[] = [
  {
    id: "iteration",
    title: "Faster Iteration",
    description:
      "Modular architecture means changes propagate cleanly. Update one component without rebuilding everything.",
    metric: "10x",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "rebuilds",
    title: "Fewer Rebuilds",
    description:
      "Built for evolution, not replacement. Your ecosystem grows with your business instead of hitting dead ends.",
    metric: "Zero",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "expansion",
    title: "Easier Expansion",
    description:
      "New features, markets, and integrations plug into existing infrastructure without architectural rewrites.",
    metric: "Days",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    id: "stability",
    title: "Long-term Stability",
    description:
      "Proper foundations, monitoring, and maintenance. Systems that run reliably for years, not months.",
    metric: "99.9%",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

/**
 * EcosystemValue — Why ecosystems scale better than isolated projects
 * Value-focused section with calm confidence, no hype
 */
export function EcosystemValue() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="value"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <SectionBackground showGrid showNoise showTopFade />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="Why Ecosystems Scale"
          subtitle="The difference between building features and building systems."
          align="center"
          size="lg"
        />

        {/* Value Props Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.id}
              className={cn(
                "group relative p-8 lg:p-10 rounded-2xl",
                "bg-linear-to-br from-white/4 to-white/1",
                "border border-white/10",
                "hover:border-white/20 hover:from-white/6 hover:to-white/2",
                "transition-all duration-500"
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
              {/* Metric badge */}
              {prop.metric && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-sm font-semibold text-cyan-400">
                    {prop.metric}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <span className="text-blue-400">{prop.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                {prop.title}
              </h3>

              {/* Description */}
              <p className="text-blue-200/50 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 lg:mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-lg text-white/60 leading-relaxed">
            This is the difference between hiring developers and partnering with
            system architects. We think in{" "}
            <span className="text-white font-medium">decades</span>, not
            deadlines.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
