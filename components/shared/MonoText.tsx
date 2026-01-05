"use client";

import { cn } from "@/lib/utils";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

interface MonoTextProps {
  children: React.ReactNode;
  /** Size variant */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /** Text color */
  color?: "default" | "muted" | "accent" | "cyan" | "purple";
  /** Extra letter spacing for numbers */
  tracking?: "normal" | "wide" | "wider";
  /** Custom className */
  className?: string;
  /** HTML tag to render */
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4";
}

const SIZE_CLASSES = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
} as const;

const COLOR_CLASSES = {
  default: "text-white",
  muted: "text-white/60",
  accent: "text-blue-400",
  cyan: "text-cyan-400",
  purple: "text-purple-400",
} as const;

const TRACKING_CLASSES = {
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-widest",
} as const;

/**
 * MonoText - Monospace styled text for metrics, codes, and technical content
 *
 * Use cases:
 * - Statistics and numbers (42%, +340%)
 * - Version numbers (v2.0.1)
 * - Technical labels (API, SDK)
 * - Code snippets
 * - Layer numbers in Ecosystem
 */
export function MonoText({
  children,
  size = "base",
  color = "default",
  tracking = "normal",
  className,
  as: Tag = "span",
}: MonoTextProps) {
  return (
    <Tag
      className={cn(
        geistMono.className,
        SIZE_CLASSES[size],
        COLOR_CLASSES[color],
        TRACKING_CLASSES[tracking],
        "font-medium tabular-nums",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * MonoMetric - Pre-styled component for large metrics with labels
 */
export function MonoMetric({
  value,
  label,
  valueColor = "accent",
  className,
}: {
  value: string | number;
  label: string;
  valueColor?: "default" | "accent" | "cyan" | "purple";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <MonoText
        size="3xl"
        color={valueColor}
        tracking="wide"
        className="font-bold"
      >
        {value}
      </MonoText>
      <span className="text-sm text-white/50 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

/**
 * MonoLabel - Pre-styled component for small technical labels
 */
export function MonoLabel({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "filled";
  className?: string;
}) {
  const variantClasses = {
    default: "",
    outline: "border border-white/10 rounded px-2 py-0.5",
    filled: "bg-white/5 rounded px-2 py-0.5",
  };

  return (
    <MonoText
      size="xs"
      color="muted"
      tracking="wider"
      className={cn("uppercase", variantClasses[variant], className)}
    >
      {children}
    </MonoText>
  );
}
