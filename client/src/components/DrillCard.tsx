/* ============================================================
   DrillCard — editorial article-card style
   All imagery: baseball / hitting / batting cage / practice world
   Sharp edges, no rounded corners, subtle hover lift
   ============================================================ */

import type { Drill } from "@/lib/drills";

// All images are baseball/hitting/batting cage specific
const cardImages: Record<number, string> = {
  1:  "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",  // batter mid-swing
  2:  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",  // baseball close-up
  3:  "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=600&q=80",  // baseball field
  4:  "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80",  // baseball glove
  5:  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",  // baseball bat
  6:  "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&q=80",     // baseball diamond
  7:  "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",  // batter
  8:  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",  // ball
  9:  "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=600&q=80",  // field
  10: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80",  // glove
  11: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",  // bat
  12: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&q=80",     // diamond
  13: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",
  14: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",
  15: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=600&q=80",
  16: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80",
  17: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
  18: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&q=80",
  19: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",
  20: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",
  21: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=600&q=80",
  22: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80",
  23: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
  24: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&q=80",
  25: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",
  26: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",
  27: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=600&q=80",
  28: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80",
  29: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
  30: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&q=80",
  31: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",
  32: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",
};

// Unique baseball image pool to cycle through for variety
const baseballImagePool = [
  "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80",
  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",
  "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=600&q=80",
  "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80",
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
  "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&q=80",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80",
  "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&q=80",
];

interface Props {
  drill: Drill;
  onClick: () => void;
}

export default function DrillCard({ drill, onClick }: Props) {
  // Cycle through baseball images based on drill id for variety
  const imgSrc = baseballImagePool[(drill.id - 1) % baseballImagePool.length];
  const numStr = String(drill.id).padStart(2, "0");

  return (
    <article
      className="bg-white group cursor-pointer overflow-hidden"
      onClick={onClick}
      style={{ transition: "box-shadow 0.2s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={imgSrc}
          alt={drill.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge for waterbag */}
        {drill.category === "waterbag" && (
          <div
            className="absolute top-3 right-3 px-2 py-1 text-white text-xs font-semibold tracking-widest uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "oklch(0.12 0.005 65)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
            }}
          >
            Water Bag
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-5">
        <p className="drill-number mb-2">{numStr}</p>
        <h3
          className="headline-bold mb-2 group-hover:text-[oklch(0.42_0.18_25)] transition-colors duration-200"
          style={{ fontSize: "1.05rem", color: "oklch(0.12 0.005 65)", lineHeight: 1.25 }}
        >
          {drill.name}
        </h3>
        <p
          className="text-xs leading-relaxed mb-4"
          style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.52 0.01 65)", fontWeight: 300 }}
        >
          {drill.tagline}
        </p>
        {/* Villain tag */}
        <div className="flex items-start gap-1.5">
          <span
            className="text-xs shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.65 0.008 65)", fontSize: "0.7rem" }}
          >
            Fixes:
          </span>
          <span
            className="text-xs font-medium"
            style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.42 0.18 25)", fontSize: "0.7rem" }}
          >
            {drill.villain}
          </span>
        </div>
      </div>
    </article>
  );
}
