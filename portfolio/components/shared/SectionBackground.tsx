"use client";

import { memo } from "react";

interface SectionBackgroundProps {
  /** Show the subtle vertical grid lines */
  showGrid?: boolean;
  /** Show the cinematic noise overlay */
  showNoise?: boolean;
  /** Show a decorative top border line */
  showTopBorder?: boolean;
  /** Color of the top border glow (blue or cyan) */
  topBorderColor?: "blue" | "cyan";
  /** Show top fade for seamless section transitions */
  showTopFade?: boolean;
  /** Show bottom fade for seamless section transitions */
  showBottomFade?: boolean;
  /** Additional glow elements */
  glowPosition?: "top" | "bottom" | "both" | "none";
}

/**
 * Unified background component for all Cedar Core sections
 * Eliminates duplication of noise, grid, and glow layers across sections
 */
function SectionBackgroundComponent({
  showGrid = true,
  showNoise = true,
  showTopBorder = false,
  topBorderColor = "blue",
  showTopFade = false,
  showBottomFade = false,
  glowPosition = "none",
}: SectionBackgroundProps) {
  const borderColorClass =
    topBorderColor === "cyan" ? "via-cyan-500/30" : "via-blue-500/30";

  return (
    <>
      {/* 1. Base - Pure Black Void */}
      <div className="absolute inset-0 bg-black z-[-2]" />

      {/* 2. Cinematic Noise Overlay */}
      {showNoise && (
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        />
      )}

      {/* 3. Subtle Vertical Grid Lines */}
      {showGrid && (
        <div className="absolute inset-0 z-0 flex justify-center pointer-events-none select-none opacity-40">
          <div className="w-full max-w-7xl grid grid-cols-6 h-full px-6 lg:px-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border-r border-white/[0.03] h-full"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Top Fade (Seamless transition from previous section) */}
      {showTopFade && (
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-[-1]" />
      )}

      {/* 5. Bottom Fade (Seamless transition to next section) */}
      {showBottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      )}

      {/* 6. Decorative Top Border */}
      {showTopBorder && (
        <div
          className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${borderColorClass} to-transparent z-10`}
        />
      )}

      {/* 7. Optional Glow Effects */}
      {(glowPosition === "top" || glowPosition === "both") && (
        <div className="absolute inset-x-0 top-[-10%] h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)] z-0 pointer-events-none" />
      )}

      {(glowPosition === "bottom" || glowPosition === "both") && (
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(6,182,212,0.08),transparent_60%)] z-0 pointer-events-none" />
      )}
    </>
  );
}

export const SectionBackground = memo(SectionBackgroundComponent);
SectionBackground.displayName = "SectionBackground";
