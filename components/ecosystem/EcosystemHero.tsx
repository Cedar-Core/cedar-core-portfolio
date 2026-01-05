"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SectionBackgroundV2 } from "@/components/shared/SectionBackgroundV2";
import { MonoLabel } from "@/components/shared/MonoText";
import { GhostButton } from "@/components/shared/GhostButton";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";

/**
 * EcosystemHero — Systems-focused headline section
 * Establishes the page as a technical architecture overview, not marketing
 */
export function EcosystemHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background layers - Dramatic variant for Hero */}
      <SectionBackgroundV2
        variant="dramatic"
        showGrid={true}
        gridOpacity="normal"
        showNoise={true}
        glowPosition="top"
      />

      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow / Capsule */}
          <motion.div
            variants={fadeSlideUp}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/3 border border-white/8 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <MonoLabel
                variant="default"
                className="text-cyan-100/90 tracking-wider font-semibold text-xs sm:text-sm"
              >
                SYSTEMS ARCHITECTURE
              </MonoLabel>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeSlideUp}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8"
          >
            <span className="block">One ecosystem.</span>
            <span className="block mt-2 bg-linear-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Every system connected.
            </span>
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p
            variants={fadeSlideUp}
            className="text-xl sm:text-2xl text-blue-100/60 leading-relaxed font-light max-w-2xl mx-auto mb-12"
          >
            We don&apos;t build isolated projects. We architect connected
            digital systems that scale with your business—frontend to
            infrastructure, data to automation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 transition-all duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 blur-xl" />
              <span className="relative text-white font-semibold text-lg">
                Build your ecosystem
              </span>
              <span className="relative">
                <svg
                  className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>

            {/* Secondary CTA - Text Link */}
            <Link
              href="#layers"
              className="inline-flex items-center gap-2 px-6 py-4 text-white/70 hover:text-white transition-colors font-medium"
            >
              <span>See the architecture</span>
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
