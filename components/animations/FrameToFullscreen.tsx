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

    let ctx: gsap.Context;
    let resizeListener: () => void;

    const setupTimeline = () => {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Card visual target dimensions (same as original CSS width/height constraints)
        const targetW = Math.min(vw * 0.82, 1320);
        const targetH = Math.min(vh * 0.58, 700);

        // Required scale ratios to map 100vw/100vh down to card size
        const startScaleX = targetW / vw;
        const startScaleY = targetH / vh;

        // Vertical offset to visually mimic the old pb-[6vh] padding
        const padBottom = vh * 0.06;

        // Pre-configure initial card transforms (scaled down and tilted)
        gsap.set(frameRef.current, {
          transformPerspective: 1600,
          transformOrigin: "50% 100%",
          rotateX: 26,
          scaleX: startScaleX * 0.86,
          scaleY: startScaleY * 0.86,
          y: 70 - padBottom,
          borderWidth: 4,
          padding: 16,
          borderRadius: 28,
        });

        gsap.set(innerRef.current, {
          borderRadius: 16,
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

        // Phase 1 (0 → 0.5): Frame tilts up slightly & zooms slightly
        tl.to(
          frameRef.current,
          {
            rotateX: 15,
            scaleX: startScaleX * 0.93,
            scaleY: startScaleY * 0.93,
            y: 20 - padBottom,
            duration: 0.5,
            ease: "power1.out",
          },
          0
        );

        // Phase 2 (0.5 → 0.7): Title fades out smoothly
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

        // Phase 3 (0.7 → 1.0): Frame flattens to 1.0 scale and slides down to y=0 (fullscreen)
        tl.to(
          frameRef.current,
          {
            rotateX: 0,
            scaleX: 1,
            scaleY: 1,
            y: 0,
            borderRadius: 0,
            borderWidth: 0,
            padding: 0,
            duration: 0.3,
            ease: "power3.inOut",
          },
          0.7
        );

        tl.to(
          innerRef.current,
          {
            borderRadius: 0,
            duration: 0.3,
            ease: "power3.inOut",
          },
          0.7
        );
      }, sectionRef);
    };

    setupTimeline();

    // Recreate the timeline dynamically on resize to keep scales mathematically perfect
    let resizeTimeout: NodeJS.Timeout;
    resizeListener = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupTimeline();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      if (ctx) ctx.revert();
    };
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
          className="relative w-full h-screen overflow-hidden flex items-end justify-center"
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
            className="absolute left-0 bottom-0 bg-[#222222] border-[#6C6C6C] shadow-2xl"
            style={{
              width: "100vw",
              height: "100vh",
              borderStyle: "solid",
              boxShadow:
                "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a",
              willChange: "transform, borderRadius",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              ref={innerRef}
              className="relative w-full h-full overflow-hidden bg-zinc-900"
              style={{
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
