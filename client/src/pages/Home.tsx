/* ============================================================
   THE DRILL LAB — Home Page
   Design: Sports Illustrated meets The Players Tribune
   StoryBrand: Problem → Guide → Plan → CTA
   Style: White/off-white long-read, black as chapter breaks,
          Playfair italic editorial voice, SI red accent,
          sharp cards, magazine archive pacing
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { drills, standardDrills, waterbagDrills } from "@/lib/drills";
import DrillCard from "@/components/DrillCard";
import DrillModal from "@/components/DrillModal";
import type { Drill } from "@/lib/drills";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<"all" | "standard" | "waterbag">("all");
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDrills =
    activeFilter === "all" ? drills :
    activeFilter === "standard" ? standardDrills :
    waterbagDrills;

  const scrollToDrills = () => {
    drillsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.88 0.005 80)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Masthead — distinctive editorial wordmark */}
          <a href="/" className="flex items-center gap-3 no-underline group">
            {/* Distinctive mark: bold geometric D with a diagonal slash */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: scrolled ? "oklch(0.42 0.18 25)" : "white",
                transition: "background-color 0.3s",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: scrolled ? "white" : "oklch(0.42 0.18 25)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  transition: "color 0.3s",
                }}
              >
                D
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: scrolled ? "oklch(0.12 0.005 65)" : "white",
                  letterSpacing: "0.02em",
                  display: "block",
                  lineHeight: 1.1,
                  transition: "color 0.3s",
                }}
              >
                THE DRILL LAB
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.55rem",
                  color: scrolled ? "oklch(0.52 0.01 65)" : "rgba(255,255,255,0.6)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "block",
                  transition: "color 0.3s",
                }}
              >
                Hitting Program
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Drills", action: scrollToDrills },
              { label: "About", action: () => {} },
              { label: "Work With Me", action: () => alert("Feature coming soon — connect your booking link here.") },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="text-xs font-semibold tracking-widest uppercase transition-colors duration-200 hover:opacity-60"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: scrolled ? "oklch(0.12 0.005 65)" : "rgba(255,255,255,0.85)",
                  letterSpacing: "0.12em",
                  background: "none",
                  border: "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "oklch(0.12 0.005 65)" : "white", background: "none", border: "none" }}
          >
            <div className="w-5 space-y-1.5">
              <span className="block h-px bg-current transition-all duration-200"
                style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
              <span className="block h-px bg-current transition-all duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-px bg-current transition-all duration-200"
                style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border py-5">
            <div className="container flex flex-col gap-5">
              {["Drills", "About", "Work With Me"].map((item) => (
                <button
                  key={item}
                  onClick={() => { setMenuOpen(false); if (item === "Drills") scrollToDrills(); }}
                  className="text-left text-xs font-semibold tracking-widest uppercase text-foreground"
                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.12em", background: "none", border: "none" }}
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/manus-storage/hero-bg_1f3f5135.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 45%, rgba(8,8,8,0.1) 100%)"
          }}
        />

        <div className="relative z-10 flex flex-col justify-end h-full" style={{ minHeight: "100svh", paddingBottom: "6rem" }}>
          <div className="container">
            <div className="max-w-3xl">
              <p
                className="mb-5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "oklch(0.72 0.12 25)",
                }}
              >
                The Drill Lab — 32 Drills. 32 Flaws. One Program.
              </p>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(2.4rem, 6vw, 5rem)",
                  lineHeight: 1.06,
                  color: "white",
                  marginBottom: "1.25rem",
                }}
              >
                Overthinking mechanics
                <br />is an epidemic.
              </h1>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: "32rem",
                  marginBottom: "2.5rem",
                }}
              >
                These 32 drills will teach you how to turn your brain off
                and unlock your natural swing.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToDrills}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    backgroundColor: "oklch(0.42 0.18 25)",
                    color: "white",
                    border: "none",
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Explore the Drills →
                </button>
                <button
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.35)",
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => alert("Feature coming soon — add your coaching video URL here.")}
                >
                  Watch the Video
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "white" }}>Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
      </section>

      {/* ── PROBLEM (chapter break — black) ─────────────────── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.10 0.005 65)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.12 25)",
                marginBottom: "1.5rem",
              }}
            >
              The Problem
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "white",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Great in practice.<br />Freezes in games.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Most hitting instruction creates mechanical, overthinking hitters. Kids who look
              beautiful in the cage and fall apart when the game speeds up. They've been taught
              to think about their swing — when the real skill is learning to stop thinking.
              Every drill in this program was built to fix exactly that.
            </p>
          </div>
        </div>
      </section>

      {/* ── GUIDE (white — long read) ────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  marginBottom: "1.5rem",
                }}
              >
                The Guide
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  color: "oklch(0.12 0.005 65)",
                  lineHeight: 1.15,
                  marginBottom: "1.5rem",
                }}
              >
                I don't just show you the drill.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "oklch(0.35 0.01 65)",
                  marginBottom: "1.25rem",
                }}
              >
                I show you the moment I realized most coaches — including me, for years — were
                teaching this completely wrong. Every drill in this program came from a specific
                hitter, a specific flaw, and a specific moment of discovery.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "oklch(0.35 0.01 65)",
                  marginBottom: "2.5rem",
                }}
              >
                The goal isn't to give you more to think about. It's to give your body what it
                needs to stop thinking — and start hitting.
              </p>
              <button
                onClick={scrollToDrills}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                }}
              >
                See All 32 Drills →
              </button>
            </div>

            {/* Pull quote — editorial callout */}
            <div
              style={{
                backgroundColor: "oklch(0.96 0.005 80)",
                padding: "3rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "5rem",
                  lineHeight: 0.8,
                  color: "oklch(0.85 0.005 80)",
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                }}
              >
                "
              </div>
              <blockquote
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.7rem)",
                  color: "oklch(0.12 0.005 65)",
                  lineHeight: 1.4,
                  marginBottom: "1.5rem",
                }}
              >
                Your body already knows how to hit. Most coaching just gets in the way.
              </blockquote>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "oklch(0.52 0.01 65)",
                }}
              >
                — The Drill Lab
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DRILL LIBRARY (magazine archive) ────────────────── */}
      <section ref={drillsRef} className="py-24 md:py-32">
        <div className="container">
          {/* Section header — editorial */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "oklch(0.42 0.18 25)",
                    marginBottom: "0.75rem",
                  }}
                >
                  The Program
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "oklch(0.12 0.005 65)",
                    lineHeight: 1.1,
                  }}
                >
                  32 Drills. 32 Flaws.
                </h2>
              </div>

              {/* Filter tabs */}
              <div
                className="flex gap-0"
                style={{ border: "1px solid oklch(0.88 0.005 80)" }}
              >
                {(["all", "standard", "waterbag"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.6rem 1.25rem",
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

            {/* Horizontal rule */}
            <div style={{ height: "1px", backgroundColor: "oklch(0.88 0.005 80)" }} />
          </div>

          {/* Drill grid — magazine archive style with gap for breathing room */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gap: "1px", backgroundColor: "oklch(0.88 0.005 80)" }}
          >
            {filteredDrills.map((drill) => (
              <DrillCard
                key={drill.id}
                drill={drill}
                onClick={() => setSelectedDrill(drill)}
              />
            ))}
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "oklch(0.65 0.008 65)",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Showing {filteredDrills.length} of {drills.length} drills
          </p>
        </div>
      </section>

      {/* ── SERIES CALLOUT (off-white — editorial break) ─────── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "oklch(0.96 0.005 80)" }}
      >
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.42 0.18 25)",
                marginBottom: "1.5rem",
              }}
            >
              The Instagram Series
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "oklch(0.12 0.005 65)",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              One drill. One flaw.<br />One fix.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "oklch(0.35 0.01 65)",
                marginBottom: "2.5rem",
              }}
            >
              Every drill in this program has a story behind it. A specific hitter. A specific
              moment. A specific bad cue that was quietly destroying their swing. Follow the
              series on Instagram to see the story behind each one.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.42 0.18 25)",
                textDecoration: "underline",
                textUnderlineOffset: "5px",
              }}
            >
              Follow on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA (black chapter break) ────────────────────────── */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "oklch(0.10 0.005 65)" }}
      >
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.12 25)",
                marginBottom: "1.5rem",
              }}
            >
              Work With Me
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "white",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Ready to work together?<br />Here's how.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "2.5rem",
              }}
            >
              If you've made it through these drills and you're thinking "I need this for my
              kid" — let's talk. I offer a free swing audit to start. No pitch. No pressure.
              Just an honest look at what's happening and what we can fix.
            </p>
            <button
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                backgroundColor: "oklch(0.42 0.18 25)",
                color: "white",
                border: "none",
                padding: "1.1rem 2.5rem",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={() => alert("Feature coming soon — connect your booking link here.")}
            >
              Book a Free Swing Audit →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        className="py-10"
        style={{
          borderTop: "1px solid oklch(0.20 0.005 65)",
          backgroundColor: "oklch(0.10 0.005 65)",
        }}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "oklch(0.42 0.18 25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.75rem", color: "white" }}>D</span>
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
              }}
            >
              THE DRILL LAB
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © {new Date().getFullYear()} The Drill Lab. All rights reserved.
          </span>
        </div>
      </footer>

      {/* ── DRILL MODAL ─────────────────────────────────────── */}
      {selectedDrill && (
        <DrillModal drill={selectedDrill} onClose={() => setSelectedDrill(null)} />
      )}
    </div>
  );
}
