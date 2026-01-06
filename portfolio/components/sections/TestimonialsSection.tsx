"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { SectionHeading } from "@/components/shared/SectionHeading";

import { TestimonialDTO } from "@/lib/db/queries";

interface TestimonialSectionProps {
  items: TestimonialDTO[];
}



const AUTOPLAY_DELAY = 8500;
const RESUME_DELAY = 10000;

export function TestimonialsSection({ items }: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReducedMotion = useReducedMotion();

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const stopAutoPlayTemporarily = useCallback(() => {
    setIsAutoPlaying(false);

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, RESUME_DELAY);
  }, []);

  // Auto-rotate (only when visible + autoplay enabled + not reduced motion)
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (!isInView) return;
    if (prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isAutoPlaying, isInView, prefersReducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);
      stopAutoPlayTemporarily();
    },
    [stopAutoPlayTemporarily]
  );

  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % items.length);
  }, [activeIndex, goToSlide, items.length]);

  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, goToSlide, items.length]);

  // Pause autoplay on hover/focus so users can read
  const pause = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [prefersReducedMotion]);

  const resume = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsAutoPlaying(true);
  }, [prefersReducedMotion]);

  const cardMotion = prefersReducedMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    }
    : {
      // Premium feel: subtle vertical drift + slight blur, no "pop" scale
      initial: { opacity: 0, y: 18, filter: "blur(2px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -18, filter: "blur(2px)" },
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      {/* Unified background from shared component */}
      <SectionBackground
        showGrid
        showNoise
        showTopBorder
        topBorderColor="cyan"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unified heading from shared component */}
        <SectionHeading
          title="What our clients say about us"
          align="center"
          size="lg"
        />

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={resume}
        >
          {/* Testimonial Cards */}
          <div className="relative h-100 sm:h-112.5 lg:h-125">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={cardMotion.initial as any}
                animate={cardMotion.animate as any}
                exit={cardMotion.exit as any}
                transition={cardMotion.transition as any}
                className="absolute inset-0 flex items-center justify-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${activeIndex + 1} of ${items.length
                  }`}
              >
                <div className="w-full max-w-3xl mx-auto px-4">
                  <div className="relative bg-white/3 backdrop-blur-md rounded-2xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
                    {/* Decorative quotation mark */}
                    <div className="absolute top-6 left-6 sm:top-8 sm:left-8 text-6xl sm:text-7xl lg:text-8xl text-cyan-500/20 font-serif leading-none">
                      "
                    </div>

                    {/* Quote text */}
                    <blockquote className="relative z-10 text-xl sm:text-2xl lg:text-3xl text-blue-100/90 italic leading-relaxed mb-8 sm:mb-10">
                      {items[activeIndex].quote}
                    </blockquote>

                    {/* Author info */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-800/50">
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-white mb-1">
                          {items[activeIndex].author}
                        </div>
                        <div className="text-sm sm:text-base text-blue-200/60">
                          {items[activeIndex].company ?? ""}
                        </div>
                      </div>

                      {/* Decorative element */}
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-px bg-linear-to-r from-cyan-500 to-transparent" />
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">
            <button
              onClick={prevSlide}
              className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-0.5 transition-transform"
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
            </button>

            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "transition-all duration-500 ease-out rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50",
                    index === activeIndex
                      ? "w-10 h-2 bg-cyan-500"
                      : "w-2 h-2 bg-blue-900/40 hover:bg-blue-800/60"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform"
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
            </button>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 flex justify-center" aria-hidden="true">
            <div className="flex gap-1">
              {items.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-700",
                    index === activeIndex
                      ? "w-8 bg-cyan-500"
                      : "w-1 bg-gray-700"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Alternative: Grid layout for desktop (optional) */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {items.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="group bg-white/3 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:bg-white/5"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.55 },
                },
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -5, transition: { duration: 0.2 } }
              }
            >
              <div className="text-4xl text-cyan-500/20 font-serif leading-none mb-4 group-hover:text-cyan-500/40 transition-colors">
                &quot;
              </div>
              <blockquote className="text-lg text-blue-100/80 italic leading-relaxed mb-6">
                {testimonial.quote}
              </blockquote>
              <div>
                <div className="font-bold text-white mb-1">
                  {testimonial.author}
                </div>
                <div className="text-sm text-blue-200/60">
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
