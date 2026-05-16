"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function ScrollReveal({ children, className, delay = 0, stagger = false }: ScrollRevealProps) {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
