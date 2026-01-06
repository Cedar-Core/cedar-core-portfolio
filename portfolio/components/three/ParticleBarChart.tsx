"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleBarChartProps {
  count?: number;
  color?: string;
  speed?: number;
}

export function ParticleBarChart({
  count = 1000,
  color = "#ffffff",
  speed = 0.3,
}: ParticleBarChartProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    const barCount = 3;
    const particlesPerBar = Math.floor(count / (barCount + 1)); // +1 for arrow
    
    // Create 3 bars of increasing height
    for (let bar = 0; bar < barCount; bar++) {
      const barWidth = 0.4;
      const barHeight = (bar + 1) * 0.8;
      const barX = (bar - 1) * 0.8;
      
      for (let i = 0; i < particlesPerBar; i++) {
        const t = i / particlesPerBar;
        const x = barX + (Math.random() - 0.5) * barWidth;
        const y = t * barHeight - 1;
        const z = (Math.random() - 0.5) * 0.1;
        temp.push({ x, y, z, offset: Math.random() * Math.PI * 2 });
      }
    }
    
    // Create arrow
    const arrowCount = count - particlesPerBar * barCount;
    for (let i = 0; i < arrowCount; i++) {
      const t = i / arrowCount;
      const startX = 0.8;
      const startY = 1.4;
      const endX = 1.2;
      const endY = 1.8;
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t;
      const z = (Math.random() - 0.5) * 0.1;
      temp.push({ x, y, z, offset: Math.random() * Math.PI * 2 });
    }
    
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;

    particles.forEach((particle, i) => {
      const wave = Math.sin(time + particle.offset) * 0.02;
      const x = particle.x + wave;
      const y = particle.y + wave;
      const z = particle.z + wave;

      meshRef.current!.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          new THREE.Vector3(x, y, z),
          new THREE.Quaternion(),
          new THREE.Vector3(0.02, 0.02, 0.02)
        )
      );
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

