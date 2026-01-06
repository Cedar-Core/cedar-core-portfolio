"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "@/hooks/useCursor";
import { cn } from "@/lib/utils";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const { position, isHovering } = useCursor();

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    let animationFrameId: number;
    let followerX = position.x;
    let followerY = position.y;

    const animate = () => {
      // Smooth cursor dot
      if (cursorRef.current) {
        cursorRef.current.style.left = `${position.x}px`;
        cursorRef.current.style.top = `${position.y}px`;
      }

      // Smooth follower with lag
      if (followerRef.current) {
        followerX += (position.x - followerX) * 0.1;
        followerY += (position.y - followerY) * 0.1;
        followerRef.current.style.left = `${followerX}px`;
        followerRef.current.style.top = `${followerY}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-9999 mix-blend-difference transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2",
          isHovering && "scale-150"
        )}
      />
      {/* Follower circle */}
      <div
        ref={followerRef}
        className={cn(
          "fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-9998 mix-blend-difference transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2",
          isHovering && "scale-150 border-2"
        )}
      />
    </>
  );
}

