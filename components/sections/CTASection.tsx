"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function CTASection() {
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

    // Set initial time
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* === BACKGROUND LAYERS (Matched to Hero) === */}
      {/* 1. Base - Deep Navy/Blue Void */}
      <div className="absolute inset-0 bg-[#05070B] z-[-2]" />

      {/* 2. Cinematic Noise Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* 3. Subtle Vertical Grid Lines */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none select-none opacity-40">
        <div className="w-full max-w-7xl grid grid-cols-6 h-full px-6 lg:px-12">
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
        </div>
      </div>


      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Statement */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 sm:mb-12 max-w-5xl mx-auto"
        >
          <span className="block">We turn bold ideas into</span>
          <span className="block mt-2 sm:mt-4">
            <span className="tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em]">
              powerful digital realities
            </span>
          </span>
        </motion.h2>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
          <a
            href="#contact-form"
            className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-12 sm:py-5 rounded-full overflow-hidden"
          >
            {/* Button background with gradient */}
            <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 transition-all duration-300 group-hover:scale-105" />

            {/* Glow effect on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 blur-xl" />

            {/* Button content */}
            <span className="relative text-white font-semibold text-lg sm:text-xl">
              Let's work together
            </span>
            <span className="relative">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12"
        >
          {/* Email */}
          <a
            href="mailto:atom@antimatterai.com"
            className="group text-lg sm:text-xl font-medium text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>atom@antimatterai.com</span>
          </a>

          {/* Divider (hidden on mobile) */}
          <div className="hidden sm:block w-px h-6 bg-gray-700" />

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/antimatter-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Visit our LinkedIn profile"
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-sm sm:text-base">LinkedIn</span>
          </a>
        </motion.div>

        {/* Location and Clock */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-500"
        >
          {/* Location */}
          <div className="text-sm sm:text-base font-light italic">
            Based in Atlanta, GA – Serving clients globally
          </div>

          {/* Divider (hidden on mobile) */}
          <div className="hidden sm:block w-px h-4 bg-gray-700" />

          {/* Live Clock */}
          <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-400">{currentTime}</span>
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#05070B] to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}

