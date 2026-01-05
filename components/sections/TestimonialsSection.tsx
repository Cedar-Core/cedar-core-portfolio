"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionDiv } from "@/components/ui/motion";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: "jay-w",
    quote:
      "The Antimatter team worked with me to build my e-commerce site. Within 90 days of launch, our store was exceeding $100k in monthly revenue.",
    author: "Jay W.",
    company: "Rakanda Gold Coffee",
  },
  {
    id: "jon-h",
    quote:
      "We worked with Antimatter to redesign our marketing site and SaaS platform, increasing both customer acquisition and retention.",
    author: "Jon H.",
    company: "Keyspace Studio",
  },
  {
    id: "mike-r",
    quote:
      "We wanted to build a new radiology staffing platform; with Antimatter we were able to design and launch a working MVP in under a month.",
    author: "Mike R.",
    company: "RT Direct",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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

      {/* Decorative top border - Enhanced */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="block">What our clients</span>
            <span className="block">say about us</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full max-w-3xl mx-auto px-4">
                  <div className="relative bg-linear-to-br from-blue-950/30 to-[#0a0f1e]/80 rounded-2xl p-8 sm:p-12 lg:p-16 border border-blue-500/10 backdrop-blur-md shadow-2xl shadow-blue-900/10">
                    {/* Decorative quotation mark */}
                    <div className="absolute top-6 left-6 sm:top-8 sm:left-8 text-6xl sm:text-7xl lg:text-8xl text-cyan-500/20 font-serif leading-none">
                      "
                    </div>

                    {/* Quote text */}
                    <blockquote className="relative z-10 text-xl sm:text-2xl lg:text-3xl text-blue-100/90 italic leading-relaxed mb-8 sm:mb-10">
                      {testimonials[activeIndex].quote}
                    </blockquote>

                    {/* Author info */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-800/50">
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-white mb-1">
                          {testimonials[activeIndex].author}
                        </div>
                        <div className="text-sm sm:text-base text-blue-200/60">
                          {testimonials[activeIndex].company}
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
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    index === activeIndex
                      ? "w-10 h-2 bg-cyan-500"
                      : "w-2 h-2 bg-blue-900/40 hover:bg-blue-800/60"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                </button>
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
          <div className="mt-6 flex justify-center">
            <div className="flex gap-1">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    index === activeIndex
                      ? "w-8 bg-cyan-500"
                      : "w-1 bg-gray-700"
                  )}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternative: Grid layout for desktop (optional) */}
        <MotionDiv
          className="hidden lg:grid lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group bg-linear-to-br from-blue-950/20 to-[#0a0f1e]/80 rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all hover:bg-white/5"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl text-cyan-500/20 font-serif leading-none mb-4 group-hover:text-cyan-500/40 transition-colors">
                "
              </div>
              <blockquote className="text-lg text-blue-100/80 italic leading-relaxed mb-6">
                {testimonial.quote}
              </blockquote>
              <div>
                <div className="font-bold text-white mb-1">{testimonial.author}</div>
                <div className="text-sm text-blue-200/60">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}

