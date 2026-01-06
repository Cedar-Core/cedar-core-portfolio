"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeSlideUp, staggerContainer, EASE_PREMIUM } from "@/lib/animations";
import { MonoLabel } from "./MonoText";

interface SectionHeadingV2Props {
  /** Main title text */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Optional eyebrow label (monospace styled) */
  eyebrow?: string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Title size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Title font weight variant */
  weight?: "medium" | "semibold" | "bold";
  /** Title letter spacing */
  titleTracking?: "tight" | "normal" | "wide";
  /** Animate on scroll */
  animate?: boolean;
  /** Accent color for eyebrow */
  accentColor?: "blue" | "cyan" | "purple";
  /** Custom className */
  className?: string;
}

const ALIGN_CLASSES = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
} as const;

const SIZE_CLASSES = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl lg:text-5xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
} as const;

const WEIGHT_CLASSES = {
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const TRACKING_CLASSES = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
} as const;

const ACCENT_COLORS = {
  blue: "text-blue-400",
  cyan: "text-cyan-400",
  purple: "text-purple-400",
} as const;

/**
 * SectionHeadingV2 - Enhanced section heading with typography hierarchy
 *
 * Features:
 * - Monospace eyebrow labels
 * - Variable font weights
 * - Letter spacing control
 * - Accent color theming
 */
export function SectionHeadingV2({
  title,
  subtitle,
  eyebrow,
  align = "center",
  size = "lg",
  weight = "semibold",
  titleTracking = "tight",
  animate = true,
  accentColor = "blue",
  className,
}: SectionHeadingV2Props) {
  const alignClass = ALIGN_CLASSES[align];
  const sizeClass = SIZE_CLASSES[size];
  const weightClass = WEIGHT_CLASSES[weight];
  const trackingClass = TRACKING_CLASSES[titleTracking];

  const Container = animate ? motion.div : "div";
  const TitleWrapper = animate ? motion.h2 : "h2";
  const SubtitleWrapper = animate ? motion.p : "p";

  const containerProps = animate
    ? {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      }
    : {};

  const titleProps = animate ? { variants: fadeSlideUp } : {};
  const subtitleProps = animate ? { variants: fadeSlideUp } : {};

  return (
    <Container
      className={cn("flex flex-col mb-12 md:mb-16", alignClass, className)}
      {...containerProps}
    >
      {/* Eyebrow Label */}
      {eyebrow && (
        <motion.div className="mb-4" variants={fadeSlideUp}>
          <MonoLabel
            variant="outline"
            className={cn("border-white/20", ACCENT_COLORS[accentColor])}
          >
            {eyebrow}
          </MonoLabel>
        </motion.div>
      )}

      {/* Main Title */}
      <TitleWrapper
        className={cn(
          sizeClass,
          weightClass,
          trackingClass,
          "text-white leading-[1.1]"
        )}
        {...titleProps}
      >
        {title}
      </TitleWrapper>

      {/* Subtitle */}
      {subtitle && (
        <SubtitleWrapper
          className={cn(
            "mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl font-normal",
            align === "center" && "mx-auto"
          )}
          {...subtitleProps}
        >
          {subtitle}
        </SubtitleWrapper>
      )}
    </Container>
  );
}
