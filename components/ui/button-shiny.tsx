"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

function ButtonCta({
  label = "Get Access",
  className,
  children,
  ...props
}: ButtonCtaProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center h-12 px-8 rounded-[11px] overflow-hidden cursor-pointer outline-none isolate leading-none",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "active:translate-y-px",
        "focus-visible:ring-2 focus-visible:ring-[#a78bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        "shadow-[0_10px_30px_-14px_rgba(0,0,0,0.7),0_0_0_1px_rgba(167,139,250,0.06)]",
        "hover:shadow-[0_22px_60px_-14px_rgba(167,139,250,0.55),0_0_0_1px_rgba(167,139,250,0.18)]",
        className
      )}
      {...props}
    >
      {/* 1. Rotating conic comet — the signature motion */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[260%] animate-[spin_5s_linear_infinite] -z-10"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(167,139,250,0) 250deg, rgba(167,139,250,0.85) 300deg, rgba(232,225,255,0.95) 330deg, rgba(196,181,253,0.6) 350deg, transparent 360deg)",
        }}
      />

      {/* 2. Slow counter-rotating second comet — gives it 3D parallax */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[260%] animate-[spin_9s_linear_infinite] [animation-direction:reverse] opacity-60 -z-10"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0deg, transparent 280deg, rgba(196,181,253,0.5) 320deg, rgba(167,139,250,0.7) 350deg, transparent 360deg)",
        }}
      />

      {/* 3. Dark glass body — clips the comet to a 1.5px border ring */}
      <span aria-hidden className="absolute inset-[1.5px] rounded-[9.5px] bg-[#0a0814]" />

      {/* 4. Vertical depth gradient inside body */}
      <span
        aria-hidden
        className="absolute inset-[1.5px] rounded-[9.5px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,181,253,0.08) 0%, rgba(10,8,20,0) 38%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* 5. Top "lit glass" hairline */}
      <span
        aria-hidden
        className="absolute inset-x-4 top-[1.5px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232,225,255,0.55), transparent)",
        }}
      />

      {/* 6. Bottom violet rim — picks up the comet color even when it's elsewhere */}
      <span
        aria-hidden
        className="absolute inset-x-6 bottom-[1.5px] h-px opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(167,139,250,0.45), transparent)",
        }}
      />

      {/* 7. Inner halo — intensifies on hover (comet "lands") */}
      <span
        aria-hidden
        className="absolute inset-[1.5px] rounded-[9.5px] transition-shadow duration-500 shadow-[inset_0_0_18px_rgba(167,139,250,0.12)] group-hover:shadow-[inset_0_0_30px_rgba(167,139,250,0.32)]"
      />

      {/* 8. Label */}
      <span className="relative flex items-center justify-center gap-2 transition-transform duration-500 ease-out group-hover:-translate-y-[1px]">
        <span
          className="text-[15px] font-light tracking-[0.01em] whitespace-nowrap bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(167,139,250,0.30)] transition-[filter] duration-500 group-hover:drop-shadow-[0_0_20px_rgba(167,139,250,0.6)]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #F8F4FF 0%, #E9DEFB 50%, #C4B5FD 100%)",
          }}
        >
          {children ?? label}
        </span>
      </span>
    </button>
  );
}

export { ButtonCta };
