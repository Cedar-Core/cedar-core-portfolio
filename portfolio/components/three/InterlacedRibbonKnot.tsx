"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface RibbonProps {
  path: (t: number) => [number, number, number];
  width?: number;
  segments?: number;
  colorShift?: number;
}

function GlossyRibbon({ path, width = 0.12, segments = 512, colorShift = 0 }: RibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const { geometry, material } = useMemo(() => {
    // Create ultra-smooth curve from path function
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const [x, y, z] = path(t);
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points, true);
    // Higher radial segments for smoother surface
    const tubeGeometry = new THREE.TubeGeometry(curve, segments, width, 64, true);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#0ea5e9") }, // Cyan
        uColor2: { value: new THREE.Color("#3b82f6") }, // Blue
        uColor3: { value: new THREE.Color("#06b6d4") }, // Teal
        uColor4: { value: new THREE.Color("#22d3ee") }, // Light cyan
        uColorShift: { value: colorShift },
        uCameraPosition: { value: new THREE.Vector3() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;
        varying vec3 vWorldNormal;
        varying vec2 vUv;
        varying float vCurvature;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vPosition = position;
          vUv = uv;
          
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vViewDirection = normalize(cameraPosition - worldPosition.xyz);
          
          // Calculate curvature for enhanced reflections
          vec3 tangent = normalize(dFdx(vWorldPosition) + dFdy(vWorldPosition));
          vCurvature = abs(dot(vWorldNormal, tangent));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform float uColorShift;
        uniform vec3 uCameraPosition;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;
        varying vec3 vWorldNormal;
        varying vec2 vUv;
        varying float vCurvature;
        
        // Smooth color interpolation
        vec3 getChromaticColor(float t) {
          t = fract(t + uColorShift);
          float segment = t * 4.0;
          
          if (segment < 1.0) {
            return mix(uColor1, uColor2, segment);
          } else if (segment < 2.0) {
            return mix(uColor2, uColor3, segment - 1.0);
          } else if (segment < 3.0) {
            return mix(uColor3, uColor4, segment - 2.0);
          } else {
            return mix(uColor4, uColor1, segment - 3.0);
          }
        }
        
        // Simulated environment map
        vec3 sampleEnvironment(vec3 direction) {
          // Simulate a blue-tinted environment
          float up = max(direction.y, 0.0);
          float down = max(-direction.y, 0.0);
          
          vec3 skyColor = vec3(0.05, 0.1, 0.15);
          vec3 groundColor = vec3(0.02, 0.05, 0.08);
          
          return mix(groundColor, skyColor, up);
        }
        
        // PBR-like fresnel calculation
        float fresnelSchlick(vec3 viewDir, vec3 normal, float power) {
          return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
        }
        
        // Enhanced specular calculation
        float specularGGX(vec3 normal, vec3 viewDir, vec3 lightDir, float roughness) {
          vec3 halfDir = normalize(viewDir + lightDir);
          float NdotH = max(dot(normal, halfDir), 0.0);
          float NdotV = max(dot(normal, viewDir), 0.0);
          float NdotL = max(dot(normal, lightDir), 0.0);
          
          float alpha = roughness * roughness;
          float alpha2 = alpha * alpha;
          
          float denom = (NdotH * NdotH * (alpha2 - 1.0) + 1.0);
          float spec = alpha2 / (3.14159 * denom * denom);
          
          return spec * NdotL;
        }
        
        void main() {
          vec3 normal = normalize(vWorldNormal);
          vec3 viewDir = normalize(vViewDirection);
          
          // Enhanced Fresnel with multiple layers
          float fresnel1 = fresnelSchlick(viewDir, normal, 2.5);
          float fresnel2 = fresnelSchlick(viewDir, normal, 4.0);
          float fresnel = fresnel1 * 0.7 + fresnel2 * 0.3;
          
          // Reflection direction
          vec3 reflection = reflect(-viewDir, normal);
          
          // Chromatic aberration based on reflection angle
          float angle = atan(reflection.y, reflection.x) / 6.28318 + 0.5;
          float verticalAngle = reflection.z * 0.5 + 0.5;
          float uvOffset = vUv.x * 2.0 - 1.0;
          float iridescence = angle + verticalAngle * 0.5 + uTime * 0.05 + uvOffset * 0.3 + uColorShift;
          
          // Get chromatic color
          vec3 chromaticColor = getChromaticColor(iridescence);
          
          // Metallic chrome base with blue tint
          vec3 chrome = vec3(0.88, 0.92, 1.0);
          
          // Multiple light sources for realistic lighting
          vec3 lightDir1 = normalize(vec3(1.0, 1.2, 1.0));
          vec3 lightDir2 = normalize(vec3(-0.8, 0.6, 0.9));
          vec3 lightDir3 = normalize(vec3(0.0, -1.0, 0.5));
          vec3 lightDir4 = normalize(vec3(0.5, 1.0, -0.5));
          
          // Specular highlights with varying roughness
          float spec1 = specularGGX(normal, viewDir, lightDir1, 0.02);
          float spec2 = specularGGX(normal, viewDir, lightDir2, 0.05);
          float spec3 = specularGGX(normal, viewDir, lightDir3, 0.1);
          float spec4 = specularGGX(normal, viewDir, lightDir4, 0.15);
          
          // Environment reflection
          vec3 envColor = sampleEnvironment(reflection);
          vec3 envReflection = envColor * 0.3;
          
          // Base color composition
          vec3 baseColor = chrome * 0.15;
          baseColor += chromaticColor * 0.5;
          baseColor += chrome * fresnel * 0.6;
          
          // Add environment reflection
          baseColor += envReflection;
          
          // Add multiple specular highlights with different colors
          baseColor += vec3(1.0, 1.0, 1.0) * spec1 * 2.5;
          baseColor += vec3(0.7, 0.85, 1.0) * spec2 * 1.2;
          baseColor += vec3(0.6, 0.9, 1.0) * spec3 * 0.8;
          baseColor += vec3(0.5, 0.8, 1.0) * spec4 * 0.4;
          
          // Chromatic edge glow with enhanced intensity
          baseColor += chromaticColor * fresnel * 0.6;
          
          // Curvature-based highlights (sharper edges = brighter)
          float curvatureHighlight = pow(1.0 - vCurvature, 2.0);
          baseColor += vec3(1.0) * curvatureHighlight * 0.3;
          
          // Subtle ambient occlusion
          float ao = smoothstep(0.0, 0.6, abs(dot(viewDir, normal)));
          baseColor *= 0.7 + ao * 0.3;
          
          // Rim light effect
          float rim = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
          baseColor += chromaticColor * rim * 0.4;
          
          // Tone mapping for HDR-like appearance
          baseColor = baseColor / (baseColor + vec3(1.0));
          baseColor = pow(baseColor, vec3(1.0 / 1.2));
          
          // Alpha - mostly opaque for visibility
          float alpha = 0.98 + fresnel * 0.02;
          
          gl_FragColor = vec4(baseColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      blending: THREE.NormalBlending,
    });

    return { geometry: tubeGeometry, material: mat };
  }, [path, width, segments, colorShift]);

  useFrame((state) => {
    if (meshRef.current && material) {
      const shaderMat = material as THREE.ShaderMaterial;
      shaderMat.uniforms.uTime.value = state.clock.elapsedTime;
      shaderMat.uniforms.uCameraPosition.value.copy(camera.position);
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export function InterlacedRibbonKnot() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow, smooth floating animation
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
      groupRef.current.rotation.z = Math.cos(time * 0.15) * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.08;
    }
  });

  // Create more complex, intertwined knot paths
  // These create an abstract, sculptural ribbon structure
  
  const knot1 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2;
    const r = 0.9;
    const x = r * (Math.sin(angle) + 2.0 * Math.sin(2.0 * angle));
    const y = r * (Math.cos(angle) - 2.0 * Math.cos(2.0 * angle));
    const z = r * (-Math.sin(3.0 * angle)) * 0.9;
    return [x * 0.6, y * 0.6, z * 0.6];
  };

  const knot2 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2 + Math.PI * 0.4;
    const r = 0.85;
    const x = r * (Math.sin(angle) + 2.0 * Math.sin(2.0 * angle));
    const y = r * (Math.cos(angle) - 2.0 * Math.cos(2.0 * angle));
    const z = r * (-Math.sin(3.0 * angle)) * 0.8;
    return [x * 0.6 + 0.12, y * 0.6 - 0.08, z * 0.6 + 0.1];
  };

  const knot3 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 2 + Math.PI * 0.8;
    const r = 0.8;
    const x = r * (Math.sin(angle) + 2.0 * Math.sin(2.0 * angle));
    const y = r * (Math.cos(angle) - 2.0 * Math.cos(2.0 * angle));
    const z = r * (-Math.sin(3.0 * angle)) * 0.7;
    return [x * 0.6 - 0.1, y * 0.6 + 0.1, z * 0.6 - 0.12];
  };

  // Additional flowing loops for complexity
  const loop1 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 4;
    const r = 0.7 + Math.sin(angle * 2.5) * 0.2;
    const x = Math.cos(angle) * r * 1.3;
    const y = Math.sin(angle * 1.8) * 0.5;
    const z = Math.sin(angle * 1.2) * r * 0.9;
    return [x, y, z];
  };

  const loop2 = (t: number): [number, number, number] => {
    const angle = t * Math.PI * 3 + Math.PI;
    const r = 0.65 + Math.cos(angle * 3) * 0.18;
    const x = Math.cos(angle * 1.5) * r * 1.1;
    const y = Math.sin(angle * 2.2) * 0.4 - 0.1;
    const z = Math.cos(angle) * r * 0.85;
    return [x, y, z];
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={2.2}>
      {/* Main interlaced knots with varying widths */}
      <GlossyRibbon path={knot1} width={0.1} segments={512} colorShift={0.0} />
      <GlossyRibbon path={knot2} width={0.095} segments={512} colorShift={0.25} />
      <GlossyRibbon path={knot3} width={0.09} segments={512} colorShift={0.5} />
      <GlossyRibbon path={loop1} width={0.085} segments={512} colorShift={0.75} />
      <GlossyRibbon path={loop2} width={0.08} segments={512} colorShift={1.0} />

      {/* Professional lighting setup */}
      <ambientLight intensity={0.25} color="#e0f2fe" />
      
      {/* Key light - main illumination (warm white) */}
      <directionalLight 
        position={[4, 5, 4]} 
        intensity={3.5} 
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Fill light - softer, from opposite side (cool blue) */}
      <directionalLight 
        position={[-3, 2, 5]} 
        intensity={1.8} 
        color="#e0f2fe"
        castShadow={false}
      />
      
      {/* Rim light - edge definition (cyan) */}
      <pointLight 
        position={[0, -4, -3]} 
        intensity={2.0} 
        color="#67e8f9"
        distance={10}
        decay={2}
      />
      
      {/* Accent lights for chromatic reflections */}
      <pointLight 
        position={[3, 1, -2]} 
        intensity={1.2} 
        color="#3b82f6" 
        distance={8}
        decay={2}
      />
      <pointLight 
        position={[-3, 2, -2]} 
        intensity={1.0} 
        color="#06b6d4" 
        distance={8}
        decay={2}
      />
      
      {/* Top light for highlights */}
      <pointLight 
        position={[0, 6, 2]} 
        intensity={1.5} 
        color="#ffffff" 
        distance={10}
        decay={2}
      />
      
      {/* Side accent lights */}
      <pointLight 
        position={[5, 0, 0]} 
        intensity={0.8} 
        color="#22d3ee" 
        distance={7}
        decay={2}
      />
      <pointLight 
        position={[-5, 1, 0]} 
        intensity={0.6} 
        color="#0ea5e9" 
        distance={7}
        decay={2}
      />
    </group>
  );
}
