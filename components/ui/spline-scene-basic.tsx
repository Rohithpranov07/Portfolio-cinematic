'use client';

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightArmed, setSpotlightArmed] = useState(false);
  const [loadScene, setLoadScene] = useState(false);

  useEffect(() => {
    // 1. Warm up the 3D runtime eagerly in the background on first scroll or touch
    const startWarmUp = () => {
      setLoadScene(true);
      cleanupListeners();
    };

    const cleanupListeners = () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", startWarmUp);
        window.removeEventListener("pointerdown", startWarmUp);
        window.removeEventListener("touchstart", startWarmUp);
      }
    };

    if (typeof window !== "undefined") {
      if (window.scrollY > 10) {
        setLoadScene(true);
      } else {
        window.addEventListener("scroll", startWarmUp, { passive: true });
        window.addEventListener("pointerdown", startWarmUp, { passive: true });
        window.addEventListener("touchstart", startWarmUp, { passive: true });
      }
    }

    // 2. IntersectionObserver for Spotlight + fallback scene loading
    if (!cardRef.current) return;
    const el = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setSpotlightArmed(true);
            setLoadScene(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5] }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cleanupListeners();
    };
  }, []);

  return (
    <Card ref={cardRef} className="w-full h-full rounded-none border-0 bg-black/[0.96] relative overflow-hidden">
      {spotlightArmed && (
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
          {loadScene && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default SplineSceneBasic;
