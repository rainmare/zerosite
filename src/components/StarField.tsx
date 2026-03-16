"use client";

import { useEffect, useRef } from "react";

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    type Star = {
      x: number;
      y: number;
      r: number;
      base: number;
      twinkle: number;
      fall: number;
      drift: number;
      driftAmp: number;
      phase: number;
    };

    const stars: Star[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createStars() {
      stars.length = 0;
      const count = Math.floor((canvas!.width * canvas!.height) / 14000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: 0.3 + Math.random() * 1.1,
          base: 0.12 + Math.random() * 0.4,
          twinkle: 0.3 + Math.random() * 0.7,
          fall: 0.04 + Math.random() * 0.12,
          drift: 0.2 + Math.random() * 0.6,
          driftAmp: 8 + Math.random() * 20,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const s of stars) {
        s.y += s.fall;
        if (s.y > canvas!.height + 5) {
          s.y = -3;
          s.x = Math.random() * canvas!.width;
        }

        const dx = Math.sin(time * 0.0004 * s.drift + s.phase) * s.driftAmp;
        const drawX = s.x + dx;
        const flicker = Math.sin(time * 0.001 * s.twinkle + s.phase) * 0.12;
        const alpha = Math.max(0.04, s.base + flicker);

        if (s.r > 0.8) {
          ctx!.beginPath();
          ctx!.arc(drawX, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${alpha * 0.07})`;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(drawX, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    createStars();
    animationId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      createStars();
    };
    window.addEventListener("resize", onResize);

    const observer = new ResizeObserver(onResize);
    observer.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
