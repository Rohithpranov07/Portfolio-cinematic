"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface MaskRevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MaskRevealText({ children, className, delay = 0 }: MaskRevealTextProps) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
