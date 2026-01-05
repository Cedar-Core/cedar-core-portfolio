"use client";

import { memo, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { fadeSlideUp } from "@/lib/animations";

interface SectionHeadingProps {
  /** Main heading text or ReactNode */
  title: ReactNode;
  /** Optional subtitle/description */
  subtitle?: ReactNode;
  /** Text alignment */
  align?: "left" | "center";
  /** Heading size */
  size?: "md" | "lg" | "xl";
  /** Additional className for the wrapper */
  className?: string;
  /** Enable entrance animation */
  animate?: boolean;
}

const SIZE_CLASSES = {
  md: "text-4xl sm:text-5xl lg:text-6xl",
  lg: "text-5xl sm:text-6xl lg:text-7xl",
  xl: "text-6xl sm:text-7xl lg:text-8xl",
} as const;

const SUBTITLE_SIZE_CLASSES = {
  md: "text-lg sm:text-xl",
  lg: "text-xl sm:text-2xl",
  xl: "text-xl sm:text-2xl",
} as const;

/**
 * Unified section heading component
 * Ensures consistent typography and spacing across all sections
 */
function SectionHeadingComponent({
  title,
  subtitle,
  align = "center",
  size = "lg",
  className,
  animate = true,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        ref,
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        variants: fadeSlideUp,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "max-w-4xl mb-12 sm:mb-16 lg:mb-20",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-medium tracking-tighter text-white mb-6",
          "font-(family-name:--font-geist-sans)",
          SIZE_CLASSES[size]
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-blue-200/60 leading-relaxed font-light",
            SUBTITLE_SIZE_CLASSES[size]
          )}
        >
          {subtitle}
        </p>
      )}
    </Wrapper>
  );
}

export const SectionHeading = memo(SectionHeadingComponent);
SectionHeading.displayName = "SectionHeading";
