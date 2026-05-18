"use client";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";

export default function ScrollTiltedGridDemo() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflowX: "hidden",
        background: "#080808",
        color: "#f0ece4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: "1.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.02em" }}>
          Where Design Thinks for Itself
        </h1>
        <p style={{ marginTop: "1rem", maxWidth: "28rem", fontSize: "0.875rem", opacity: 0.6 }}>
          Every screen here was built around the user,
not around the trend.
        </p>

        {/* Animated scroll-and-explore cue */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span
            className="stge-shimmer"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
            }}
          >
            Scroll &amp; Explore
          </span>

          <span
            aria-hidden
            style={{
              position: "relative",
              width: "1px",
              height: "48px",
              overflow: "hidden",
              background: "rgba(240,236,228,0.12)",
            }}
          >
            <span
              className="stge-line-pulse"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "40%",
                background:
                  "linear-gradient(180deg, transparent 0%, #c8a882 50%, transparent 100%)",
              }}
            />
          </span>

          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="stge-bounce"
            style={{ width: "14px", height: "14px", color: "#c8a882" }}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <style jsx>{`
          .stge-shimmer {
            background: linear-gradient(
              90deg,
              rgba(240, 236, 228, 0.35) 0%,
              rgba(240, 236, 228, 0.95) 40%,
              #c8a882 50%,
              rgba(240, 236, 228, 0.95) 60%,
              rgba(240, 236, 228, 0.35) 100%
            );
            background-size: 220% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: stge-shimmer 3.6s ease-in-out infinite;
          }
          @keyframes stge-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          .stge-line-pulse {
            animation: stge-line 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }
          @keyframes stge-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(250%); }
          }

          .stge-bounce {
            animation: stge-bounce 1.8s ease-in-out infinite;
          }
          @keyframes stge-bounce {
            0%, 100% { transform: translateY(0); opacity: 0.55; }
            50% { transform: translateY(4px); opacity: 1; }
          }
        `}</style>
      </section>

      <ScrollTiltedGrid initialCycles={2} maxWidth="xl" gap={10} />
    </div>
  );
}
