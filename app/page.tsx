"use client";

import { HeroSectionNebula } from "@/components/sections/HeroSectionNebula";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section - Nebula Style */}
      <HeroSectionNebula />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
