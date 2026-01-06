"use client";

import { ChromaticTorus } from "./ChromaticTorus";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function IridescentRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle overall rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Main large ring - tilted */}
      <ChromaticTorus
        radius={1.6}
        tube={0.12}
        position={[0, 0, 0]}
        rotation={[Math.PI * 0.4, 0, 0]}
        rotationSpeed={0.15}
      />
      
      {/* Secondary ring - perpendicular */}
      <ChromaticTorus
        radius={1.4}
        tube={0.1}
        position={[0, 0, 0]}
        rotation={[Math.PI * 0.1, Math.PI * 0.5, 0]}
        rotationSpeed={-0.12}
      />
      
      {/* Third ring - angled differently */}
      <ChromaticTorus
        radius={1.2}
        tube={0.08}
        position={[0, 0, 0]}
        rotation={[Math.PI * 0.6, Math.PI * 0.3, 0]}
        rotationSpeed={0.18}
      />
      
      {/* Inner accent ring */}
      <ChromaticTorus
        radius={0.9}
        tube={0.06}
        position={[0, 0, 0]}
        rotation={[Math.PI * 0.25, Math.PI * 0.7, 0]}
        rotationSpeed={-0.2}
      />
      
      {/* Ambient light for the rings */}
      <ambientLight intensity={0.5} />
      
      {/* Key lights for reflections */}
      <pointLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-5, 3, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -5, 5]} intensity={1.0} color="#ffffff" />
      
      {/* Colored accent lights for chromatic effect */}
      <pointLight position={[3, 0, -3]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[-3, 0, -3]} intensity={0.5} color="#4ecdc4" />
    </group>
  );
}

