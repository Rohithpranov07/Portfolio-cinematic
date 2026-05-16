"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

const SLATS = 12;
const DEPTH_FRAMES = 6;

export const ScrollWarpPortal: React.FC<Props> = ({
  label,
  voidColor = "#050505",
  accent = "#c8a882",
  scrollDistance = "+=260%",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slatsRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(stageRef.current, { perspective: 1400 });

      const slatEls = slatsRef.current
        ? Array.from(slatsRef.current.children)
        : [];
      const frameEls = framesRef.current
        ? Array.from(framesRef.current.children)
        : [];

      gsap.set(slatEls, { scaleY: 1, transformOrigin: "50% 50%" });
      gsap.set(frameEls, (i) => ({
        scale: 0.05 + i * 0.05,
        opacity: 0,
        rotateZ: i % 2 === 0 ? -8 : 8,
      }));
      gsap.set(labelRef.current, {
        scale: 0.3,
        opacity: 0,
        filter: "blur(20px)",
        z: -800,
      });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(haloRef.current, { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 1.2,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // 1. Slats split open from center (vertical iris)
      tl.to(
        slatEls,
        {
          scaleY: 0,
          stagger: { each: 0.025, from: "center" },
          duration: 0.4,
        },
        0
      );

      // 2. Depth frames recede / zoom into view simultaneously
      tl.to(
        frameEls,
        {
          scale: (i) => 1 + i * 0.35,
          opacity: (i) => 1 - i * 0.15,
          rotateZ: 0,
          stagger: { each: 0.04, from: "end" },
          duration: 0.7,
        },
        0.1
      );

      // 3. Halo pulse
      tl.to(
        haloRef.current,
        { scale: 1.4, opacity: 0.55, duration: 0.5 },
        0.15
      );

      // 4. Label warps in from depth
      tl.to(
        labelRef.current,
        {
          scale: 1,
          opacity: 1,
          z: 0,
          filter: "blur(0px)",
          duration: 0.55,
        },
        0.25
      );

      // 5. Hold a moment then flash
      tl.to(
        flashRef.current,
        { opacity: 1, duration: 0.08 },
        0.78
      );

      // 6. Everything zooms forward & fades on flash
      tl.to(
        frameEls,
        {
          scale: (i) => 3 + i * 0.8,
          opacity: 0,
          duration: 0.2,
        },
        0.78
      );
      tl.to(
        labelRef.current,
        {
          scale: 1.4,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.2,
        },
        0.78
      );
      tl.to(
        haloRef.current,
        { scale: 3, opacity: 0, duration: 0.2 },
        0.78
      );

      // 7. Flash fades to reveal the page beneath
      tl.to(
        flashRef.current,
        { opacity: 0, duration: 0.12 },
        0.88
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
        style={{ backgroundColor: voidColor }}
      >
        {/* Vertical iris slats covering the screen */}
        <div
          ref={slatsRef}
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${SLATS}, 1fr)` }}
        >
          {Array.from({ length: SLATS }).map((_, i) => (
            <div
              key={i}
              className="h-full w-full"
              style={{
                background: `linear-gradient(${
                  i % 2 ? 180 : 0
                }deg, #0a0a0a 0%, #1a1a1a 100%)`,
                borderLeft: i === 0 ? "none" : "1px solid #000",
              }}
            />
          ))}
        </div>

        {/* Radial halo glow */}
        <div
          ref={haloRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            width: "60vmin",
            height: "60vmin",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}55 0%, transparent 65%)`,
            filter: "blur(40px)",
          }}
        />

        {/* Concentric depth frames */}
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
                width: "70vmin",
                height: "42vmin",
                border: `1px solid ${accent}`,
                borderRadius: 6,
                boxShadow: `0 0 60px ${accent}33 inset, 0 0 30px ${accent}22`,
              }}
            />
          ))}
        </div>

        {/* Center label */}
        <div
          ref={labelRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform text-center"
          style={{ color: "#f0ece4" }}
        >
          {label}
        </div>

        {/* White flash */}
        <div
          ref={flashRef}
          className="pointer-events-none absolute inset-0 bg-white"
        />
      </div>
    </section>
  );
};

export default ScrollWarpPortal;
