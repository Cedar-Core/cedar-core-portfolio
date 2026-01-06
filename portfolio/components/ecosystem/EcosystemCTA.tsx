"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";

/**
 * EcosystemCTA — Final call to action
 * Reuses existing CTA patterns from the codebase
 */
export function EcosystemCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <SectionBackground
        showGrid
        showNoise
        showTopBorder
        topBorderColor="cyan"
        glowPosition="bottom"
      />

      {/* Additional radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(45,124,255,0.08),transparent_60%)] pointer-events-none" />

      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Pre-heading */}
          <motion.div variants={fadeSlideUp} className="mb-6">
            <span className="text-sm text-cyan-400/80 font-medium tracking-wide uppercase">
              Ready to start?
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            variants={fadeSlideUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
          >
            <span className="block">Build your ecosystem</span>
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            variants={fadeSlideUp}
            className="text-xl text-blue-200/60 leading-relaxed mb-12 max-w-xl mx-auto"
          >
            Let&apos;s discuss your vision and architect a connected digital
            system that scales with your ambition.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden"
            >
              {/* Button background with gradient */}
              <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 transition-all duration-300 group-hover:scale-105" />

              {/* Glow effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 blur-xl" />

              <span className="relative text-white font-semibold text-lg">
                Start the conversation
              </span>
              <svg
                className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-4 text-white/60 hover:text-white transition-colors font-medium group"
            >
              <span>Back to home</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeSlideUp}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
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
                <span>No commitment consultation</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
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
                <span>Response within 24 hours</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
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
                <span>Technical team available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
