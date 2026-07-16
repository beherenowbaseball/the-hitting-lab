/* ============================================================
   VSLModal — Video Sales Letter overlay
   Embeds the coaching intro video with autoplay
   Tap outside or press Escape to close
   ============================================================ */

import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

export default function VSLModal({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "860px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-2.5rem",
            right: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        >
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>×</span> Close
        </button>

        {/* Video embed */}
        <div style={{ position: "relative", paddingBottom: "56.25%", backgroundColor: "#000" }}>
          <iframe
            src="https://www.youtube.com/embed/j4X1SbLVQMk?autoplay=1&rel=0&modestbranding=1"
            title="The Hitting Lab — Stop Overthinking Your Swing"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        {/* Below video CTA */}
        <div
          style={{
            backgroundColor: "oklch(0.10 0.005 65)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "flex-start",
          }}
        >
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.7)",
            margin: 0,
            lineHeight: 1.5,
          }}>
            Ready to stop overthinking and start hitting?
          </p>
          <button
            onClick={() => {
              onClose();
              window.open("https://api.leadconnectorhq.com/widget/bookings/jantzen", "_blank");
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backgroundColor: "oklch(0.42 0.18 25)",
              color: "white",
              border: "none",
              padding: "0.85rem 1.75rem",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a Free Strategy Session →
          </button>
        </div>
      </div>
    </div>
  );
}
