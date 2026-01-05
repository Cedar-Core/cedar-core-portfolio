"use client";

import { EASE_PREMIUM } from "@/lib/animations";

/**
 * Card Hover Patterns
 *
 * Pattern 1: Lift & Glow (default)
 * - Subtle lift with shadow glow
 * - Best for: Feature cards, testimonials
 *
 * Pattern 2: Perspective Tilt
 * - 3D tilt effect with mouse tracking
 * - Best for: Technical cards, ecosystem components
 *
 * Pattern 3: Border Trace
 * - Animated border highlight
 * - Best for: CTAs, highlighted elements
 */

export type CardHoverPattern = "lift" | "tilt" | "trace";

interface CardHoverConfig {
  /** Motion variants for the card */
  variants: {
    initial: Record<string, unknown>;
    hover: Record<string, unknown>;
  };
  /** Transition config */
  transition: Record<string, unknown>;
  /** CSS classes to apply */
  className: string;
}

/**
 * Get hover configuration for a specific pattern
 */
export function getCardHoverConfig(pattern: CardHoverPattern): CardHoverConfig {
  switch (pattern) {
    case "lift":
      return {
        variants: {
          initial: {
            y: 0,
            boxShadow: "0 0 0 rgba(45, 124, 255, 0)",
          },
          hover: {
            y: -8,
            boxShadow: "0 20px 40px rgba(45, 124, 255, 0.1)",
          },
        },
        transition: {
          duration: 0.35,
          ease: EASE_PREMIUM,
        },
        className: "hover:border-white/20",
      };

    case "tilt":
      return {
        variants: {
          initial: {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
          },
          hover: {
            scale: 1.02,
          },
        },
        transition: {
          duration: 0.25,
          ease: EASE_PREMIUM,
        },
        className: "transform-gpu perspective-1000 hover:border-cyan-500/30",
      };

    case "trace":
      return {
        variants: {
          initial: {
            borderColor: "rgba(255, 255, 255, 0.1)",
          },
          hover: {
            borderColor: "rgba(45, 124, 255, 0.5)",
          },
        },
        transition: {
          duration: 0.4,
          ease: EASE_PREMIUM,
        },
        className:
          "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:p-px before:bg-linear-to-r before:from-transparent before:via-blue-500/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      };

    default:
      return getCardHoverConfig("lift");
  }
}

/**
 * Framer Motion props for card hover animations
 */
export function useCardHoverProps(pattern: CardHoverPattern = "lift") {
  const config = getCardHoverConfig(pattern);

  return {
    initial: "initial",
    whileHover: "hover",
    variants: config.variants,
    transition: config.transition,
    className: config.className,
  };
}

/**
 * Pre-configured motion props for common card patterns
 */
export const cardHoverPresets = {
  /** Feature cards, case studies */
  feature: {
    ...getCardHoverConfig("lift"),
    whileHover: { y: -8, transition: { duration: 0.35, ease: EASE_PREMIUM } },
    whileTap: { scale: 0.98 },
  },

  /** Technical/ecosystem cards */
  technical: {
    ...getCardHoverConfig("tilt"),
    whileHover: {
      scale: 1.02,
      transition: { duration: 0.25, ease: EASE_PREMIUM },
    },
    whileTap: { scale: 0.98 },
  },

  /** CTA and highlighted elements */
  accent: {
    ...getCardHoverConfig("trace"),
    whileHover: {
      borderColor: "rgba(45, 124, 255, 0.5)",
      transition: { duration: 0.4, ease: EASE_PREMIUM },
    },
  },

  /** Subtle hover for lists/grids */
  subtle: {
    whileHover: {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      transition: { duration: 0.2 },
    },
  },
} as const;
