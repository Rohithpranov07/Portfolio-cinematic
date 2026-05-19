"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
    objectPosition?: string;
  }[];
}) => {
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);
  const thirdRow = products.slice(8, 12);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] pt-40 pb-0 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          className="flex flex-row-reverse"
          style={{ gap: "72px", marginBottom: "88px" }}
        >
          {[...firstRow, ...firstRow].map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`first-${i}`}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row"
          style={{ gap: "72px", marginBottom: "88px" }}
        >
          {[...secondRow, ...secondRow].map((product, i) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`second-${i}`}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row-reverse"
          style={{ gap: "72px" }}
        >
          {[...thirdRow, ...thirdRow].map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`third-${i}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0"
      style={{ paddingTop: "25vh", paddingLeft: "15vh", marginBottom: "20px" }}
    >
      {/* Eyebrow / kicker */}
      <div
        className="flex items-center text-[11px] uppercase text-neutral-400 dark:text-neutral-500"
        style={{ gap: "14px", marginBottom: "28px", letterSpacing: "0.32em" }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "48px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(167,139,250,0.9))",
          }}
        />
        <span className="font-medium">Chapter 02 — Selected Work</span>
      </div>

      {/* Title */}
      <h1
        className="font-bold dark:text-white"
        style={{
          fontSize: "clamp(2.25rem, 6.4vw, 5.75rem)",
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
          marginBottom: "36px",
        }}
      >
        Building products
        <br />
        <span
          style={{
            backgroundImage:
              "linear-gradient(92deg, #ffffff 0%, #c4b5fd 55%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          with intelligence.
        </span>
      </h1>

      {/* Hairline divider */}
      <div
        aria-hidden
        style={{
          width: "84px",
          height: "1px",
          marginBottom: "32px",
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.55), rgba(167,139,250,0))",
        }}
      />

      {/* Body copy */}
      <p
        style={{
          maxWidth: "64ch",
          fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)",
          lineHeight: 1.8,
          letterSpacing: "0.005em",
          color: "#ffffff",
          opacity: 1,
          fontWeight: 400,
        }}
      >
        Driven by curiosity and a deep obsession with engineering, I build at
        the intersection of technology, intelligence, and design. Every project
        here reflects a deliberate process — from architectural decisions to
        the finest interaction detail — crafted for scalability, real-world
        impact, and experiences that feel as good as they perform.
      </p>

      {/* Meta row */}
      <div
        className="flex items-center text-[11px] uppercase text-neutral-500"
        style={{ gap: "18px", marginTop: "40px", letterSpacing: "0.28em" }}
      >
        <span>2024 — Present</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#a78bfa" }} />
        <span>Engineering · Design · AI</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#a78bfa" }} />
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    objectPosition?: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(167,139,250,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-80 w-[22rem] relative flex-shrink-0 overflow-hidden rounded-[24px]"
    >
      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl rounded-[28px] overflow-hidden"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover absolute h-full w-full inset-0 rounded-[28px]"
          style={{ objectPosition: product.objectPosition ?? "center" }}
          alt={product.title}
        />
      </Link>
      {/* Subtle inner sheen — adds a quiet premium gloss without changing animation */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-[28px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-[28px]"></div>
      <h2
        className="absolute opacity-0 group-hover/product:opacity-100 text-white"
        style={{
          left: "20px",
          bottom: "18px",
          fontSize: "15px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};
