"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
  /** Optional node rendered inside one frame instead of an image — acts as a portal/preview */
  portalContent?: React.ReactNode;
  /** Which image index to replace with portalContent (default 0 — centered frame) */
  portalIndex?: number;
}

export function ZoomParallax({ images, portalContent, portalIndex = 0 }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]" : ""} ${index === 2 ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]" : ""} ${index === 3 ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]" : ""} ${index === 4 ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]" : ""} ${index === 5 ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]" : ""} ${index === 6 ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]" : ""} `}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden">
                {index === portalIndex && portalContent ? (
                  <div
                    className="absolute inset-0 overflow-hidden bg-slate-950"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow:
                        "0 10px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: "100vw",
                        height: "100vh",
                        transform: "scale(0.25)",
                        transformOrigin: "top left",
                        pointerEvents: "none",
                      }}
                    >
                      {portalContent}
                    </div>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src || "/placeholder.svg"}
                    alt={alt || `Parallax image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
