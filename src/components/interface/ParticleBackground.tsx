"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update: (
    mouse: {
      x: number | null;
      y: number | null;
      radius: number;
    },
    canvas: HTMLCanvasElement
  ) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ✅ Safe references (not nullable anymore)
    const safeCanvas = canvas as HTMLCanvasElement;
    const safeCtx = ctx as CanvasRenderingContext2D;

    safeCanvas.width = window.innerWidth;
    safeCanvas.height = window.innerHeight;

    let particlesArray: Particle[] = [];
    const numberOfParticles = 100;

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.5})`;
      }

      update(
        mouse: { x: number | null; y: number | null; radius: number },
        canvas: HTMLCanvasElement
      ) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            this.speedX = dx * 0.05;
            this.speedY = dy * 0.05;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new ParticleImpl(safeCanvas));
      }
    }

    function animate() {
      safeCtx.clearRect(0, 0, safeCanvas.width, safeCanvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouse, safeCanvas);
        particlesArray[i].draw(safeCtx);
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    init();
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      safeCanvas.width = window.innerWidth;
      safeCanvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-30"></canvas>
  );
}
