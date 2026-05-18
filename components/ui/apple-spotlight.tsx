"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Briefcase,
  Calendar,
  ChevronRight,
  Code2,
  Files,
  Folder,
  Globe,
  Image as ImageIcon,
  LayoutGrid,
  Mail,
  MessageSquare,
  Music,
  Send,
  Search,
  Settings,
  StickyNote,
  Terminal,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface Shortcut {
  label: string;
  icon: React.ReactNode;
  link: string;
}

export interface SearchResult {
  icon: React.ReactNode;
  label: string;
  description: string;
  link: string;
}

const SVGFilter = () => (
  <svg width="0" height="0" className="absolute" aria-hidden>
    <filter id="blob-spotlight">
      <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
      <feColorMatrix
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9"
        result="blob"
      />
      <feBlend in="SourceGraphic" in2="blob" />
    </filter>
  </svg>
);

const ShortcutButton = ({ icon, link }: { icon: React.ReactNode; link: string }) => (
  <a href={link} target="_blank" rel="noreferrer">
    <div className="rounded-full cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-200">
      <div className="size-16 aspect-square flex items-center justify-center text-[#e9defb]">
        {icon}
      </div>
    </div>
  </a>
);

const SpotlightPlaceholder = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <motion.div
    layout
    className={cn(
      "absolute text-[#7a7a7a] flex items-center pointer-events-none z-10",
      className
    )}
  >
    <AnimatePresence mode="popLayout">
      <motion.p
        layoutId={`placeholder-${text}`}
        key={`placeholder-${text}`}
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  </motion.div>
);

interface SpotlightInputProps {
  placeholder: string;
  hidePlaceholder: boolean;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholderClassName?: string;
}

const SpotlightInput = ({
  placeholder,
  hidePlaceholder,
  value,
  onChange,
  onEnter,
  placeholderClassName,
}: SpotlightInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center w-full justify-start gap-7 h-24" style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
      <motion.div layoutId="search-icon" className="text-[#a78bfa] shrink-0">
        <Search className="!w-8 !h-8" />
      </motion.div>
      <div className="flex-1 relative text-3xl py-2">
        {!hidePlaceholder && (
          <SpotlightPlaceholder text={placeholder} className={placeholderClassName} />
        )}
        <motion.input
          ref={inputRef}
          layout="position"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onEnter?.();
          }}
          className="w-full bg-transparent outline-none ring-0 text-[#f0ece4] caret-[#a78bfa] font-mono"
        />
      </div>
      <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#7a7a7a] border border-[#2a2a2a] rounded-md px-2 py-1 font-mono">
        ESC
      </kbd>
    </div>
  );
};

interface SearchResultCardProps extends SearchResult {
  isLast: boolean;
}

const SearchResultCard = ({
  icon,
  label,
  description,
  link,
  isLast,
}: SearchResultCardProps) => (
  <a href={link} target="_blank" rel="noreferrer" className="overflow-hidden w-full group/card">
    <div
      className={cn(
        "flex items-center text-[#cfcfcf] justify-start gap-7 py-6 px-4 rounded-2xl w-full",
        "hover:bg-[#a78bfa]/[0.08] hover:text-white transition-colors duration-150"
      )}
    >
      <div className="size-12 rounded-xl bg-[#15101f] border border-[#2a2240] text-[#c4b5fd] [&_svg]:stroke-[1.5] [&_svg]:size-[22px] aspect-square flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0 gap-1.5">
        <p className="font-medium font-mono text-[15px] truncate">{label}</p>
        <p className="text-[13px] text-[#7a7a7a] truncate">{description}</p>
      </div>
      <div className="flex-1 flex items-center justify-end opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 text-[#a78bfa] pr-2">
        <ChevronRight className="size-5" />
      </div>
    </div>
  </a>
);

const SearchResultsContainer = ({
  searchResults,
  onHover,
}: {
  searchResults: SearchResult[];
  onHover: (index: number | null) => void;
}) => (
  <motion.div
    layout
    onMouseLeave={() => onHover(null)}
    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", paddingTop: "1.75rem", paddingBottom: "1.75rem" }}
    className="border-t border-[#1f1f1f] flex flex-col bg-[#0d0a14]/95 max-h-[34rem] overflow-y-auto w-full gap-4 [scrollbar-width:thin]"
  >
    {searchResults.length === 0 ? (
      <div className="px-4 py-6 text-center text-sm text-[#7a7a7a] font-mono">
        No results found
      </div>
    ) : (
      searchResults.map((result, index) => (
        <motion.div
          key={`search-result-${result.label}-${index}`}
          onMouseEnter={() => onHover(index)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.18, ease: "easeOut" }}
        >
          <SearchResultCard
            icon={result.icon}
            label={result.label}
            description={result.description}
            link={result.link}
            isLast={index === searchResults.length - 1}
          />
        </motion.div>
      ))
    )}
  </motion.div>
);

interface AppleSpotlightProps {
  shortcuts?: Shortcut[];
  results?: SearchResult[];
  isOpen?: boolean;
  handleClose?: () => void;
}

const DEFAULT_SHORTCUTS: Shortcut[] = [
  { label: "Apps", icon: <LayoutGrid />, link: "#projects" },
  { label: "Files", icon: <Folder />, link: "#about" },
  { label: "Actions", icon: <Activity />, link: "#contact" },
  { label: "Clipboard", icon: <Files />, link: "#stack" },
];

