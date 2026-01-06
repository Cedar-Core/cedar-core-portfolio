"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GhostButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Visual variant */
  variant?: "default" | "accent" | "muted";
  /** Icon to show (left side) */
  iconLeft?: React.ReactNode;
  /** Icon to show (right side) */
  iconRight?: React.ReactNode;
  /** Show underline on hover */
  underline?: boolean;
  /** Custom className */
  className?: string;
  /** Is disabled */
  disabled?: boolean;
}

const SIZE_CLASSES = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-base px-4 py-2 gap-2",
  lg: "text-lg px-5 py-2.5 gap-2.5",
} as const;

const VARIANT_CLASSES = {
  default:
    "text-white/70 hover:text-white border-white/10 hover:border-white/20",
  accent:
    "text-blue-400/80 hover:text-blue-400 border-blue-400/20 hover:border-blue-400/40",
  muted:
    "text-white/50 hover:text-white/70 border-white/5 hover:border-white/10",
} as const;

const buttonTransition: Transition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1],
};

/**
 * GhostButton - Subtle button for secondary actions
 *
 * Use cases:
 * - "Learn more" links
 * - Secondary CTAs
 * - Navigation elements
 * - "View all" links
 */
export function GhostButton({
  children,
  href,
  onClick,
  size = "md",
  variant = "default",
  iconLeft,
  iconRight,
  underline = false,
  className,
  disabled = false,
}: GhostButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-lg border transition-all duration-300",
    "font-medium tracking-wide",
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span
        className={cn(
          underline &&
            "relative group-hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300"
        )}
      >
        {children}
      </span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={buttonTransition}
      >
        <Link href={href} className={cn(baseClasses, "group")}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, "group")}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={buttonTransition}
    >
      {content}
    </motion.button>
  );
}

/**
 * TextLink - Minimal text-only link for inline usage
 */
export function TextLink({
  children,
  href,
  color = "default",
  className,
}: {
  children: React.ReactNode;
  href: string;
  color?: "default" | "accent" | "muted";
  className?: string;
}) {
  const colorClasses = {
    default: "text-white/70 hover:text-white",
    accent: "text-blue-400 hover:text-blue-300",
    muted: "text-white/50 hover:text-white/70",
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 transition-colors duration-200",
        "underline-offset-4 hover:underline",
        colorClasses[color],
        className
      )}
    >
      {children}
      <svg
        className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
