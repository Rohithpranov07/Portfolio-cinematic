"use client";

import React, { ElementType } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { splitTextToWords } from "@/lib/utils";

interface StaggerTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: ElementType;
}

export function StaggerTextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "p",
}: StaggerTextRevealProps) {
  const { ref, inView } = useInView();
  const words = splitTextToWords(text);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      aria-label={text}
    >
      {words.map((word: string, i: number) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
