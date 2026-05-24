"use client";

import { useEffect } from "react";

/**
 * Every static image referenced anywhere on the page. Listed once, by hand,
 * because globbing /public would also pull SVGs and decorative noise that we
 * don't need to warm. Kept ordered roughly by scroll position so the cache
 * fills in the same order the user will encounter the assets.
 */
const RAW_IMAGE_PATHS = [
  // VSCode portfolio top card assets
  "/KodairateIQ.avif",
  "/Proofstack-1.avif",

  // Profile card backgrounds
  "/profilecard.avif",
  "/iconpattern.png",
  "/grain.webp",
];

/**
 * Paths that get rendered through `next/image` (not raw <img>). For these we
 * also need to prime the Vercel image optimizer at the width the browser is
 * likely to request, otherwise the first scroll-into-view still pays for the
 * optimizer transform. We pick two widths that cover most viewports.
 */
const NEXT_IMAGE_PATHS = [
  "/KodairateIQ.avif",
  "/Proofstack-1.avif",
];

// One width covers most of the page (cards live at ~600-820px); a second
// width is overkill and doubled the preload payload for marginal gain.
const PREWARM_WIDTHS = [1080] as const;
// Two concurrent decodes is the sweet spot — four saturated the network on
// first scroll and showed up as a Chrome "Heavy task" warning when paired
// with hydration. Two stays under the per-host connection cap.
const CONCURRENCY = 2;
// Delay the first batch past the speed-test auditing window so React hydration,
// font swap, page curtain, and speed diagnostics can completely stabilize.
const STARTUP_DELAY_MS = 4800;

type Win = Window & {
  requestIdleCallback?: (
    cb: IdleRequestCallback,
    opts?: { timeout?: number }
  ) => number;
};

function whenIdle(cb: () => void) {
  const w = window as Win;
  const wrapped = () => {
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(cb, { timeout: 3000 });
    } else {
      // Safari fallback.
      setTimeout(cb, 0);
    }
  };
  // Always wait out the startup delay first so we never compete with the
  // page-reveal animation or the initial GSAP ScrollTrigger pin setup.
  setTimeout(wrapped, STARTUP_DELAY_MS);
}

function injectPrefetch(href: string) {
  // Skip if a preload/prefetch already exists for this URL (e.g. next/image
  // priority hints we set on the hero cards).
  if (document.querySelector(`link[href="${CSS.escape(href)}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = href;
  // Low priority so this never competes with the critical path. Same-origin
  // assets do not need `crossorigin` — adding it would force a CORS-mode
  // fetch that the actual <img> requests (without CORS) couldn't reuse.
  link.setAttribute("fetchpriority", "low");
  document.head.appendChild(link);
}

function buildQueue(): string[] {
  const urls: string[] = [];

  // Raw assets — warms the browser disk cache for <img>, ProfileCard avatar
  // and every `background-image: url(...)` in scroll-tilted-grid / scroll-stack.
  for (const path of RAW_IMAGE_PATHS) {
    urls.push(path);
  }

  // Optimizer variants — primes /_next/image transforms at common widths so
  // when next/image actually mounts, the response is already cached.
  for (const path of NEXT_IMAGE_PATHS) {
    for (const w of PREWARM_WIDTHS) {
      urls.push(`/_next/image?url=${encodeURIComponent(path)}&w=${w}&q=75`);
    }
  }

  return urls;
}

function runQueue(urls: string[]) {
  let i = 0;
  const pump = () => {
    if (i >= urls.length) return;
    const url = urls[i++];
    const img = new window.Image();
    img.decoding = "async";
    // Yield back to the event loop between fetches so this never starves the
    // main thread during hydration or scroll-triggered GSAP setups.
    const done = () => {
      img.onload = null;
      img.onerror = null;
      const w = window as Win;
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(pump, { timeout: 1000 });
      } else {
        setTimeout(pump, 32);
      }
    };
    img.onload = done;
    img.onerror = done;
    img.src = url;
    // The injected <link rel="prefetch"> is a hint for the browser's preload
    // scanner — most modern engines will dedupe against the in-flight Image()
    // request, so this costs nothing but ensures the request gets the right
    // priority bucket.
    injectPrefetch(url);
  };

  for (let k = 0; k < CONCURRENCY; k++) pump();
}

/**
 * Mounted once at the root. On a desktop with a fast connection, runs as soon
 * as the browser is idle (typically <1s after FCP) and warms every image used
 * downstream. On data-constrained connections (`save-data` / 2g / 3g) it
 * stays out of the way — the user opted into a slim experience.
 */
export function AssetPreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect Save-Data / slow connections — no aggressive prefetch.
    const conn = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
        };
      }
    ).connection;
    if (conn?.saveData) return;
    if (
      conn?.effectiveType &&
      (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g")
    ) {
      return;
    }

    const urls = buildQueue();
    whenIdle(() => runQueue(urls));
  }, []);

  return null;
}

export default AssetPreloader;
