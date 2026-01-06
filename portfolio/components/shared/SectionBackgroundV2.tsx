"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

/**
 * Background Variants:
 * - void: Pure black, neutral (default)
 * - blueprint: Technical, dotted grid, slate tint (Ecosystem)
 * - warm: Softer, purple-tinted, calmer (Testimonials, CTA, Contact)
 * - dramatic: Heavy glows, cinematic (Hero sections)
 */
type BackgroundVariant = "void" | "blueprint" | "warm" | "dramatic";

interface SectionBackgroundV2Props {
  /** Visual variant for the section */
  variant?: BackgroundVariant;
  /** Show grid lines (solid for void/dramatic, dotted for blueprint) */
  showGrid?: boolean;
  /** Grid intensity */
  gridOpacity?: "light" | "normal" | "heavy";
  /** Show the cinematic noise overlay */
  showNoise?: boolean;
  /** Show a decorative top border line */
  showTopBorder?: boolean;
  /** Color of the top border glow */
  topBorderColor?: "blue" | "cyan" | "purple";
  /** Show top fade for seamless section transitions */
  showTopFade?: boolean;
  /** Show bottom fade for seamless section transitions */
  showBottomFade?: boolean;
  /** Glow position */
  glowPosition?: "top" | "bottom" | "corners" | "both" | "none";
  /** Custom className for the base layer */
  className?: string;
}

const VARIANT_STYLES = {
  void: {
    base: "bg-black",
    gridStyle: "solid",
    glowColor: "rgba(59,130,246,0.12)",
    noiseOpacity: "opacity-[0.03]",
  },
  blueprint: {
    base: "bg-[#020617]", // slate-950
    gridStyle: "dotted",
    glowColor: "rgba(34,211,238,0.06)",
    noiseOpacity: "opacity-[0.02]",
  },
  warm: {
    base: "bg-[#0a0a0a]",
    gridStyle: "none",
    glowColor: "rgba(139,92,246,0.08)",
    noiseOpacity: "opacity-[0.04]",
  },
  dramatic: {
    base: "bg-black",
    gridStyle: "solid",
    glowColor: "rgba(59,130,246,0.15)",
    noiseOpacity: "opacity-[0.03]",
  },
} as const;

const GRID_OPACITY = {
  light: "opacity-25",
  normal: "opacity-40",
  heavy: "opacity-50",
} as const;

const BORDER_COLORS = {
  blue: "via-blue-500/30",
  cyan: "via-cyan-500/30",
  purple: "via-purple-500/30",
} as const;

function SectionBackgroundV2Component({
  variant = "void",
  showGrid = true,
  gridOpacity = "normal",
  showNoise = true,
  showTopBorder = false,
  topBorderColor = "blue",
  showTopFade = false,
  showBottomFade = false,
  glowPosition = "none",
  className,
}: SectionBackgroundV2Props) {
  const styles = VARIANT_STYLES[variant];
  const borderColorClass = BORDER_COLORS[topBorderColor];

  return (
    <>
      {/* 1. Base Layer */}
      <div className={cn("absolute inset-0 z-[-2]", styles.base, className)} />

      {/* 2. Cinematic Noise Overlay */}
      {showNoise && (
        <div
          className={cn(
            "absolute inset-0 z-0 pointer-events-none mix-blend-overlay",
            styles.noiseOpacity
          )}
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        />
      )}

      {/* 3. Grid - Solid Lines (void/dramatic) */}
      {showGrid && styles.gridStyle === "solid" && (
        <div
          className={cn(
            "absolute inset-0 z-0 flex justify-center pointer-events-none select-none",
            GRID_OPACITY[gridOpacity]
          )}
        >
          <div className="w-full max-w-7xl grid grid-cols-6 h-full px-6 lg:px-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border-r border-white/3 h-full"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. Grid - Dotted Lines (blueprint) */}
      {showGrid && styles.gridStyle === "dotted" && (
        <div
          className={cn(
            "absolute inset-0 z-0 flex justify-center pointer-events-none select-none",
            GRID_OPACITY[gridOpacity]
          )}
        >
          <div className="w-full max-w-7xl grid grid-cols-6 h-full px-6 lg:px-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-full border-r border-dashed border-cyan-500/10"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                }}
              />
            ))}
          </div>
          {/* Horizontal dotted lines for blueprint effect */}
          <div className="absolute inset-0 flex flex-col justify-evenly px-6 lg:px-12">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-full border-t border-dashed border-cyan-500/5"
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Top Fade */}
      {showTopFade && (
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black via-black/80 to-transparent z-[-1]" />
      )}

      {/* 5. Bottom Fade */}
      {showBottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
      )}

      {/* 6. Decorative Top Border */}
      {showTopBorder && (
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent to-transparent z-10",
            borderColorClass
          )}
        />
      )}

      {/* 7. Glow Effects */}
      {(glowPosition === "top" || glowPosition === "both") && (
        <div
          className="absolute inset-x-0 top-[-10%] h-125 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${styles.glowColor}, transparent 70%)`,
          }}
        />
      )}

      {(glowPosition === "bottom" || glowPosition === "both") && (
        <div
          className="absolute inset-x-0 bottom-0 h-100 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${
              variant === "warm"
                ? "rgba(139,92,246,0.06)"
                : "rgba(6,182,212,0.08)"
            }, transparent 60%)`,
          }}
        />
      )}

      {/* Corner glows for blueprint variant */}
      {glowPosition === "corners" && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.08),transparent_60%)] z-0 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_0%,rgba(34,211,238,0.06),transparent_60%)] z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_0%_100%,rgba(34,211,238,0.04),transparent_60%)] z-0 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.06),transparent_60%)] z-0 pointer-events-none" />
        </>
      )}

      {/* Extra dramatic glow for dramatic variant */}
      {variant === "dramatic" && glowPosition === "top" && (
        <div className="absolute inset-x-0 top-[10%] h-100 bg-[radial-gradient(ellipse_40%_30%_at_50%_20%,rgba(45,124,255,0.1),transparent_60%)] z-0 pointer-events-none" />
      )}
    </>
  );
}

export const SectionBackgroundV2 = memo(SectionBackgroundV2Component);
SectionBackgroundV2.displayName = "SectionBackgroundV2";
