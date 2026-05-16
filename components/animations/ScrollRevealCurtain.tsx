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

      gsap.set(curtainRef.current, {
        clipPath: "polygon(100% 0, 100% 0, 100% 0, 100% 0)",
      });

      gsap.set(shardRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        yPercent: -100,
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 1.1,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0 → 0.55): hold still — let the spline robot play its entrance
      tl.to({}, { duration: 0.55 }, 0);

      // Phase 2 (0.55 → 1.0): curtain transition out to next page
      tl.to(
        beneathRef.current,
        {
          rotateX: 22,
          scale: 0.78,
          z: -240,
          filter: "brightness(0.4) blur(2px)",
          duration: 0.45,
        },
        0.55
      );

      tl.to(
        shardRef.current,
        {
          yPercent: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.22,
        },
        0.575
      );

      tl.to(
        curtainRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.32,
        },
        0.67
      );

      tl.fromTo(
        curtainRef.current,
        { clipPath: "polygon(100% 0, 100% 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.28,
        },
        0.67
      );

      tl.to(
        labelRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.18 },
        0.78
      );

      tl.to(
        shardRef.current,
        { opacity: 0, duration: 0.1 },
        0.93
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "460vh" }}
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
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            background: `linear-gradient(135deg, ${curtainColor} 0%, #000 100%)`,
            mixBlendMode: "screen",
          }}
        />

        <div
          ref={curtainRef}
          className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
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
