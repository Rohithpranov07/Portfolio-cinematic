"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface MenuItemOption {
  label: string;
  action?: string;
  shortcut?: string;
  type?: "item" | "separator";
  hasSubmenu?: boolean;
}

interface MenuConfig {
  label: string;
  items: MenuItemOption[];
}

interface MacOSMenuBarProps {
  appName?: string;
  menus?: MenuConfig[];
  onMenuAction?: (action: string) => void;
  className?: string;
}

const DEFAULT_MENUS: MenuConfig[] = [
  {
    label: "File",
    items: [
      { label: "New Tab", action: "new-tab", shortcut: "⌘T" },
      { label: "New Window", action: "new-window", shortcut: "⌘N" },
      { label: "New Private Window", action: "new-private", shortcut: "⇧⌘N" },
      { type: "separator", label: "" },
      { label: "Open File...", action: "open-file", shortcut: "⌘O" },
      { label: "Open Location...", action: "open-location", shortcut: "⌘L" },
      { type: "separator", label: "" },
      { label: "Close Window", action: "close-window", shortcut: "⇧⌘W" },
      { label: "Close Tab", action: "close-tab", shortcut: "⌘W" },
      { label: "Save Page As...", action: "save-page", shortcut: "⌘S" },
      { type: "separator", label: "" },
      { label: "Share", action: "share", hasSubmenu: true },
      { type: "separator", label: "" },
      { label: "Print...", action: "print", shortcut: "⌘P" },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", action: "undo", shortcut: "⌘Z" },
      { label: "Redo", action: "redo", shortcut: "⇧⌘Z" },
      { type: "separator", label: "" },
      { label: "Cut", action: "cut", shortcut: "⌘X" },
      { label: "Copy", action: "copy", shortcut: "⌘C" },
      { label: "Paste", action: "paste", shortcut: "⌘V" },
      { label: "Select All", action: "select-all", shortcut: "⌘A" },
      { type: "separator", label: "" },
      { label: "Find", action: "find", shortcut: "⌘F" },
      { label: "Find Next", action: "find-next", shortcut: "⌘G" },
      { label: "Find Previous", action: "find-prev", shortcut: "⇧⌘G" },
      { type: "separator", label: "" },
      { label: "Emoji & Symbols", action: "emoji", shortcut: "⌃⌘␣" },
    ],
  },
  {
    label: "View",
    items: [
      { label: "as Icons", action: "view-icons", shortcut: "⌘1" },
      { label: "as List", action: "view-list", shortcut: "⌘2" },
      { label: "as Columns", action: "view-columns", shortcut: "⌘3" },
      { label: "as Gallery", action: "view-gallery", shortcut: "⌘4" },
      { type: "separator", label: "" },
      { label: "Use Stacks", action: "use-stacks", shortcut: "⌃⌘0" },
      { label: "Sort By", action: "sort-by", hasSubmenu: true },
      { type: "separator", label: "" },
      { label: "Hide Sidebar", action: "hide-sidebar", shortcut: "⌥⌘S" },
      { label: "Show Preview", action: "show-preview", shortcut: "⇧⌘P" },
      { type: "separator", label: "" },
      { label: "Enter Full Screen", action: "fullscreen", shortcut: "⌃⌘F" },
    ],
  },
  {
    label: "Window",
    items: [
      { label: "Minimize", action: "minimize", shortcut: "⌘M" },
      { label: "Zoom", action: "zoom" },
      { type: "separator", label: "" },
      { label: "Cycle Through Windows", action: "cycle-windows", shortcut: "⌘`" },
      { type: "separator", label: "" },
      { label: "Bring All to Front", action: "bring-to-front" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Search", action: "search-help" },
      { type: "separator", label: "" },
      { label: "App Help", action: "app-help" },
      { label: "Keyboard Shortcuts", action: "shortcuts" },
      { type: "separator", label: "" },
      { label: "Contact Support", action: "contact-support" },
    ],
  },
];

const APPLE_MENU_ITEMS: MenuItemOption[] = [
  { label: "About This Mac", action: "about" },
  { type: "separator", label: "" },
  { label: "System Preferences...", action: "preferences" },
  { label: "App Store...", action: "app-store" },
  { type: "separator", label: "" },
  { label: "Recent Items", action: "recent", hasSubmenu: true },
  { type: "separator", label: "" },
  { label: "Force Quit Applications...", action: "force-quit", shortcut: "⌥⌘⎋" },
  { type: "separator", label: "" },
  { label: "Sleep", action: "sleep" },
  { label: "Restart...", action: "restart" },
  { label: "Shut Down...", action: "shutdown" },
  { type: "separator", label: "" },
  { label: "Lock Screen", action: "lock", shortcut: "⌃⌘Q" },
  { label: "Log Out...", action: "logout", shortcut: "⇧⌘Q" },
];

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItemOption[];
  position: { x: number; y: number };
  onAction?: (action: string) => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  isOpen,
  onClose,
  items,
  position,
  onAction,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && dropdownRef.current.contains(target)) return;
      // Ignore clicks on any menu-bar trigger so they can toggle the dropdown
      if (
        target instanceof Element &&
        target.closest("[data-mac-menu-trigger]")
      ) {
        return;
      }
      onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute backdrop-blur-md z-[60] mac-menu-fade-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: "rgba(40, 40, 40, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "10px",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
        minWidth: "280px",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <div className="flex flex-col" style={{ gap: "1px" }}>
        {items.map((item, index) => {
          if (item.type === "separator") {
            return (
              <div
                key={index}
                className="bg-white/15"
                style={{ height: "1px", marginTop: "0.4rem", marginBottom: "0.4rem", marginLeft: "0.75rem", marginRight: "0.75rem" }}
              />
            );
          }
          return (
            <div
              key={index}
              className="text-white text-[13px] cursor-pointer hover:bg-white/10 transition-colors duration-100 flex justify-between items-center whitespace-nowrap"
              style={{
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
                marginLeft: "0.4rem",
                marginRight: "0.4rem",
                borderRadius: "5px",
                gap: "2.5rem",
              }}
              onClick={() => {
                if (item.action) onAction?.(item.action);
                onClose();
              }}
            >
              <span className="flex items-center" style={{ gap: "0.5rem" }}>
                {item.label}
                {item.hasSubmenu && (
                  <span className="text-[10px] opacity-70">▶</span>
                )}
              </span>
              {item.shortcut && (
                <span className="text-[11px] text-white/55 font-mono tabular-nums">
                  {item.shortcut}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MacOSMenuBar: React.FC<MacOSMenuBarProps> = ({
  appName = "Finder",
  menus = DEFAULT_MENUS,
  onMenuAction,
  className = "",
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const appleLogoRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const openMenuAt = (el: HTMLElement | null, key: string) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const parentRect = el.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
    setDropdownPosition({ x: rect.left - parentRect.left, y: 34 });
    setActiveMenu(key);
  };

  const handleAppleMenuClick = useCallback(() => {
    if (activeMenu === "apple") setActiveMenu(null);
    else openMenuAt(appleLogoRef.current, "apple");
  }, [activeMenu]);

  const handleMenuItemClick = useCallback(
    (menuLabel: string) => {
      if (activeMenu === menuLabel) setActiveMenu(null);
      else openMenuAt(menuRefs.current[menuLabel], menuLabel);
    },
    [activeMenu]
  );

  const closeDropdown = useCallback(() => setActiveMenu(null), []);
  const handleMenuAction = useCallback(
    (action: string) => onMenuAction?.(action),
    [onMenuAction]
  );

  return (
    <div style={{ position: "relative" }} className="w-full">
      <div
        className={`backdrop-blur-md ${className}`}
        style={{
          height: "36px",
          background: "rgba(40, 40, 40, 0.65)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.10)",
        }}
      >
        <div
          className="flex justify-between items-center h-full"
          style={{ paddingLeft: "1.75rem", paddingRight: "1.75rem", gap: "1.5rem" }}
        >
          <div className="flex items-center min-w-0" style={{ gap: "1.25rem" }}>
            <div
              ref={appleLogoRef}
              onClick={handleAppleMenuClick}
              data-mac-menu-trigger
              className="cursor-pointer hover:opacity-80 transition-opacity duration-150 shrink-0"
            >
              <svg width="14" height="17" viewBox="0 0 110 140" fill="white" style={{ display: "block" }}>
                <path d="M0 0 C5.58 2.1 9.6 0.89 14.97 -1.09 C24.52 -4.44 34.11 -4.55 43.36 -0.23 C48.12 2.41 50.87 5.09 53.41 9.91 C52.36 10.69 51.31 11.47 50.22 12.28 C44.71 17.03 41.57 23.29 40.47 30.47 C40.03 38.30 41.87 44.11 46.82 50.18 C49.70 53.31 52.90 55.56 56.41 57.91 C53.63 69.37 47.17 82.52 37.16 89.41 C32.58 91.91 28.55 92.54 23.41 91.91 C21.37 91.29 19.35 90.62 17.35 89.91 C8.57 86.84 3.24 88.21 -5.43 91.00 C-10.61 92.48 -14.47 92.64 -19.65 90.84 C-33.69 81.59 -41.79 64.33 -45.19 48.34 C-47.47 34.48 -46.65 19.76 -38.46 8.03 C-28.23 -4.15 -14.18 -5.71 0 0 Z" transform="translate(45.59,33.09)" />
                <path d="M0 0 C0.57 7.73 -0.97 14.11 -5.80 20.31 C-10.93 25.74 -15.29 28.82 -22.94 29.19 C-23.95 29.13 -24.96 29.06 -26 29 C-26.59 20.82 -24.35 14.77 -19.38 8.25 C-14.46 2.90 -7.38 -0.97 0 0 Z" transform="translate(76,0)" />
              </svg>
            </div>
            <span className="text-white text-[13px] font-semibold whitespace-nowrap shrink-0">
              {appName}
            </span>
            <div className="flex items-center" style={{ gap: "1.5rem" }}>
              {menus.map((menu) => (
                <span
                  key={menu.label}
                  ref={(el) => {
                    menuRefs.current[menu.label] = el;
                  }}
                  data-mac-menu-trigger
                  className="text-white text-[13px] cursor-pointer hover:opacity-80 transition-opacity duration-150 select-none whitespace-nowrap"
                  onClick={() => handleMenuItemClick(menu.label)}
                >
                  {menu.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center shrink-0" style={{ gap: "1.25rem" }}>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="opacity-90">
              <rect x="0.5" y="1.5" width="19" height="9" rx="2" stroke="white" strokeOpacity="0.85" />
              <rect x="2" y="3" width="16" height="6" rx="1" fill="white" />
              <rect x="20.5" y="4.5" width="1.5" height="3" rx="0.5" fill="white" fillOpacity="0.85" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="opacity-90">
              <path d="M8 11.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="white" />
              <path d="M3.5 7.2a6.4 6.4 0 0 1 9 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M1 4.4a9.9 9.9 0 0 1 14 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-90">
              <path d="M2 13s.5-3 3-3h6c2.5 0 3 3 3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="8" cy="5" r="2.6" stroke="white" strokeWidth="1.3" />
            </svg>
            <span className="text-white text-[13px] font-medium select-none cursor-pointer hover:opacity-80 transition-opacity duration-150 whitespace-nowrap tabular-nums">
              {currentTime}
            </span>
          </div>
        </div>
      </div>

      <MenuDropdown
        isOpen={activeMenu === "apple"}
        onClose={closeDropdown}
        items={APPLE_MENU_ITEMS}
        position={dropdownPosition}
        onAction={handleMenuAction}
      />
      {menus.map((menu) => (
        <MenuDropdown
          key={menu.label}
          isOpen={activeMenu === menu.label}
          onClose={closeDropdown}
          items={menu.items}
          position={dropdownPosition}
          onAction={handleMenuAction}
        />
      ))}
    </div>
  );
};

export default MacOSMenuBar;
