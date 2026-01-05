"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleNetworkProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
}

export function ParticleNetwork({
  count = 1200,
  size = 2,
  color = "#ffffff",
  speed = 0.3,
}: ParticleNetworkProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    
    // Create a network/heart-like shape
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 4;
      const radius = size * (0.5 + Math.sin(angle * 2) * 0.3);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 2) * radius * 0.8;
      const z = (Math.random() - 0.5) * 0.3;
      
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

