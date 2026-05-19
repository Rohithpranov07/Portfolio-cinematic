"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Project = {
  title: string;
  year: string;
  tag: string;
  featured: boolean;
  desc: string;
  stack: string[];
  artwork: string;
  image?: string;
  overview?: string;
  features?: string[];
  links?: { github?: string; linkedin?: string; live?: string };
};

const CloseIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GithubIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.54-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.53.11-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.19.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const CheckIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  React.useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 sm:px-8 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(20,14,38,0.78) 0%, rgba(4,2,10,0.92) 80%)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
            }}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative w-full max-w-[880px] max-h-[92vh] overflow-y-auto rounded-[20px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(22,17,40,0.96) 0%, rgba(10,7,20,0.98) 100%)",
              border: "1px solid rgba(167,139,250,0.18)",
              boxShadow:
                "0 50px 120px -30px rgba(0,0,0,0.95), 0 0 0 1px rgba(167,139,250,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: "spring", damping: 28, stiffness: 260, mass: 0.9 }}
          >
            {/* Decorative inner glow rings */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[24px]"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 0%, rgba(167,139,250,0.18), transparent 60%), radial-gradient(50% 40% at 100% 100%, rgba(236,72,153,0.10), transparent 65%)",
              }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Hero artwork */}
              <motion.div
                variants={itemVariants}
                className="relative w-full overflow-hidden"
                style={{
                  height: "200px",
                  background: project.artwork,
                  borderBottom: "1px solid rgba(167,139,250,0.10)",
                }}
              >
                {project.image && (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    style={{ objectPosition: "center top" }}
                    draggable={false}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {/* Image overlays */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,6,18,0) 40%, rgba(8,6,18,0.85) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
                  style={{
                    background:
                      "radial-gradient(60% 80% at 20% 0%, rgba(167,139,250,0.35), transparent 60%)",
                  }}
                />

                {/* Top-left tag */}
                <span
                  className="absolute top-5 left-5 text-[10px] font-mono uppercase tracking-[0.22em] text-white/90 rounded-full px-3 py-[5px]"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {project.tag}
                </span>
                {project.featured && (
                  <span
                    className="absolute top-5 right-20 text-[10px] font-mono uppercase tracking-[0.22em] text-[#d8c9ff] rounded-full px-3 py-[5px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(58,38,108,0.85) 0%, rgba(31,18,58,0.85) 100%)",
                      border: "1px solid rgba(167,139,250,0.45)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    ★ Featured
                  </span>
                )}

                {/* Animated shimmer line */}
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.9) 50%, transparent 100%)",
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>

              {/* Body */}
              <div style={{ padding: "22px 36px 28px" }}>
                {/* Year + meta line */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center text-[9.5px] font-mono uppercase text-[#8a86a0]"
                  style={{ gap: "10px", marginBottom: "8px", letterSpacing: "0.26em" }}
                >
                  <span>{project.year}</span>
                  <span aria-hidden style={{ width: "3px", height: "3px", borderRadius: "9999px", background: "#a78bfa" }} />
                  <span>Project Detail</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  id="project-modal-title"
                  variants={itemVariants}
                  className="font-bold tracking-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    lineHeight: 1.05,
                    marginBottom: "10px",
                    backgroundImage:
                      "linear-gradient(92deg, #ffffff 0%, #d8c9ff 55%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {project.title}
                </motion.h2>

                {/* Hairline */}
                <motion.div
                  variants={itemVariants}
                  aria-hidden
                  style={{
                    width: "60px",
                    height: "1px",
                    marginBottom: "14px",
                    background:
                      "linear-gradient(90deg, rgba(167,139,250,0.6), transparent)",
                  }}
                />

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  style={{
                    maxWidth: "70ch",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: "rgba(232,230,245,0.88)",
                    marginBottom: "18px",
                  }}
                >
                  {project.overview || project.desc}
                </motion.p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <motion.section variants={itemVariants} style={{ marginBottom: "18px" }}>
                    <SectionLabel>Key Features</SectionLabel>
                    <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "6px 20px", marginTop: "10px" }}>
                      {project.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            fontSize: "0.8rem",
                            lineHeight: 1.4,
                            color: "rgba(220,217,238,0.85)",
                          }}
                        >
                          <span
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "9999px",
                              flexShrink: 0,
                              marginTop: "1px",
                              background:
                                "linear-gradient(135deg, rgba(167,139,250,0.25), rgba(167,139,250,0.05))",
                              border: "1px solid rgba(167,139,250,0.35)",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#c4b5fd",
                            }}
                          >
                            <CheckIcon style={{ width: "8px", height: "8px" }} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {/* Tech stack */}
                <motion.section variants={itemVariants} style={{ marginBottom: "18px" }}>
                  <SectionLabel>Tech Stack</SectionLabel>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                          color: "#e8e6f5",
                          padding: "5px 11px",
                          borderRadius: "9999px",
                          background:
                            "linear-gradient(180deg, rgba(34,26,62,0.85) 0%, rgba(20,15,40,0.85) 100%)",
                          border: "1px solid rgba(167,139,250,0.25)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 12px -6px rgba(0,0,0,0.4)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.section>

                {/* Links */}
                {project.links && (project.links.live || project.links.github || project.links.linkedin) && (
                  <motion.div
                    variants={itemVariants}
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}
                  >
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          borderRadius: "9999px",
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "#0a0814",
                          background:
                            "linear-gradient(180deg, #fef3c7 0%, #fbbf24 100%)",
                          boxShadow:
                            "0 10px 30px -10px rgba(251,191,36,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
                          transition: "transform 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "9999px",
                            background: "#0a0814",
                            boxShadow: "0 0 0 3px rgba(10,8,20,0.18)",
                          }}
                        />
                        Visit Live
                        <ArrowIcon style={{ width: "12px", height: "12px" }} />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          borderRadius: "9999px",
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "#0a0814",
                          background:
                            "linear-gradient(180deg, #f5f0ff 0%, #c4b5fd 100%)",
                          boxShadow:
                            "0 10px 30px -10px rgba(167,139,250,0.6), inset 0 1px 0 rgba(255,255,255,0.7)",
                          transition: "transform 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <GithubIcon style={{ width: "14px", height: "14px" }} />
                        View on GitHub
                        <ArrowIcon style={{ width: "12px", height: "12px" }} />
                      </a>
                    )}
                    {project.links.linkedin && (
                      <a
                        href={project.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          borderRadius: "9999px",
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "#e8e6f5",
                          background:
                            "linear-gradient(180deg, rgba(34,26,62,0.7) 0%, rgba(16,12,30,0.7) 100%)",
                          border: "1px solid rgba(167,139,250,0.28)",
                          transition: "border-color 0.25s ease, background 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(167,139,250,0.55)";
                          e.currentTarget.style.background =
                            "linear-gradient(180deg, rgba(42,32,76,0.85) 0%, rgba(22,16,42,0.85) 100%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(167,139,250,0.28)";
                          e.currentTarget.style.background =
                            "linear-gradient(180deg, rgba(34,26,62,0.7) 0%, rgba(16,12,30,0.7) 100%)";
                        }}
                      >
                        <LinkedinIcon style={{ width: "14px", height: "14px", color: "#7bb6ff" }} />
                        Read on LinkedIn
                        <ArrowIcon style={{ width: "12px", height: "12px" }} />
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: "24px",
        height: "1px",
        background: "rgba(167,139,250,0.6)",
      }}
    />
    <span
      style={{
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: "#8a86a0",
      }}
    >
      {children}
    </span>
  </div>
);

export default ProjectModal;
