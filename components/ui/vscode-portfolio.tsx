"use client";
import React from "react";

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

/* ---------- File entry ---------- */
type Folder = { type: "folder"; name: string; color: string };
type File = { type: "file"; name: string; icon: React.ReactNode };
type Entry = Folder | File;

const fileIcon = (color: string) => (
  <span className="inline-block w-[14px] h-[14px] mr-[6px]" style={{ color }}>
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h6l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm5 .8V4h2.2L9 1.8Z"/></svg>
  </span>
);
const folderIcon = (color: string) => (
  <span className="inline-block w-[14px] h-[14px] mr-[6px]" style={{ color }}>
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 3h4l1.2 1.4H14.5V13a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V3Z"/></svg>
  </span>
);

const folders: Folder[] = [
  { type: "folder", name: ".next", color: "#519aba" },
  { type: "folder", name: "app", color: "#e8a87c" },
  { type: "folder", name: "components", color: "#c5a3ff" },
  { type: "folder", name: "constants", color: "#c5a3ff" },
  { type: "folder", name: "data", color: "#519aba" },
  { type: "folder", name: "hooks", color: "#e8a87c" },
  { type: "folder", name: "lib", color: "#7ac74f" },
  { type: "folder", name: "public", color: "#e8a87c" },
  { type: "folder", name: "styles", color: "#e8a87c" },
  { type: "folder", name: "types", color: "#e8a87c" },
];

const files = [
  { name: ".eslintrc.json", color: "#cf6d3a" },
  { name: ".gitignore", color: "#d96b3a" },
  { name: "components.json", color: "#c5a3ff" },
  { name: "next-env.d.ts", color: "#0e6cb0", badge: "TS" },
  { name: "next.config.ts", color: "#0e6cb0" },
  { name: "package.json", color: "#cf6d3a" },
  { name: "pnpm-lock.yaml", color: "#cf6d3a" },
  { name: "postcss.config.mjs", color: "#cf6d3a" },
  { name: "tsconfig.json", color: "#0e6cb0", badge: "TS" },
];

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
  return null;
};

