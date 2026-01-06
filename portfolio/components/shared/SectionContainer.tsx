"use client";

import { forwardRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SectionBackground } from "./SectionBackground";
import { staggerContainer } from "@/lib/animations";

/**
 * Standardized spacing scale for sections
 * Uses consistent vertical rhythm across the site
 */
const PADDING_SCALE = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-24 lg:py-32",
  lg: "py-24 sm:py-32 lg:py-40",
  xl: "py-32 sm:py-40 lg:py-48",
} as const;

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Vertical padding size */
  padding?: keyof typeof PADDING_SCALE;
  /** Enable staggered entrance animation */
  animate?: boolean;
  /** Background configuration */
  background?: {
    showGrid?: boolean;
    showNoise?: boolean;
    showTopBorder?: boolean;
    topBorderColor?: "blue" | "cyan";
    showTopFade?: boolean;
    showBottomFade?: boolean;
    glowPosition?: "top" | "bottom" | "both" | "none";
  };
  /** Use full width (no container constraint) */
  fullWidth?: boolean;
}

/**
 * Unified section container for all Cedar Core sections
 * Provides consistent padding, background, and animation handling
 */
export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  function SectionContainer(
    {
      id,
      children,
      className,
      padding = "md",
      animate = true,
      background = {},
      fullWidth = false,
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLElement>) || internalRef;
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const Wrapper = animate ? motion.section : "section";
    const wrapperProps = animate
      ? {
          variants: staggerContainer,
          initial: "hidden",
          animate: isInView ? "visible" : "hidden",
        }
      : {};

    return (
      <Wrapper
        ref={ref as any}
        id={id}
        className={cn(
          "relative overflow-hidden",
          PADDING_SCALE[padding],
          className
        )}
        {...wrapperProps}
      >
        <SectionBackground {...background} />

        {fullWidth ? (
          children
        ) : (
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            {children}
          </div>
        )}
      </Wrapper>
    );
  }
);

SectionContainer.displayName = "SectionContainer";
