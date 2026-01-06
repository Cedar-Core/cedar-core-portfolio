"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

export function LightRays({ className, intensity = 1, speed = 1 }: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const rays: Array<{ x: number; y: number; angle: number; length: number }> = [];

    // Create rays
    for (let i = 0; i < 8; i++) {
      rays.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: (Math.PI * 2 * i) / 8 + Math.random() * 0.5,
        length: 200 + Math.random() * 300,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      ctx.save();
      ctx.globalAlpha = 0.3 * intensity;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
      ctx.lineWidth = 2;

      rays.forEach((ray, index) => {
        const offsetX = Math.sin(time + index) * 50;
        const offsetY = Math.cos(time + index) * 50;

        ctx.beginPath();
        ctx.moveTo(ray.x + offsetX, ray.y + offsetY);
        ctx.lineTo(
          ray.x + offsetX + Math.cos(ray.angle) * ray.length,
          ray.y + offsetY + Math.sin(ray.angle) * ray.length
        );
        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(59, 130, 246, 0.6)";
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ mixBlendMode: "screen" }}
    />
  );
}

