"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FlowingRibbonProps {
  path: (t: number) => [number, number, number];
  width?: number;
  colorStart?: string;
  colorEnd?: string;
  delay?: number;
}

function FlowingRibbon({ path, width = 0.15, colorStart = "#22c55e", colorEnd = "#ec4899", delay = 0 }: FlowingRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { geometry, material } = useMemo(() => {
    // Create ribbon geometry along a curve
    const points: THREE.Vector3[] = [];
    const segments = 128;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const [x, y, z] = path(t);
      points.push(new THREE.Vector3(x, y, z));
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, segments, width, 16, false);
    
    const c1 = new THREE.Color(colorStart);
    const c2 = new THREE.Color(colorEnd);
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uDelay: { value: delay },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewDirection;
        varying float vU;
        
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vViewDirection = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
          vU = uv.x;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uDelay;
        
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewDirection;
        varying float vU;
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewDirection);
          
          // Fresnel for edge glow
          float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 2.0);
          
          // Gradient along ribbon
          float gradient = vU;
          
          // Animated color shift
          float timeShift = sin(uTime * 0.5 + uDelay) * 0.5 + 0.5;
          
          // Color mixing
          vec3 color = mix(uColor1, uColor2, gradient + timeShift * 0.3);
          
          // Specular highlight
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          vec3 reflection = reflect(-viewDir, normal);
          float specular = pow(max(dot(reflection, lightDir), 0.0), 32.0);
          
          // Final color with gloss
          vec3 finalColor = color;
          finalColor += vec3(1.0) * specular * 0.6;
          finalColor += color * fresnel * 0.4;
          
          float alpha = 0.9 + fresnel * 0.1;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    
    return { geometry: tubeGeometry, material: mat };
  }, [path, width, colorStart, colorEnd, delay]);
  
  useFrame((state) => {
    if (meshRef.current && material) {
      (material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export function FlowingRibbons() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  // Define flowing paths for ribbons
  const ribbon1 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2;
    return [
      Math.cos(angle) * 1.5 + 0.5,
      Math.sin(angle * 2) * 0.8,
      Math.sin(angle) * 0.5,
    ];
  };
  
  const ribbon2 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2 + Math.PI * 0.3;
    return [
      Math.cos(angle) * 1.3 + 0.3,
      Math.sin(angle * 1.5) * 0.6 - 0.2,
      Math.sin(angle * 0.8) * 0.4,
    ];
  };
  
  const ribbon3 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2 + Math.PI * 0.6;
    return [
      Math.cos(angle) * 1.1 + 0.1,
      Math.sin(angle * 2.5) * 0.5 + 0.3,
      Math.sin(angle * 1.2) * 0.3,
    ];
  };
  
  const ribbon4 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2 + Math.PI;
    return [
      Math.cos(angle) * 1.4 + 0.4,
      Math.sin(angle * 1.8) * 0.7 - 0.1,
      Math.sin(angle * 0.6) * 0.6,
    ];
  };
  
  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Green to Yellow */}
      <FlowingRibbon path={ribbon1} width={0.18} colorStart="#22c55e" colorEnd="#eab308" delay={0} />
      
      {/* Yellow to Orange */}
      <FlowingRibbon path={ribbon2} width={0.16} colorStart="#eab308" colorEnd="#f97316" delay={0.5} />
      
      {/* Orange to Pink */}
      <FlowingRibbon path={ribbon3} width={0.14} colorStart="#f97316" colorEnd="#ec4899" delay={1.0} />
      
      {/* Pink to Blue */}
      <FlowingRibbon path={ribbon4} width={0.12} colorStart="#ec4899" colorEnd="#3b82f6" delay={1.5} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-3, 3, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -5, 3]} intensity={1.0} color="#ffffff" />
    </group>
  );
}

