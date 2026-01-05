"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleStarsProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
}

export function ParticleStars({
  count = 900,
  size = 2,
  color = "#ffffff",
  speed = 0.3,
}: ParticleStarsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    const starCount = 3;
    const particlesPerStar = Math.floor(count / starCount);
    
    // Create 3 stars of different sizes
    for (let star = 0; star < starCount; star++) {
      const starSize = size * (0.3 + star * 0.2);
      const starX = (star - 1) * size * 0.6;
      const starY = (star % 2 === 0 ? 1 : -1) * size * 0.3;
      
      for (let i = 0; i < particlesPerStar; i++) {
        const t = i / particlesPerStar;
        const angle = t * Math.PI * 2;
        const points = 5; // 5-pointed star
        const radius = starSize * (0.5 + Math.sin(angle * points) * 0.3);
        const x = starX + Math.cos(angle) * radius;
        const y = starY + Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 0.2;
        
        temp.push({ x, y, z, offset: Math.random() * Math.PI * 2 });
      }
    }
    
    return temp;
  }, [count, size]);

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

