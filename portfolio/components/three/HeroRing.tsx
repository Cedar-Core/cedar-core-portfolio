"use client";

import { useRef } from "react";
import { Float, Environment } from "@react-three/drei";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

export function HeroRing(props: any) {
    const group = useRef<Group>(null);

    useFrame((state) => {
        if (group.current) {
            // "Subconscious" rotation - slightly faster now
            group.current.rotation.x = state.clock.getElapsedTime() * 0.12;
            group.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* === ENVIRONMENT === */}
            {/* 'studio' removes warm city noise. Essential for the "cold" look. */}
            <Environment preset="studio" />

            {/* === LIGHTING HIERARCHY === */}

            {/* 1. KEY LIGHT (The Definer) - High angle, cool white, creates form */}
            <spotLight
                position={[15, 15, 5]}
                angle={0.2}
                penumbra={1}
                intensity={3.0}
                color="#f8fafc"
                castShadow
            />

            {/* 2. RIM LIGHT (The Stylizer) - Strong Electric Blue, defines silhouette */}
            <spotLight
                position={[-5, 2, -10]}
                angle={0.6}
                penumbra={0.5}
                intensity={4.0}
                color="#3b82f6"
                distance={30}
            />

            {/* 3. FILL LIGHT (The Atmosphere) - Very dim, deep blue/slate, prevents black holes */}
            <pointLight position={[-10, -10, 5]} intensity={0.2} color="#1e293b" />

            {/* 4. NEW ACCENT LIGHTS - Colorful additions */}
            <pointLight position={[10, 0, -5]} intensity={5.0} color="#a855f7" distance={20} />
            <pointLight position={[-10, 5, 5]} intensity={5.0} color="#22d3ee" distance={20} />

            <Float
                speed={1.0}             // Gentle float
                rotationIntensity={0.1} // Minimal extra rotation
                floatIntensity={0.3}
                floatingRange={[-0.05, 0.05]} // Tight float range
            >
                {/* Procedural Geometry - Scaled down for background */}
                <mesh scale={0.85}>
                    <torusKnotGeometry args={[1, 0.22, 256, 32, 2, 3]} />
                    <meshPhysicalMaterial
                        color="#f8fafc"        // Slate 50 - Cool neutral
                        metalness={0.9}        // 0.9 = conceptual metal, 1.0 = mirror
                        roughness={0.2}        // 0.2 = polished but styled
                        clearcoat={0.5}        // Reduced clearcoat for less "wet" look
                        clearcoatRoughness={0.1}
                        reflectivity={0.5}     // Clamped reflection
                        envMapIntensity={1.0}  // Clamped environment
                        ior={1.45}
                        transmission={0}
                    />
                </mesh>
            </Float>
        </group>
    );
}
