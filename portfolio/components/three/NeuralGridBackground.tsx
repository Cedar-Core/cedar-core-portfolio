"use client";

import { NeuralGrid } from "./NeuralGrid";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralGridBackgroundProps {
  color?: string;
  glowColor?: string;
}

// Atmospheric particles for extra depth
function AtmosphericParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = (() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color1 = new THREE.Color("#8b5cf6");
    const color2 = new THREE.Color("#60a5fa");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = (Math.random() - 0.5) * 8;
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = Math.random() > 0.5 ? color1 : color2;
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }

    return { positions: pos, colors: cols };
  })();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={200}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        transparent
        opacity={0.4}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function NeuralGridBackground({
  color = "#8b5cf6",
  glowColor = "#a78bfa",
}: NeuralGridBackgroundProps) {
  return (
    <>
      {/* Main neural grid - the star of the show */}
      <NeuralGrid
        size={28}
        divisions={65}
        color={color}
        glowColor={glowColor}
      />

      {/* Subtle atmospheric particles for depth */}
      <AtmosphericParticles />
    </>
  );
}
