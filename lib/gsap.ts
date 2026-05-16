import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASES = {
  smooth: "power3.out",
  snappy: "power4.out",
  elastic: "elastic.out(1, 0.3)",
  back: "back.out(1.7)",
  expo: "expo.out",
  circ: "circ.out",
};

export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.4,
};

export function createScrollReveal(
  target: gsap.TweenTarget,
  options: gsap.TweenVars = {},
  scrollOptions: ScrollTrigger.Vars = {}
) {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0, ...options },
    {
      y: 0,
      opacity: 1,
      duration: DURATIONS.cinematic,
      ease: EASES.smooth,
      scrollTrigger: {
        trigger: target as Element,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...scrollOptions,
      },
      ...options,
    }
  );
}
