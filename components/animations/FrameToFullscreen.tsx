"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ContainerScrollContext } from "@/components/ui/container-scroll-animation";

type Props = {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
};

export const FrameToFullscreen: React.FC<Props> = ({ titleComponent, children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    if (!sectionRef.current || !frameRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(frameRef.current, {
        transformPerspective: 1600,
        transformOrigin: "50% 100%",
        rotateX: 26,
        scale: 0.86,
        y: 70,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          scrub: 1.2, // Silk smooth scrub damping
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0 → 0.5): "Goes here" reveals; frame eases up & untilts slightly
      tl.to(
        frameRef.current,
        {
          rotateX: 15,
          scale: 0.93,
          y: 20,
          duration: 0.5,
          ease: "power1.out",
          force3D: true,
        },
        0
      );

      // Phase 2 (0.5 → 0.7): title fades out smoothly (completes before frame rises)
      tl.to(
        titleRef.current,
        {
          y: -60,
          opacity: 0,
          duration: 0.2,
          ease: "sine.inOut",
        },
        0.5
      );

      // Phase 3 (0.7 → 1.0): frame flattens up to fullscreen — ends precisely as the pin releases
      tl.to(
        frameRef.current,
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          borderWidth: 0,
          padding: 0,
          duration: 0.3,
          ease: "power3.inOut",
          force3D: true,
        },
        0.7
      );

      tl.to(
        innerRef.current,
        { borderRadius: 0, duration: 0.3, ease: "power3.inOut", force3D: true },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ContainerScrollContext.Provider value={scrollYProgress}>
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: "340vh" }}
      >
        <div
          ref={stageRef}
          className="relative w-full h-screen overflow-hidden flex items-end justify-center pb-[6vh]"
          style={{
            perspective: "1600px",
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {titleComponent && (
            <div
              ref={titleRef}
              className="absolute top-[8vh] left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-4 text-center"
            >
              {titleComponent}
            </div>
          )}

          <div
            ref={frameRef}
            className="relative bg-[#222222] border-[#6C6C6C] shadow-2xl"
            style={{
              width: "min(82vw, 1320px)",
              height: "min(58vh, 700px)",
              borderRadius: 28,
              borderWidth: 4,
              borderStyle: "solid",
              padding: 16,
              boxShadow:
                "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a",
              willChange: "transform, width, height, padding, borderRadius",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              ref={innerRef}
              className="relative w-full h-full overflow-hidden bg-zinc-900"
              style={{
                borderRadius: 16,
                willChange: "transform, borderRadius",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </ContainerScrollContext.Provider>
  );
};

export default FrameToFullscreen;
