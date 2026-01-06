"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionBackgroundV2 } from "@/components/shared/SectionBackgroundV2";
import { MonoText } from "@/components/shared/MonoText";
import { GhostButton } from "@/components/shared/GhostButton";
import { staggerContainer, fadeSlideUp, EASE_PREMIUM } from "@/lib/animations";

/**
 * CTASectionV2 — Enhanced CTA with warm background and proper button hierarchy
 * Primary CTA: Gradient button
 * Secondary CTA: Ghost button
 */
export function CTASectionV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentTime, setCurrentTime] = useState("--:--:--");

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Warm background for final section */}
      <SectionBackgroundV2
        variant="warm"
        showGrid={false}
        showNoise={true}
        showTopBorder={true}
        topBorderColor="purple"
        glowPosition="both"
      />

      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeSlideUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <MonoText size="xs" color="muted" tracking="wider">
              AVAILABLE FOR NEW PROJECTS
            </MonoText>
          </span>
        </motion.div>

        {/* Main Statement - Enhanced typography */}
        <motion.h2
          variants={fadeSlideUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 sm:mb-8 max-w-5xl mx-auto tracking-tight"
        >
          <span className="block">We turn bold ideas into</span>
          <span className="block mt-2 sm:mt-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-blue-200 to-cyan-200">
              powerful digital realities
            </span>
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeSlideUp}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 sm:mb-12 font-light"
        >
          Ready to build something exceptional? Let's discuss your vision.
        </motion.p>

        {/* CTA Buttons with proper hierarchy */}
        <motion.div
          variants={fadeSlideUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-14 sm:mb-16"
        >
          {/* Primary CTA - Full gradient */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 transition-all duration-300 group-hover:scale-105" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 blur-xl" />
            <span className="relative text-white font-semibold text-base sm:text-lg">
              Start a conversation
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

          {/* Secondary CTA - Ghost button */}
          <GhostButton
            href="/ecosystem"
            variant="default"
            size="lg"
            iconRight={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          >
            Explore our ecosystem
          </GhostButton>
        </motion.div>

        {/* Contact Information - Cleaner layout */}
        <motion.div
          variants={fadeSlideUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10"
        >
          {/* Email */}
          <a
            href="mailto:hello@cedarcore.dev"
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-sm sm:text-base">hello@cedarcore.dev</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/cedar-core"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base">LinkedIn</span>
          </a>
        </motion.div>

        {/* Location and Clock - Monospace styling */}
        <motion.div
          variants={fadeSlideUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-2 text-white/40">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm font-light">
              Atlanta, GA — Serving globally
            </span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-white/10" />

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <MonoText size="sm" color="muted">
              {currentTime}
            </MonoText>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
