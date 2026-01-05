"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidMirrorProps {
  position?: [number, number, number];
  scale?: number;
}

export function LiquidMirror({
  position = [0, 0, 0],
  scale = 1,
}: LiquidMirrorProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Smooth mouse tracking
  useFrame(() => {
    mouseRef.current.x += (mouse.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouse.y - mouseRef.current.y) * 0.05;
  });

  const { geometry, material } = useMemo(() => {
    // Use icosahedron for organic feel, high detail
    const geo = new THREE.IcosahedronGeometry(1.5, 64);
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        // Chromatic colors for iridescence
        uColor1: { value: new THREE.Color("#8b5cf6") }, // Purple
        uColor2: { value: new THREE.Color("#06b6d4") }, // Cyan
        uColor3: { value: new THREE.Color("#ec4899") }, // Pink
        uColor4: { value: new THREE.Color("#f97316") }, // Orange
        uColor5: { value: new THREE.Color("#22c55e") }, // Green
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;
        varying float vDisplacement;
        
        // Simplex noise functions
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Multi-frequency noise for organic liquid movement
          float slowTime = uTime * 0.3;
          float noise1 = snoise(position * 0.8 + slowTime * 0.5) * 0.15;
          float noise2 = snoise(position * 1.5 + slowTime * 0.7) * 0.08;
          float noise3 = snoise(position * 2.5 + slowTime * 0.9) * 0.04;
          
          // Mouse influence - subtle bulge toward mouse
          float mouseInfluence = (uMouse.x * normal.x + uMouse.y * normal.y) * 0.1;
          
          // Combined displacement
          float displacement = noise1 + noise2 + noise3 + mouseInfluence;
          vDisplacement = displacement;
          
          // Displace along normal
          vec3 newPosition = position + normal * displacement;
          
          vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
          vWorldPosition = worldPosition.xyz;
          vViewDirection = normalize(cameraPosition - worldPosition.xyz);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;
        varying float vDisplacement;
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewDirection);
          
          // Fresnel effect - strong edge glow
          float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
          
          // Iridescence based on view angle and normal
          float iridescenceAngle = dot(normal, viewDir);
          float iridescence = iridescenceAngle * 0.5 + 0.5;
          
          // Time-based color shift
          float colorShift = sin(uTime * 0.5 + iridescence * 6.28318) * 0.5 + 0.5;
          float colorShift2 = sin(uTime * 0.3 + iridescence * 6.28318 + 2.0) * 0.5 + 0.5;
          
          // Chromatic color mixing - rainbow effect
          vec3 color1 = mix(uColor1, uColor2, colorShift);
          vec3 color2 = mix(uColor3, uColor4, colorShift2);
          vec3 baseColor = mix(color1, color2, iridescence);
          
          // Add subtle green accent
          baseColor = mix(baseColor, uColor5, sin(iridescence * 3.14159 + uTime) * 0.15 + 0.1);
          
          // Reflection simulation - bright highlights
          float highlight = pow(max(dot(reflect(-viewDir, normal), vec3(0.5, 1.0, 0.5)), 0.0), 32.0);
          
          // Edge glow with chromatic aberration feel
          vec3 edgeColor = mix(uColor1, uColor2, fresnel);
          
          // Displacement-based color variation
          float dispColor = vDisplacement * 2.0 + 0.5;
          
          // Combine all effects
          vec3 finalColor = baseColor * 0.7;
          finalColor += edgeColor * fresnel * 0.8;
          finalColor += vec3(1.0) * highlight * 0.5;
          finalColor += baseColor * dispColor * 0.3;
          
          // Glass-like transparency with fresnel
          float alpha = 0.6 + fresnel * 0.35 + highlight * 0.2;
          alpha = clamp(alpha, 0.5, 0.95);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (meshRef.current && material) {
      const time = state.clock.elapsedTime;
      (material as THREE.ShaderMaterial).uniforms.uTime.value = time;
      (material as THREE.ShaderMaterial).uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );
      
      // Subtle rotation
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
    />
  );
}

