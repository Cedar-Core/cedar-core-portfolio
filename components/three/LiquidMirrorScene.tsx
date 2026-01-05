"use client";

import { LiquidMirror } from "./LiquidMirror";

export function LiquidMirrorScene() {
  return (
    <>
      {/* Main liquid mirror blob - positioned to the right */}
      <LiquidMirror position={[3, -0.5, 0]} scale={1.4} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Key light - bright white for reflections */}
      <pointLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
      
      {/* Fill light - purple accent */}
      <pointLight position={[-5, 0, 5]} intensity={1.0} color="#8b5cf6" />
      
      {/* Rim light - cyan for chromatic effect */}
      <pointLight position={[3, -5, 3]} intensity={0.8} color="#06b6d4" />
      
      {/* Back light - pink accent */}
      <pointLight position={[0, 3, -5]} intensity={0.6} color="#ec4899" />
    </>
  );
}

