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
          A field of stills
        </h1>
        <p style={{ marginTop: "1rem", maxWidth: "28rem", fontSize: "0.875rem", opacity: 0.6 }}>
          Pictures rise from below, settle into focus, then tilt away as the page advances.
        </p>
      </section>

      <ScrollTiltedGrid initialCycles={2} maxWidth="xl" gap={10} />
    </div>
  );
}
