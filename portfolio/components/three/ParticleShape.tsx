"use client";

import dynamic from "next/dynamic";
import { Scene3D } from "./Scene3D";

const ParticleSphere = dynamic(() => import("./ParticleSphere").then(mod => ({ default: mod.ParticleSphere })), { ssr: false });
const ParticleCube = dynamic(() => import("./ParticleCube").then(mod => ({ default: mod.ParticleCube })), { ssr: false });
const ParticleBrackets = dynamic(() => import("./ParticleBrackets").then(mod => ({ default: mod.ParticleBrackets })), { ssr: false });
const ParticleBarChart = dynamic(() => import("./ParticleBarChart").then(mod => ({ default: mod.ParticleBarChart })), { ssr: false });
const ParticleDNA = dynamic(() => import("./ParticleDNA").then(mod => ({ default: mod.ParticleDNA })), { ssr: false });
const ParticleNetwork = dynamic(() => import("./ParticleNetwork").then(mod => ({ default: mod.ParticleNetwork })), { ssr: false });
const ParticleStars = dynamic(() => import("./ParticleStars").then(mod => ({ default: mod.ParticleStars })), { ssr: false });

type ParticleShapeType = "sphere" | "cube" | "brackets" | "barChart" | "dna" | "network" | "stars";

interface ParticleShapeProps {
  type: ParticleShapeType;
  className?: string;
}

export function ParticleShape({ type, className }: ParticleShapeProps) {
  const ShapeComponent = {
    sphere: ParticleSphere,
    cube: ParticleCube,
    brackets: ParticleBrackets,
    barChart: ParticleBarChart,
    dna: ParticleDNA,
    network: ParticleNetwork,
    stars: ParticleStars,
  }[type];

  if (!ShapeComponent) return null;

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Scene3D cameraPosition={[0, 0, 5]}>
        <ShapeComponent />
      </Scene3D>
    </div>
  );
}

