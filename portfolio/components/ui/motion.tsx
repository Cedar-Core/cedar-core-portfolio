"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { forwardRef } from "react";

// Animation presets
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }
  },
};

export const hoverCard: Variants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Default transition
const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
};

// Preset mapping
const presetMap: Record<string, Variants> = {
  fadeIn,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleIn,
  textReveal,
  imageReveal,
  staggerContainer,
  fadeInScale,
};

// Motion component wrappers
export const MotionDiv = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    variant?: Variants;
    preset?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleIn" | "textReveal" | "imageReveal" | "staggerContainer" | "fadeInScale";
  }
>(({ variant, preset, initial = "hidden", animate = "visible", transition = defaultTransition, ...props }, ref) => {
  const animationVariant = variant || (preset ? presetMap[preset] : fadeIn);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      variants={animationVariant}
      transition={transition}
      {...props}
    />
  );
});

MotionDiv.displayName = "MotionDiv";

export const MotionSection = forwardRef<
  HTMLElement,
  HTMLMotionProps<"section"> & {
    variant?: Variants;
    preset?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleIn" | "textReveal" | "imageReveal";
  }
>(({ variant, preset, initial = "hidden", animate = "visible", transition = defaultTransition, ...props }, ref) => {
  const animationVariant = variant || (preset ? presetMap[preset] : fadeIn);

  return (
    <motion.section
      ref={ref}
      initial={initial}
      animate={animate}
      variants={animationVariant}
      transition={transition}
      {...props}
    />
  );
});

MotionSection.displayName = "MotionSection";

export const MotionHeader = forwardRef<
  HTMLElement,
  HTMLMotionProps<"header"> & {
    variant?: Variants;
    preset?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleIn" | "textReveal" | "imageReveal";
  }
>(({ variant, preset, initial = "hidden", animate = "visible", transition = defaultTransition, ...props }, ref) => {
  const animationVariant = variant || (preset ? presetMap[preset] : fadeIn);

  return (
    <motion.header
      ref={ref}
      initial={initial}
      animate={animate}
      variants={animationVariant}
      transition={transition}
      {...props}
    />
  );
});

MotionHeader.displayName = "MotionHeader";

// Hook for scroll-triggered animations
export { useInView } from "framer-motion";

