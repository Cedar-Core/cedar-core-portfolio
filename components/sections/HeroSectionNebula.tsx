"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useCountUp } from "@/hooks/useCountUp";
import { NeonBeam } from "@/components/effects/NeonBeam";

// Lazy load Three.js components
const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((mod) => ({ default: mod.Scene3D })),
  { ssr: false }
);
const HeroRing = dynamic(
  () => import("@/components/three/HeroRing").then((mod) => ({ default: mod.HeroRing })),
  { ssr: false }
);

// Animated counter component
function AnimatedStat({
  end,
  suffix = "",
  label,
  delay = 0,
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { formattedValue, startAnimation } = useCountUp({
    end,
    suffix,
    duration: 2000,
    delay,
    decimals,
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
      className="text-right"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="text-3xl lg:text-4xl font-bold text-white">
        {formattedValue}
      </div>
      <div className="text-xs text-cyan-200/60 mt-1 font-medium tracking-wide leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export function HeroSectionNebula() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Delay 3D loading for smoother initial page load
    const timer = setTimeout(() => setShow3D(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Slightly more travel distance for weight
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as any, // Custom "Quart" ease for premium feel
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* === BACKGROUND LAYERS === */}

      {/* 0. Neon Beam - Deepest Layer */}
      {/* 0. Neon Beam - Layered above base, below text */}
      <NeonBeam />

      {/* 1. Base Gradient - Pure Black */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#000000_0%,#000000_80%)] z-[-2]" />

      {/* 2. Top Center Glow - Very Soft Cool Blue */}
      <div className="absolute inset-x-0 top-[-10%] h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)] z-0 pointer-events-none" />

      {/* 3. Central 3D Backdrop Glow - Blue Depth */}
      {/* 3. Central 3D Backdrop - Pure Black for separation */}
      <div className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(0,0,0,0.4)_0%,transparent_70%)] blur-3xl z-0 pointer-events-none mix-blend-multiply" />

      {/* 4. Cinematic Noise & Scanlines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.1) 50%)',
          backgroundSize: '100% 4px'
        }} />

      {/* === SUBTLE VERTICAL GRID === */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none select-none opacity-60">
        <div className="w-full max-w-7xl grid grid-cols-6 h-full px-6 lg:px-12">
          {/* Extremely subtle borders with fade masks */}
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
          <div className="border-r border-white/3 h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
        </div>
      </div>

      {/* === HORIZON ARC (Preserved but Blue) === */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] overflow-hidden z-0 pointer-events-none">
        <div
          className="absolute bottom-[-60%] left-[-10%] w-[120%] h-full rounded-[50%] opacity-40 blur-xl"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[-62%] left-[-10%] w-[120%] h-full rounded-[50%] opacity-30"
          style={{
            boxShadow: 'inset 0 1px 40px rgba(147,197,253,0.1)',
          }}
        />
      </div>

      {/* === 3D RING === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pushed further right and constrained */}
        {/* Position: Visually centered, anchored right to balance text. Larger scale needed offset. */}
        <div className="absolute right-[-5%] lg:right-[22%] top-1/2 -translate-y-[50%] w-full lg:w-[50%] h-[75%] opacity-100 mix-blend-normal">
          {show3D && (
            <Scene3D cameraPosition={[0, 0, 6]} fov={30}>
              <HeroRing />
            </Scene3D>
          )}
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[calc(100vh-5rem)] items-center">

          {/* Left Column - Text Content (Spans 7 columns) */}
          <motion.div
            className="lg:col-span-7 pt-20 lg:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-blue-100/90 tracking-[0.2em] uppercase">
                  Backbone of the decentralized web
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tighter mb-8 font-(family-name:var(--font-geist-sans)) text-white"
            >
              <span className="block">Build</span>
              <span className="block">beyond</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-200 via-white to-blue-200 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                the cloud
              </span>
            </motion.h1>

            {/* Description */}
            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-blue-100/60 mb-10 max-w-2xl leading-relaxed font-light"
            >
              &quot;Cedar Core&quot; builds the digital backbone for modern businesses. We engineer scalable systems and production-grade software designed to power growth and stand the test of time.
            </motion.p>

            {/* Discover Link - Minimal */}
            <motion.div variants={itemVariants}>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white transition-colors tracking-widest uppercase group"
              >
                <span>Discover how it works</span>
                <svg
                  className="w-3 h-3 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Spacer Column */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column - Stats & CTA (Spans 3 columns) */}
          <motion.div
            className="lg:col-span-3 hidden lg:flex flex-col justify-center h-full py-20 relative border-l border-white/5 pl-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stats List - Vertical Rhythm */}
            <motion.div variants={itemVariants} className="flex flex-col gap-16 mb-24">
              <div className="group cursor-default transition-transform hover:-translate-y-1 duration-300">
                <div className="text-5xl font-light text-white mb-2 tracking-tight group-hover:text-blue-200 transition-colors group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">200+</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium group-hover:text-blue-100/50 transition-colors">active integrations</div>
              </div>
              <div className="group cursor-default transition-transform hover:-translate-y-1 duration-300">
                <div className="text-5xl font-light text-white mb-2 tracking-tight group-hover:text-blue-200 transition-colors group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">500K+</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium group-hover:text-blue-100/50 transition-colors">contracts deployed</div>
              </div>
              <div className="group cursor-default transition-transform hover:-translate-y-1 duration-300">
                <div className="text-5xl font-light text-white mb-2 tracking-tight group-hover:text-blue-200 transition-colors group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">1.2M+</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium group-hover:text-blue-100/50 transition-colors">nodes connected</div>
              </div>
            </motion.div>

            {/* Quote & Button */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-8">
              <p className="text-xs text-white/40 leading-relaxed font-light italic border-l-2 border-blue-500/20 pl-4">
                Redefining identity in Web3. Secure, scalable, transparent.
              </p>

              <a
                href="#ecosystem"
                className="group w-full flex items-center justify-between px-6 py-4 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 backdrop-blur-md transition-all duration-300"
              >
                <span className="text-sm font-medium text-white/90">Explore ecosystem</span>
                <div className="w-8 h-8 rounded-full bg-blue-600/20 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                  <svg
                    className="w-3.5 h-3.5 text-blue-300 group-hover:text-white -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section >
  );
}

