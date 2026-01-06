"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: boolean;
}

export function GradientMesh({
  className,
  colors = [
    "rgba(59, 130, 246, 0.3)",
    "rgba(139, 92, 246, 0.3)",
    "rgba(236, 72, 153, 0.3)",
    "rgba(251, 146, 60, 0.3)",
  ],
  speed = 1,
  blur = true,
}: GradientMeshProps) {
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
    const gradients: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }> = [];

    // Create gradient points
    colors.forEach((color, index) => {
      gradients.push({
        x: (canvas.width / colors.length) * index + canvas.width / (colors.length * 2),
        y: canvas.height / 2,
        radius: 300 + Math.random() * 200,
        color,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      if (blur) {
        ctx.filter = "blur(60px)";
      }

      gradients.forEach((gradient) => {
        gradient.x += gradient.vx * speed;
        gradient.y += gradient.vy * speed + Math.sin(time) * 2;

        // Bounce off edges
        if (gradient.x < 0 || gradient.x > canvas.width) gradient.vx *= -1;
        if (gradient.y < 0 || gradient.y > canvas.height) gradient.vy *= -1;

        const radialGradient = ctx.createRadialGradient(
          gradient.x,
          gradient.y,
          0,
          gradient.x,
          gradient.y,
          gradient.radius
        );
        radialGradient.addColorStop(0, gradient.color);
        radialGradient.addColorStop(1, "transparent");

        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      ctx.filter = "none";
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, speed, blur]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    />
  );
}

