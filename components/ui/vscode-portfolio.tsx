"use client";
import React from "react";
import Image from "next/image";
import { FileTree, type FileNode } from "@/components/ui/file-tree";
import { SpotlightSearch } from "@/components/ui/apple-spotlight";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import Safari_01 from "@/components/ui/safari-01";
import { ButtonCta } from "@/components/ui/button-shiny";
import LogoLoop from "@/components/ui/logo-loop";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";
import TextType from "@/components/ui/text-type";
import { ProjectModal, type Project } from "@/components/ui/project-modal";

/* ---------- Tiny icon set (inline SVG) ---------- */
const I = {
  files: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M14 4.5V14a1 1 0 0 1-1 1H5v-1h8V5h-2.5L9 3.5H5V8H4V3a1 1 0 0 1 1-1h4.5L14 4.5Z" fill="currentColor"/>
      <path d="M3 6h7v9H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" fill="currentColor" fillOpacity=".55"/>
    </svg>
  ),
  search: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.82 4.39A6 6 0 1 1 11.39 10.68l3.46 3.46-.7.71-3.47-3.46Z" fill="currentColor"/>
    </svg>
  ),
  git: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M11.5 5a1.5 1.5 0 1 0-2.62 1l-2.05 3.46a1.5 1.5 0 1 0 .86.5L9.74 6.5A1.5 1.5 0 0 0 11.5 5Zm-7 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" fill="currentColor"/>
    </svg>
  ),
  debug: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M11 5V3.5L12.5 2l.7.7L12 4h1v1h-1.05A4 4 0 0 1 12 6v1h2v1h-2v1h2v1h-2.05A4 4 0 0 1 4.05 10H2V9h2V8H2V7h2V6h-.05A4 4 0 0 1 4 5H3V4h1L2.8 2.7l.7-.7L5 3.5V5h6Z" fill="currentColor"/>
    </svg>
  ),
  ext: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M7 2H3a1 1 0 0 0-1 1v4h1V3h4V2Zm6 6h-1V4h-4V3h5v5ZM3 9H2v4a1 1 0 0 0 1 1h4v-1H3V9Zm10 0h-1v4H8v1h5v-5Z" fill="currentColor"/>
    </svg>
  ),
  warn: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 2 1.5 13.5h13L8 2Zm.5 8.5h-1v-4h1v4Zm0 2h-1v-1h1v1Z" fill="currentColor"/>
    </svg>
  ),
  beaker: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M6 2v4.2L2.4 12.5A1.5 1.5 0 0 0 3.7 14.7h8.6a1.5 1.5 0 0 0 1.3-2.2L10 6.2V2H6Zm1 1h2v3.5l1.4 2.5H5.6L7 6.5V3Z" fill="currentColor"/>
    </svg>
  ),
  cube: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 1.5 2 4.5v7L8 14.5l6-3v-7L8 1.5Zm0 1.1 4.6 2.3L8 7.2 3.4 4.9 8 2.6ZM3 6l4.5 2.3v5L3 11V6Zm5.5 7.3v-5L13 6v5l-4.5 2.3Z" fill="currentColor"/>
    </svg>
  ),
  chev: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrow: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  copy: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="5" y="5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M3 11V3.6A.6.6 0 0 1 3.6 3H11" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  ),
  ext_arrow: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M6 4h6v6m0-6L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  mouse: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="4" y="2" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 5v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  clock: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  chat: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2.5 3.5h11v7h-5l-3 2.5v-2.5h-3v-7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  stack: (p: any) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 2 2 5l6 3 6-3-6-3Zm-6 6 6 3 6-3M2 11l6 3 6-3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ---------- File tree data ---------- */
