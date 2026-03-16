"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { SITE_NAME } from "@/lib/constants";
import { useAudio } from "./AudioProvider";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function EnterScreen({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);
  const { playAmbient } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (sessionStorage.getItem("site_entered") === "true") {
      setEntered(true);
    }
  }, []);

  useEffect(() => {
    if (entered) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Star = {
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      twinkleSpeed: number;
      fallSpeed: number;
      driftSpeed: number;
      driftAmp: number;
      phase: number;
    };

    const stars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.4 + Math.random() * 1.6,
        baseAlpha: 0.25 + Math.random() * 0.55,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        fallSpeed: 0.08 + Math.random() * 0.25,
        driftSpeed: 0.3 + Math.random() * 0.8,
        driftAmp: 10 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    function draw(t: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const s of stars) {
        s.y += s.fallSpeed;
        if (s.y > canvas!.height + 10) {
          s.y = -5;
          s.x = Math.random() * canvas!.width;
        }

        const driftX = Math.sin(t * 0.0005 * s.driftSpeed + s.phase) * s.driftAmp;
        const drawX = s.x + driftX;
        const alpha = s.baseAlpha + Math.sin(t * 0.001 * s.twinkleSpeed + s.phase) * 0.2;
        const a = Math.max(0.05, alpha);

        if (s.r > 1.0) {
          ctx!.beginPath();
          ctx!.arc(drawX, s.y, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${a * 0.08})`;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(drawX, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);

    const onResize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [entered]);

  function handleEnter() {
    try {
      playAmbient();
    } catch {
      // audio may fail, that's fine
    }
    sessionStorage.setItem("site_entered", "true");
    setFading(true);
    setTimeout(() => setEntered(true), 1200);
  }

  return (
    <>
      {/* Children always mounted */}
      <div style={{ visibility: entered ? "visible" : "hidden" }}>
        {children}
      </div>

      {/* Enter screen overlay */}
      {!entered && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            opacity: fading ? 0 : 1,
            transition: "opacity 1.2s ease-out",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
            <div style={{ fontSize: 36, marginBottom: 32, color: "#F97316" }}>
              ✦
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 5vw, 48px)",
              letterSpacing: "0.3em",
              color: "#F97316",
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              {SITE_NAME}
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              color: "#A1A1AA",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontStyle: "italic",
              letterSpacing: "0.05em",
              marginBottom: 64,
            }}>
              Full life path readings &amp; cosmic guidance
            </p>

            <button
              type="button"
              onClick={handleEnter}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "#A1A1AA",
                background: "transparent",
                border: "1px solid rgba(63,63,70,0.6)",
                padding: "16px 40px",
                borderRadius: 8,
                cursor: "pointer",
                position: "relative",
                zIndex: 20,
              }}
            >
              ENTER
            </button>

            <p style={{
              fontFamily: "var(--font-heading)",
              marginTop: 32,
              color: "#71717A",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}>
              Click to enter
            </p>
          </div>

          <div style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <div style={{ width: 64, height: 1, background: "linear-gradient(to right, transparent, rgba(63,63,70,0.5))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(249,115,22,0.4)" }} />
            <div style={{ width: 64, height: 1, background: "linear-gradient(to left, transparent, rgba(63,63,70,0.5))" }} />
          </div>
        </div>
      )}
    </>
  );
}
