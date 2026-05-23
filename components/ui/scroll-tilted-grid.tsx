"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react"; // useEffect+useState used by ScrollTiltedGrid loop sentinel

export const DEFAULT_GRID_IMAGES: readonly string[] = [
  "/Design_img/Ben-10.avif",
  "/Design_img/Boundary-1.avif",
  "/Design_img/Designathon-1.avif",
  "/Design_img/Echo-1.avif",
  "/Design_img/Emotion.avif",
  "/Design_img/Kodairatedesign-1.jpg",
  "/Design_img/Mediation-1.avif",
  "/Design_img/Pablo.avif",
  "/Design_img/Ridershield-1.avif",
  "/Design_img/Shopsmart-1.avif",
  "/Design_img/Sony.avif",
  "/Design_img/ev-1.avif",
];

const CONTAIN_KEYS = ["Boundary", "Kodairatedesign", "Mediation", "Ridershield", "ev-", "Shopsmart", "Ben-10", "Sony", "Emotion", "Pablo"];
const isContain = (src: string) => CONTAIN_KEYS.some((k) => src.includes(k));

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase: [typeof easeIntoFocus, typeof easeOutOfFocus] = [
  easeIntoFocus,
  easeOutOfFocus,
];

export type GapToken = 4 | 6 | 8 | 10 | 12 | 14;


// Deterministic hash so server/client positions match (no hydration drift)
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type StarSpec = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  kind: "dot" | "sparkle";
};

// 70 stars created 70 always-animating CSS-keyframe layers — each with its
// own composite, paint, and opacity tween. 28 still reads as a starfield
// (every other star reuses the same seed slots, so density looks identical
// to a casual scroll) and roughly halves the section's GPU load.
const STARFIELD: StarSpec[] = Array.from({ length: 28 }, (_, i) => {
  const r1 = seeded(i + 1);
  const r2 = seeded(i + 101);
  const r3 = seeded(i + 211);
  const r4 = seeded(i + 313);
  const r5 = seeded(i + 419);
  const isSparkle = r5 > 0.88;
  const rawSize = isSparkle ? 6 + r3 * 4 : 1 + r3 * 1.6;
  const size = Number(rawSize.toFixed(2));
  return {
    top: `${(r1 * 100).toFixed(2)}%`,
    left: `${(r2 * 100).toFixed(2)}%`,
    size,
    delay: `${(r4 * 5).toFixed(2)}s`,
    duration: `${(2.4 + r3 * 3.6).toFixed(2)}s`,
    color: r5 > 0.6 ? "rgba(200,168,130,0.8)" : "rgba(240,236,228,0.7)",
    kind: isSparkle ? "sparkle" : "dot",
  };
});

function Starfield() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        contain: "layout style",
      }}
    >
      {STARFIELD.map((s, i) =>
        s.kind === "dot" ? (
          <span
            key={i}
            className="stg-star-twinkle"
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "9999px",
              background: s.color,
              boxShadow: `0 0 ${(s.size * 2).toFixed(2)}px ${s.color}`,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ) : (
          <svg
            key={i}
            className="stg-star-twinkle"
            viewBox="0 0 12 12"
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              color: s.color,
              animationDelay: s.delay,
              animationDuration: s.duration,
              filter: `drop-shadow(0 0 4px ${s.color})`,
            }}
          >
            <path
              d="M6 0 L6.6 5.4 L12 6 L6.6 6.6 L6 12 L5.4 6.6 L0 6 L5.4 5.4 Z"
              fill="currentColor"
            />
          </svg>
        )
      )}
      <style>{`
        @keyframes stg-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .stg-star-twinkle {
          animation-name: stg-twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .stg-star-twinkle { animation: none; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

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

  const topAlign = isContain(src);
  const bgPosition = topAlign ? "center top" : "center";
  const bgImage = `url("${src}")`;

  if (reduce) {
    return (
      <figure ref={ref} className="relative z-10 m-0">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio, borderRadius: rounded }}
        >
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{ backgroundImage: bgImage, backgroundPosition: bgPosition }}
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
          className="absolute inset-0 bg-cover bg-no-repeat will-change-transform"
          style={{
            backgroundImage: bgImage,
            backgroundPosition: bgPosition,
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
        paddingBlockStart: "20vh",
        paddingBlockEnd: "6vh",
        marginTop: "20vh",
        marginBottom: 0,
      }}
    >
      <Starfield />
      <div
        style={{
          position: "relative",
          zIndex: 1,
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
