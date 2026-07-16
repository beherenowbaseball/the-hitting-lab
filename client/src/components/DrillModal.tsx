/* ============================================================
   DrillModal — full drill detail overlay
   Shows: video embed, what it is, why we do it, how to run it,
   coaching cues, and a CTA to work with the coach
   ============================================================ */

import { useEffect } from "react";
import type { Drill } from "@/lib/drills";

interface Props {
  drill: Drill;
  onClose: () => void;
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function DrillModal({ drill, onClose }: Props) {
  const videoId = getYouTubeId(drill.videoUrl);
  const numStr = String(drill.id).padStart(2, "0");

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      style={{ backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full md:max-w-3xl max-h-[92svh] overflow-y-auto bg-white"
        style={{
          animation: "slideUp 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
          style={{ backgroundColor: "oklch(0.12 0.005 65)", color: "white", border: "none" }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Video embed */}
        {videoId && (
          <div className="w-full" style={{ aspectRatio: "16/9", backgroundColor: "#000" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={drill.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-7 md:p-10">
          {/* Header */}
          <div className="mb-7 pb-7 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="drill-number"
                style={{ color: "oklch(0.42 0.18 25)" }}
              >
                Drill {numStr}
              </span>
              {drill.category === "waterbag" && (
                <span
                  className="px-2 py-0.5 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: "oklch(0.96 0.005 80)",
                    color: "oklch(0.35 0.01 65)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Water Bag
                </span>
              )}
            </div>
            <h2
              className="headline-bold mb-2"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "oklch(0.12 0.005 65)" }}
            >
              {drill.name}
            </h2>
            <p
              className="text-sm"
              style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.52 0.01 65)", fontWeight: 300 }}
            >
              {drill.tagline}
            </p>
          </div>

          {/* The Story Angle */}
          <div className="mb-7 p-5" style={{ backgroundColor: "oklch(0.96 0.005 80)", borderLeft: "3px solid oklch(0.42 0.18 25)" }}>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.42 0.18 25)", letterSpacing: "0.1em" }}
            >
              The Story
            </p>
            <p
              className="text-sm italic leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.25 0.005 65)" }}
            >
              {drill.storyAngle}
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            {[
              { label: "What It Is", content: drill.whatItIs },
              { label: "Why We Do It", content: drill.whyWeDoit },
              { label: "How To Run It", content: drill.howToRunIt },
            ].map(({ label, content }) => (
              <div key={label}>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.42 0.18 25)", letterSpacing: "0.1em" }}
                >
                  {label}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.25 0.005 65)", fontWeight: 300 }}
                >
                  {content}
                </p>
              </div>
            ))}

            {/* Coaching Cues — highlighted */}
            <div className="pt-4 border-t border-border">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.42 0.18 25)", letterSpacing: "0.1em" }}
              >
                Coaching Cues
              </p>
              <p
                className="text-base italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.12 0.005 65)" }}
              >
                "{drill.coachingCues}"
              </p>
            </div>
          </div>

          {/* Villain */}
          <div className="mt-6 pt-6 border-t border-border flex items-center gap-2">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.65 0.008 65)", letterSpacing: "0.1em" }}
            >
              Fixes:
            </span>
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.42 0.18 25)" }}
            >
              {drill.villain}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p
              className="text-sm mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.52 0.01 65)", fontWeight: 300 }}
            >
              Want to work through these drills with your hitter?
            </p>
            <button
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.1em",
                backgroundColor: "oklch(0.12 0.005 65)",
                color: "white",
                border: "none",
              }}
              onClick={() => alert("Feature coming soon — connect your booking link here.")}
            >
              Book a Free Swing Audit →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
