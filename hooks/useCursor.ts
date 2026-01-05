"use client";

import { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export function useCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateCursor = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
        setTargetElement(target);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setTargetElement(null);
    };

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return { position, isHovering, targetElement };
}

