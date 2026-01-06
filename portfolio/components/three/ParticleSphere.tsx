"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSphereProps {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
}

export function ParticleSphere({
  count = 2000,
  radius = 2,
  color = "#ffffff",
  speed = 0.5,
}: ParticleSphereProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 0.1;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      temp.push({ x, y, z, theta, phi, r, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count, radius]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;

    particles.forEach((particle, i) => {
      // Animate particles with subtle movement
      const wave = Math.sin(time + particle.offset) * 0.05;
      const newR = particle.r + wave;
      
      const x = newR * Math.sin(particle.phi) * Math.cos(particle.theta + time * 0.1);
      const y = newR * Math.sin(particle.phi) * Math.sin(particle.theta + time * 0.1);
      const z = newR * Math.cos(particle.phi);

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
      />
    </instancedMesh>
  );
}
