"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlassTorusProps {
  radius?: number;
  tube?: number;
  radialSegments?: number;
  tubularSegments?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
  color?: string;
}

export function GlassTorus({
  radius = 1.5,
  tube = 0.3,
  radialSegments = 64,
  tubularSegments = 48,
  position = [0, 0, 0],
  rotationSpeed = 0.3,
  color = "#8b5cf6",
}: GlassTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
    
    const baseColor = new THREE.Color(color);
    const accentColor = new THREE.Color("#a78bfa");
    const highlightColor = new THREE.Color("#ffffff");
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: baseColor },
        uColor2: { value: accentColor },
        uColor3: { value: highlightColor },
        uIntensity: { value: 1.2 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vWorldNormal = normalize(normalMatrix * normal);
          vViewPosition = cameraPosition - worldPosition.xyz;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uIntensity;
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
        varying vec3 vViewPosition;
        
        void main() {
          // Normalize vectors
          vec3 viewDir = normalize(vViewPosition);
          vec3 normal = normalize(vWorldNormal);
          
          // Fresnel effect for edge glow
          float fresnel = pow(1.0 - dot(viewDir, normal), 2.0);
          
          // Iridescent effect based on viewing angle
          float iridescent = dot(normal, viewDir) * 0.5 + 0.5;
          
          // Base glass color with transparency
          vec3 glassColor = mix(uColor1, uColor2, fresnel * 0.6);
          
          // Iridescent highlight
          vec3 iridescentColor = mix(
            uColor2,
            uColor3,
            sin(iridescent * 3.14159 + uTime) * 0.5 + 0.5
          );
          
          // Combine colors
          vec3 finalColor = glassColor + iridescentColor * fresnel * 0.4;
          
          // Edge glow intensity
          float edgeGlow = fresnel * 2.0;
          finalColor += uColor3 * edgeGlow * 0.3;
          
          // Glass transparency with fresnel - more translucent in center
          float alpha = 0.2 + fresnel * 0.6 + edgeGlow * 0.3;
          alpha = clamp(alpha, 0.15, 0.9);
          
          gl_FragColor = vec4(finalColor * uIntensity, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [radius, tube, radialSegments, tubularSegments, color]);

  useFrame((state) => {
    if (meshRef.current) {
      timeRef.current = state.clock.elapsedTime;
      (material as THREE.ShaderMaterial).uniforms.uTime.value = timeRef.current;
      
      // Smooth rotation
      meshRef.current.rotation.x = timeRef.current * rotationSpeed * 0.3;
      meshRef.current.rotation.y = timeRef.current * rotationSpeed;
      meshRef.current.rotation.z = timeRef.current * rotationSpeed * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
    />
  );
}

