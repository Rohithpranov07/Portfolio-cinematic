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
      src: "/Design_zoomparallax/Echo-zoomparallax.png",
      alt: "Echo",
    },
    {
      src: "/Design_zoomparallax/Shopsmart-zoomparallax.png",
      alt: "Shopsmart",
    },
    {
      src: "/Design_zoomparallax/Pablo-zoomparallax.png",
      alt: "Pablo",
    },
    {
      src: "/Design_zoomparallax/Ben10-zoomparallax.png",
      alt: "Ben-10",
    },
    {
      src: "/Design_zoomparallax/Desinathon-zoomparallax.png",
      alt: "Designathon",
    },
    {
      src: "/Design_zoomparallax/Sonywalkman-zoomparallax.png",
      alt: "Sony Walkman",
    },
  ];

  return (
    <section className="w-full">
      <div className="relative flex h-[50vh] items-center justify-center">
        <h1 className="text-center text-4xl font-bold">
          Built to Outlast the Moment.
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
