"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export const DEFAULT_GRID_IMAGES: readonly string[] = [
  "https://i.pinimg.com/736x/de/0f/9c/de0f9c57bf7ae1c48ea467ffe9817fdc.jpg",
  "https://i.pinimg.com/736x/80/17/36/8017367dbe52dae63b58a678018795ee.jpg",
  "https://i.pinimg.com/736x/0d/b6/1f/0db61f5245c835228df83398f6d96ceb.jpg",
  "https://i.pinimg.com/736x/39/27/f5/3927f53cebd0a148ba806fbd15e1fdd9.jpg",
  "https://i.pinimg.com/1200x/5f/ae/6d/5fae6de0940fe4a2471f34fb1b259b77.jpg",
  "https://i.pinimg.com/736x/df/04/61/df0461286b3e5291300adbffa70b3e9e.jpg",
  "https://i.pinimg.com/736x/6d/45/f1/6d45f1c96c3316c3bc5055ed6e8e3b8f.jpg",
  "https://i.pinimg.com/736x/a9/4c/e0/a94ce014127cfded1c7160b110eb7a86.jpg",
  "https://i.pinimg.com/736x/fe/f0/8a/fef08a661d0ef55561d99a293c79dd81.jpg",
  "https://i.pinimg.com/736x/84/c6/10/84c610443c77c1e34398f071fdc3b71a.jpg",
  "https://i.pinimg.com/736x/54/13/9d/54139d6fd658b1d5e71cdc07ea37a57c.jpg",
  "https://i.pinimg.com/736x/2d/0b/74/2d0b74227b38d56fcc8b9f4872addcfc.jpg",
];

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase: [typeof easeIntoFocus, typeof easeOutOfFocus] = [
  easeIntoFocus,
  easeOutOfFocus,
];

export type MaxWidthToken =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "none";

export type GapToken = 4 | 6 | 8 | 10 | 12 | 14;

const MAX_WIDTH_CLASS: Record<MaxWidthToken, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  none: "",
};

const GAP_CLASS: Record<GapToken, string> = {
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  14: "gap-14",
};

type Side = "L" | "R";

type TileConfig = {
  aspectRatio: string;
  perspective: number;
  maxTilt: number;
  maxBlur: number;
  rounded: string;
};

function Tile({
  src,
  side,
  config,
}: {
  src: string;
  side: Side;
  config: TileConfig;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const reduce = useReducedMotion();
  const sign = side === "L" ? -1 : 1;
  const { aspectRatio, perspective, maxTilt, maxBlur, rounded } = config;

  const blur = useTransform(p, [0, 0.5, 1], [maxBlur, 0, maxBlur], { ease: focusEase });
  const bright = useTransform(p, [0, 0.5, 1], [0, 1, 0], { ease: focusEase });
  const contrast = useTransform(p, [0, 0.5, 1], [4, 1, 4], { ease: focusEase });

  const ty = useTransform(p, [0, 0.5, 1], ["100%", "0%", "-100%"], { ease: focusEase });
  const tz = useTransform(p, [0, 0.5, 1], [300, 0, 300], { ease: focusEase });
  const rx = useTransform(p, [0, 0.5, 1], [maxTilt, 0, -maxTilt], { ease: focusEase });

  const tx = useTransform(p, [0, 0.5, 1],
    [`${sign * 40}%`, "0%", `${sign * 40}%`], { ease: focusEase });
  const rot = useTransform(p, [0, 0.5, 1], [-sign * 5, 0, sign * 5], { ease: focusEase });
  const sk = useTransform(p, [0, 0.5, 1], [sign * 20, 0, -sign * 20], { ease: focusEase });

  const innerSY = useTransform(p, [0, 0.5, 1], [1.8, 1, 1.8], { ease: focusEase });

  const filter = useMotionTemplate`blur(${blur}px) brightness(${bright}) contrast(${contrast})`;

  if (reduce) {
    return (
      <figure ref={ref} className="relative z-10 m-0">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio, borderRadius: rounded }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${src}")` }}
          />
        </div>
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className="relative z-10 m-0"
      style={{ perspective, willChange: "transform" }}
    >
      <motion.div
        className="relative w-full overflow-hidden will-change-[filter,transform]"
        style={{
          aspectRatio,
          borderRadius: rounded,
          filter,
          x: tx,
          y: ty,
          z: tz,
          rotate: rot,
          rotateX: rx,
          skewX: sk,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url("${src}")`,
            scaleY: innerSY,
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </motion.figure>
  );
}

export type ScrollTiltedGridProps = {
  images?: readonly string[];
  loop?: boolean;
  initialCycles?: number;
  aspectRatio?: string;
  maxWidth?: MaxWidthToken;
  gap?: GapToken;
  perspective?: number;
  maxTilt?: number;
  maxBlur?: number;
  rounded?: string;
  className?: string;
};

export function ScrollTiltedGrid({
  images = DEFAULT_GRID_IMAGES,
  loop = false,
  initialCycles = 3,
  aspectRatio = "3/4",
  maxWidth = "lg",
  gap = 10,
  perspective = 900,
  maxTilt = 70,
  maxBlur = 8,
  rounded = "0.375rem",
  className,
}: ScrollTiltedGridProps = {}) {
  const [cycles, setCycles] = useState(initialCycles);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loop) return;
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCycles((c) => c + 2);
        }
      },
      { rootMargin: "1500px 0px 1500px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loop]);

  const items = useMemo(
    () => Array.from({ length: cycles }, () => images).flat(),
    [cycles, images],
  );

  const config = useMemo<TileConfig>(
    () => ({ aspectRatio, perspective, maxTilt, maxBlur, rounded }),
    [aspectRatio, perspective, maxTilt, maxBlur, rounded],
  );

  const GAP_REM: Record<GapToken, string> = {
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
  };

  return (
    <section
      className={className}
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        paddingBlock: "20vh",
        marginTop: "20vh",
        marginBottom: "10vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: GAP_REM[gap],
          boxSizing: "border-box",
          width: "calc(100% - 3rem)",
          maxWidth: "40rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {items.map((src, i) => (
          <Tile
            key={`${i}-${src}`}
            src={src}
            side={i % 2 === 0 ? "L" : "R"}
            config={config}
          />
        ))}
      </div>
      {loop ? (
        <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      ) : null}
    </section>
  );
}
