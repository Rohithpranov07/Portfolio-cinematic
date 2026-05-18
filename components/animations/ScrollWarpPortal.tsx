"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  /** Label shown in the void during the warp. */
  label?: React.ReactNode;
  /** Background color of the void. */
  voidColor?: string;
  /** Accent color for slats / depth frames. */
  accent?: string;
  /** Total scroll distance the transition occupies. */
  scrollDistance?: string;
};

const DEPTH_FRAMES = 7;

export const ScrollWarpPortal: React.FC<Props> = ({
  label,
  voidColor = "#050505",
  accent = "#c8a882",
  scrollDistance = "+=260%",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(stageRef.current, { perspective: 1600 });

      const frameEls = framesRef.current
        ? Array.from(framesRef.current.children)
        : [];
      const beamEls = beamsRef.current
        ? Array.from(beamsRef.current.children)
        : [];

      // Frames start tiny at center, invisible
      gsap.set(frameEls, (i: number) => ({
        scale: 0.12,
        opacity: 0,
        force3D: true,
        zIndex: DEPTH_FRAMES - i,
      }));

      gsap.set(labelRef.current, {
        scale: 0.7,
        opacity: 0,
        force3D: true,
      });

      gsap.set(haloRef.current, {
        scale: 0.3,
        opacity: 0,
        force3D: true,
      });

      gsap.set(glowRef.current, {
        opacity: 0,
        force3D: true,
      });

      gsap.set(vignetteRef.current, {
        opacity: 1,
      });

      gsap.set(beamEls, {
        opacity: 0,
        scaleY: 0.4,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", force3D: true },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 2.2,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // 1. Vignette lifts gently as the portal awakens (0 → 0.18)
      tl.to(
        vignetteRef.current,
        { opacity: 0.45, duration: 0.18, ease: "sine.inOut" },
        0
      );

      // 2. Halo glow blooms outward (0 → 0.35)
      tl.to(
        haloRef.current,
        {
          scale: 1.4,
          opacity: 0.7,
          duration: 0.35,
          ease: "sine.out",
        },
        0
      );

      // 3. Frames: deterministic progress-driven update (no chained tweens — survives scrub reversal cleanly)
      const frameState = { p: 0 };
      const easeOut = gsap.parseEase("power2.out");
      const easeInOut = gsap.parseEase("sine.inOut");
      const easeIn = gsap.parseEase("power2.in");

      const updateFrames = () => {
        const p = frameState.p;
        frameEls.forEach((el, i) => {
          let scale: number;
          let opacity: number;
          const s0 = 0.12;
          const s1 = 0.55 + i * 0.32;
          const s2 = 0.7 + i * 0.36;
          const s3 = 2.6 + i * 0.7;
          const o1 = 0.95 - i * 0.11;

          if (p <= 0.05) {
            scale = s0;
            opacity = 0;
          } else if (p < 0.45) {
            const t = easeOut((p - 0.05) / 0.4);
            scale = s0 + (s1 - s0) * t;
            opacity = o1 * t;
          } else if (p < 0.5) {
            scale = s1;
            opacity = o1;
          } else if (p < 0.78) {
            const t = easeInOut((p - 0.5) / 0.28);
            scale = s1 + (s2 - s1) * t;
            opacity = o1;
          } else if (p < 0.95) {
            const t = easeIn((p - 0.78) / 0.17);
            scale = s2 + (s3 - s2) * t;
            opacity = o1 * (1 - t);
          } else {
            scale = s3;
            opacity = 0;
          }

          gsap.set(el, { scale, opacity, force3D: true });
        });
      };

      tl.to(
        frameState,
        {
          p: 1,
          duration: 1,
          ease: "none",
          onUpdate: updateFrames,
        },
        0
      );

      // 4. Subtle light beams sweep in (0.1 → 0.4)
      tl.to(
        beamEls,
        {
          opacity: 0.25,
          scaleY: 1,
          duration: 0.3,
          ease: "power1.out",
        },
        0.1
      );

      // 5. Label warps in (0.2 → 0.5) — slower, more elegant
      tl.to(
        labelRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.2
      );

      // 6. White flash ignites (0.78 → 0.92)
      tl.to(
        glowRef.current,
        { opacity: 1, duration: 0.14, ease: "power2.in" },
        0.78
      );

      // 10. Label drifts forward & dissolves
      tl.to(
        labelRef.current,
        {
          scale: 1.18,
          opacity: 0,
          duration: 0.17,
          ease: "power2.in",
        },
        0.78
      );

      // 11. Halo expands & dissolves
      tl.to(
        haloRef.current,
        { scale: 2.8, opacity: 0, duration: 0.17, ease: "power2.in" },
        0.78
      );

      // 12. Beams fade
      tl.to(
        beamEls,
        { opacity: 0, duration: 0.14, ease: "power2.in" },
        0.78
      );

      // 13. Glow gently fades, revealing next page (0.92 → 1)
      tl.to(
        glowRef.current,
        { opacity: 0, duration: 0.16, ease: "sine.inOut" },
        0.92
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "340vh" }}
      aria-label="Warp transition"
    >
      <div
        ref={stageRef}
        className="relative w-screen h-screen overflow-hidden"
        style={{
          backgroundColor: voidColor,
        }}
      >
        {/* Base atmosphere: subtle radial fall-off */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${accent}0d 0%, transparent 55%)`,
          }}
        />

        {/* Soft vertical light beams (decorative depth) */}
        <div
          ref={beamsRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: "1px",
                height: "120vh",
                left: `${20 + i * 20}%`,
                background: `linear-gradient(to bottom, transparent 0%, ${accent}66 50%, transparent 100%)`,
                filter: "blur(1.5px)",
              }}
            />
          ))}
        </div>

        {/* Outer vignette for cinematic framing */}
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 35%, ${voidColor} 85%)`,
          }}
        />

        {/* Radial halo glow */}
        <div
          ref={haloRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            width: "70vmin",
            height: "70vmin",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}55 0%, ${accent}11 35%, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />

        {/* Concentric depth frames (the tunnel) */}
        <div
          ref={framesRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: DEPTH_FRAMES }).map((_, i) => (
            <div
              key={i}
              className="absolute will-change-transform"
              style={{
                width: "68vmin",
                height: "40vmin",
                border: `1px solid ${accent}`,
                borderRadius: 8,
                boxShadow: `0 0 80px ${accent}22 inset, 0 0 24px ${accent}1a`,
                background: `linear-gradient(135deg, ${accent}05 0%, transparent 60%)`,
              }}
            />
          ))}
        </div>

        {/* Center label */}
        <div
          ref={labelRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform text-center z-10"
          style={{
            color: "#f4ede0",
            textShadow: `0 0 40px ${accent}55, 0 0 80px ${accent}33`,
          }}
        >
          {label}
        </div>

        {/* Final white flash (bright fade-out) */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-white"
        />
      </div>
    </section>
  );
};

export default ScrollWarpPortal;
