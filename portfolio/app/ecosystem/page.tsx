"use client";

import { EcosystemHero } from "@/components/ecosystem/EcosystemHero";
import { EcosystemLayersV2 } from "@/components/ecosystem/EcosystemLayersV2";
import { EcosystemComponentsV2 } from "@/components/ecosystem/EcosystemComponentsV2";
import { EcosystemFlow } from "@/components/ecosystem/EcosystemFlow";
import { EcosystemValue } from "@/components/ecosystem/EcosystemValue";
import { EcosystemCTA } from "@/components/ecosystem/EcosystemCTA";

/**
 * Ecosystem Page
 *
 * A systems-level explanation of Cedar Core's digital ecosystem offering.
 * Designed for founders and technical decision-makers who need to understand
 * how all parts work together.
 *
 * Visual Design:
 * - Blueprint background on Layers (technical, dotted grid)
 * - Warm background on Components (softer, purple-tinted)
 * - Alternating variants create visual rhythm
 *
 * Structure:
 * 1. Hero — Systems-focused headline
 * 2. Layers — Visual layered architecture (Blueprint)
 * 3. Components — Deep dive into each layer (Warm)
 * 4. Flow — How data moves through the system
 * 5. Value — Why ecosystems scale better
 * 6. CTA — Final call to action
 */
export default function EcosystemPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <EcosystemHero />

      {/* Architecture Layers - Blueprint variant */}
      <EcosystemLayersV2 />

      {/* Component Deep Dive - Warm variant */}
      <EcosystemComponentsV2 />

      {/* Flow Diagram */}
      <EcosystemFlow />

      {/* Value Proposition */}
      <EcosystemValue />

      {/* Call to Action */}
      <EcosystemCTA />
    </div>
  );
}