const fileStructure: FileNode[] = [
  {
    name: "app",
    type: "folder",
    children: [
      { name: "home.tsx", type: "file", extension: "tsx" },
      { name: "about.tsx", type: "file", extension: "tsx" },
      { name: "projects.tsx", type: "file", extension: "tsx" },
      { name: "layout.tsx", type: "file", extension: "tsx" },
    ],
  },
  {
    name: "components",
    type: "folder",
    children: [
      { name: "Hero.tsx", type: "file", extension: "tsx" },
      { name: "Navbar.tsx", type: "file", extension: "tsx" },
      { name: "ProjectCard.tsx", type: "file", extension: "tsx" },
      { name: "Footer.tsx", type: "file", extension: "tsx" },
    ],
  },
  {
    name: "hooks",
    type: "folder",
    children: [
      { name: "useScroll.ts", type: "file", extension: "ts" },
      { name: "useMouse.ts", type: "file", extension: "ts" },
    ],
  },
  {
    name: "animations",
    type: "folder",
    children: [
      { name: "gsap.ts", type: "file", extension: "ts" },
      { name: "transitions.ts", type: "file", extension: "ts" },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [
      { name: "utils.ts", type: "file", extension: "ts" },
      { name: "constants.ts", type: "file", extension: "ts" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      {
        name: "assets",
        type: "folder",
        children: [
          { name: "logo.svg", type: "file", extension: "svg" },
          { name: "hero.png", type: "file", extension: "png" },
        ],
      },
      { name: "favicon.svg", type: "file", extension: "svg" },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [{ name: "globals.css", type: "file", extension: "css" }],
  },
  { name: "config.ts", type: "file", extension: "ts" },
  { name: "package.json", type: "file", extension: "json" },
  { name: "tsconfig.json", type: "file", extension: "json" },
  { name: "README.md", type: "file", extension: "md" },
];

/* ---------- Section label ---------- */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center" style={{ gap: "10px", marginBottom: "16px" }}>
    <span className="text-[10px] tracking-[0.22em] text-[#7a7a7a] font-mono uppercase">{children}</span>
    <span
      aria-hidden
      className="flex-1 h-px"
      style={{ background: "linear-gradient(90deg, rgba(167,139,250,0.18), transparent)" }}
    />
  </div>
);

/* ---------- Tech stack icons ---------- */
const TechIcon = ({ kind }: { kind: string }) => {
  const base = "w-full h-full flex items-center justify-center";
  if (kind === "react")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <circle cx="12" cy="12" r="2" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="4"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
          </g>
        </svg>
      </div>
    );
  if (kind === "next")
    return (
      <div className={base}>
        <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-[14px]" style={{ fontFamily: "serif" }}>N</div>
      </div>
    );
  if (kind === "ts")
    return (
      <div className={base}>
        <div className="w-7 h-7 rounded-[5px] bg-[#3178c6] text-white font-bold flex items-center justify-center text-[12px]">TS</div>
      </div>
    );
  if (kind === "tw")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#38bdf8">
          <path d="M12 6c-2.7 0-4.4 1.35-5 4 .9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.668 1.716 1.218C12.728 10.764 13.74 11.85 16 11.85c2.7 0 4.4-1.35 5-4-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.668-1.716-1.218C15.272 7.086 14.26 6 12 6Zm-5 6c-2.7 0-4.4 1.35-5 4 .9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.668 1.716 1.218C7.728 16.764 8.74 17.85 11 17.85c2.7 0 4.4-1.35 5-4-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.668-1.716-1.218C10.272 13.086 9.26 12 7 12Z"/>
        </svg>
      </div>
    );
  if (kind === "js")
    return (
      <div className={base}>
        <div className="w-7 h-7 rounded-[5px] bg-[#5cb85c] text-white font-bold flex items-center justify-center text-[10px]">JS</div>
      </div>
    );
  if (kind === "aws")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path d="M6.7 11.2c0 .3 0 .55.08.74.1.2.22.4.38.62a.38.38 0 0 1 .06.2c0 .08-.05.17-.16.26l-.54.36a.4.4 0 0 1-.22.07c-.08 0-.17-.04-.25-.12a2.6 2.6 0 0 1-.3-.4 6.4 6.4 0 0 1-.26-.5c-.67.79-1.5 1.18-2.5 1.18-.7 0-1.27-.2-1.7-.6-.41-.4-.62-.94-.62-1.6 0-.71.25-1.29.76-1.72.5-.43 1.19-.65 2.05-.65.28 0 .58.03.89.07.3.04.62.1.95.18v-.6c0-.64-.13-1.08-.4-1.34-.27-.26-.73-.39-1.38-.39-.3 0-.6.04-.92.11-.31.07-.62.16-.92.27a2.45 2.45 0 0 1-.3.11.52.52 0 0 1-.13.02c-.12 0-.18-.08-.18-.26v-.41c0-.14.02-.24.06-.3.04-.06.12-.12.24-.18.3-.15.65-.28 1.07-.38.42-.1.86-.16 1.33-.16 1.01 0 1.75.23 2.23.69.47.45.71 1.15.71 2.08v2.75ZM3.27 12.5c.28 0 .57-.05.87-.15.3-.1.57-.28.8-.53.13-.16.23-.34.28-.55.04-.2.07-.45.07-.74v-.36a7 7 0 0 0-.76-.14 6.3 6.3 0 0 0-.78-.05c-.55 0-.96.11-1.23.33-.27.22-.4.54-.4.95 0 .39.1.68.3.88.2.2.49.36.85.36Zm6.79.93a.46.46 0 0 1-.32-.08c-.07-.07-.14-.21-.2-.4l-2.2-7.24a1.8 1.8 0 0 1-.1-.41c0-.16.08-.25.25-.25h.86c.15 0 .26.03.32.08.07.07.13.21.19.4l1.57 6.2 1.46-6.2c.05-.2.11-.33.18-.4a.6.6 0 0 1 .33-.08h.7c.16 0 .27.03.34.08.06.07.13.21.17.4l1.48 6.28 1.62-6.28c.06-.2.13-.33.19-.4a.55.55 0 0 1 .32-.08h.81c.17 0 .26.09.26.25 0 .05-.01.1-.02.16a1.4 1.4 0 0 1-.08.25l-2.25 7.24c-.06.2-.13.32-.2.4a.6.6 0 0 1-.32.07h-.75c-.15 0-.26-.02-.33-.08-.07-.07-.13-.2-.17-.4l-1.45-6.05-1.44 6.04c-.04.2-.1.34-.17.41-.07.06-.19.08-.33.08h-.75ZM20.95 13.61c-.44 0-.88-.05-1.3-.15-.42-.1-.75-.21-.97-.34-.13-.07-.22-.15-.26-.23a.6.6 0 0 1-.05-.24v-.43c0-.18.06-.26.2-.26.05 0 .1.01.16.03.06.02.14.06.23.1.3.13.62.23.96.3.35.07.69.11 1.04.11.55 0 .98-.1 1.27-.29.3-.19.45-.47.45-.83 0-.24-.08-.45-.23-.62-.16-.16-.46-.32-.88-.46l-1.27-.4c-.64-.2-1.11-.5-1.4-.9a2.1 2.1 0 0 1-.45-1.27c0-.36.08-.69.23-.97.16-.28.37-.52.63-.71.27-.2.57-.35.92-.45.36-.1.73-.15 1.12-.15.19 0 .39.02.58.04.2.04.39.07.57.12.18.05.34.1.5.16.16.06.28.13.36.19.12.07.2.14.25.22.04.07.07.16.07.28v.4c0 .19-.07.28-.2.28a.92.92 0 0 1-.34-.1 4.1 4.1 0 0 0-1.73-.36c-.5 0-.89.08-1.16.25-.27.16-.41.42-.41.76 0 .24.1.45.27.62.18.16.5.33.96.48l1.24.4c.64.2 1.09.49 1.36.86.27.36.4.78.4 1.25 0 .37-.07.7-.22.99-.16.3-.37.55-.64.75-.28.21-.61.36-.99.47-.4.12-.81.18-1.26.18ZM21.95 17.5c-2.71 2-6.65 3.07-10.04 3.07-4.74 0-9.02-1.75-12.25-4.66-.26-.23-.03-.55.27-.37 3.5 2.03 7.81 3.26 12.27 3.26 3.02 0 6.32-.63 9.37-1.92.46-.2.85.3.38.62Z" fill="#ff9900"/>
          <path d="M23.08 16.27c-.35-.45-2.3-.22-3.18-.1-.27.03-.31-.2-.07-.37 1.56-1.1 4.12-.78 4.42-.41.3.38-.08 2.94-1.55 4.16-.22.19-.43.09-.34-.16.32-.83 1.03-2.68.72-3.12Z" fill="#ff9900"/>
        </svg>
      </div>
    );
  if (kind === "tf")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path d="M11 2 2 7v10l4 2v-9l5-3v15l4 2V8l5 3V7l-9-5Z" fill="#ff6f00"/>
          <path d="M11 2v17l4 2V8l5 3V7l-9-5Z" fill="#ffa726"/>
        </svg>
      </div>
    );
  if (kind === "hf")
    return (
      <div className={base}>
        <div className="w-7 h-7 rounded-full bg-[#ffd21e] flex items-center justify-center text-[14px]">🤗</div>
      </div>
    );
  if (kind === "lg")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <circle cx="6" cy="6" r="2.4" stroke="#a78bfa" strokeWidth="1.3" fill="#1a1330"/>
          <circle cx="18" cy="6" r="2.4" stroke="#f0abfc" strokeWidth="1.3" fill="#1a1330"/>
          <circle cx="12" cy="18" r="2.4" stroke="#c4b5fd" strokeWidth="1.3" fill="#1a1330"/>
          <path d="M6 8.4v3a2 2 0 0 0 2 2h8a2 2 0 0 1 2 2v0M6 8.4a2 2 0 0 0 2 2h2.5M18 8.4a2 2 0 0 1-2 2h-2.5M10.5 10.4l1.5 5M13.5 10.4 12 15.4" stroke="#c4b5fd" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
      </div>
    );
  if (kind === "claude")
    return (
      <div className={base}>
        <svg viewBox="0 -0.01 39.5 39.53" className="w-7 h-7" fill="none">
          <path d="m7.75 26.27 7.77-4.36.13-.38-.13-.21h-.38l-1.3-.08-4.44-.12-3.85-.16-3.73-.2-.94-.2-.88-1.16.09-.58.79-.53 1.13.1 2.5.17 3.75.26 2.72.16 4.03.42h.64l.09-.26-.22-.16-.17-.16-3.88-2.63-4.2-2.78-2.2-1.6-1.19-.81-.6-.76-.26-1.66 1.08-1.19 1.45.1.37.1 1.47 1.13 3.14 2.43 4.1 3.02.6.5.24-.17.03-.12-.27-.45-2.23-4.03-2.38-4.1-1.06-1.7-.28-1.02c-.1-.42-.17-.77-.17-1.2l1.23-1.67.68-.22 1.64.22.69.6 1.02 2.33 1.65 3.67 2.56 4.99.75 1.48.4 1.37.15.42h.26v-.24l.21-2.81.39-3.45.38-4.44.13-1.25.62-1.5 1.23-.81.96.46.79 1.13-.11.73-.47 3.05-.92 4.78-.6 3.2h.35l.4-.4 1.62-2.15 2.72-3.4 1.2-1.35 1.4-1.49.9-.71h1.7l1.25 1.86-.56 1.92-1.75 2.22-1.45 1.88-2.08 2.8-1.3 2.24.12.18.31-.03 4.7-1 2.54-.46 3.03-.52 1.37.64.15.65-.54 1.33-3.24.8-3.8.76-5.66 1.34-.07.05.08.1 2.55.24 1.09.06h2.67l4.97.37 1.3.86.78 1.05-.13.8-2 1.02-2.7-.64-6.3-1.5-2.16-.54h-.3v.18l1.8 1.76 3.3 2.98 4.13 3.84.21.95-.53.75-.56-.08-3.63-2.73-1.4-1.23-3.17-2.67h-.21v.28l.73 1.07 3.86 5.8.2 1.78-.28.58-1 .35-1.1-.2-2.26-3.17-2.33-3.57-1.88-3.2-.23.13-1.11 11.95-.52.61-1.2.46-1-.76-.53-1.23.53-2.43.64-3.17.52-2.52.47-3.13.28-1.04-.02-.07-.23.03-2.36 3.24-3.59 4.85-2.84 3.04-.68.27-1.18-.61.11-1.09.66-.97 3.93-5 2.37-3.1 1.53-1.79-.01-.26h-.09l-10.44 6.78-1.86.24-.8-.75.1-1.23.38-.4 3.14-2.16z" fill="#d97757"/>
        </svg>
      </div>
    );
  if (kind === "flutter")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path d="M14.3 2 4 12.3l3.2 3.2L20.7 2h-6.4Z" fill="#42a5f5"/>
          <path d="M14.3 13.4 9.2 18.5l3.2 3.2 5.1-5.1-3.2-3.2Z" fill="#0d47a1"/>
          <path d="M9.2 18.5 12.4 21.7h6.4L12.4 15.3 9.2 18.5Z" fill="#42a5f5"/>
          <path d="m12.4 15.3 3.2 3.2-1.3 1.3-3.2-3.2 1.3-1.3Z" fill="#1976d2"/>
        </svg>
      </div>
    );
  if (kind === "github")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#f0f6fc">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
        </svg>
      </div>
    );
  if (kind === "docker")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#2496ed">
          <path d="M22.5 9.4c-.06-.05-.6-.46-1.74-.46-.3 0-.6.03-.9.08-.22-1.51-1.47-2.24-1.53-2.27l-.3-.18-.2.28c-.26.4-.45.86-.55 1.34-.2.86-.08 1.66.34 2.34-.5.28-1.32.35-1.5.36H1.6a.6.6 0 0 0-.6.6 8.96 8.96 0 0 0 .56 3.26c.42 1.1 1.04 1.9 1.86 2.39 1.85 1.1 4.04 1.34 5.84 1.34.81 0 1.6-.07 2.32-.2 1-.18 1.96-.5 2.83-.96a8.05 8.05 0 0 0 1.97-1.55c1.07-1.2 1.7-2.53 2.16-3.72.06.01.13.01.2.01 1.21 0 1.95-.49 2.36-.89.27-.26.49-.58.63-.95l.09-.27-.21-.16ZM2.85 10h2.04c.1 0 .18-.08.18-.18V8a.18.18 0 0 0-.18-.18H2.85a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm2.81 0H7.7c.1 0 .18-.08.18-.18V8a.18.18 0 0 0-.18-.18H5.66a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm2.85 0h2.04c.1 0 .18-.08.18-.18V8a.18.18 0 0 0-.18-.18H8.51a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm2.81 0h2.04c.1 0 .18-.08.18-.18V8a.18.18 0 0 0-.18-.18h-2.04a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm-5.66-2.6H7.7c.1 0 .18-.08.18-.18V5.4a.18.18 0 0 0-.18-.18H5.66a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm2.85 0h2.04c.1 0 .18-.08.18-.18V5.4a.18.18 0 0 0-.18-.18H8.51a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm2.81 0h2.04c.1 0 .18-.08.18-.18V5.4a.18.18 0 0 0-.18-.18h-2.04a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm0-2.6h2.04c.1 0 .18-.08.18-.18V2.8a.18.18 0 0 0-.18-.18h-2.04a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Zm2.83 5.2h2.04c.1 0 .18-.08.18-.18V8a.18.18 0 0 0-.18-.18h-2.04a.18.18 0 0 0-.18.18v1.82c0 .1.08.18.18.18Z"/>
        </svg>
      </div>
    );
  return null;
};

