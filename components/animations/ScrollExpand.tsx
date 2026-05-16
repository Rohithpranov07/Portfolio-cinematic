"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  initialWidth?: string;
  initialHeight?: string;
  initialRadius?: number;
  background?: string;
  scrollDistance?: string;
};

export const ScrollExpand: React.FC<Props> = ({
  children,
  initialWidth = "min(70vw, 1100px)",
  initialHeight = "min(60vh, 720px)",
  initialRadius = 24,
  background = "#0a0a0a",
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
      >
        <div
          ref={frameRef}
          className="relative overflow-hidden shadow-2xl"
          style={{ background }}
        >
          <div className="w-full h-full overflow-auto flex items-center justify-center">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ScrollExpand;
