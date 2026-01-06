import type { Variants } from "framer-motion";

/**
 * Shared animation variants for consistent motion across Cedar Core
 * All sections should use these instead of defining their own variants
 */

// Standard easing curves
export const EASE_PREMIUM = [0.25, 0.4, 0.25, 1] as [
  number,
  number,
  number,
  number
];
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number
];
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as [
  number,
  number,
  number,
  number
];

// Container variant - staggers children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Standard fade + slide up for content items
export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_PREMIUM,
    },
  },
};

// Subtle fade + slide for cards
export const fadeSlideUpSubtle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_PREMIUM,
    },
  },
};

// Scale in variant for cards/modals
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH,
    },
  },
};

// Slide from right
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_PREMIUM,
    },
  },
};

// Card hover effect
export const cardHover = {
  y: -12,
  transition: { duration: 0.4, ease: "easeOut" },
};

// Premium card motion (for testimonials, etc.)
export const premiumCardMotion = {
  initial: { opacity: 0, y: 18, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -18, filter: "blur(2px)" },
  transition: { duration: 0.9, ease: EASE_SMOOTH },
};

// Reduced motion fallback
export const reducedMotionCard = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};
