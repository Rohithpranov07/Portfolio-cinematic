"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  initialWidth?: string;
  initialHeight?: string;
  initialRadius?: number;
  background?: string;
  stageBackground?: string;
  frameBorder?: string;
  frameGlow?: string;
  scrollDistance?: string;
};

export const ScrollExpand: React.FC<Props> = ({
  children,
  initialWidth = "min(70vw, 1100px)",
  initialHeight = "min(60vh, 720px)",
  initialRadius = 24,
  background = "#0a0a0a",
  stageBackground,
  frameBorder,
  frameGlow,
  scrollDistance = "+=180%",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !frameRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(frameRef.current, {
        width: initialWidth,
        height: initialHeight,
        borderRadius: initialRadius,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      }).to(frameRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power2.inOut",
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [initialWidth, initialHeight, initialRadius, scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "260vh" }}
    >
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        style={stageBackground ? { background: stageBackground } : undefined}
      >
        <div
          ref={frameRef}
          className="relative overflow-hidden"
          style={{
            background,
            border: frameBorder ?? "1px solid rgba(255,255,255,0.06)",
            boxShadow: frameGlow ?? "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.8)",
          }}
        >
          <div className="w-full h-full overflow-auto flex items-center justify-center">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ScrollExpand;
