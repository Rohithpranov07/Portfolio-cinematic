"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface Safari_01Props {
  image?: StaticImageData | string;
  url?: string;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
}

const Safari_01: React.FC<Safari_01Props> = ({
  image,
  url,
  children,
  className,
  bodyClassName,
  style,
}) => {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-[#1c1c1c] bg-[#070707] shadow-[0_18px_60px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(167,139,250,0.04)] overflow-hidden",
        className
      )}
      style={style}
    >
      {/* Safari top bar */}
      <div
        className="relative flex items-center bg-[#0d0d0d] border-b border-[#1c1c1c]"
        style={{ paddingLeft: "28px", paddingRight: "28px", paddingTop: "18px", paddingBottom: "18px" }}
      >
        {/* Traffic lights */}
        <div className="flex items-center shrink-0" style={{ gap: "10px" }}>
          <span
            className="rounded-full"
            style={{ width: "14px", height: "14px", backgroundColor: "#ff5f57", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}
          />
          <span
            className="rounded-full"
            style={{ width: "14px", height: "14px", backgroundColor: "#febc2e", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}
          />
          <span
            className="rounded-full"
            style={{ width: "14px", height: "14px", backgroundColor: "#28c840", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}
          />
        </div>

        {/* Centered URL pill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-full"
          style={{ maxWidth: "440px", paddingLeft: "72px", paddingRight: "72px" }}
        >
          <div
            className="rounded-md bg-[#161616] border border-[#1f1f1f] flex items-center justify-center text-[#9a9a9a] font-mono"
            style={{ height: "30px", gap: "8px", fontSize: "12.5px", letterSpacing: "0.02em" }}
          >
            <svg viewBox="0 0 16 16" className="w-3 h-3 text-[#a78bfa]" fill="none">
              <path
                d="M11 7a3 3 0 0 0-3-3H6a3 3 0 1 0 0 6h1"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M5 9a3 3 0 0 0 3 3h2a3 3 0 1 0 0-6H9"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="truncate">{url ?? "portfolio.local"}</span>
          </div>
        </div>

        {/* Right-side spacer (matches traffic-light width for symmetry) */}
        <div className="ml-auto flex items-center gap-2 text-[#5a5a5a] shrink-0">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
            <path
              d="M5 2h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className={cn("bg-[#070707]", bodyClassName)}>
        {children ? (
          children
        ) : image ? (
          <div className="aspect-video flex items-center justify-center bg-[#0a0a0a]">
            <Image
              src={image}
              alt="Preview"
              width={800}
              height={450}
              className="object-contain max-h-full max-w-full"
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-[#0a0a0a] text-sm text-[#5a5a5a] font-mono">
            No preview
          </div>
        )}
      </div>
    </div>
  );
};

export default Safari_01;