/* ---------- Main component ---------- */
const featuredProjects: Project[] = [
  {
    title: "ProofStack",
    year: "2025",
    tag: "Product",
    featured: true,
    desc: "Multi-signal developer trust platform that cross-validates resumes against GitHub forensics and LeetCode behavioral data to deliver a single PST Trust Score in under 30 seconds.",
    stack: ["FastAPI", "Next.js", "PostgreSQL"],
    artwork: "linear-gradient(180deg, #1e1b4b 0%, #5b21b6 50%, #ec4899 100%)",
    image: "/Proofstack-1.png",
    overview:
      "ProofStack is a multi-signal developer trust platform built to end resume guesswork. It cross-references GitHub commit forensics, LeetCode behavioral patterns, and StackOverflow contributions through a 10-engine algorithmic verification pipeline — producing a single PST Trust Score backed by Shannon entropy, z-score anomaly detection, and pattern analysis. Decisions in under 30 seconds, math instead of gut feel.",
    features: [
      "10-engine algorithmic verification pipeline",
      "GitHub commit forensics & anomaly detection",
      "LeetCode behavioral pattern analysis",
      "Shannon entropy + z-score scoring",
      "Sub-30 second trust score generation",
      "Recruiter-ready candidate reports",
    ],
    links: {
      github: "https://github.com/Rohithpranov07/ProofStack.git",
      linkedin: "https://www.linkedin.com/in/rohith-pranov/",
    },
  },
  {
    title: "KodaiRateIQ",
    year: "2025",
    tag: "Product",
    featured: true,
    desc: "AI-powered hotel rate intelligence platform that monitors competitor pricing across OTAs and delivers Gemini-generated pricing strategies through a Bloomberg-inspired dashboard.",
    stack: ["Next.js", "PostgreSQL", "MiMO AI"],
    artwork: "linear-gradient(180deg, #0c1e3e 0%, #1e3a8a 45%, #7c3aed 100%)",
    image: "/KodairateIQ.png",
    overview:
      "KodaiRateIQ is a hotel rate-intelligence platform that watches competitor pricing across OTAs in real time and translates the signal into action. A Bloomberg-inspired dashboard surfaces rate movements, demand windows, and anomaly alerts — while Gemini-generated strategies tell revenue managers exactly when to flex price and why.",
    features: [
      "Real-time multi-OTA rate scraping",
      "Gemini-driven pricing recommendations",
      "Bloomberg-style terminal dashboard",
      "Competitor benchmarking & alerts",
      "Demand-forecast visualizations",
      "Revenue strategy export to PDF",
    ],
    links: {
      github: "https://github.com/Rohithpranov07/KodaiRateIQ.git",
      linkedin: "https://www.linkedin.com/in/rohith-pranov/",
      live: "https://kodai-rate-iq.vercel.app/",
    },
  },
  {
    title: "CyberShield India",
    year: "2025",
    tag: "Open Source",
    featured: true,
    desc: "Law-enforcement-grade digital forensics platform that detects AI-generated media, traces digital footprints, and anchors tamper-proof evidence on the Polygon blockchain.",
    stack: ["FastAPI", "React", "Blockchain"],
    artwork: "linear-gradient(180deg, #042f2e 0%, #134e4a 40%, #7c3aed 100%)",
    image: "/cybershield-1.png",
    overview:
      "CyberShield India is a law-enforcement-grade digital forensics platform that detects AI-generated media, traces digital footprints across surfaces, and anchors tamper-proof evidence hashes onto the Polygon blockchain. Built for investigators who need their findings to hold up in a courtroom — chain of custody, audit trail, and cryptographic proof, all baked in.",
    features: [
      "Deepfake & AI-generated media detection",
      "Cross-platform digital footprint tracing",
      "Polygon blockchain evidence anchoring",
      "Chain-of-custody audit logs",
      "Cryptographic tamper-proofing",
      "Investigator-grade case dashboard",
    ],
    links: {
      github: "https://github.com/Rohithpranov07/cybershield-india.git",
      linkedin:
        "https://www.linkedin.com/posts/rohith-pranov_artificialintelligence-blockchain-cybersecurity-activity-7429836126657507329-Qp0L",
    },
  },
];

