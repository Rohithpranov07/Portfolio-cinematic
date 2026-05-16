"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 400, damping: 35, mass: 0.5 };
  const dotSpring = { stiffness: 600, damping: 40 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    window.addEventListener("mousemove", move);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

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
