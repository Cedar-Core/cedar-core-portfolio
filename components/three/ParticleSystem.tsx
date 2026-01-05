"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  count?: number;
  speed?: number;
  color?: string;
  size?: number;
}

export function ParticleSystem({
  count = 1000,
  speed = 0.5,
  color = "#3b82f6",
  size = 0.02,
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 - 5;
      const z = Math.random() * 10 - 5;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = (particle.time += speed);

      meshRef.current!.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          new THREE.Vector3(
            x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
            y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
            z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
          ),
          new THREE.Quaternion(),
          new THREE.Vector3(size, size, size)
        )
      );
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} />
      </instancedMesh>
    </>
  );
}

