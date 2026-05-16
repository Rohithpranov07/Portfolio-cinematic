"use client";

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const prev = { x: 0, y: 0 };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setVelocity({
        x: e.clientX - prev.x,
        y: e.clientY - prev.y,
      });
      prev.x = e.clientX;
      prev.y = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { position, velocity };
}
