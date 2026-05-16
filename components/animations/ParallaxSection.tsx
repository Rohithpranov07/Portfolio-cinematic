"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { UseScrollOptions } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollOffset = NonNullable<UseScrollOptions["offset"]>;

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: ScrollOffset;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
  offset = ["start end", "end start"],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
