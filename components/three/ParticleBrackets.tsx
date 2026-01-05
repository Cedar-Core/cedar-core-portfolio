"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleBracketsProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
}

export function ParticleBrackets({
  count = 1200,
  size = 2,
  color = "#ffffff",
  speed = 0.3,
}: ParticleBracketsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    const halfCount = Math.floor(count / 2);
    
    // Left bracket <
    for (let i = 0; i < halfCount; i++) {
      const t = i / halfCount;
      const angle = Math.PI * 0.5 + t * Math.PI;
      const radius = size * 0.8;
      const x = -size * 0.5 + Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 0.2;
      temp.push({ x, y, z, offset: Math.random() * Math.PI * 2 });
    }
    
    // Right bracket >
    for (let i = 0; i < halfCount; i++) {
      const t = i / halfCount;
      const angle = Math.PI * 1.5 + t * Math.PI;
      const radius = size * 0.8;
      const x = size * 0.5 + Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 0.2;
      temp.push({ x, y, z, offset: Math.random() * Math.PI * 2 });
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

