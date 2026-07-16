/* ============================================================
   DrillCard — editorial card using real YouTube thumbnails
   Shows the coach's face in every card
   ============================================================ */

import type { Drill } from "@/lib/drills";

interface Props {
  drill: Drill;
  onClick: () => void;
}

export default function DrillCard({ drill, onClick }: Props) {
  const numStr = String(drill.id).padStart(2, "0");

  return (
    <article
      className="bg-white group cursor-pointer overflow-hidden"
      onClick={onClick}
      style={{ transition: "box-shadow 0.2s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* YouTube Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={drill.thumbnailUrl}
          alt={drill.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "oklch(0.42 0.18 25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
          </div>
        </div>
        {/* Waterbag badge */}
        {drill.category === "waterbag" && (
          <div
            className="absolute top-2 right-2 px-2 py-0.5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              backgroundColor: "oklch(0.12 0.005 65)",
              color: "white",
            }}
          >
            Water Bag
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-4">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "oklch(0.72 0.12 25)",
            marginBottom: "0.35rem",
          }}
        >
          {numStr}
        </p>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "oklch(0.12 0.005 65)",
            lineHeight: 1.25,
            marginBottom: "0.4rem",
            transition: "color 0.2s",
          }}
          className="group-hover:text-[oklch(0.42_0.18_25)]"
        >
          {drill.name}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 300,
            lineHeight: 1.5,
            color: "oklch(0.52 0.01 65)",
            marginBottom: "0.75rem",
          }}
        >
          {drill.tagline}
        </p>
        <div className="flex items-start gap-1.5">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "oklch(0.65 0.008 65)",
              fontSize: "0.65rem",
              flexShrink: 0,
            }}
          >
            Fixes:
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "oklch(0.42 0.18 25)",
              fontSize: "0.65rem",
              fontWeight: 500,
            }}
          >
            {drill.villain}
          </span>
        </div>
      </div>
    </article>
  );
}
