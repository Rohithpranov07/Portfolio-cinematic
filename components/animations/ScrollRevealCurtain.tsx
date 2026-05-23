"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  /** Content displayed before the transition (the "outgoing" page). */
  beneath: React.ReactNode;
  /** Color of the incoming panel that sweeps in. */
  curtainColor?: string;
  /** Big label rendered inside the incoming panel during the reveal. */
  label?: React.ReactNode;
  /** Total scroll distance for the transition (e.g. "+=200%"). */
  scrollDistance?: string;
};

export const ScrollRevealCurtain: React.FC<Props> = ({
  beneath,
  curtainColor = "#fd5200",
  label,
  scrollDistance = "+=220%",
}) => {
  const sectionVh = 100 + (parseInt(scrollDistance.replace(/[^0-9]/g, ""), 10) || 220);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const beneathRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const shardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !curtainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(stageRef.current, { perspective: 1600 });

      gsap.set(beneathRef.current, {
        transformOrigin: "50% 50%",
        scale: 1,
        rotateX: 0,
        z: 0,
        filter: "brightness(1) blur(0px)",
      });

      // Vertical wipe instead of a diagonal clip-path sweep — feels far more natural.
      gsap.set(curtainRef.current, {
        yPercent: 100,
        opacity: 1,
      });

      gsap.set(shardRef.current, {
        opacity: 0,
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.96,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 0.4,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Brief beat (0 → 0.05): one moment to register the Spline scene
      tl.to({}, { duration: 0.05 }, 0);

      // Phase 2 (0.05 → 0.8): smooth vertical curtain rise + gentle depth fade
      tl.to(
        beneathRef.current,
        {
          scale: 0.92,
          filter: "brightness(0.5) blur(3px)",
          duration: 0.75,
          ease: "sine.inOut",
        },
        0.05
      );

      tl.to(
        curtainRef.current,
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power2.inOut",
        },
        0.05
      );

      tl.to(
        labelRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
        0.55
      );

      // Small breathing hold at the end so the next section snaps in (0.95 → 1.0)
      tl.to({}, { duration: 0.05 }, 0.95);
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${sectionVh}vh` }}
      aria-label="Scroll transition"
    >
      <div
        ref={stageRef}
        className="relative w-screen h-screen overflow-hidden bg-black"
      >
        <div
          ref={beneathRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          {beneath}
        </div>

        <div
          ref={shardRef}
          className="pointer-events-none absolute inset-0 w-full h-full will-change-transform"
          style={{
            background: `linear-gradient(135deg, ${curtainColor} 0%, #000 100%)`,
            mixBlendMode: "screen",
          }}
        />

        <div
          ref={curtainRef}
          className="pointer-events-none absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
          style={{ backgroundColor: curtainColor }}
        >
          <div
            ref={labelRef}
            className="will-change-transform px-8 text-center"
            style={{ color: "#fff" }}
          >
            {label}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealCurtain;
