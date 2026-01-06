"use client";

import { memo, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MotionSection } from "./motion";

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  animate?: boolean;
}

const paddingClasses = {
  none: "",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-24",
  xl: "py-24 sm:py-32",
};

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

function SectionComponent({
  id,
  title,
  children,
  className,
  padding = "md",
  maxWidth = "xl",
  animate = true,
}: SectionProps) {
  const SectionWrapper = animate ? MotionSection : "section";
  const wrapperProps = animate
    ? {
      preset: "fadeIn" as const,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    }
    : {};

  return (
    <SectionWrapper
      id={id}
      {...wrapperProps}
      className={cn(
        "w-full",
        paddingClasses[padding],
        className
      )}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", maxWidthClasses[maxWidth])}>
        {title && (
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-foreground">
            {title}
          </h2>
        )}
        {children}
      </div>
    </SectionWrapper>
  );
}

export const Section = memo(SectionComponent);
Section.displayName = "Section";

