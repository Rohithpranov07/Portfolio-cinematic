"use client";
import React from "react";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { LampDemo } from "@/components/ui/lamp";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import ScrollExpand from "@/components/animations/ScrollExpand";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

const rulerItems: CarouselItem[] = [
  { id: 1, title: "NIKE" },
  { id: 2, title: "ALO" },
  { id: 3, title: "CONVERSE" },
  { id: 4, title: "UNIQLO" },
  { id: 5, title: "ON CLOUD" },
  { id: 6, title: "SKIMS" },
  { id: 7, title: "ADIDAS" },
  { id: 8, title: "PUMA" },
  { id: 9, title: "REEBOK" },
];

export default function ZoomParallaxDemo() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Modern architecture building",
    },
    {
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Urban cityscape at sunset",
    },
    {
      src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Abstract geometric pattern",
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Mountain landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Minimalist design elements",
    },
    {
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Ocean waves and beach",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
      alt: "Forest trees and sunlight",
    },
  ];

  return (
    <section className="w-full">
      <div className="relative flex h-[50vh] items-center justify-center">
        <h1 className="text-center text-4xl font-bold">
          Scroll Down for Zoom Parallax
        </h1>
      </div>
      <ZoomParallax
        images={images}
        portalIndex={0}
        portalContent={<LampDemo />}
      />
      <ScrollExpand>
        <ProjectShowcase />
      </ScrollExpand>

      <ScrollReveal className="w-full">
        <RulerCarousel originalItems={rulerItems} />
      </ScrollReveal>
    </section>
  );
}
