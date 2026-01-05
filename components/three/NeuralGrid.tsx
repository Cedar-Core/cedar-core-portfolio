"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralGridProps {
  size?: number;
  divisions?: number;
  color?: string;
  glowColor?: string;
}

export function NeuralGrid({
  size = 25,
  divisions = 60,
  color = "#8b5cf6",
  glowColor = "#a78bfa",
}: NeuralGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Smooth, responsive mouse tracking
  useFrame(() => {
    if (mouseRef.current) {
      mouseRef.current.x += (mouse.x * viewport.width * 0.5 - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouse.y * viewport.height * 0.5 - mouseRef.current.y) * 0.08;
    }
  });

  // Create premium grid geometry and material
  const { geometry, material } = useMemo(() => {
    const actualDivisions = Math.min(divisions, 60);
    const geo = new THREE.PlaneGeometry(size, size, actualDivisions, actualDivisions);
    
    const c1 = new THREE.Color(color);
    const c2 = new THREE.Color(glowColor);
    const c3 = new THREE.Color("#60a5fa"); // Accent blue
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
        uViewport: { value: new THREE.Vector2(viewport.width, viewport.height) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uViewport;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vElevation;
        varying vec2 vUV;
        
        void main() {
          vPosition = position;
          vUV = uv;
          
          // Calculate mouse influence with perspective-aware scaling
          vec2 mouseWorldPos = uMouse;
          vec2 delta = mouseWorldPos - position.xz;
          float mouseDist = length(delta);
          
          // Multi-layered ripple system for depth
          float ripple1 = sin(mouseDist * 4.0 - uTime * 3.0) * exp(-mouseDist * 0.6) * 0.9;
          float ripple2 = sin(mouseDist * 6.0 - uTime * 4.0 + 1.5) * exp(-mouseDist * 0.8) * 0.4;
          float mouseWave = (ripple1 + ripple2) * smoothstep(8.0, 0.0, mouseDist);
          
          // Organic flowing waves
          float wave1 = sin(position.x * 0.4 + uTime * 0.6) * 0.12;
          float wave2 = cos(position.z * 0.4 + uTime * 0.4) * 0.12;
          float wave3 = sin((position.x * 0.7 + position.z * 0.5) * 0.35 + uTime * 0.5) * 0.15;
          float wave4 = cos((position.x * 0.5 - position.z * 0.7) * 0.3 + uTime * 0.35) * 0.1;
          
          // Combine all wave systems
          float elevation = mouseWave + wave1 + wave2 + wave3 + wave4;
          vElevation = elevation;
          
          // Store world position for fragment shader
          vWorldPosition = position;
          
          // Displace vertices smoothly
          vec3 newPosition = position;
          newPosition.y = elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vElevation;
        varying vec2 vUV;
        
        void main() {
          // Enhanced grid pattern with anti-aliasing
          vec2 gridScale = vec2(0.25);
          vec2 gridUV = vWorldPosition.xz * gridScale;
          vec2 grid = abs(fract(gridUV - 0.5) - 0.5) / fwidth(gridUV);
          float gridLine = min(grid.x, grid.y);
          float gridAlpha = 1.0 - smoothstep(0.0, 1.5, gridLine);
          
          // Elevation-based glow with smooth transitions
          float normalizedElevation = (vElevation + 0.3) / 1.2;
          float glow = smoothstep(0.0, 0.7, normalizedElevation);
          float peakGlow = smoothstep(0.4, 1.0, normalizedElevation);
          
          // Dynamic color mixing based on elevation and position
          vec3 colorA = mix(uColor1, uColor2, glow * 0.6);
          vec3 colorB = mix(colorA, uColor3, peakGlow * 0.4);
          
          // Pulsing effect at peaks
          float pulse = sin(vElevation * 10.0 + uTime * 3.0) * 0.5 + 0.5;
          pulse = pow(pulse, 2.0) * peakGlow;
          
          // Distance-based depth fade
          float distFromCenter = length(vWorldPosition.xz);
          float distFade = 1.0 - smoothstep(6.0, 14.0, distFromCenter);
          
          // Fresnel-like edge glow
          vec2 center = vec2(0.0);
          float distFromMouse = length(uMouse - vWorldPosition.xz);
          float mouseGlow = exp(-distFromMouse * 0.3) * 0.5;
          
          // Combine all color contributions
          vec3 baseColor = uColor1 * 0.25;
          vec3 gridColor = colorB;
          vec3 glowColor = uColor2 * (glow * 0.8 + pulse * 0.4);
          vec3 mouseColor = uColor3 * mouseGlow;
          
          vec3 finalColor = baseColor + gridColor * gridAlpha * 0.6 + glowColor + mouseColor;
          
          // Alpha calculation with multiple factors
          float gridAlphaFinal = gridAlpha * 0.5;
          float elevationAlpha = glow * 0.6 + peakGlow * 0.4;
          float mouseAlpha = mouseGlow * 0.3;
          float alpha = (gridAlphaFinal + elevationAlpha + mouseAlpha) * distFade;
          
          // Ensure alpha is within valid range
          alpha = clamp(alpha, 0.0, 1.0);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, [size, divisions, color, glowColor]);

  // Animate the shader with smooth time progression
  useFrame((state) => {
    if (meshRef.current && material) {
      timeRef.current = state.clock.elapsedTime;
      const shaderMaterial = material as THREE.ShaderMaterial;
      shaderMaterial.uniforms.uTime.value = timeRef.current;
      shaderMaterial.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.5, 0]}
    />
  );
}
