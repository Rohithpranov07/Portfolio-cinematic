"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
  text: string;
  className?: string;
  baseVelocity?: number;
}

export function VelocityScroll({ text, className, baseVelocity = 3 }: VelocityScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${-baseVelocity * 100}%`]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  const repeated = Array(8).fill(text).join(" · ");

  return (
    <div ref={ref} className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div style={{ x: smoothX }} className="inline-block">
        {repeated}&nbsp;&nbsp;{repeated}
      </motion.div>
    </div>
  );
}
