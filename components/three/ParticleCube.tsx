"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleCubeProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
}

export function ParticleCube({
  count = 1500,
  size = 2,
  color = "#ffffff",
  speed = 0.3,
}: ParticleCubeProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    const halfSize = size / 2;
    
    // Create particles along cube edges
    const edgeCount = Math.floor(count / 12); // 12 edges of a cube
    
    for (let i = 0; i < count; i++) {
      let x, y, z;
      
      if (i < edgeCount * 4) {
        // Top face edges
        const edge = Math.floor(i / edgeCount);
        const pos = (i % edgeCount) / edgeCount;
        if (edge === 0) { x = -halfSize + pos * size; y = halfSize; z = -halfSize; }
        else if (edge === 1) { x = halfSize; y = halfSize; z = -halfSize + pos * size; }
        else if (edge === 2) { x = halfSize - pos * size; y = halfSize; z = halfSize; }
        else { x = -halfSize; y = halfSize; z = halfSize - pos * size; }
      } else if (i < edgeCount * 8) {
        // Middle edges
        const edge = Math.floor((i - edgeCount * 4) / edgeCount);
        const pos = (i % edgeCount) / edgeCount;
        if (edge === 0) { x = -halfSize; y = halfSize - pos * size; z = -halfSize; }
        else if (edge === 1) { x = halfSize; y = halfSize - pos * size; z = -halfSize; }
        else if (edge === 2) { x = halfSize; y = halfSize - pos * size; z = halfSize; }
        else { x = -halfSize; y = halfSize - pos * size; z = halfSize; }
      } else {
        // Bottom face edges
        const edge = Math.floor((i - edgeCount * 8) / edgeCount);
        const pos = (i % edgeCount) / edgeCount;
        if (edge === 0) { x = -halfSize + pos * size; y = -halfSize; z = -halfSize; }
        else if (edge === 1) { x = halfSize; y = -halfSize; z = -halfSize + pos * size; }
        else if (edge === 2) { x = halfSize - pos * size; y = -halfSize; z = halfSize; }
        else { x = -halfSize; y = -halfSize; z = halfSize - pos * size; }
      }

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