const DEFAULT_RESULTS: SearchResult[] = [
  { icon: <Code2 />, label: "GitHub", description: "View source repositories", link: "https://github.com" },
  { icon: <Briefcase />, label: "LinkedIn", description: "Professional profile", link: "https://linkedin.com" },
  { icon: <Send />, label: "Twitter / X", description: "Follow updates", link: "https://x.com" },
  { icon: <Mail />, label: "Email", description: "Get in touch", link: "mailto:hello@example.com" },
  { icon: <Globe />, label: "Projects", description: "Browse featured work", link: "#projects" },
  { icon: <Calendar />, label: "Schedule a call", description: "Book a meeting", link: "#contact" },
  { icon: <StickyNote />, label: "About", description: "Background & experience", link: "#about" },
  { icon: <ImageIcon />, label: "Gallery", description: "Visual portfolio", link: "#gallery" },
  { icon: <Settings />, label: "Tech Stack", description: "Tools & technologies", link: "#stack" },
  { icon: <Terminal />, label: "Resume", description: "Download CV", link: "/resume.pdf" },
  { icon: <Folder />, label: "Case Studies", description: "Deep-dive write-ups", link: "#cases" },
  { icon: <MessageSquare />, label: "Contact", description: "Send a message", link: "#contact" },
  { icon: <Music />, label: "Soundtrack", description: "What I'm listening to", link: "#now" },
];

interface SpotlightSearchProps {
  shortcuts?: Shortcut[];
  results?: SearchResult[];
  triggerClassName?: string;
}

export const SpotlightSearch = ({
  shortcuts = DEFAULT_SHORTCUTS,
  results = DEFAULT_RESULTS,
  triggerClassName,
}: SpotlightSearchProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SVGFilter />
      <AnimatePresence mode="popLayout" initial={false}>
        {!open && (
          <motion.button
            key="spotlight-trigger"
            layoutId="spotlight-shell"
            onClick={() => setOpen(true)}
            aria-label="Open search"
            transition={{ layout: { duration: 0.5, type: "spring", bounce: 0.2 } }}
            style={{ borderRadius: 5 }}
            className={cn(
              "group flex items-center gap-2 px-3 text-[11px] text-[#bdbdbd] bg-[#161616] border border-[#222] hover:border-[#a78bfa]/50 hover:bg-[#1a1424] hover:text-white transition-colors cursor-pointer",
              triggerClassName
            )}
          >
            <motion.span layoutId="search-icon" className="flex items-center text-[#a78bfa]">
              <Search className="!w-3 !h-3" />
            </motion.span>
            <span className="truncate">Search portfolio…</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-[#7a7a7a]">
              <kbd className="px-1 py-px rounded-[3px] bg-[#0d0a14] border border-[#2a2240] font-mono">⌘</kbd>
              <kbd className="px-1 py-px rounded-[3px] bg-[#0d0a14] border border-[#2a2240] font-mono">K</kbd>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <AppleSpotlight
        shortcuts={shortcuts}
        results={results}
        isOpen={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

const AppleSpotlight = ({
  shortcuts = DEFAULT_SHORTCUTS,
  results = DEFAULT_RESULTS,
  isOpen = true,
  handleClose = () => {},
}: AppleSpotlightProps) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredSearchResult, setHoveredSearchResult] = useState<number | null>(null);
  const [hoveredShortcut, setHoveredShortcut] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return results;
    return results.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [searchValue, results]);

  const openFirst = () => {
    const first = filtered[0];
    if (first) {
      window.open(first.link, first.link.startsWith("#") ? "_self" : "_blank");
      handleClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setHoveredShortcut(null);
            }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "w-full flex items-center justify-end gap-4 z-20 group relative",
              "[&_svg]:size-7 [&_svg]:stroke-[1.4]",
              "max-w-4xl"
            )}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key="spotlight-panel"
                layoutId="spotlight-shell"
                transition={{ layout: { duration: 0.55, type: "spring", bounce: 0.18 } }}
                style={{ borderRadius: "30px" }}
                className="h-full w-full flex flex-col items-center justify-start z-10 relative bg-[#0d0a14]/95 text-[#f0ece4] backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(167,139,250,0.35),0_0_0_1px_rgba(167,139,250,0.15)] overflow-hidden border border-[#231a36]"
              >
                <SpotlightInput
                  placeholder={
                    hoveredShortcut !== null
                      ? shortcuts[hoveredShortcut].label
                      : hoveredSearchResult !== null
                        ? filtered[hoveredSearchResult]?.label ?? "Search"
                        : "Search portfolio…"
                  }
                  placeholderClassName={
                    hoveredSearchResult !== null ? "text-[#c4b5fd]" : "text-[#7a7a7a]"
                  }
                  hidePlaceholder={!(hoveredSearchResult !== null || !searchValue)}
                  value={searchValue}
                  onChange={setSearchValue}
                  onEnter={openFirst}
                />

                {searchValue && (
                  <SearchResultsContainer
                    searchResults={filtered}
                    onHover={setHoveredSearchResult}
                  />
                )}
              </motion.div>

              {hovered &&
                !searchValue &&
                shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={`shortcut-${index}`}
                    onMouseEnter={() => setHoveredShortcut(index)}
                    layout
                    initial={{ scale: 0.7, x: -1 * (64 * (index + 1)) }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{
                      scale: 0.7,
                      x:
                        1 *
                        (16 * (shortcuts.length - index - 1) +
                          64 * (shortcuts.length - index - 1)),
                    }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                      bounce: 0.2,
                      delay: index * 0.05,
                    }}
                    className="rounded-full cursor-pointer bg-[#0d0a14]/95 backdrop-blur-xl border border-[#231a36] text-[#f0ece4]"
                  >
                    <ShortcutButton icon={shortcut.icon} link={shortcut.link} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-20 mt-6 text-[11px] text-[#7a7a7a] font-mono tracking-wider"
          >
            press <span className="text-[#a78bfa]">↵</span> to open · <span className="text-[#a78bfa]">esc</span> to close
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { AppleSpotlight };
export default AppleSpotlight;
