"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useCountUp } from "@/hooks/useCountUp";

// Lazy load Three.js components
const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((mod) => ({ default: mod.Scene3D })),
  { ssr: false }
);
const FlowingRibbons = dynamic(
  () => import("@/components/three/FlowingRibbons").then((mod) => ({ default: mod.FlowingRibbons })),
  { ssr: false }
);

// Counter component with animation
function AnimatedCounter({
  end,
  suffix = "",
  label,
  delay = 0,
}: {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { formattedValue, startAnimation } = useCountUp({
    end,
    suffix,
    duration: 2000,
    delay,
    easing: "easeOut",
  });

  useEffect(() => {
    if (isInView) {
      startAnimation();
    }
  }, [isInView, startAnimation]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {formattedValue}
      </div>
      <div className="text-sm sm:text-base text-gray-400 mt-2 font-medium tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Delay 3D loading for smoother initial page load
    const timer = setTimeout(() => setShow3D(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === NEBULA X STYLE BACKGROUND === */}

      {/* Base gradient: purple top to black bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-600/40 via-purple-900/60 to-black z-0" />

      {/* Additional purple glow at top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.5),transparent_60%)] z-0" />

      {/* Subtle noise/grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* === CURVED LIGHT ARC AT BOTTOM === */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] overflow-hidden z-0">
        {/* Main curved light sweep */}
        <div
          className="absolute bottom-[-40%] left-[-10%] w-[120%] h-[80%] rounded-[50%] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.15) 30%, transparent 70%)',
          }}
        />

        {/* Bright edge of the arc */}
        <div
          className="absolute bottom-[-42%] left-[-10%] w-[120%] h-[80%] rounded-[50%]"
          style={{
            background: 'transparent',
            boxShadow: 'inset 0 -2px 80px rgba(255,255,255,0.15), inset 0 -1px 20px rgba(167,139,250,0.4)',
          }}
        />

        {/* Subtle inner glow */}
        <div
          className="absolute bottom-[-38%] left-[-5%] w-[110%] h-[75%] rounded-[50%] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(167,139,250,0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* === FLOWING IRIDESCENT RIBBONS === */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {show3D && (
          <Scene3D cameraPosition={[0, 0, 6]} fov={75}>
            <FlowingRibbons />
          </Scene3D>
        )}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
          >
            <span className="block text-white">Building</span>
            <span className="block">
              <span className="italic bg-linear-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </span>
            <span className="block text-white">That Matter</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            We empower organizations with AI that turns complex challenges into real-world outcomes.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={buttonVariants} className="mt-8 sm:mt-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden"
            >
              {/* Button background with gradient */}
              <span className="absolute inset-0 bg-linear-to-r from-purple-600 via-purple-500 to-blue-600 transition-all duration-300 group-hover:scale-105" />

              {/* Glow effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-purple-400 via-purple-500 to-blue-500 blur-xl" />

              {/* Button content */}
              <span className="relative text-white font-semibold text-base sm:text-lg">
                Start Your Project
              </span>
              <span className="relative">
                <svg
                  className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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

          {/* Animated metrics */}
          <motion.div
            variants={itemVariants}
            className="mt-16 sm:mt-20 lg:mt-24"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto">
              <AnimatedCounter
                end={50}
                suffix="+"
                label="Projects Delivered"
                delay={0}
              />
              <AnimatedCounter
                end={100}
                suffix="%"
                label="Client Satisfaction"
                delay={200}
              />
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm sm:text-base text-gray-400 mt-2 font-medium tracking-wide">
                    Support Available
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
