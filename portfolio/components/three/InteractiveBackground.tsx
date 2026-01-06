"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveBackgroundProps {
  particleCount?: number;
  color1?: string;
  color2?: string;
}

export function InteractiveBackground({
  particleCount = 1500,
  color1 = "#60a5fa",
  color2 = "#a78bfa",
}: InteractiveBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create particle positions in a more organic, flowing formation
  const { positions, colors, linePositions, lineColors, lineCount } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const linePos = new Float32Array(particleCount * 6); // 2 points per line
    const lineCol = new Float32Array(particleCount * 6);

    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    // Create a more interesting, flowing particle cloud
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const t = i / particleCount;

      // Create a flowing, organic shape (like a cloud or nebula)
      const angle1 = t * Math.PI * 4;
      const angle2 = t * Math.PI * 6;
      const radius = 3 + Math.sin(angle1) * 1.5 + Math.cos(angle2) * 0.8;

      const x = Math.cos(angle1) * radius + (Math.random() - 0.5) * 0.5;
      const y = Math.sin(angle1 * 1.3) * radius * 0.6 + (Math.random() - 0.5) * 0.5;
      const z = Math.sin(angle2) * radius * 0.4 + (Math.random() - 0.5) * 0.8;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Color based on position
      const distFromCenter = Math.sqrt(x * x + y * y + z * z) / 5;
      const color = c1.clone().lerp(c2, Math.min(distFromCenter, 1));
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }

    // Create connections between nearby particles
    let lineIndex = 0;
    const maxConnections = Math.min(particleCount * 2, 3000); // Limit connections for performance
    const connectionDistance = 1.2;

    for (let i = 0; i < particleCount && lineIndex < maxConnections; i++) {
      const i3 = i * 3;
      const x1 = pos[i3];
      const y1 = pos[i3 + 1];
      const z1 = pos[i3 + 2];

      // Find nearby particles
      for (let j = i + 1; j < particleCount && lineIndex < maxConnections; j++) {
        const j3 = j * 3;
        const x2 = pos[j3];
        const y2 = pos[j3 + 1];
        const z2 = pos[j3 + 2];

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < connectionDistance && Math.random() > 0.7) {
          const lineI3 = lineIndex * 6;

          // Start point
          linePos[lineI3] = x1;
          linePos[lineI3 + 1] = y1;
          linePos[lineI3 + 2] = z1;

          // End point
          linePos[lineI3 + 3] = x2;
          linePos[lineI3 + 4] = y2;
          linePos[lineI3 + 5] = z2;

          // Colors for the line
          const color1 = new THREE.Color(cols[i3], cols[i3 + 1], cols[i3 + 2]);
          const color2 = new THREE.Color(cols[j3], cols[j3 + 1], cols[j3 + 2]);

          lineCol[lineI3] = color1.r;
          lineCol[lineI3 + 1] = color1.g;
          lineCol[lineI3 + 2] = color1.b;
          lineCol[lineI3 + 3] = color2.r;
          lineCol[lineI3 + 4] = color2.g;
          lineCol[lineI3 + 5] = color2.b;

          lineIndex++;
        }
      }
    }

    return {
      positions: pos,
      colors: cols,
      linePositions: linePos.slice(0, lineIndex * 6),
      lineColors: lineCol.slice(0, lineIndex * 6),
      lineCount: lineIndex,
    };
  }, [particleCount, color1, color2]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Smooth, elegant rotation
    groupRef.current.rotation.y = time * 0.15;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    groupRef.current.rotation.z = Math.cos(time * 0.08) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines - using BufferGeometry for performance */}
      {lineCount > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={lineCount * 2}
              array={linePositions}
              itemSize={3}
              args={[linePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              count={lineCount * 2}
              array={lineColors}
              itemSize={3}
              args={[lineColors, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            linewidth={1}
          />
        </lineSegments>
      )}

      {/* Particle points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          transparent
          opacity={0.8}
          vertexColors
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
