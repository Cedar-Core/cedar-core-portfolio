import { HeroSectionNebula } from "@/components/sections/HeroSectionNebula";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASectionV2 } from "@/components/sections/CTASectionV2";
import { getFeaturedCaseStudies, getFeaturedTestimonials } from "@/lib/db/queries";

export default async function Home() {
  const [caseStudies, testimonials] = await Promise.all([
    getFeaturedCaseStudies(),
    getFeaturedTestimonials(),
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionNebula />
      <CaseStudiesSection items={caseStudies} />
      <TestimonialsSection items={testimonials} />
      <CTASectionV2 />
    </div>
  );
}
