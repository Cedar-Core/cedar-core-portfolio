"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function ContactHero() {
  return (
    <div className="text-center lg:text-left mb-12 lg:mb-0">
      {/* Tagline */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[11px] font-semibold text-cyan-100/90 tracking-[0.2em] uppercase">
            Get in touch
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tighter mb-6 text-white"
      >
        <span className="block">Let&apos;s build your</span>
        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-200 via-white to-cyan-200 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          next system.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg text-blue-100/60 max-w-md leading-relaxed font-light"
      >
        Cedar Core engineers scalable websites, apps, e-commerce platforms, and
        business systems designed to power growth and stand the test of time.
      </motion.p>
    </div>
  );
}
