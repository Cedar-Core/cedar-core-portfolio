"use client";

import { useEffect, useState, useRef } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { cn } from "@/lib/utils";

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

function SceneContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Scene3D({
  children,
  className,
  cameraPosition = [0, 0, 5],
  fov = 75,
}: Scene3DProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [key, setKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL context lost, attempting to restore...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
      setKey((prev) => prev + 1); // Force remount
    };

    const canvas = containerRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div ref={containerRef} className={cn("w-full h-full flex items-center justify-center", className)}>
        <div className="w-32 h-32 rounded-full bg-linear-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("w-full h-full", className)} key={key}>
      <Canvas
        key={key}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          // Handle context loss
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
        onError={(error) => {
          console.error("Three.js error:", error);
        }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
        <Suspense fallback={null}>
          <SceneContent>{children}</SceneContent>
        </Suspense>
      </Canvas>
    </div>
  );
}
