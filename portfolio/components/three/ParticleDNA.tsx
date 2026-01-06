"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleDNAProps {
  count?: number;
  height?: number;
  radius?: number;
  color?: string;
  speed?: number;
}

export function ParticleDNA({
  count = 1500,
  height = 3,
  radius = 0.3,
  color = "#ffffff",
  speed = 0.5,
}: ParticleDNAProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    const turns = 3;
    const particlesPerTurn = Math.floor(count / (turns * 2));
    
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      const strand = i % 2;
      const x = Math.cos(angle + strand * Math.PI) * radius;
      const z = Math.sin(angle + strand * Math.PI) * radius;
      
      temp.push({ x, y, z, angle, offset: Math.random() * Math.PI * 2 });
    }
    
    return temp;
  }, [count, height, radius]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;

    particles.forEach((particle, i) => {
      const wave = Math.sin(time + particle.offset) * 0.02;
      const x = particle.x + wave;
      const y = particle.y;
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

