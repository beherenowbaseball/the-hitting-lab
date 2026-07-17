/* ============================================================
   THE HITTING LAB — Home Page
   Brand: Be The Best Baseball
   Design: Sports Illustrated meets The Players Tribune
   StoryBrand: Problem → Guide → Plan → CTA
   Key features:
   - Auto-scrolling drill carousel (pauses on touch/hover)
   - YouTube thumbnails as drill card images
   - Fully mobile-optimized
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from "react";
import { drills, standardDrills, waterbagDrills } from "@/lib/drills";
import DrillCard from "@/components/DrillCard";
import DrillModal from "@/components/DrillModal";
import VSLModal from "@/components/VSLModal";
import EmailGate from "@/components/EmailGate";
import type { Drill } from "@/lib/drills";

const CARD_WIDTH_MOBILE = 260;
const CARD_WIDTH_DESKTOP = 320;
const CARD_GAP = 1;
const SCROLL_SPEED = 0.6; // px per frame

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<"all" | "standard" | "waterbag">("all");
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showVSL, setShowVSL] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => !!localStorage.getItem("thl_unlocked"));
  const [showGate, setShowGate] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowGate(false);
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);
  const drillsRef = useRef<HTMLDivElement>(null);

  const filteredDrills =
    activeFilter === "all" ? drills :
    activeFilter === "standard" ? standardDrills :
    waterbagDrills;

  // Duplicate drills for seamless infinite scroll
  const carouselDrills = [...filteredDrills, ...filteredDrills, ...filteredDrills];

  const scrollToDrills = () => {
    drillsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Nav scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll carousel
  const getCardWidth = useCallback(() => {
    return window.innerWidth < 640 ? CARD_WIDTH_MOBILE + CARD_GAP : CARD_WIDTH_DESKTOP + CARD_GAP;
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const totalSingleWidth = filteredDrills.length * getCardWidth();

    const animate = () => {
      if (!isPaused) {
        posRef.current += SCROLL_SPEED;
        // Reset when we've scrolled one full set
        if (posRef.current >= totalSingleWidth) {
          posRef.current = 0;
        }
        if (el) el.scrollLeft = posRef.current;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPaused, filteredDrills.length, getCardWidth]);

  // Reset scroll position when filter changes
  useEffect(() => {
    posRef.current = 0;
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.88 0.005 80)" : "none",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "56px" }}>
          {/* Masthead */}
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                backgroundColor: scrolled ? "oklch(0.42 0.18 25)" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s",
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: scrolled ? "white" : "oklch(0.42 0.18 25)",
                lineHeight: 1,
                transition: "color 0.3s",
              }}>H</span>
            </div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                color: scrolled ? "oklch(0.12 0.005 65)" : "white",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                transition: "color 0.3s",
              }}>THE HITTING LAB</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "0.5rem",
                color: scrolled ? "oklch(0.55 0.01 65)" : "rgba(255,255,255,0.55)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "color 0.3s",
              }}>Be The Best Baseball</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Drills", "About", "Work With Me"].map((label) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Drills") scrollToDrills();
                  else if (label === "Work With Me") window.open('https://api.leadconnectorhq.com/widget/bookings/jantzen', '_blank');
                }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: scrolled ? "oklch(0.12 0.005 65)" : "rgba(255,255,255,0.85)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", padding: "8px", color: scrolled ? "oklch(0.12 0.005 65)" : "white" }}
            aria-label="Menu"
          >
            <div style={{ width: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "1.5px", backgroundColor: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", height: "1.5px", backgroundColor: "currentColor", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: "1.5px", backgroundColor: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: "white", borderTop: "1px solid oklch(0.88 0.005 80)", padding: "1.25rem 0" }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {["Drills", "About", "Work With Me"].map((item) => (
                <button
                  key={item}
                  onClick={() => { setMenuOpen(false); if (item === "Drills") scrollToDrills(); else if (item === "Work With Me") window.open('https://api.leadconnectorhq.com/widget/bookings/jantzen', '_blank'); }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.12 0.005 65)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url('/hero-jantzen.jpg')", backgroundPosition: "20% 15%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.15) 100%)" }}
        />
        <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "100svh", paddingBottom: "5rem" }}>
          <div className="container">
            <div style={{ maxWidth: "640px" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.12 25)",
                marginBottom: "1.25rem",
              }}>
                The Hitting Lab — Be The Best Baseball
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
                lineHeight: 1.06,
                color: "white",
                marginBottom: "1.25rem",
              }}>
                Overthinking mechanics<br />is an epidemic.
              </h1>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.68)",
                maxWidth: "30rem",
                marginBottom: "2rem",
              }}>
                These 32 drills will teach you how to turn your brain off
                and unlock your natural swing.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} className="sm:flex-row">
                <button
                  onClick={scrollToDrills}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    backgroundColor: "oklch(0.42 0.18 25)",
                    color: "white",
                    border: "none",
                    padding: "0.9rem 1.75rem",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Explore the Drills →
                </button>
                <button
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "0.9rem 1.75rem",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => setShowVSL(true)}
                >
                  Watch the Video
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.4 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "white" }}>Scroll</span>
          <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
      </section>

      {/* ── PROBLEM (black chapter break) ───────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              The Problem
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "white", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Great in practice.<br />Freezes in games.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
              Most hitting instruction creates mechanical, overthinking hitters. Kids who look
              beautiful in the cage and fall apart when the game speeds up. They've been taught
              to think about their swing — when the real skill is learning to stop thinking.
            </p>
          </div>
        </div>
      </section>

      {/* ── GUIDE (white long read) ──────────────────────────── */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2" style={{ gap: "3rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem" }}>
                The Guide
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "1.25rem" }}>
                I don't just show you the drill.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "1rem" }}>
                I show you the moment I realized most coaches — including me, for years — were
                teaching this completely wrong. Every drill in this program came from a specific
                hitter, a specific flaw, and a specific moment of discovery.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "2rem" }}>
                The goal isn't to give you more to think about. It's to give your body what it
                needs to stop thinking — and start hitting.
              </p>
              <button
                onClick={scrollToDrills}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "5px" }}
              >
                See All 32 Drills →
              </button>
            </div>
            {/* Pull quote */}
            <div style={{ backgroundColor: "oklch(0.96 0.005 80)", padding: "2.5rem" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", lineHeight: 0.8, color: "oklch(0.82 0.005 80)", fontStyle: "italic", marginBottom: "1.25rem" }}>"</div>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.45, marginBottom: "1.25rem" }}>
                Your body already knows how to hit. Most coaching just gets in the way.
              </blockquote>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)" }}>
                — Jantzen Witte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTO-SCROLLING DRILL CAROUSEL ───────────────────── */}
      <section ref={drillsRef} style={{ padding: "5rem 0" }}>
        <div className="container" style={{ marginBottom: "2rem" }}>
          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.5rem" }}>
                The Program
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.1 }}>
                32 Drills. 32 Flaws.
              </h2>
            </div>
            {/* Filter tabs */}
            <div style={{ display: "flex", border: "1px solid oklch(0.88 0.005 80)", width: "fit-content" }}>
              {(["all", "standard", "waterbag"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.55rem 1rem",
                    backgroundColor: activeFilter === f ? "oklch(0.12 0.005 65)" : "transparent",
                    color: activeFilter === f ? "white" : "oklch(0.52 0.01 65)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {f === "all" ? "All 32" : f === "standard" ? "Standard" : "Water Bag"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: "1px", backgroundColor: "oklch(0.88 0.005 80)" }} />
        </div>

        {/* Touch instruction hint */}
        <div className="container" style={{ marginBottom: "1rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "oklch(0.65 0.008 65)", letterSpacing: "0.05em" }}>
            Hold to pause · Tap any drill to watch the video
          </p>
        </div>

        {/* Carousel — full width, no container padding */}
        <div
          ref={carouselRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            userSelect: "none",
            paddingLeft: "max(1rem, calc((100vw - 1280px) / 2 + 1rem))",
            paddingRight: "max(1rem, calc((100vw - 1280px) / 2 + 1rem))",
            paddingBottom: "1rem",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1500)}
        >
          {carouselDrills.map((drill, idx) => {
            // Each "copy" of the list — figure out position within one set
            const posInSet = idx % filteredDrills.length;
            const FREE_COUNT = 5;
            const locked = !isUnlocked && posInSet >= FREE_COUNT;
            return (
              <div
                key={`${drill.id}-${idx}`}
                style={{
                  minWidth: `${CARD_WIDTH_MOBILE}px`,
                  width: `${CARD_WIDTH_MOBILE}px`,
                  flexShrink: 0,
                  position: "relative",
                }}
                className="sm:min-w-[320px] sm:w-[320px]"
              >
                {/* Inline unlock prompt card — appears right after drill 5 */}
                {!isUnlocked && posInSet === FREE_COUNT && idx < filteredDrills.length && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10,
                      backgroundColor: "oklch(0.10 0.005 65)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1.5rem",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowGate(true)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem", opacity: 0.7 }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: "white", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                      You've seen 5 of {filteredDrills.length}.
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                      Enter your email to unlock<br />the full library — free.
                    </p>
                    <button
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        backgroundColor: "oklch(0.42 0.18 25)",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.25rem",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      Unlock All 32 →
                    </button>
                  </div>
                )}
                <DrillCard
                  drill={drill}
                  onClick={() => setSelectedDrill(drill)}
                  locked={locked}
                  onUnlockClick={() => setShowGate(true)}
                />
              </div>
            );
          })}
        </div>

        {/* Hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="container" style={{ marginTop: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "oklch(0.65 0.008 65)", textAlign: "center" }}>
            Showing {filteredDrills.length} drills
          </p>
        </div>
      </section>

      {/* ── SERIES CALLOUT (off-white) ───────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.96 0.005 80)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1.25rem" }}>
              The Instagram Series
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              One drill. One flaw.<br />One fix.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "2rem" }}>
              Every drill in this program has a story behind it. Follow the series on Instagram
              to see the story behind each one — what it is, why we do it, and the moment it changed everything.
            </p>
            <a
              href="https://instagram.com/jantzenwitte"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", textDecoration: "underline", textUnderlineOffset: "5px" }}
            >
              Follow on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA (black) ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              Work With Me
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "white", lineHeight: 1.2, marginBottom: "2rem" }}>
              Ready to work together?<br />Here's how.
            </h2>

            {/* VSL Video */}
            <div style={{ position: "relative", paddingBottom: "56.25%", marginBottom: "2rem", backgroundColor: "#000" }}>
              <iframe
                src="https://www.youtube.com/embed/j4X1SbLVQMk?rel=0&modestbranding=1"
                title="Be The Best Baseball — Stop Overthinking Your Swing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: "2rem" }}>
              If you've made it through these drills and you're thinking "I need this for my
              kid" — let's talk. Book a free strategy session. No pitch. No pressure.
              Just an honest look at what's happening and what we can fix.
            </p>
            <button
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                backgroundColor: "oklch(0.42 0.18 25)",
                color: "white",
                border: "none",
                padding: "1rem 2.25rem",
                cursor: "pointer",
                transition: "opacity 0.2s",
                width: "100%",
                maxWidth: "320px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={() => window.open('https://api.leadconnectorhq.com/widget/bookings/jantzen', '_blank')}
            >
              Book a Free Strategy Session →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "oklch(0.10 0.005 65)", borderTop: "1px solid oklch(0.18 0.005 65)", padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }} >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "18px", height: "18px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.65rem", color: "white" }}>H</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>THE HITTING LAB</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} Be The Best Baseball. All rights reserved.
          </span>
        </div>
      </footer>

      {/* ── DRILL MODAL ─────────────────────────────────────── */}
      {selectedDrill && (
        <DrillModal drill={selectedDrill} onClose={() => setSelectedDrill(null)} />
      )}
      {showVSL && <VSLModal onClose={() => setShowVSL(false)} />}
      {showGate && <EmailGate onUnlock={handleUnlock} />}
    </div>
  );
}
