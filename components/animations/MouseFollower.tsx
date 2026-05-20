"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const springConfig = { stiffness: 400, damping: 35, mass: 0.5 };
  const dotSpring = { stiffness: 600, damping: 40 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    let visible = false;
    let hovering = false;
    let lastHoverTarget: Element | null = null;
    let rafId: number | null = null;
    let pendingTarget: Element | null = null;
    const SELECTOR = "a, button, [data-cursor]";

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) {
        visible = true;
        setIsVisible(true);
      }
    };

    // RAF-coalesce hover checks: `mouseover` bubbles for every nested element
    // the pointer transitions across, which on a dense scroll-driven page can
    // fire 100+ times/sec. We only need the result once per frame.
    const flushHover = () => {
      rafId = null;
      const target = pendingTarget;
      if (target === lastHoverTarget) return;
      lastHoverTarget = target;
      const next = !!(target && target.closest && target.closest(SELECTOR));
      if (next !== hovering) {
        hovering = next;
        setIsHovering(next);
      }
    };

    const schedule = (target: Element | null) => {
      pendingTarget = target;
      if (rafId == null) rafId = requestAnimationFrame(flushHover);
    };

    const onOver = (e: MouseEvent) => schedule(e.target as Element | null);
    // mouseleave from the window should clear hover; we don't need to inspect
    // the related target because mouseover will fire again on re-entry.
    const onMouseLeave = () => {
      if (hovering) {
        hovering = false;
        setIsHovering(false);
      }
      lastHoverTarget = null;
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave, {
      passive: true,
    });

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        onMouseLeave
      );
    };
  }, [isCoarsePointer, cursorX, cursorY]);

  if (isCoarsePointer) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 50 : 32,
            height: isHovering ? 50 : 32,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={{ opacity: isVisible ? 1 : 0 }}
        />
      </motion.div>
    </>
  );
}
