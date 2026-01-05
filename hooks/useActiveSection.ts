"use client";

import { useEffect, useState } from "react";

interface UseActiveSectionOptions {
  sectionIds: string[];
  threshold?: number;
  rootMargin?: string;
  offset?: number;
}

export function useActiveSection(options: UseActiveSectionOptions) {
  const { sectionIds, threshold = 0.3, rootMargin = "-20% 0px -70%", offset = 0 } = options;
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
}

