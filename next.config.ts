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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Group fragmented vendor node_modules into unified chunks to make fewer HTTP requests
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          default: false,
          vendors: false,
          // Group key framework modules
          frameworks: {
            name: "frameworks",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|next|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Aggregate heavy UI and animation libraries into a single chunk
          libs: {
            test: /[\\/]node_modules[\\/](gsap|framer-motion|lenis|swiper|ogl|lucide-react)[\\/]/,
            name: "libs",
            chunks: "all",
            priority: 30,
            enforce: true,
          },
          // Shared modules
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  turbopack: {},
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
