import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { MouseFollower } from "@/components/animations/MouseFollower";
import { PageReveal } from "@/components/animations/PageTransition";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rohith Pranov — Creative Developer",
  description:
    "Portfolio of Rohith Pranov — a creative developer crafting cinematic digital experiences with Three.js, GSAP, and Next.js.",
  keywords: ["creative developer", "portfolio", "frontend", "Three.js", "GSAP", "Next.js"],
  openGraph: {
    title: "Rohith Pranov — Creative Developer",
    description: "Crafting digital experiences that move people.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#080808] text-[#f0ece4] antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <div className="noise-overlay" aria-hidden="true" />
        <PageReveal />
        <SmoothScrollProvider>
          <MouseFollower />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
