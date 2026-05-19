"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SparklesIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import { Badge } from "@/components/ui/badge";

interface CarouselProps {
  images: { src: string; alt: string; objectPosition?: string; link?: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }

  .cc-card {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
    will-change: transform;
  }
  .cc-card:hover {
    transform: scale(1.04);
    box-shadow: 0 24px 56px -16px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06);
  }
  `;
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>{css}</style>
      <div
        style={{
          width: "100%",
          maxWidth: "64rem",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "0.5rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(64,64,64,0.05)",
            padding: "2rem 1rem",
            boxSizing: "border-box",
          }}
        >
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              paddingTop: "3rem",
              paddingBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "2.25rem", opacity: 0.85, fontWeight: 700, letterSpacing: "-0.02em" }}>
              UI/UX Design Work
            </h3>
            <p style={{ marginTop: "0.5rem", opacity: 0.7 }}>
              A curated collection of interfaces designed
with purpose, precision, and personality.
            </p>
          </div>

          <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ width: "100%" }}>
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => {
                  const inner = (
                    <div
                      className="rounded-3xl overflow-hidden cc-card"
                      style={{ width: "320px", height: "480px", flexShrink: 0 }}
                    >
                      <Image
                        src={image.src}
                        width={500}
                        height={750}
                        className="rounded-xl"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: image.objectPosition ?? "center",
                          transform: image.src.includes("Shopsmart") ? "scale(1.05)" : undefined,
                          transformOrigin: "center",
                        }}
                        alt={image.alt}
                      />
                    </div>
                  );
                  return (
                    <SwiperSlide key={`a-${index}`}>
                      {image.link ? (
                        <a
                          href={image.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", cursor: "pointer" }}
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
