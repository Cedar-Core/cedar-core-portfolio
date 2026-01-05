"use client";

import { HeroSectionNebula } from "@/components/sections/HeroSectionNebula";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASectionV2 } from "@/components/sections/CTASectionV2";

/**
 * Home Page
 *
 * Visual Design Strategy:
 * - Hero: Dramatic variant (heavy glows, cinematic)
 * - Case Studies: Void variant (neutral, clean)
 * - Testimonials: Warm variant (softer, purple-tinted)
 * - CTA: Warm variant with glows (inviting)
 */
export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section - Dramatic */}
      <HeroSectionNebula />

      {/* Case Studies Section - Void */}
      <CaseStudiesSection />

      {/* Testimonials Section - Warm */}
      <TestimonialsSection />

      {/* CTA Section - Warm with glows */}
      <CTASectionV2 />
    </div>
  );
}
