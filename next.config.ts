import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768],
    remotePatterns: [
      { protocol: "https", hostname: "ui.aceternity.com" },
      { protocol: "https", hostname: "aceternity.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "lucide-react",
      "@radix-ui/react-label",
      "@radix-ui/react-switch",
      "@react-three/drei",
      "lenis",
    ],
  },
  async headers() {
    const longCache = "public, max-age=31536000, immutable";
    return [
      {
        source: "/:all*(woff2|woff|ttf|otf)",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|svg|gif|ico)",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
