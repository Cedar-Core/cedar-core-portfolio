"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* === BACKGROUND LAYERS (Matched to Hero) === */}

      {/* 1. Base Gradient - Pure Black */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#000000_0%,#000000_80%)] z-[-2]" />

      {/* 2. Top Center Glow - Very Soft Cool Blue */}
      <div className="absolute inset-x-0 top-[-10%] h-125 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)] z-0 pointer-events-none" />

      {/* 3. Bottom Accent Glow */}
      <div className="absolute inset-x-0 bottom-0 h-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(6,182,212,0.08),transparent_60%)] z-0 pointer-events-none" />

      {/* 4. Cinematic Noise & Scanlines Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* === SUBTLE VERTICAL GRID === */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none select-none opacity-40">
        <div className="w-full max-w-7xl grid grid-cols-6 h-full px-6 lg:px-12">
          <div
            className="border-r border-white/3 h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          />
          <div
            className="border-r border-white/3 h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          />
          <div
            className="border-r border-white/3 h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          />
          <div
            className="border-r border-white/3 h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          />
          <div
            className="border-r border-white/3 h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          />
          <div
            className="border-r border-white/3 h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          />
        </div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* === MAIN CONTENT === */}
      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Hero + Contact Info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ContactHero />
            <ContactInfo />
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7 xl:col-span-8 lg:pl-8">
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
