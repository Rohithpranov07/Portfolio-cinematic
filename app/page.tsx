import FrameToFullscreen from "@/components/animations/FrameToFullscreen";
import ScrollFloat from "@/components/animations/ScrollFloat";
import ScrollRevealCurtain from "@/components/animations/ScrollRevealCurtain";
import ScrollWarpPortal from "@/components/animations/ScrollWarpPortal";
import ScrollFoldTransition from "@/components/animations/ScrollFoldTransition";
import VSCodePortfolio from "@/components/ui/vscode-portfolio";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import StoryScrollDemo from "@/components/ui/story-scroll-demo";
import HeroParallaxDemo from "@/components/ui/hero-parallax-demo";
import ScrollTiltedGridDemo from "@/components/ui/scroll-tilted-grid-demo";
import CardCarouselDemo from "@/components/ui/card-carousel-demo";
import ZoomParallaxDemo from "@/components/ui/zoom-parallax-demo";
import ProfileCard from "@/components/ui/ProfileCard";
import FooterDemo from "@/components/ui/footer-demo";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <main className="relative">
      <FrameToFullscreen
        titleComponent={
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Your headline here <br />
            <ScrollFloat stagger={0.8} textClassName="text-white" scrollRange={[0.05, 0.48]}>
              Goes here
            </ScrollFloat>
          </h1>
        }
      >
        <VSCodePortfolio />
      </FrameToFullscreen>

      <ScrollRevealCurtain
        curtainColor="#fd5200"
        scrollDistance="+=240%"
        label={
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">
              Chapter 01
            </span>
            <span className="block text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
              Who
              <br />
              We Are
            </span>
          </div>
        }
        beneath={
          <section className="relative w-screen h-screen bg-[#080808]">
            <SplineSceneBasic />
          </section>
        }
      />

      <StoryScrollDemo />

      <ScrollWarpPortal
        voidColor="#050505"
        accent="#c8a882"
        scrollDistance="+=260%"
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

      <HeroParallaxDemo />

      <ScrollFoldTransition
        seamColor="#c8a882"
        voidColor="#050505"
        topColor="#0f0f0f"
        bottomColor="#1a1a1a"
        scrollDistance="+=280%"
        label={
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-70">
              Chapter 03
            </span>
            <span className="block text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
              A Field
              <br />
              Of Stills
            </span>
          </div>
        }
      />

      <ScrollTiltedGridDemo />

      <section className="min-h-screen flex items-center justify-center py-20">
        <CardCarouselDemo />
      </section>

      <ZoomParallaxDemo />

      <ScrollReveal className="w-full">
        <section className="min-h-screen w-full flex items-center justify-center bg-black px-6 py-24">
          <ProfileCard
            name="Rohith Pranov"
            title="Software Engineer"
            handle="rohithpranov"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/placeholder.svg"
            showUserInfo
            enableTilt
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </section>
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <FooterDemo />
      </ScrollReveal>
    </main>
  );
}
