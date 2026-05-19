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
          overflow: "hidden",
        }}
      >
        {/* Premium minimal backdrop — non-interactive */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Soft gold radial glow centered behind title */}
          <div
            className="stge-glow"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "min(78vw, 920px)",
              height: "min(78vw, 920px)",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle at center, rgba(200,168,130,0.10) 0%, rgba(200,168,130,0.04) 40%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* Faint dotted grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(240,236,228,0.045) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />

          {/* Vertical hairlines + edge labels */}
          <span
            style={{
              position: "absolute",
              top: "10%",
              bottom: "10%",
              left: "clamp(1.25rem, 4vw, 3rem)",
              width: "1px",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(240,236,228,0.10) 20%, rgba(240,236,228,0.10) 80%, transparent 100%)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(clamp(1.25rem, 4vw, 3rem) + 12px)",
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "left center",
              fontSize: "10px",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.35)",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              whiteSpace: "nowrap",
            }}
          >
            Ch · 04 — Field of Stills
          </span>

          {/* Corner brackets */}
          {[
            { top: "1.75rem", left: "1.75rem", rotate: 0 },
            { top: "1.75rem", right: "1.75rem", rotate: 90 },
            { bottom: "1.75rem", right: "1.75rem", rotate: 180 },
            { bottom: "1.75rem", left: "1.75rem", rotate: 270 },
          ].map((pos, i) => (
            <svg
              key={i}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
                transform: `rotate(${pos.rotate}deg)`,
                color: "#c8a882",
                opacity: 0.55,
              }}
            >
              <path
                d="M1 7 L1 1 L7 1"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeLinecap="square"
              />
            </svg>
          ))}

          {/* Tiny center-top index numeral */}
          <span
            style={{
              position: "absolute",
              top: "2.25rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(200,168,130,0.55)",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            }}
          >
            04 / 07
          </span>
        </div>

        <h1
          style={{
            position: "relative",
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Where Design Thinks for Itself
        </h1>
        <p style={{ position: "relative", marginTop: "1rem", maxWidth: "28rem", fontSize: "0.875rem", opacity: 0.6 }}>
          Every screen here was built around the user,
not around the trend.
        </p>

        {/* Animated scroll-and-explore cue */}
        <div
          style={{
            position: "relative",
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