/* ---------- Main component ---------- */
export const VSCodePortfolio: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-[#cccccc] flex flex-col overflow-hidden rounded-[6px]"
      style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", fontSize: 12 }}>

      {/* ===== Title bar ===== */}
      <div className="flex items-center h-[38px] px-5 bg-[#0a0a0a] border-b border-[#1a1a1a] shrink-0">
        {/* Back / forward */}
        <div className="flex items-center gap-3 text-[#7a7a7a] mr-auto">
          <button className="w-5 h-5 flex items-center justify-center"><svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><path d="M10 4 6 8l4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg></button>
          <button className="w-5 h-5 flex items-center justify-center"><svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg></button>
        </div>
        {/* URL pill */}
        <div className="flex-1 max-w-[420px] -ml-10 h-[22px] bg-[#161616] rounded-[5px] flex items-center justify-center gap-2 text-[11px] text-[#bdbdbd] border border-[#222]">
          <svg viewBox="0 0 16 16" className="w-3 h-3 text-[#519aba]" fill="currentColor"><path d="M4 1h6l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/></svg>
          portfolio.draft.tsx — Portfolio
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
          <div className="px-2 flex-1 overflow-hidden">
            <div className="flex items-center px-1 py-[3px] text-[11px] text-[#cfcfcf] font-medium">
              <I.chev className="w-3 h-3 mr-1 rotate-90 text-[#9a9a9a]" />
              <span>PORTFOLIO.DRAFT</span>
            </div>
            {folders.map((f) => (
              <div key={f.name} className={`flex items-center pl-3 pr-1 py-[2px] text-[12px] ${f.name === "components" ? "text-white" : "text-[#cfcfcf]"}`}>
                <I.chev className="w-2.5 h-2.5 mr-1 text-[#6f6f6f]" />
                {folderIcon(f.color)}
                <span>{f.name}</span>
              </div>
            ))}
            {files.map((f) => (
              <div key={f.name} className="flex items-center pl-[18px] pr-1 py-[2px] text-[12px] text-[#cfcfcf]">
                {f.badge ? (
                  <span className="inline-flex items-center justify-center w-[14px] h-[14px] mr-[6px] rounded-[2px] text-[8px] font-bold text-white" style={{ background: f.color }}>{f.badge}</span>
                ) : (
                  fileIcon(f.color)
                )}
                <span className="truncate">{f.name}</span>
              </div>
            ))}
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
            <div className="flex-1 overflow-auto px-20 pt-20 pb-16 min-w-0">
              <p className="text-[22px] text-[#cfcfcf] mb-7">Hi, I&apos;m</p>
              <h1 className="text-[104px] leading-[1.05] font-bold tracking-tight mb-12">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#a78bfa 0%,#c4b5fd 50%,#f0abfc 100%)" }}>
                  Yash Sharma
                </span>
                <span className="inline-block w-[2px] h-[80px] bg-[#a78bfa] align-middle ml-1 -mb-2 animate-pulse"></span>
              </h1>
              <div className="flex items-center text-[15px] text-[#cfcfcf] mb-3">
                <svg viewBox="0 0 16 16" className="w-4 h-4 mr-1.5 text-[#a78bfa]" fill="currentColor"><path d="M4 1h6l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/></svg>
                <span className="text-[#a78bfa]">Full Stack Developer</span>
                <span className="text-[#6f6f6f] mx-2">•</span>
                <span>building digital experiences</span>
              </div>
              <p className="text-[15px] text-[#9a9a9a] mb-14 max-w-[640px]">with clean code and creative thinking.</p>

              {/* Code block */}
              <div className="bg-[#070707] border border-[#1c1c1c] rounded-[10px] mb-12 max-w-[760px] font-mono text-[13px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1c1c1c]">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
                  </div>
                  <I.copy className="w-3.5 h-3.5 text-[#6f6f6f]" />
                </div>
                <pre className="px-5 py-5 leading-[1.85] overflow-hidden">
{[
"const developer = {",
'  name: "Yash Sharma",',
'  role: "Full Stack Developer",',
'  skills: ["React", "Next.js", "TypeScript", "GSAP"],',
'  focus: "Building scalable & beautiful web apps",',
'  passion: "Animation, UI/UX, and Performance",',
"};",
"",
"// Let's build something extraordinary",
].map((line, i) => (
  <CodeLine key={i} n={i+1} line={line} />
))}
                </pre>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-5 mb-20">
                <button className="h-[48px] px-7 rounded-[10px] text-white text-[14px] font-medium flex items-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(167,139,250,0.5)] transition-all duration-200"
                  style={{ background: "linear-gradient(90deg,#7c3aed,#a855f7)" }}>
                  Explore My Work <I.arrow className="w-3.5 h-3.5" />
                </button>
                <button className="h-[48px] px-7 rounded-[10px] text-white text-[14px] font-medium border border-[#2a2a2a] bg-[#121212] hover:border-[#a78bfa] hover:bg-[#1a1a1a] transition-all duration-200">
                  About Me
                </button>
              </div>

              {/* Scroll down */}
              <div className="flex items-center gap-2 text-[12px] text-[#7a7a7a]">
                Scroll Down <I.mouse className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-[360px] bg-[#0a0a0a] border-l border-[#1a1a1a] shrink-0 overflow-auto px-7 py-8 space-y-11">
            {/* Current status */}
            <div>
              <p className="text-[10px] tracking-[0.16em] text-[#7a7a7a] mb-4">// CURRENT STATUS</p>
              <div className="relative rounded-[12px] border border-[#1f1f1f] bg-[#0d0d0d] p-5 overflow-hidden hover:border-[#a78bfa]/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                  <span className="text-[13px] text-white font-medium">Available for work</span>
                </div>
                <p className="text-[11px] text-[#9a9a9a]">Open to new opportunities</p>
                <div className="absolute -right-3 -top-3 w-[80px] h-[80px] rounded-full"
                  style={{ background: "radial-gradient(circle at 30% 30%, #6366f1, #1e1b4b 70%)", boxShadow: "0 0 30px rgba(99,102,241,.4)" }} />
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-[10px] tracking-[0.16em] text-[#7a7a7a] mb-4">// TECH STACK</p>
              <div className="grid grid-cols-6 gap-2.5">
                {[
                  { k: "react" }, { k: "next" }, { k: "ts" }, { k: "tw" }, { k: "js" },
                ].map((t, i) => (
                  <div key={i} className="aspect-square rounded-[10px] border border-[#1f1f1f] bg-[#0d0d0d] flex items-center justify-center hover:border-[#a78bfa]/50 hover:bg-[#121212] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    <TechIcon kind={t.k} />
                  </div>
                ))}
                <div className="aspect-square rounded-[10px] border border-[#1f1f1f] bg-[#0d0d0d] flex items-center justify-center text-[#9a9a9a] text-[14px] hover:border-[#a78bfa]/50 transition-colors cursor-pointer">⋯</div>
              </div>
            </div>

            {/* Featured project */}
            <div>
              <p className="text-[10px] tracking-[0.16em] text-[#7a7a7a] mb-4">// FEATURED PROJECT</p>
              <div className="rounded-[12px] border border-[#1f1f1f] bg-[#0d0d0d] p-5 hover:border-[#a78bfa]/40 transition-colors">
                <div className="flex gap-4">
                  <div className="w-[92px] h-[92px] rounded-[10px] shrink-0 overflow-hidden relative"
                    style={{ background: "linear-gradient(180deg,#1e1b4b 0%,#7c3aed 50%,#ec4899 100%)" }}>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,.3), transparent 50%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2"
                      style={{ background: "linear-gradient(180deg, transparent, #0a0a1a)", clipPath: "polygon(0 60%, 20% 40%, 40% 55%, 60% 35%, 80% 50%, 100% 30%, 100% 100%, 0 100%)" }} />
                    <span className="absolute top-2 left-2 text-[7px] text-white/80 font-mono">Aurora Studio</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[12px] text-white font-semibold">Aurora Studio</span>
                      <span className="text-[8px] px-1.5 py-[1px] rounded-[3px] bg-[#1f1230] text-[#c4b5fd] border border-[#3b246b]">Featured</span>
                    </div>
                    <p className="text-[11px] text-[#9a9a9a] leading-[1.55] mb-3">Creative agency website with smooth animations and immersive UI.</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#a78bfa] hover:gap-2 transition-all cursor-pointer">Live Demo <I.ext_arrow className="w-2.5 h-2.5" /></div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <span className="w-4 h-[3px] rounded-full bg-[#a78bfa]"></span>
                  <span className="w-1.5 h-[3px] rounded-full bg-[#2a2a2a]"></span>
                  <span className="w-1.5 h-[3px] rounded-full bg-[#2a2a2a]"></span>
                  <span className="w-1.5 h-[3px] rounded-full bg-[#2a2a2a]"></span>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div>
              <p className="text-[10px] tracking-[0.16em] text-[#7a7a7a] mb-4">// QUICK STATS</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <I.chat className="w-3.5 h-3.5 text-[#a78bfa]"/>, n: "10+", l: "Projects" },
                  { icon: <I.clock className="w-3.5 h-3.5 text-[#a78bfa]"/>, n: "2+", l: "Years Exp" },
                  { icon: <I.stack className="w-3.5 h-3.5 text-[#a78bfa]"/>, n: "5+", l: "Technologies" },
                ].map((s, i) => (
                  <div key={i} className="rounded-[10px] border border-[#1f1f1f] bg-[#0d0d0d] p-4 hover:border-[#a78bfa]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    <div className="w-6 h-6 rounded-[6px] bg-[#1a1230] flex items-center justify-center mb-3">{s.icon}</div>
                    <div className="text-[15px] text-white font-semibold leading-none">{s.n}</div>
                    <div className="text-[10px] text-[#7a7a7a] mt-2">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
    </div>
  );
};

/* ---------- Code line with syntax tokens ---------- */
function CodeLine({ n, line }: { n: number; line: string }) {
  return (
    <div className="flex">
      <span className="inline-block w-7 text-right pr-3 text-[#4a4a4a] select-none">{line ? n : ""}</span>
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
