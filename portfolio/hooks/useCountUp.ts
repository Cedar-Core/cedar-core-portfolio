"use client";

import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  easing?: "linear" | "easeOut" | "easeInOut";
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
  decimals = 0,
  easing = "easeOut",
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasStarted = useRef(false);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  };

  const startAnimation = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    setTimeout(() => {
      setIsAnimating(true);
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunctions[easing](progress);
        const currentValue = start + (end - start) * easedProgress;

        setCount(Number(currentValue.toFixed(decimals)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }, delay);
  };

  const reset = () => {
    hasStarted.current = false;
    setCount(start);
    setIsAnimating(false);
  };

  const formattedValue = `${prefix}${count}${suffix}`;

  return {
    count,
    formattedValue,
    isAnimating,
    startAnimation,
    reset,
  };
}

// Component version for easier use with intersection observer
import { useInView } from "framer-motion";

export function useCountUpOnView(options: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const countUp = useCountUp(options);

  useEffect(() => {
    if (isInView) {
      countUp.startAnimation();
    }
  }, [isInView]);

  return {
    ...countUp,
    ref,
    isInView,
  };
}

