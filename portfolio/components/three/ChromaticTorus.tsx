"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ChromaticTorusProps {
  radius?: number;
  tube?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  rotationSpeed?: number;
}

export function ChromaticTorus({
  radius = 1.5,
  tube = 0.15,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  rotationSpeed = 0.2,
}: ChromaticTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.TorusGeometry(radius, tube, 64, 128);
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vViewDirection = normalize(cameraPosition - worldPosition.xyz);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;
        varying vec2 vUv;
        
        // Rainbow/chromatic color based on angle
        vec3 rainbow(float t) {
          vec3 c = vec3(1.0);
          c.r = sin(t * 6.28318 + 0.0) * 0.5 + 0.5;
          c.g = sin(t * 6.28318 + 2.094) * 0.5 + 0.5;
          c.b = sin(t * 6.28318 + 4.188) * 0.5 + 0.5;
          return c;
        }
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewDirection);
          
          // Fresnel for edge highlight
          float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 2.5);
          
          // Reflection direction for environment-like effect
          vec3 reflection = reflect(-viewDir, normal);
          
          // Chromatic aberration based on reflection and normal
          float angle = atan(reflection.y, reflection.x) / 6.28318 + 0.5;
          float verticalAngle = reflection.z * 0.5 + 0.5;
          
          // Combine angles for iridescence
          float iridescence = angle + verticalAngle * 0.3 + uTime * 0.05;
          
          // Rainbow colors
          vec3 rainbowColor = rainbow(iridescence);
          
          // Chrome/metallic base - bright silver
          vec3 chrome = vec3(0.9, 0.9, 0.95);
          
          // Specular highlights
          vec3 lightDir1 = normalize(vec3(1.0, 1.0, 1.0));
          vec3 lightDir2 = normalize(vec3(-1.0, 0.5, 0.5));
          float spec1 = pow(max(dot(reflection, lightDir1), 0.0), 64.0);
          float spec2 = pow(max(dot(reflection, lightDir2), 0.0), 32.0);
          
          // Combine chrome with rainbow iridescence
          vec3 baseColor = chrome * 0.3;
          baseColor += rainbowColor * 0.5;
          baseColor += chrome * fresnel * 0.4;
          
          // Add specular highlights
          baseColor += vec3(1.0) * spec1 * 0.8;
          baseColor += vec3(0.8, 0.7, 1.0) * spec2 * 0.4;
          
          // Edge glow with rainbow
          baseColor += rainbowColor * fresnel * 0.3;
          
          // Alpha - mostly opaque with slight transparency at edges
          float alpha = 0.85 + fresnel * 0.1;
          
          gl_FragColor = vec4(baseColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    return { geometry: geo, material: mat };
  }, [radius, tube]);

  useFrame((state) => {
    if (meshRef.current && material) {
      const time = state.clock.elapsedTime;
      (material as THREE.ShaderMaterial).uniforms.uTime.value = time;
      
      // Smooth rotation
      meshRef.current.rotation.x = rotation[0] + time * rotationSpeed * 0.5;
      meshRef.current.rotation.y = rotation[1] + time * rotationSpeed;
      meshRef.current.rotation.z = rotation[2] + time * rotationSpeed * 0.3;
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

