"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  label?: React.ReactNode;
  /** Color of the fold seam glow. */
  seamColor?: string;
  /** Background color shown behind the fold. */
  voidColor?: string;
  /** Color of the outgoing page (top half). */
  topColor?: string;
  /** Color of the incoming page (bottom half). */
  bottomColor?: string;
  /** Total scroll distance the transition occupies. */
  scrollDistance?: string;
};

export const ScrollFoldTransition: React.FC<Props> = ({
  label,
  seamColor = "#c8a882",
  voidColor = "#050505",
  topColor = "#0f0f0f",
  bottomColor = "#1a1a1a",
  scrollDistance = "+=280%",
}) => {
  const sectionVh = 100 + (parseInt(scrollDistance.replace(/[^0-9]/g, ""), 10) || 280);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(stageRef.current, { perspective: 2000 });

      gsap.set(topRef.current, {
        transformOrigin: "50% 100%",
        rotateX: 0,
        z: 0,
      });
      gsap.set(bottomRef.current, {
        transformOrigin: "50% 0%",
        rotateX: 90,
        z: 0,
        opacity: 0,
      });
      gsap.set(seamRef.current, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(labelRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(12px)",
      });

      const lineEls = linesRef.current
        ? Array.from(linesRef.current.children)
        : [];
      gsap.set(lineEls, { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" });

      const dustEls = dustRef.current
        ? Array.from(dustRef.current.children)
        : [];
      gsap.set(dustEls, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
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

      // 1. Seam glow ignites along the horizon
      tl.to(seamRef.current, { scaleX: 1, opacity: 1, duration: 0.3 }, 0);

      // 2. Horizontal kinetic lines sweep across
      tl.to(
        lineEls,
        {
          scaleX: 1,
          opacity: 0.5,
          stagger: 0.04,
          duration: 0.4,
        },
        0.05
      );

      // 3. Top page folds backward (rotateX -100, z away)
      tl.to(
        topRef.current,
        {
          rotateX: -110,
          z: -300,
          duration: 0.7,
        },
        0.2
      );

      // 4. Dust particles drift up through the void
      tl.to(
        dustEls,
        {
          opacity: 0.6,
          y: -60,
          stagger: { each: 0.02, from: "random" },
          duration: 0.6,
        },
        0.3
      );

      // 5. Label warps into the void
      tl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
        },
        0.4
      );

      // 6. Hold a beat
      tl.to({}, { duration: 0.1 }, 0.85);

      // 7. Label rises out of the way
      tl.to(
        labelRef.current,
        {
          y: -120,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.25,
        },
        0.95
      );

      // 8. Bottom page rotates up into view
      tl.to(
        bottomRef.current,
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.45,
        },
        0.95
      );

      // 9. Lines and seam snap closed
      tl.to(
        lineEls,
        { scaleX: 0, opacity: 0, stagger: 0.02, duration: 0.2 },
        1.05
      );
      tl.to(seamRef.current, { scaleX: 0, opacity: 0, duration: 0.2 }, 1.1);
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${sectionVh}vh` }}
      aria-label="Page fold transition"
    >
      <div
        ref={stageRef}
        className="relative w-screen h-screen overflow-hidden"
        style={{ backgroundColor: voidColor }}
      >
        {/* Outgoing top half */}
        <div
          ref={topRef}
          className="absolute left-0 top-0 w-full h-1/2 will-change-transform"
          style={{
            background: `linear-gradient(180deg, ${topColor} 0%, #000 100%)`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        />

        {/* Incoming bottom half */}
        <div
          ref={bottomRef}
          className="absolute left-0 bottom-0 w-full h-1/2 will-change-transform"
          style={{
            background: `linear-gradient(0deg, ${bottomColor} 0%, #000 100%)`,
            boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
          }}
        />

        {/* Seam glow */}
        <div
          ref={seamRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] will-change-transform"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${seamColor} 50%, transparent 100%)`,
            boxShadow: `0 0 30px ${seamColor}, 0 0 60px ${seamColor}66`,
          }}
        />

        {/* Kinetic horizontal lines */}
        <div
          ref={linesRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-around py-[10vh]"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-px w-full will-change-transform"
              style={{
                background: `linear-gradient(90deg, transparent, ${seamColor}88, transparent)`,
              }}
            />
          ))}
        </div>

        {/* Dust particles */}
        <div
          ref={dustRef}
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: 30 }).map((_, i) => {
            const x = (i * 37) % 100;
            const y = (i * 53) % 100;
            const size = 2 + ((i * 7) % 4);
            return (
              <div
                key={i}
                className="absolute rounded-full will-change-transform"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  background: seamColor,
                  boxShadow: `0 0 8px ${seamColor}`,
                }}
              />
            );
          })}
        </div>

        {/* Center label */}
        <div
          ref={labelRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform text-center"
          style={{ color: "#f0ece4" }}
        >
          {label}
        </div>
      </div>
    </section>
  );
};

export default ScrollFoldTransition;
