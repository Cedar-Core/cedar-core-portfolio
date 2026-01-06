"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialSlider({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 6000,
  className,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-6 max-w-3xl mx-auto">
            "{testimonials[currentIndex].quote}"
          </blockquote>
          <div className="flex flex-col items-center gap-2">
            <cite className="text-base font-semibold text-foreground not-italic">
              {testimonials[currentIndex].author}
            </cite>
            <p className="text-sm text-muted-foreground">
              {testimonials[currentIndex].role && `${testimonials[currentIndex].role}, `}
              {testimonials[currentIndex].company}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index
                ? "bg-accent w-8"
                : "bg-muted hover:bg-muted-foreground"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

