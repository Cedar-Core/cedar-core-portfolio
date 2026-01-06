"use client";

import { GlassTorus } from "./GlassTorus";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlassCoreBackgroundProps {
  color?: string;
}

// Glowing core sphere
function GlowingCore({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { geometry, material } = (() => {
    const geo = new THREE.SphereGeometry(0.8, 32, 32);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#8b5cf6") },
        uColor2: { value: new THREE.Color("#a78bfa") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Pulsing glow
          float pulse = sin(uTime * 2.0) * 0.3 + 0.7;
          
          // Radial gradient from center
          float dist = length(vPosition);
          float glow = 1.0 - smoothstep(0.0, 0.8, dist);
          
          // Color mixing
          vec3 color = mix(uColor1, uColor2, pulse);
          
          float alpha = glow * pulse * 0.6;
          
          gl_FragColor = vec4(color * glow * 1.5, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    return { geometry: geo, material: mat };
  })();
  
  useFrame((state) => {
    if (meshRef.current && material) {
      (material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={position} />
  );
}

export function GlassCoreBackground({
  color = "#8b5cf6",
}: GlassCoreBackgroundProps) {
  return (
    <group>
      {/* Core glowing sphere */}
      <GlowingCore position={[0, 0, 0]} />
      
      {/* Multiple layered glass torus rings */}
      <GlassTorus
        radius={1.8}
        tube={0.25}
        position={[0, 0, 0]}
        rotationSpeed={0.4}
        color={color}
      />
      <GlassTorus
        radius={2.2}
        tube={0.2}
        position={[0, 0, 0]}
        rotationSpeed={-0.3}
        color="#a78bfa"
      />
      <GlassTorus
        radius={2.6}
        tube={0.18}
        position={[0, 0, 0]}
        rotationSpeed={0.25}
        color="#8b5cf6"
      />
      <GlassTorus
        radius={3.0}
        tube={0.15}
        position={[0, 0, 0]}
        rotationSpeed={-0.2}
        color="#a78bfa"
      />
      
      {/* Inner accent ring for depth */}
      <GlassTorus
        radius={1.4}
        tube={0.12}
        position={[0, 0, 0]}
        rotationSpeed={0.5}
        color="#60a5fa"
      />
      
      {/* Outer large ring */}
      <GlassTorus
        radius={3.4}
        tube={0.12}
        position={[0, 0, 0]}
        rotationSpeed={0.15}
        color="#8b5cf6"
      />
    </group>
  );
}

