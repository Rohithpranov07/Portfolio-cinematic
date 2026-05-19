'use client';

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  const cardRef = useRef<HTMLDivElement>(null);
  // One-shot: stays true once the section enters view, so the fresh entrance
  // (Spline boot + spotlight sweep) plays the moment the user scrolls here.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setArmed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Card ref={cardRef} className="w-full h-full rounded-none border-0 bg-black/[0.96] relative overflow-hidden">
      {armed && (
        <Spotlight
          key="spotlight-armed"
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      )}

      <div className="flex h-full">
        <div className="flex-1 py-16 relative z-10 flex flex-col justify-center items-end pr-12 pointer-events-none">
          <div className="max-w-lg w-full">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Built Different.
          </h1>
          <p className="mt-6 text-lg text-neutral-300">
            Welcome. You're not here by accident.
I'm Rohith — a developer who thinks in systems,
designs with intent, and ships things that matter.
Scroll down. See for yourself.
          </p>
          </div>
        </div>

        <div className="flex-1 relative pointer-events-auto">
          {armed ? (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full" aria-hidden />
          )}
        </div>
      </div>
    </Card>
  );
}

export default SplineSceneBasic;
