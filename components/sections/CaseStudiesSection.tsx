"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MotionDiv } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

interface CaseStudy {
  id: string;
  number: string;
  title: string;
  tags: string[];
  image: string;
  color: string;
  href: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "clinix-ai",
    number: "01",
    title: "Clinix AI",
    tags: ["Web Design", "App Design", "AI Development", "GTM"],
    image: "/images/case-studies/clinix-ai.jpg",
    color: "from-blue-600/80 to-cyan-600/80",
    href: "#clinix-ai",
  },
  {
    id: "synergies4",
    number: "02",
    title: "Synergies4",
    tags: ["App Design", "AI Development"],
    image: "/images/case-studies/synergies4.jpg",
    color: "from-cyan-600/80 to-teal-600/80",
    href: "#synergies4",
  },
  {
    id: "curehire",
    number: "03",
    title: "Curehire",
    tags: ["Web Design", "Development"],
    image: "/images/case-studies/do.jpg",
    color: "from-indigo-600/80 to-blue-600/80",
    href: "#curehire",
  },
  {
    id: "owasp",
    number: "04",
    title: "OWASP Foundation",
    tags: ["Web Design", "Development"],
    image: "/images/case-studies/owasp.jpg",
    color: "from-blue-500/80 to-violet-600/80",
    href: "#owasp",
  },
  {
    id: "feature",
    number: "05",
    title: "Feature",
    tags: ["App Design", "GTM"],
    image: "/images/case-studies/feature.jpg",
    color: "from-violet-600/80 to-fuchsia-600/80",
    href: "#feature",
  },
];

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={study.href}
      className="group relative shrink-0 w-[340px] sm:w-[400px] lg:w-[460px] h-[580px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-sm"
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={{ y: -12, transition: { duration: 0.4, ease: "easeOut" } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br opacity-60 transition-all duration-700 ease-out",
          study.color,
          isHovered ? "opacity-90 scale-110" : "opacity-60 scale-100"
        )}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[32px_32px]" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 sm:p-10">
        {/* Top section - Number */}
        <div className="flex justify-between items-start">
          <span className="text-6xl sm:text-7xl font-bold text-white/5 font-mono group-hover:text-white/10 transition-colors duration-500">
            {study.number}
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-black/20"
          >
            <svg
              className="w-6 h-6 text-white"
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
          </motion.div>
        </div>

        {/* Bottom section - Title and Tags */}
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300 leading-tight">
            {study.title}
          </h3>

          <div className="flex flex-wrap gap-3">
            {study.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-xs sm:text-sm font-medium text-white/70 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered
            ? "0 0 80px rgba(45, 124, 255, 0.3), inset 0 0 80px rgba(43, 231, 255, 0.1)"
            : "0 0 0px rgba(45, 124, 255, 0)",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  );
}

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 460;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* === BACKGROUND LAYERS (Matched to Hero) === */}
      {/* 1. Base - Deep Navy/Blue Void (No top spotlight to ensure seamless transition) */}
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

      {/* 4. Top Fade (Seamless transition) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#05070B] via-[#05070B]/80 to-transparent z-[-1]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tighter text-white mb-6 font-(family-name:var(--font-geist-sans))">
            Case Studies
          </h2>
          <p className="text-xl sm:text-2xl text-blue-200/60 leading-relaxed font-light">
            Proven results, measurable impact—explore the transformations we've delivered.
          </p>
        </motion.div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          <div className="hidden lg:block">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
                  aria-label="Scroll left"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
                  aria-label="Scroll right"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform"
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
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#05070B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#05070B] to-transparent z-10 pointer-events-none" />

          {/* Scrollable container */}
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-8 lg:px-16 py-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {caseStudies.map((study, index) => (
              <div key={study.id} className="snap-start">
                <CaseStudyCard study={study} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator for mobile */}
        <motion.div
          className="flex justify-center mt-12 lg:hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg
              className="w-4 h-4 animate-pulse"
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
            <span>Swipe to explore</span>
          </div>
        </motion.div>

        {/* View all link */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="#all-work"
            className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-lg"
          >
            <span className="font-medium">View all case studies</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          </a>
        </motion.div>
      </div>
    </section>
  );
}
