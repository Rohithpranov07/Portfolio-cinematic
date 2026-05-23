import FrameToFullscreen from "@/components/animations/FrameToFullscreen";
import ScrollFloat from "@/components/animations/ScrollFloat";
import { ScrollRevealCurtain } from "@/components/animations/ScrollRevealCurtain";
import ScrollWarpPortal from "@/components/animations/ScrollWarpPortal";
import ScrollFoldTransition from "@/components/animations/ScrollFoldTransition";
import VSCodePortfolio from "@/components/ui/vscode-portfolio";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import StoryScrollDemo from "@/components/ui/story-scroll-demo";
import HeroParallaxDemo from "@/components/ui/hero-parallax-demo";
import ScrollMorphSection from "@/components/ui/scroll-morph-section";
import ScrollTiltedGridDemo from "@/components/ui/scroll-tilted-grid-demo";
import CardCarouselDemo from "@/components/ui/card-carousel-demo";
import LightRays from "@/components/ui/LightRays";
import ZoomParallaxDemo from "@/components/ui/zoom-parallax-demo";
import ProfileCard from "@/components/ui/ProfileCard";
import FooterDemo from "@/components/ui/footer-demo";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <main className="relative">
      <FrameToFullscreen
        titleComponent={
          <h1 className="text-4xl md:text-5xl font-semibold text-white mt-[4vh]">
            Crafting digital experiences that <br />
            <ScrollFloat
              stagger={0.8}
              textClassName="text-white font-bold tracking-tight inline-block"
              style={{
                fontSize: "clamp(4.5rem, 10vw, 9.5rem)",
                marginTop: "3rem"
              }}
              scrollRange={[0.05, 0.48]}
            >
              Come Alive
            </ScrollFloat>
          </h1>
        }
      >
        <VSCodePortfolio />
      </FrameToFullscreen>

      <ScrollRevealCurtain
        curtainColor="#fd5200"
        scrollDistance="+=120%"
        label={
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">
              Chapter 01
            </span>
            <span className="block text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
              Who
              <br />
              I Am
            </span>
          </div>
        }
        beneath={
          <section className="relative w-screen h-screen bg-[#080808]">
            <SplineSceneBasic />
          </section>
        }
      />

      <div id="about">
        <StoryScrollDemo />
      </div>

      <div id="showcase">
        <ScrollWarpPortal
          voidColor="#050505"
          accent="#c8a882"
          scrollDistance="+=170%"
          label={
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-70">
                Chapter 02
              </span>
              <span className="block text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
                The
                <br />
                Showcase
              </span>
            </div>
          }
        />
      </div>

      <div id="projects" className="scroll-mt-0">
        <HeroParallaxDemo />
      </div>

      <ScrollMorphSection />

      <div id="gallery">
      <ScrollFoldTransition
        seamColor="#c8a882"
        voidColor="#050505"
        topColor="#0f0f0f"
        bottomColor="#1a1a1a"
        scrollDistance="+=180%"
        label={
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-70">
              Chapter 03
            </span>
            <span className="text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight flex flex-col items-center" style={{ whiteSpace: "nowrap" }}>
              <span>DESIGNED</span>
              <span>WITH&nbsp;INTENT</span>
            </span>
          </div>
        }
      />
      </div>

      <ScrollTiltedGridDemo />

      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        {/* Premium light-rays backdrop — masked + low-saturation gold to blend with the ink palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(200,168,130,0.06) 0%, rgba(200,168,130,0.02) 40%, transparent 75%), #060606",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black 30%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black 30%, transparent 85%)",
            opacity: 0.55,
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#c8a882"
            raysSpeed={0.5}
            lightSpread={1.2}
            rayLength={1.6}
            fadeDistance={1.4}
            saturation={0.45}
            followMouse
            mouseInfluence={0.06}
            noiseAmount={0.06}
            distortion={0.02}
          />
        </div>
        <div className="relative z-10 w-full">
          <CardCarouselDemo />
        </div>
      </section>

      <ZoomParallaxDemo />

      <ScrollReveal className="w-full">
        <section id="contact" className="min-h-screen w-full flex items-center justify-center bg-black px-6 py-24">
          <ProfileCard
            name="Rohith Pranov"
            title="Software Engineer"
            handle="rohithpranov"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/profilecard.avif"
            miniAvatarUrl="/profilecard.avif"
            iconUrl="/iconpattern.png"
            grainUrl="/grain.webp"
            showUserInfo
            enableTilt
            enableMobileTilt
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            contactHref="https://www.linkedin.com/in/rohith-pranov/"
          />
        </section>
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <FooterDemo />
      </ScrollReveal>
    </main>
  );
}
