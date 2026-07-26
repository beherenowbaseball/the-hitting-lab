/* ============================================================
   BE THE BEST BASEBALL — Post Opt-In Drills Page
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from "react";
import { drills, standardDrills, waterbagDrills } from "@/lib/drills";
import DrillCard from "@/components/DrillCard";
import DrillModal from "@/components/DrillModal";
import type { Drill } from "@/lib/drills";

const CARD_WIDTH_MOBILE = 260;
const CARD_WIDTH_DESKTOP = 320;
const CARD_GAP = 1;
const SCROLL_SPEED = 0.6;

const GHL_BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/jantzen";
// ▼ Replace with your YouTube welcome video ID when recorded
const WELCOME_VIDEO_ID = ""; // Set to YouTube video ID when ready

export default function DrillsUnlocked() {
  const [activeFilter, setActiveFilter] = useState<"all" | "standard" | "waterbag">("all");
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);

  const filteredDrills =
    activeFilter === "all" ? drills :
    activeFilter === "standard" ? standardDrills :
    waterbagDrills;

  const duplicatedDrills = [...filteredDrills, ...filteredDrills, ...filteredDrills];

  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return CARD_WIDTH_DESKTOP + CARD_GAP;
    return (window.innerWidth < 640 ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP) + CARD_GAP;
  }, []);

  const animate = useCallback(() => {
    const el = carouselRef.current;
    if (!el || isPaused) { animFrameRef.current = requestAnimationFrame(animate); return; }
    posRef.current += SCROLL_SPEED;
    const totalWidth = filteredDrills.length * getCardWidth();
    if (posRef.current >= totalWidth) posRef.current -= totalWidth;
    el.style.transform = `translateX(-${posRef.current}px)`;
    animFrameRef.current = requestAnimationFrame(animate);
  }, [isPaused, filteredDrills.length, getCardWidth]);

  useEffect(() => {
    posRef.current = 0;
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animate, activeFilter]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (window as any).trackEvent?.("drills_page_view", {});
  }, []);

  const filterBtnStyle = (active: boolean) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    padding: "0.5rem 1.25rem",
    border: "1px solid",
    borderColor: active ? "oklch(0.12 0.005 65)" : "oklch(0.82 0.005 80)",
    backgroundColor: active ? "oklch(0.12 0.005 65)" : "transparent",
    color: active ? "white" : "oklch(0.52 0.01 65)",
    cursor: "pointer",
    transition: "all 0.15s ease",
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white" }}>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "white",
        borderBottom: scrolled ? "1px solid oklch(0.92 0.005 80)" : "1px solid transparent",
        transition: "border-color 0.2s ease",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "56px",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div style={{ width: "28px", height: "28px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.75rem", color: "white" }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.12 0.005 65)", lineHeight: 1.1 }}>BE THE BEST BASEBALL</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)", lineHeight: 1 }}>JANTZEN WITTE</div>
          </div>
        </a>
        <a
          href="/apply"
          onClick={() => (window as any).trackEvent?.("booking_click", { location: "nav" })}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600,
            letterSpacing: "0.15em", textTransform: "uppercase",
            backgroundColor: "oklch(0.42 0.18 25)", color: "white",
            padding: "0.5rem 1rem", textDecoration: "none",
          }}
        >
          APPLY NOW →
        </a>
      </nav>

      {/* ── Welcome Video + CTA ──────────────────────────────── */}
      <section style={{ paddingTop: "72px", paddingBottom: "clamp(1.5rem, 5vw, 3rem)", backgroundColor: "oklch(0.08 0.005 65)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem 0" }}>

          {/* Video — only renders when WELCOME_VIDEO_ID is set */}
          {WELCOME_VIDEO_ID && (
            <div style={{ position: "relative", paddingBottom: "56.25%", backgroundColor: "oklch(0.14 0.005 65)", marginBottom: "1.75rem" }}>
              <iframe
                src={`https://www.youtube.com/embed/${WELCOME_VIDEO_ID}?autoplay=1&rel=0`}
                title="Welcome to the 32-Drill Framework"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          )}

          {/* Short copy + CTA */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem", textAlign: "center" }}>
            Want us to watch your swings and build a plan around your specific flaws?
          </p>
          <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
            <a
              href="/apply"
              onClick={() => (window as any).trackEvent?.("booking_click", { location: "drills_welcome" })}
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                backgroundColor: "oklch(0.42 0.18 25)", color: "white",
                padding: "0.9rem 2rem", textDecoration: "none",
              }}
            >
              Book a Strategy Session →
            </a>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", textAlign: "center" }}>
            +5 MPH exit velocity guaranteed in 30 days — or we work with you for free.
          </p>
        </div>
      </section>

      {/* ── Drills Section ───────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.5rem" }}>
            THE PROGRAM
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.1, marginBottom: "2rem" }}>
            32 Drills. Designed to bring out your natural swing.
          </h2>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {(["all", "standard", "waterbag"] as const).map(f => (
              <button key={f} style={filterBtnStyle(activeFilter === f)} onClick={() => setActiveFilter(f)}>
                {f === "all" ? "ALL 32" : f === "standard" ? "STANDARD" : "WATER BAG"}
              </button>
            ))}
          </div>
          <div style={{ borderTop: "1px solid oklch(0.92 0.005 80)", marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "oklch(0.65 0.008 65)", marginBottom: "1rem" }}>
            Hold to pause · Tap any drill to watch the video
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{ overflow: "hidden", cursor: "grab" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1500)}
        >
          <div ref={carouselRef} style={{ display: "flex", gap: `${CARD_GAP}px`, willChange: "transform" }}>
            {duplicatedDrills.map((drill, idx) => (
              <div
                key={`${drill.id}-${idx}`}
                style={{
                  minWidth: `${CARD_WIDTH_MOBILE}px`,
                  width: `${CARD_WIDTH_MOBILE}px`,
                  flexShrink: 0,
                }}
                className="sm:min-w-[320px] sm:w-[320px]"
              >
                <DrillCard drill={drill} onClick={() => setSelectedDrill(drill)} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "oklch(0.65 0.008 65)", textAlign: "center" }}>
            Showing {filteredDrills.length} drills
          </p>
        </div>
      </section>

      {/* ── Bottom CTA Section ─────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.08 0.005 65)", padding: "clamp(3rem, 8vw, 5rem) 0", paddingBottom: "calc(clamp(3rem, 8vw, 5rem) + 60px)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            Ready to go further?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>
            Doing the drills will help.<br />Getting feedback will change everything.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: "2rem" }}>
            Want us to watch your swings, identify exactly what needs to change, and build a custom plan around your specific flaws?
          </p>
          <a
            href="/apply"
            onClick={() => (window as any).trackEvent?.("booking_click", { location: "drills_bottom" })}
            style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              backgroundColor: "oklch(0.42 0.18 25)", color: "white",
              padding: "1rem 2.5rem", textDecoration: "none",
            }}
          >
            Book a Strategy Session →
          </a>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", marginTop: "1rem" }}>
            +5 MPH exit velocity guaranteed in 30 days — or we work with you for free.
          </p>
        </div>
      </section>

      {/* ── Sticky Bottom CTA ────────────────────────────────── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        backgroundColor: "oklch(0.08 0.005 65)",
        borderTop: "1px solid oklch(0.2 0.005 65)",
        padding: "0.6rem 1rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "0.5rem", flexWrap: "wrap",
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "rgba(255,255,255,0.75)", margin: 0 }}>
            Want a plan built around your specific flaws?
        </p>
        <a
          href="/apply"
          onClick={() => (window as any).trackEvent?.("booking_click", { location: "sticky_bar" })}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            backgroundColor: "oklch(0.42 0.18 25)", color: "white",
            padding: "0.6rem 1.25rem", textDecoration: "none", flexShrink: 0,
          }}
        >
          Apply for a Strategy Session →
        </a>
      </div>

      {/* ── Drill Modal ──────────────────────────────────────── */}
      {selectedDrill && <DrillModal drill={selectedDrill} onClose={() => setSelectedDrill(null)} />}
    </div>
  );
}
