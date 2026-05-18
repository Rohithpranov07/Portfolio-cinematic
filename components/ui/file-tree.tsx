"use client";

import React, { useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  extension?: string;
}

interface FileTreeProps {
  data: FileNode[];
  className?: string;
  defaultOpen?: boolean;
  initialActive?: string;
}

const EXT_META: Record<string, { color: string; glyph: string }> = {
  tsx: { color: "#7dd3fc", glyph: "⚛" },
  ts: { color: "#60a5fa", glyph: "◆" },
  jsx: { color: "#67e8f9", glyph: "⚛" },
  js: { color: "#fde68a", glyph: "◆" },
  css: { color: "#c4b5fd", glyph: "◈" },
  json: { color: "#fcd34d", glyph: "{}" },
  md: { color: "#9a9a9a", glyph: "◊" },
  svg: { color: "#86efac", glyph: "◐" },
  png: { color: "#a7f3d0", glyph: "◑" },
  default: { color: "#9a9a9a", glyph: "◇" },
};

const getMeta = (ext?: string) => EXT_META[ext || "default"] || EXT_META.default;

const Chevron = memo(({ open }: { open: boolean }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    className={cn(
      "transition-transform duration-300 ease-out shrink-0",
      open ? "rotate-90" : "rotate-0"
    )}
  >
    <path
      d="M2 1L6 4L2 7"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
Chevron.displayName = "Chevron";

const FolderGlyph = memo(({ open }: { open: boolean }) => (
  <svg width="13" height="11" viewBox="0 0 16 14" fill="currentColor" className="shrink-0">
    {open ? (
      <path d="M1.5 1C0.67 1 0 1.67 0 2.5V11.5C0 12.33 0.67 13 1.5 13H13.5C14.33 13 15 12.33 15 11.5L16 5H3.5L2.5 3H1.5Z" />
    ) : (
      <path d="M1.5 1C0.67 1 0 1.67 0 2.5V11.5C0 12.33 0.67 13 1.5 13H14.5C15.33 13 16 12.33 16 11.5V4.5C16 3.67 15.33 3 14.5 3H8L6.5 1H1.5Z" />
    )}
  </svg>
));
FolderGlyph.displayName = "FolderGlyph";

interface ItemProps {
  node: FileNode;
  depth: number;
  path: string;
  activePath: string | null;
  onSelect: (path: string, isFolder: boolean) => void;
  defaultOpen: boolean;
}

const FileItem = memo(function FileItem({
  node,
  depth,
  path,
  activePath,
  onSelect,
  defaultOpen,
}: ItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const isFolder = node.type === "folder";
  const hasChildren = isFolder && !!node.children?.length;
  const meta = getMeta(node.extension);
  const isActive = activePath === path;

  const handleClick = useCallback(() => {
    if (isFolder) setOpen((o) => !o);
    onSelect(path, isFolder);
  }, [isFolder, onSelect, path]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    } else if (e.key === "ArrowRight" && isFolder && !open) {
      setOpen(true);
    } else if (e.key === "ArrowLeft" && isFolder && open) {
      setOpen(false);
    }
  };

  return (
    <div className="select-none">
      <div
        role="treeitem"
        aria-expanded={isFolder ? open : undefined}
        aria-selected={isActive}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={onKey}
        className={cn(
          "group relative flex items-center gap-1.5 py-[3px] pr-2 rounded-[4px] cursor-pointer outline-none",
          "transition-[transform,color] duration-200 ease-out",
          "hover:translate-x-[1px]",
          "focus-visible:ring-1 focus-visible:ring-[#a78bfa]/40",
          isActive && "shadow-[inset_2px_0_0_0_#a78bfa]"
        )}
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
      >
        {/* Indent guide */}
        {depth > 0 && (
          <span
            aria-hidden
            className="absolute top-0 bottom-0 w-px bg-[#1f1f1f] group-hover:bg-[#a78bfa]/20 transition-colors"
            style={{ left: `${(depth - 1) * 12 + 11}px` }}
          />
        )}

        {/* Chevron slot (folders) */}
        <span
          className={cn(
            "w-[10px] flex items-center justify-center shrink-0 transition-colors",
            isFolder ? "text-[#7a7a7a] group-hover:text-[#a78bfa]" : "opacity-0"
          )}
        >
          {isFolder && <Chevron open={open} />}
        </span>

        {/* Icon */}
        <span
          className={cn(
            "flex items-center justify-center w-[14px] h-[14px] transition-all duration-200 ease-out",
            "group-hover:scale-125 group-hover:[filter:drop-shadow(0_0_6px_currentColor)]"
          )}
          style={{ color: isFolder ? (open ? "#c4b5fd" : "#a78bfa") : meta.color }}
        >
          {isFolder ? (
            <FolderGlyph open={open} />
          ) : (
            <svg width="11" height="13" viewBox="0 0 14 16" fill="currentColor">
              <path d="M1.5 0C0.67 0 0 0.67 0 1.5V14.5C0 15.33 0.67 16 1.5 16H12.5C13.33 16 14 15.33 14 14.5V4.5L9.5 0H1.5Z" opacity="0.85" />
              <path d="M9 0V4.5H14" opacity="0.4" />
            </svg>
          )}
        </span>

        {/* Name */}
        <span
          className={cn(
            "font-mono text-[12px] tracking-tight truncate transition-colors duration-200",
            isActive
              ? "text-white"
              : isFolder
                ? "text-[#d4d4d4] group-hover:text-white"
                : "text-[#bfbfbf] group-hover:text-white"
          )}
        >
          {node.name}
        </span>

        {/* Active dot */}
        <span
          aria-hidden
          className={cn(
            "ml-auto w-1 h-1 rounded-full bg-[#a78bfa] transition-all duration-300",
            isActive
              ? "opacity-100 shadow-[0_0_6px_#a78bfa]"
              : "opacity-0 group-hover:opacity-60"
          )}
        />
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          role="group"
          aria-hidden={!open}
          className={cn(
            "overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out",
            open
              ? "max-h-500 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
          )}
        >
          {node.children!.map((child) => (
            <FileItem
              key={`${path}/${child.name}`}
              node={child}
              depth={depth + 1}
              path={`${path}/${child.name}`}
              activePath={activePath}
              onSelect={onSelect}
              defaultOpen={defaultOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export const FileTree = memo(function FileTree({
  data,
  className,
  defaultOpen = true,
  initialActive = null as unknown as string,
}: FileTreeProps) {
  const [activePath, setActivePath] = useState<string | null>(initialActive ?? null);

  const handleSelect = useCallback((path: string, isFolder: boolean) => {
    if (!isFolder) setActivePath(path);
  }, []);

  return (
    <div
      role="tree"
      aria-label="Portfolio file explorer"
      className={cn(
        "font-mono text-[#cfcfcf] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {data.map((node) => (
        <FileItem
          key={node.name}
          node={node}
          depth={0}
          path={node.name}
          activePath={activePath}
          onSelect={handleSelect}
          defaultOpen={defaultOpen}
        />
      ))}
    </div>
  );
});

export default FileTree;