export const VSCodePortfolio: React.FC = () => {
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-[#cccccc] flex flex-col overflow-hidden rounded-[6px]"
      style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", fontSize: 12 }}>

      {/* ===== macOS menu bar ===== */}
      <div className="shrink-0">
        <MacOSMenuBar appName="Portfolio" />
      </div>

      {/* ===== Title bar ===== */}
      <div className="flex items-center h-[38px] px-5 bg-[#0a0a0a] border-b border-[#1a1a1a] shrink-0">
        {/* Back / forward */}
        <div className="flex items-center gap-3 text-[#7a7a7a] mr-auto">
          <button className="w-5 h-5 flex items-center justify-center"><svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><path d="M10 4 6 8l4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg></button>
          <button className="w-5 h-5 flex items-center justify-center"><svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg></button>
        </div>
        {/* Spotlight search (⌘K) */}
        <div className="flex-1 max-w-[420px] -ml-10 h-[22px] flex items-center">
          <SpotlightSearch triggerClassName="w-full h-[22px]" />
        </div>
        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3 text-[#7a7a7a]">
          <span className="flex items-center gap-1 text-[10px] text-[#bdbdbd]"><span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>2</span>
          <I.chev className="w-3 h-3 -ml-1" />
          <div className="flex items-center gap-2 ml-2">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" fill="none"/><path d="M9 3v10" stroke="currentColor"/></svg>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" fill="none"/><path d="M2 8h12" stroke="currentColor"/></svg>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" fill="none"/><rect x="9" y="3" width="5" height="10" fill="currentColor" opacity=".4"/></svg>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" fill="none"/><rect x="11" y="3" width="3" height="10" fill="currentColor" opacity=".4"/></svg>
          </div>
        </div>
      </div>

      {/* ===== Body ===== */}
      <div className="flex flex-1 min-h-0">
        {/* Activity bar */}
        <div className="w-[44px] bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col items-center py-2 shrink-0 text-[#6f6f6f]">
          <div className="relative w-full flex justify-center py-2 text-white">
            <span className="absolute left-0 top-0 h-full w-[2px] bg-white"></span>
            <I.files className="w-5 h-5" />
          </div>
          <div className="py-2.5"><I.cube className="w-5 h-5" /></div>
          <div className="py-2.5"><I.beaker className="w-5 h-5" /></div>
          <div className="py-2.5"><I.search className="w-5 h-5" /></div>
          <div className="py-2.5"><I.git className="w-5 h-5" /></div>
          <div className="py-2.5"><I.debug className="w-5 h-5" /></div>
          <div className="py-2.5"><I.ext className="w-5 h-5" /></div>
          <div className="py-2.5 text-[#f59e0b]"><I.warn className="w-5 h-5" /></div>
          <div className="py-2.5"><I.beaker className="w-5 h-5" /></div>
          <div className="py-2.5"><I.cube className="w-5 h-5" /></div>
          <div className="py-2.5"><I.stack className="w-5 h-5" /></div>
          <div className="mt-auto flex flex-col items-center gap-3 pb-1">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#6366f1] flex items-center justify-center text-[10px] text-white">R</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3b82f6] text-white text-[8px] flex items-center justify-center">1</span>
            </div>
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="currentColor"><circle cx="8" cy="8" r="2.2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" strokeWidth="1.1"/></svg>
          </div>
        </div>

        {/* Explorer */}
        <div className="w-[210px] bg-[#0a0a0a] border-r border-[#1a1a1a] shrink-0 flex flex-col">
          <div className="flex items-center justify-between px-3 pt-3 pb-2">
            <span className="text-[11px] tracking-[0.12em] text-[#9a9a9a]">EXPLORER</span>
            <span className="text-[#6f6f6f]">⋯</span>
          </div>
          <div className="px-2 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center px-1 py-[3px] text-[11px] text-[#cfcfcf] font-medium">
              <I.chev className="w-3 h-3 mr-1 rotate-90 text-[#9a9a9a]" />
              <span>PORTFOLIO.DRAFT</span>
            </div>
            <FileTree
              data={fileStructure}
              defaultOpen={true}
              initialActive="components/Hero.tsx"
              className="mt-1 pb-2"
            />
          </div>
          <div className="px-3 py-2 border-t border-[#161616] text-[11px] tracking-[0.12em] text-[#9a9a9a] flex items-center">
            <I.chev className="w-3 h-3 mr-1" /> OUTLINE
          </div>
          <div className="px-3 py-2 border-t border-[#161616] text-[11px] tracking-[0.12em] text-[#9a9a9a] flex items-center">
            <I.chev className="w-3 h-3 mr-1" /> TIMELINE
          </div>
        </div>

        {/* Editor + Right panel */}
        <div className="flex-1 flex min-w-0 bg-[#0d0d0d]">
          {/* Editor */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Tab bar */}
            <div className="h-[30px] bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center text-[11px] shrink-0">
              <div className="h-full flex items-center gap-2 px-3 bg-[#0d0d0d] border-r border-[#1a1a1a] text-white">
                <svg viewBox="0 0 16 16" className="w-3 h-3 text-[#519aba]" fill="currentColor"><path d="M2 2h12v12H2z" opacity=".15"/><path d="M3 8h2v1H3v2h3v1H2V8Zm5 0h5v1h-2v4h-1V9H8V8Z"/></svg>
                Welcome
                <span className="ml-2 text-[#7a7a7a] hover:text-white">×</span>
              </div>
            </div>

            {/* Editor body */}
            <div className="flex-1 overflow-auto px-20 pt-20 pb-16 min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <p className="text-[22px] text-[#cfcfcf]" style={{ marginTop: "12px", marginLeft: "24px", marginBottom: "4px" }}>Hi, I&apos;m</p>
              <h1 className="text-[104px] leading-[1.05] font-bold tracking-tight" style={{ marginBottom: "16px", marginLeft: "24px" }}>
                <TextType
                  as="span"
                  text="Rohith Pranov"
                  loop={false}
                  typingSpeed={160}
                  initialDelay={500}
                  variableSpeed={{ min: 120, max: 220 }}
                  showCursor
                  cursorBlinkDuration={0.65}
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #a78bfa 0%, #c4b5fd 50%, #f0abfc 100%)",
                  }}
                  cursorCharacter={
                    <span
                      aria-hidden
                      className="inline-block align-middle"
                      style={{
                        width: "4px",
                        height: "0.78em",
                        marginLeft: "8px",
                        marginBottom: "-0.08em",
                        borderRadius: "2px",
                        background:
                          "linear-gradient(180deg, #f5f0ff 0%, #a78bfa 60%, #7c3aed 100%)",
                        boxShadow:
                          "0 0 18px rgba(167,139,250,0.7), 0 0 38px rgba(167,139,250,0.3)",
                      }}
                    />
                  }
                />
              </h1>
              <div className="flex items-center text-[15px] text-[#cfcfcf]" style={{ marginBottom: "0px" , marginLeft: "24px"}}>
                <svg viewBox="0 0 16 16" className="w-4 h-4 mr-1.5 text-[#a78bfa]" fill="currentColor"><path d="M4 1h6l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/></svg>
                <span className="text-[#a78bfa]">Full Stack Developer</span>
                <span className="text-[#6f6f6f] mx-2">•</span>
                <span>building digital experiences</span>
              </div>
              <p className="text-[15px] text-[#9a9a9a] max-w-[640px]" style={{ marginBottom: "40px", marginLeft: "24px"}}>with clean code and creative thinking.</p>

              {/* Code block — Safari-framed */}
              <Safari_01
                url="rohithpranov.dev/developer.ts"
                className="mb-12 max-w-[820px]"
                style={{ marginLeft: "24px", marginRight: "24px", marginBottom: "24px" }}
              >
                <pre className="px-10 py-9 leading-[2.1] tracking-[0.01em] overflow-hidden font-mono text-[13.5px]">
{[
"const developer = {",
'  name: "Rohith Pranov V",',
'  role: "Full Stack Developer · AI/ML Engineer · AWS ML Associate · UI/UX Designer",',
'  skills: ["React", "Next.js", "FastAPI", "Python", "LangGraph", "Flutter", "AWS"],',
'  focus: "Shipping production-grade AI systems & cloud-native ML pipelines",',
'  passion: "Intelligent automation, ML engineering & forensic tech",',
"};",
"",
"// Let's build something extraordinary",
].map((line, i) => (
  <CodeLine key={i} n={i+1} line={line} />
))}
                </pre>
              </Safari_01>

              {/* Buttons */}
              <div
                className="flex items-center justify-center"
                style={{ gap: "28px", marginBottom: "96px", marginTop: "8px" }}
              >
                <ButtonCta
                  className="min-w-[200px]"
                  onClick={() => {
                    const target = document.getElementById("showcase");
                    if (target) {
                      const y = target.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  <span className="flex items-center gap-2">
                    Explore My Work <I.arrow className="w-3.5 h-3.5 text-[#D69DDE]" />
                  </span>
                </ButtonCta>
                <ButtonCta
                  label="About Me"
                  className="min-w-[200px]"
                  onClick={() => {
                    const target = document.getElementById("about");
                    if (target) {
                      const y = target.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                />
              </div>

              {/* Scroll to explore cue */}
              <div
                className="flex flex-col items-center"
                style={{ gap: "10px", marginTop: "-72px" }}
              >
                <span
                  className="vp-scroll-shimmer"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                  }}
                >
                  Scroll to Explore
                </span>
                <span
                  aria-hidden
                  style={{
                    position: "relative",
                    width: "1px",
                    height: "36px",
                    overflow: "hidden",
                    background: "rgba(167,139,250,0.12)",
                  }}
                >
                  <span
                    className="vp-scroll-beam"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "40%",
                      background:
                        "linear-gradient(180deg, transparent 0%, #a78bfa 50%, transparent 100%)",
                    }}
                  />
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="vp-scroll-chevron"
                  style={{ width: "12px", height: "12px", color: "#c4b5fd" }}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <style jsx>{`
                .vp-scroll-shimmer {
                  background: linear-gradient(
                    90deg,
                    rgba(167, 139, 250, 0.35) 0%,
                    rgba(245, 240, 255, 0.95) 40%,
                    #c4b5fd 50%,
                    rgba(245, 240, 255, 0.95) 60%,
                    rgba(167, 139, 250, 0.35) 100%
                  );
                  background-size: 220% 100%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                  animation: vp-shimmer 3.6s ease-in-out infinite;
                }
                @keyframes vp-shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }

                .vp-scroll-beam {
                  animation: vp-beam 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }
                @keyframes vp-beam {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(250%); }
                }

                .vp-scroll-chevron {
                  animation: vp-bounce 1.8s ease-in-out infinite;
                }
                @keyframes vp-bounce {
                  0%, 100% { transform: translateY(0); opacity: 0.55; }
                  50% { transform: translateY(3px); opacity: 1; }
                }
              `}</style>
            </div>
          </div>

          {/* Right panel */}
          <aside
            className="w-[400px] bg-[#0a0a0a] border-l border-[#1a1a1a] shrink-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ padding: "44px 32px 40px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>

              {/* ===== Current status ===== */}
              <section>
                <SectionLabel>CURRENT STATUS</SectionLabel>
                <a
                  href="https://www.linkedin.com/in/rohith-pranov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-[16px] border border-[#1a1a1a] transition-all duration-500 hover:border-[#a78bfa]/30 cursor-pointer"
                  style={{
                    background: "linear-gradient(180deg, rgba(20,17,30,0.7) 0%, rgba(10,8,16,0.85) 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 32px -16px rgba(0,0,0,0.6)",
                    padding: "22px 24px",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center" style={{ gap: "10px" }}>
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                      </span>
                      <span className="text-[13px] text-white font-medium tracking-tight">Available for work</span>
                    </div>
                    <span className="text-[9px] tracking-[0.18em] text-[#5a5a5a] uppercase">Online</span>
                  </div>
                  <p className="text-[11.5px] text-[#9a9a9a] leading-[1.55]" style={{ marginBottom: "16px" }}>
                    Open to freelance, full-time, and creative collaborations.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <span className="text-[10px] text-[#6a6a6a] tracking-[0.05em]">Response within 24h</span>
                    <span className="text-[10px] text-[#a78bfa] tracking-[0.05em] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Get in touch <I.ext_arrow className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  {/* Decorative orb */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 w-[110px] h-[110px] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.55), rgba(30,27,75,0) 65%)",
                      filter: "blur(2px)",
                    }}
                  />
                </a>
              </section>

              {/* ===== Tech stack ===== */}
              <section>
                <SectionLabel>TECH STACK</SectionLabel>
                <div
                  className="relative rounded-[16px] overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(20,17,30,0.7) 0%, rgba(10,8,16,0.85) 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 28px -16px rgba(0,0,0,0.55)",
                    padding: "18px 0",
                  }}
                >
                  <LogoLoop
                    logos={[
                      { node: <TechIcon kind="react" />, title: "React", ariaLabel: "React", href: "https://react.dev" },
                      { node: <TechIcon kind="next" />, title: "Next.js", ariaLabel: "Next.js", href: "https://nextjs.org" },
                      { node: <TechIcon kind="ts" />, title: "TypeScript", ariaLabel: "TypeScript", href: "https://www.typescriptlang.org" },
                      { node: <TechIcon kind="tw" />, title: "Tailwind CSS", ariaLabel: "Tailwind CSS", href: "https://tailwindcss.com" },
                      { node: <TechIcon kind="js" />, title: "JavaScript", ariaLabel: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                      { node: <TechIcon kind="aws" />, title: "AWS", ariaLabel: "AWS", href: "https://aws.amazon.com" },
                      { node: <TechIcon kind="tf" />, title: "TensorFlow / TFLite", ariaLabel: "TensorFlow", href: "https://www.tensorflow.org" },
                      { node: <TechIcon kind="hf" />, title: "HuggingFace", ariaLabel: "HuggingFace", href: "https://huggingface.co" },
                      { node: <TechIcon kind="lg" />, title: "LangGraph", ariaLabel: "LangGraph", href: "https://www.langchain.com/langgraph" },
                      { node: <TechIcon kind="claude" />, title: "Claude", ariaLabel: "Claude", href: "https://claude.ai" },
                      { node: <TechIcon kind="flutter" />, title: "Flutter", ariaLabel: "Flutter", href: "https://flutter.dev" },
                      { node: <TechIcon kind="github" />, title: "GitHub", ariaLabel: "GitHub", href: "https://github.com" },
                      { node: <TechIcon kind="docker" />, title: "Docker", ariaLabel: "Docker", href: "https://www.docker.com" },
                    ]}
                    speed={32}
                    direction="left"
                    logoHeight={30}
                    gap={36}
                    hoverSpeed={8}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#0e0b18"
                    ariaLabel="Technology stack"
                  />
                  {/* Top + bottom hairlines for premium framing */}
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)" }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.18), transparent)" }}
                  />
                </div>
                {/* Caption row */}
                <div
                  className="flex items-center justify-between"
                  style={{ paddingLeft: "4px", paddingRight: "4px", marginTop: "12px" }}
                >
                  <span className="text-[10px] text-[#6a6a6a] tracking-[0.12em] uppercase">Daily Drivers</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-[#a78bfa] tracking-[0.05em]">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#a78bfa] opacity-60 animate-ping" />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                    </span>
                    auto-scroll
                  </span>
                </div>
              </section>

              {/* ===== Featured projects (scroll stack) ===== */}
              <section>
                <div
                  className="flex items-center"
                  style={{ marginBottom: "14px", gap: "12px" }}
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#7a7a7a] font-mono uppercase shrink-0">
                    FEATURED WORK
                  </span>
                  <span
                    aria-hidden
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(167,139,250,0.18), transparent)",
                    }}
                  />
                  <span
                    className="relative flex items-center font-mono uppercase rounded-full shrink-0"
                    style={{
                      padding: "5px 11px",
                      gap: "7px",
                      fontSize: "8.5px",
                      letterSpacing: "0.18em",
                      background:
                        "linear-gradient(180deg, rgba(24,20,38,0.85) 0%, rgba(12,10,22,0.75) 100%)",
                      border: "1px solid rgba(167,139,250,0.24)",
                      boxShadow:
                        "0 4px 12px -6px rgba(0,0,0,0.55), 0 0 14px -6px rgba(167,139,250,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <I.mouse
                      className="w-2.5 h-2.5 text-[#c4b5fd]"
                      style={{
                        filter: "drop-shadow(0 0 4px rgba(167,139,250,0.45))",
                      }}
                    />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, #F5F0FF 0%, #C4B5FD 100%)",
                      }}
                    >
                      Scroll to explore
                    </span>
                  </span>
                </div>
                <div
                  className="relative rounded-[18px] overflow-hidden"
                  style={{
                    height: "420px",
                    background: "linear-gradient(180deg, rgba(20,17,30,0.55) 0%, rgba(10,8,16,0.85) 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 14px 36px -18px rgba(0,0,0,0.7)",
                  }}
                >
                  {/* Subtle top + bottom fades — softer now so card top reads clearly */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-6 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(10,8,16,0.85) 0%, rgba(10,8,16,0) 100%)" }}
                  />

                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-12 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(0deg, rgba(10,8,16,1) 0%, rgba(10,8,16,0) 100%)" }}
                  />
                  <ScrollStack
                    itemDistance={28}
                    itemScale={0.03}
                    itemStackDistance={12}
                    stackPosition="10%"
                    scaleEndPosition="5%"
                    baseScale={0.94}
                    blurAmount={1.2}
                  >
                    {featuredProjects.map((p, i) => (
                      <ScrollStackItem key={i}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProject(p)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveProject(p);
                            }
                          }}
                          className="group relative overflow-hidden rounded-[18px] cursor-pointer"
                          style={{
                            background: "linear-gradient(180deg, rgba(22,18,34,0.95) 0%, rgba(10,8,16,0.98) 100%)",
                            border: "1px solid rgba(167,139,250,0.10)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(167,139,250,0.04)",
                            transition: "border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(167,139,250,0.42)";
                            e.currentTarget.style.boxShadow =
                              "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 64px -16px rgba(0,0,0,0.85), 0 0 0 1px rgba(167,139,250,0.18), 0 0 40px -10px rgba(167,139,250,0.35)";
                            e.currentTarget.style.background =
                              "linear-gradient(180deg, rgba(30,24,48,0.97) 0%, rgba(14,11,24,0.99) 100%)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(167,139,250,0.10)";
                            e.currentTarget.style.boxShadow =
                              "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(167,139,250,0.04)";
                            e.currentTarget.style.background =
                              "linear-gradient(180deg, rgba(22,18,34,0.95) 0%, rgba(10,8,16,0.98) 100%)";
                          }}
                        >
                          {/* Hero artwork */}
                          <div
                            className="relative h-[120px] overflow-hidden"
                            style={{ background: p.artwork }}
                          >
                            {p.image && (
                              <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 820px"
                                // The first card is visible the moment the
                                // VSCode frame mounts (right rail, top of the
                                // stack) — mark it priority so the browser
                                // doesn't lazy-defer it. Everything else is
                                // pre-warmed by AssetPreloader during idle.
                                priority={i === 0}
                                loading="eager"
                                fetchPriority={i === 0 ? "high" : "low"}
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                                style={{ objectPosition: "center top" }}
                                draggable={false}
                              />
                            )}
                            <div
                              className="absolute inset-0"
                              style={{ background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%)", opacity: p.image ? 0 : 1 }}
                            />
                            <div
                              className="absolute inset-x-0 top-0 h-1/2 mix-blend-screen opacity-75"
                              style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(167,139,250,0.4), transparent 70%)" }}
                            />
                            <span
                              className="absolute top-4 left-4 text-[9.5px] font-mono tracking-[0.18em] text-white/90 backdrop-blur-md rounded-full uppercase"
                              style={{
                                background: "rgba(0,0,0,0.5)",
                                border: "1px solid rgba(255,255,255,0.14)",
                                padding: "6px 12px",
                                letterSpacing: "0.18em",
                              }}
                            >
                              {p.tag}
                            </span>
                            {p.featured && (
                              <span
                                className="absolute top-4 right-4 text-[9.5px] font-mono tracking-[0.18em] text-[#d8c9ff] backdrop-blur-md rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(180deg, rgba(58,38,108,0.85) 0%, rgba(31,18,58,0.85) 100%)",
                                  border: "1px solid rgba(167,139,250,0.4)",
                                  padding: "6px 12px",
                                  letterSpacing: "0.18em",
                                }}
                              >
                                ★ FEATURED
                              </span>
                            )}
                          </div>

                          <div style={{ padding: "18px 20px 18px" }}>
                            <div className="flex items-baseline justify-between" style={{ marginBottom: "8px" }}>
                              <span className="text-[15px] text-white font-semibold tracking-tight">{p.title}</span>
                              <span className="text-[10px] text-[#6a6a6a] tracking-[0.08em] font-mono">{p.year}</span>
                            </div>
                            <p className="text-[12px] text-[#9a9a9a] leading-[1.55]" style={{ marginBottom: "14px" }}>
                              {p.desc}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center flex-wrap" style={{ gap: "5px" }}>
                                {p.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[9px] text-[#7a7a7a] tracking-[0.05em] px-2 py-[3px] rounded-full"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <span className="flex items-center gap-1 text-[11px] text-[#a78bfa] group-hover:gap-2 transition-all">
                                View <I.ext_arrow className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </ScrollStackItem>
                    ))}
                  </ScrollStack>
                </div>
                {/* Caption row */}
                <div
                  className="flex items-center justify-between"
                  style={{ paddingLeft: "4px", paddingRight: "4px", marginTop: "12px" }}
                >
                  <span className="text-[10px] text-[#6a6a6a] tracking-[0.12em] uppercase">3 of 12</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-[#a78bfa] tracking-[0.05em]">
                    scroll to stack
                    <I.mouse className="w-3 h-3" />
                  </span>
                </div>
              </section>

              {/* ===== Quick stats ===== */}
              <section>
                <SectionLabel>QUICK STATS</SectionLabel>
                <div className="grid grid-cols-3" style={{ gap: "10px" }}>
                  {[
                    { icon: <I.chat className="w-3.5 h-3.5 text-[#c4b5fd]"/>, n: "10", suffix: "+", l: "Projects" },
                    { icon: <I.clock className="w-3.5 h-3.5 text-[#c4b5fd]"/>, n: "2", suffix: "y", l: "Experience" },
                    { icon: <I.stack className="w-3.5 h-3.5 text-[#c4b5fd]"/>, n: "5", suffix: "+", l: "Stacks" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="group relative rounded-[14px] cursor-pointer transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                      style={{
                        background: "linear-gradient(180deg, rgba(20,17,30,0.6) 0%, rgba(10,8,16,0.85) 100%)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                        padding: "16px 14px",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-[8px] flex items-center justify-center mb-3"
                        style={{
                          background: "linear-gradient(135deg, rgba(167,139,250,0.18), rgba(167,139,250,0.04))",
                          border: "1px solid rgba(167,139,250,0.18)",
                        }}
                      >
                        {s.icon}
                      </div>
                      <div className="flex items-baseline gap-0.5">
                        <span
                          className="text-[22px] font-semibold leading-none bg-clip-text text-transparent tracking-tight"
                          style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, #c4b5fd 100%)" }}
                        >
                          {s.n}
                        </span>
                        <span className="text-[12px] text-[#7a7a7a] font-medium">{s.suffix}</span>
                      </div>
                      <div className="text-[10px] text-[#6a6a6a] tracking-[0.06em] mt-2 uppercase">{s.l}</div>
                      {/* Hover ring */}
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(167,139,250,0.30)" }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* ===== Footer signature ===== */}
              <section className="pt-2 border-t border-white/[0.04]">
                <div className="flex items-center justify-between" style={{ paddingTop: "16px" }}>
                  <span className="text-[10px] text-[#5a5a5a] tracking-[0.18em] uppercase">Crafted in</span>
                  <span className="text-[10px] text-[#9a9a9a] tracking-[0.08em] font-mono">Bengaluru · IST</span>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {/* ===== Status bar ===== */}
      <div className="h-[26px] bg-[#0a0a0a] border-t border-[#1a1a1a] flex items-center text-[11px] text-[#bdbdbd] shrink-0">
        <div className="flex items-center gap-4 px-4">
          <span className="flex items-center gap-1 text-[#9a9a9a]"><svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor"><circle cx="8" cy="8" r="6"/><path d="m5 8 2 2 4-4"/></svg> 0</span>
          <span className="flex items-center gap-1 text-[#9a9a9a]"><I.warn className="w-3 h-3"/> 00</span>
          <span className="px-2 py-[1px] rounded-[3px] bg-[#1a1a1a] text-[#cfcfcf]">No Solution</span>
        </div>
        <div className="ml-auto flex items-center gap-5 px-4 text-[#9a9a9a]">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="flex items-center gap-1">{"{ }"} TypeScript JSX</span>
          <span className="flex items-center gap-1 text-[#a78bfa]">⚡ Prettier</span>
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
};

/* ---------- Code line with syntax tokens ---------- */
function CodeLine({ n, line }: { n: number; line: string }) {
  return (
    <div className="flex items-baseline">
      <span className="inline-block w-10 text-right pr-5 text-[#3a3a3a] select-none tabular-nums">{line ? n : ""}</span>
      <span className="whitespace-pre">{tokenize(line)}</span>
    </div>
  );
}

function tokenize(line: string): React.ReactNode {
  if (!line) return " ";
  if (line.startsWith("//")) return <span className="text-[#6b7d52]">{line}</span>;
  // const developer = {
  const parts: React.ReactNode[] = [];
  const push = (t: React.ReactNode, k: number) => parts.push(<React.Fragment key={k}>{t}</React.Fragment>);
  // simple regex-based highlighter
  const regex = /("[^"]*"|\b(const|name|role|skills|focus|passion)\b|\[|\]|\{|\}|=|,|;|:|\(|\))/g;
  let last = 0; let k = 0; let m: RegExpExecArray | null;
  while ((m = regex.exec(line))) {
    if (m.index > last) push(<span className="text-[#cfcfcf]">{line.slice(last, m.index)}</span>, k++);
    const tok = m[0];
    let cls = "text-[#cfcfcf]";
    if (tok.startsWith('"')) cls = "text-[#ce9178]";
    else if (tok === "const") cls = "text-[#c586c0]";
    else if (["name","role","skills","focus","passion"].includes(tok)) cls = "text-[#9cdcfe]";
    else if ("{}[]".includes(tok)) cls = "text-[#ffd700]";
    else if (",;:=".includes(tok)) cls = "text-[#9a9a9a]";
    push(<span className={cls}>{tok}</span>, k++);
    last = m.index + tok.length;
  }
  if (last < line.length) push(<span className="text-[#cfcfcf]">{line.slice(last)}</span>, k++);
  return parts;
}

export default VSCodePortfolio;