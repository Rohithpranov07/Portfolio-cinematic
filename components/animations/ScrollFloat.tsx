'use client';

import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useContainerScroll } from '@/components/ui/container-scroll-animation';

import './ScrollFloat.css';

interface ScrollFloatProps {
  children: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
  stagger?: number;
  scrollRange?: [number, number];
}

const Char = ({
  char,
  progress,
  start,
  end
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const y = useTransform(progress, [start, end], ['120%', '0%']);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scaleY = useTransform(progress, [start, end], [2.3, 1]);
  const scaleX = useTransform(progress, [start, end], [0.7, 1]);

  return (
    <motion.span
      className="char"
      style={{ y, opacity, scaleY, scaleX, transformOrigin: '50% 0%' }}
    >
      {char === ' ' ? ' ' : char}
    </motion.span>
  );
};

const ScrollFloat = ({
  children,
  containerClassName = '',
  textClassName = '',
  stagger = 0.6,
  scrollRange = [0, 1]
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const containerScroll = useContainerScroll();

  const { scrollYProgress: ownScroll } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rawProgress = containerScroll ?? ownScroll;

  // remap rawProgress [scrollRange[0], scrollRange[1]] → [0, 1]
  const scrollYProgress = useTransform(rawProgress, [scrollRange[0], scrollRange[1]], [0, 1], { clamp: true });

  const chars = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('');
  }, [children]);

  const segments = useMemo(() => {
    const n = chars.length;
    if (n === 0) return [] as Array<{ start: number; end: number }>;
    const charWindow = 1 / (n + (n - 1) * stagger);
    const step = charWindow * (1 + stagger);
    return chars.map((_, i) => {
      const start = i * step;
      const end = Math.min(1, start + charWindow);
      return { start, end };
    });
  }, [chars, stagger]);

  return (
    <span ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>
        {chars.map((char, i) => (
          <Char
            key={i}
            char={char}
            progress={scrollYProgress}
            start={segments[i].start}
            end={segments[i].end}
          />
        ))}
      </span>
    </span>
  );
};

export default ScrollFloat;
