/* ============================================================
   DrillModal — full drill detail overlay
   YouTube embed + story angle + coaching cues + CTA
   Mobile-first, tap outside to close
   ============================================================ */

import { useEffect } from "react";
import type { Drill } from "@/lib/drills";

interface Props {
  drill: Drill;
  onClose: () => void;
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  return url;
}

export default function DrillModal({ drill, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const numStr = String(drill.id).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full md:max-w-3xl bg-white overflow-y-auto"
        style={{
          maxHeight: "92svh",
          borderRadius: "0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center"
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "oklch(0.12 0.005 65)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* YouTube embed */}
        <div style={{ position: "relative", paddingBottom: "56.25%", backgroundColor: "#000" }}>
          <iframe
            src={getYouTubeEmbedUrl(drill.videoUrl)}
            title={drill.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.42 0.18 25)",
                marginBottom: "0.5rem",
              }}
            >
              Drill {numStr} — {drill.category === "waterbag" ? "Water Bag" : "Standard"}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                color: "oklch(0.12 0.005 65)",
                lineHeight: 1.15,
                marginBottom: "0.5rem",
              }}
            >
              {drill.name}
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                color: "oklch(0.52 0.01 65)",
              }}
            >
              {drill.tagline}
            </p>
          </div>

          {/* Villain tag */}
          <div
            className="mb-6 px-4 py-3"
            style={{ backgroundColor: "oklch(0.96 0.005 80)", borderLeft: "3px solid oklch(0.42 0.18 25)" }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.52 0.01 65)",
              }}
            >
              Fixes:{" "}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "oklch(0.42 0.18 25)",
              }}
            >
              {drill.villain}
            </span>
          </div>

          {/* Story angle */}
          <div className="mb-6">
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "oklch(0.25 0.005 65)",
                lineHeight: 1.6,
              }}
            >
              "{drill.storyAngle}"
            </p>
          </div>

          {/* Details grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  marginBottom: "0.5rem",
                }}
              >
                What It Is
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.35 0.01 65)" }}>
                {drill.whatItIs}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  marginBottom: "0.5rem",
                }}
              >
                Why We Do It
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.35 0.01 65)" }}>
                {drill.whyWeDoit}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  marginBottom: "0.5rem",
                }}
              >
                How To Run It
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.35 0.01 65)" }}>
                {drill.howToRunIt}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  marginBottom: "0.5rem",
                }}
              >
                Coaching Cues
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.35 0.01 65)" }}>
                {drill.coachingCues}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            className="p-5"
            style={{ backgroundColor: "oklch(0.10 0.005 65)" }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "1rem",
                lineHeight: 1.5,
              }}
            >
              Want to work through these drills with your hitter?
            </p>
            <button
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                backgroundColor: "oklch(0.42 0.18 25)",
                color: "white",
                border: "none",
                padding: "0.85rem 1.75rem",
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => alert("Feature coming soon — connect your booking link here.")}
            >
              Book a Free Strategy Session →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
