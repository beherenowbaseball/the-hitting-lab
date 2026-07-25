/* ============================================================
   DrillCard — editorial card using real YouTube thumbnails
   Supports locked state for the soft email gate
   ============================================================ */

import type { Drill } from "@/lib/drills";

interface Props {
  drill: Drill;
  onClick: () => void;
  locked?: boolean;
  onUnlockClick?: () => void;
}

export default function DrillCard({ drill, onClick, locked = false, onUnlockClick }: Props) {
  const numStr = String(drill.id).padStart(2, "0");

  const handleClick = () => {
    if (locked) {
      onUnlockClick?.();
    } else {
      onClick();
    }
  };

  return (
    <article
      className="bg-white group cursor-pointer overflow-hidden"
      onClick={handleClick}
      style={{ transition: "box-shadow 0.2s ease", position: "relative" }}
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
          style={{ filter: locked ? "blur(4px) brightness(0.5)" : "none", transition: "filter 0.2s" }}
        />

        {/* Locked overlay */}
        {locked ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            {/* Lock icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "6px", opacity: 0.9 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
              Unlock Free
            </span>
          </div>
        ) : (
          /* Play button overlay */
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
        )}

        {/* Waterbag badge */}
        {drill.category === "waterbag" && !locked && (
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
      <div className="p-4" style={{ filter: locked ? "blur(2px)" : "none", userSelect: locked ? "none" : "auto" }}>
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

      </div>
    </article>
  );
}
