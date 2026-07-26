/* ============================================================
   BE THE BEST BASEBALL — Home Page
   Brand: Jantzen Witte
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

// Lightweight scroll-reveal hook — no external deps
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

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

  useReveal();

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
              }}>BE THE BEST BASEBALL</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "0.5rem",
                color: scrolled ? "oklch(0.55 0.01 65)" : "rgba(255,255,255,0.55)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "color 0.3s",
              }}>Jantzen Witte</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {["Drills", "About"].map((label) => (
              <button
                key={label}
                onClick={() => { if (label === "Drills") scrollToDrills(); else if (label === "About") window.location.href = '/about'; }}
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
            {/* Persistent Apply Now CTA */}
            <a
              href="/apply"
              onClick={() => window.trackEvent?.("booking_click", { location: "nav" })}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                backgroundColor: "oklch(0.42 0.18 25)",
                color: "white",
                padding: "0.55rem 1.1rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Apply Now →
            </a>
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
                  onClick={() => { setMenuOpen(false); if (item === "Drills") scrollToDrills(); else if (item === "About") window.location.href = '/about'; else if (item === "Work With Me") window.location.href = '/apply'; }}
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
      {/* ── HERO — Split layout: photo left, copy right ──────── */}
      <section style={{ minHeight: "100svh", display: "flex", flexDirection: "row" }}>
        {/* LEFT — Photo panel */}
        <div
          className="hidden md:block"
          style={{
            flex: "0 0 45%",
            backgroundImage: "url('/hero-jantzen.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            position: "relative",
          }}
        >
          {/* Subtle right-edge fade into the dark panel */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 60%, oklch(0.10 0.005 65) 100%)",
          }} />
        </div>

        {/* RIGHT — Copy panel */}
        <div
          style={{
            flex: "1 1 55%",
            backgroundColor: "oklch(0.10 0.005 65)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(3rem, 8vw, 6rem) clamp(2rem, 6vw, 5rem)",
            position: "relative",
          }}
        >
          {/* Mobile-only background image (full bleed with overlay) */}
          <div
            className="block md:hidden absolute inset-0"
            style={{
              backgroundImage: "url('/hero-jantzen.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              opacity: 0.15,
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.72 0.12 25)",
              marginBottom: "1.25rem",
            }}>
              For Talented High School &amp; College Hitters
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              lineHeight: 1.08,
              color: "white",
              marginBottom: "1.25rem",
            }}>
              Overcoaching and social media have made you a worse hitter.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              marginBottom: "2rem",
            }}>
              Stop overthinking. Swing naturally.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }} className="sm:flex-row sm:w-auto">
              <button
                onClick={() => {
                  if (isUnlocked) {
                    window.location.href = "/drills";
                  } else {
                    setShowGate(true);
                  }
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
                  padding: "0.9rem 1.75rem",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  width: "100%",
                }}
                className="sm:w-auto"
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Unlock the Free 32-Drill Framework →
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
                  width: "100%",
                }}
                className="sm:w-auto"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => { window.trackEvent?.("watch_video_click", { location: "hero" }); window.location.href = "/apply"; }}
                >
                  Watch the Video
              </button>
            </div>
            {/* Transitional CTA — for the buyer who's already sold */}
            <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: "0.6rem" }}>
                Want a plan built around your specific flaws?
              </p>
              <a
                href="/apply"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                Apply for a Strategy Session →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER ─────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.12 0.005 65)", padding: "0", overflow: "hidden", borderTop: "1px solid oklch(0.20 0.005 65)", borderBottom: "1px solid oklch(0.20 0.005 65)" }}>
        <div style={{
          display: "flex",
          animation: "ticker 28s linear infinite",
          whiteSpace: "nowrap",
        }}>
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", alignItems: "center", gap: "0", flexShrink: 0 }}>
              {              [
                { name: "Parker Sobiesiak", result: "JUCO → 4-Year Scholarship", stat: ".209 → .421 AVG in Conference" },
                { name: "Brady Lester", result: "NAIA → Ohio State University", stat: ".337 AVG · 10 HR · 49 RBI" },
                { name: "Dominic", result: "Cal → Arizona State (D1)", stat: ".220/4 HR → .275/10 HR" },
                { name: "Hudson Sharp", result: "High School", stat: ".385 Season · .550 District · 39 Hits" },
                { name: "Saul Trevino", result: "JUCO → Oklahoma Wesleyan University", stat: ".407 AVG · 1.140 OPS · LD% 41→57" },
                { name: "Sam Campin", result: "JUCO", stat: "91 → 94 EV · +4-6 MPH" },
                { name: "Spencer Dailey", result: "D3 P.O. → Upper Iowa University", stat: "+5 MPH Bat Speed" },
                { name: "Brooks Burdine", result: "Zero Offers → Air Force Academy (D1)", stat: "MLB Draft Letters" },
                { name: "Tony Woodie", result: "P.O. → Single Season HR & RBI Record Holder", stat: "3 HR → 10 HR" },
                { name: "Max Fraizer", result: "High School", stat: "87 MPH EV PR → Beat It Week 2" },
                { name: "Chase Wells", result: "Indy Ball → Detroit Tigers", stat: "" },
                { name: "Daunte Stuart", result: "Indy Ball → Philadelphia Phillies", stat: "4 HR in 6 Games" },
                { name: "Teddy Stephenson", result: "HS → University of the Holy Cross", stat: "" },
              ].map(({ name, result, stat }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "0.85rem 2.5rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>{name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)" }}>{result}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>{stat}</span>
                  <span style={{ color: "oklch(0.42 0.18 25)", fontSize: "0.6rem" }}>·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── CREDIBILITY BRIDGE ───────────────────────────────── */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "2rem", alignItems: "stretch" }}>
            {/* LEFT — Photo stack — stretches to match copy column height */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ position: "relative", flex: "1 1 auto" }}>
                <img
                  src="/jantzen-young.jpg"
                  alt="Young Jantzen Witte at Perfect Game tournament"
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "top", minHeight: "280px" }}
                />
                <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(8,8,8,0.75)", padding: "0.4rem 0.75rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: 0 }}>Perfect Game Tournament · 2007</p>
                </div>
              </div>
              <div style={{ position: "relative", flex: "1 1 auto" }}>
                <img
                  src="/jantzen-japan.jpg"
                  alt="My first major league home run with the Seibu Lions"
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "top", minHeight: "200px" }}
                />
                <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(8,8,8,0.75)", padding: "0.4rem 0.75rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: 0 }}>My first major league home run · Seibu Lions</p>
                </div>
              </div>
            </div>
            {/* RIGHT — Copy */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem" }}>
                Coached By Someone Who Lived It
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "1.25rem" }}>
                I was doing the same thing you're doing right now.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "1rem" }}>
                Trying every drill I saw on Instagram. Every new video created a new problem. I had more to think about, not less. I had to learn how to simplify.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "1rem" }}>
                These 32 drills were the start — they helped me turn off my brain and let my natural swing come out.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.8, color: "oklch(0.12 0.005 65)", marginBottom: "0.5rem" }}>
                12 years. 5 organizations. 1 College World Series. 1 major league season.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "1.5rem" }}>
                And I still had to unlearn everything. That's why I built the 90 Day Athlete Accelerator. I teach the method that took me from thinking about 7 different things in the box — stay back, stay inside, get a good pitch, be on time, stay closed, stay through — to focusing on the ball and what I wanted to do with it.
              </p>
              <div style={{ backgroundColor: "oklch(0.96 0.005 80)", padding: "1.75rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", lineHeight: 0.8, color: "oklch(0.82 0.005 80)", fontStyle: "italic", marginBottom: "1rem" }}>&ldquo;</div>
                <blockquote style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.45, marginBottom: "1rem" }}>
                  Your swing used to be natural. Overcoaching and social media changed that.
                </blockquote>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)" }}>
                  — Jantzen Witte
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM (black chapter break) ───────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              The Problem
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "white", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              You're not consistent. And you need to be.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.65)" }}>
              The reason isn't your talent. It's that you've been chasing whatever drill you saw on Instagram last week instead of having a real plan — built by someone who has actually played where you want to go.
            </p>
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
                32 Drills. Designed to bring out your natural swing.
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
            const FREE_COUNT = 4;
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
                      You've seen 4 of {filteredDrills.length}.
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

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem", textAlign: "center" }}>
            Real Results
          </p>
          <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "white", lineHeight: 1.2, marginBottom: "3rem", textAlign: "center" }}>
            What players and parents are saying.
          </h2>
          <div className="grid md:grid-cols-3" style={{ gap: "1px", backgroundColor: "oklch(0.18 0.005 65)" }}>
            {[
              {
                quote: "In game so far I'm hitting .497 with 8 doubles, 4 HRs, and 24 RBIs in just 16 games. Having a coach like Jantzen in your corner giving you big league drills and cues is a true gamechanger.",
                name: "Alex Martinez",
                tag: "Player",
              },
              {
                quote: "He doesn't change you — he just makes you better. Completely changed my game. After working with him I had one of my best hitting seasons.",
                name: "Benjamin Wallace",
                tag: "Player",
              },
              {
                quote: "Cade led his team with a .474 average. If you're a parent weighing the options of who to have coach your son, Jantzen is your guy — endlessly positive, adaptable, and committed.",
                name: "Cade's Mom",
                tag: "Parent",
              },
            ].map(({ quote, name, tag }) => (
              <div key={name} style={{ backgroundColor: "oklch(0.12 0.005 65)", padding: "2rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", lineHeight: 0.8, color: "oklch(0.42 0.18 25)", fontStyle: "italic", marginBottom: "1rem" }}>&ldquo;</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "28px", height: "28px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.75rem", color: "white" }}>{name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "white", margin: 0 }}>{name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", margin: 0 }}>{tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* ── FOR YOU / NOT FOR YOU ─────────────────────────── */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "2.5rem", textAlign: "center" }}>
              These drills are built for talented players who are ready to stop thinking about mechanics every swing they take.
            </h2>
            <div className="grid md:grid-cols-2" style={{ gap: "2rem" }}>
              <div style={{ borderTop: "3px solid oklch(0.42 0.18 25)", paddingTop: "1.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1.25rem" }}>This is for you if...</p>
                {[
                  "You're already putting in the work but it's not translating to games.",
                  "You know you have the talent to play at the next level but feel stuck.",
                  "You're tired of every coach giving you conflicting advice.",
                  "You want a personalized plan, not generic team advice.",
                  "You're coachable and ready to trust a simplified, proven system.",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem", alignItems: "flex-start" }}>
                    <span style={{ color: "oklch(0.42 0.18 25)", fontSize: "0.9rem", flexShrink: 0, marginTop: "2px" }}>✓</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.35 0.01 65)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "3px solid oklch(0.88 0.005 80)", paddingTop: "1.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.65 0.008 65)", marginBottom: "1.25rem" }}>This is NOT for you if...</p>
                {[
                  "You need constant motivation just to show up to practice.",
                  "You want a magic drill that fixes everything overnight.",
                  "You're not willing to unlearn bad habits and trust the process.",
                  "You want generic, cookie-cutter advice instead of an individual plan.",
                  "You blame external factors instead of taking ownership of your results.",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem", alignItems: "flex-start" }}>
                    <span style={{ color: "oklch(0.75 0.005 65)", fontSize: "0.9rem", flexShrink: 0, marginTop: "2px" }}>✕</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.55 0.01 65)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA (black) ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              The 90 Day Athlete Accelerator
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "white", lineHeight: 1.2, marginBottom: "2rem" }}>
              Your window is closing.<br />Let's help you hit the ball harder, more often, with less effort — guaranteed.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: "1.5rem" }}>
              If you've made it this far, you already know something needs to change. Apply for a free strategy session. No pitch. No pressure. Just an honest look at what's happening with your swing and exactly what we need to do to fix it.
            </p>
            <p style={{ fontFamily: "'Playfair Display'", fontStyle: "italic", fontSize: "0.9rem", color: "oklch(0.72 0.12 25)", marginBottom: "2rem" }}>
              Backed by the +5 MPH Exit Velo Guarantee — or we work with you for free.
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
              onClick={() => {
                window.trackEvent?.("booking_click", { location: "home_cta" });
                window.location.href = "/apply";
              }}
            >
              Apply for a Strategy Session →
            </button>
          </div>
        </div>
      </section>

      {/* ── THE JOURNEY (Ichiro photo) ─────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="/jantzen-ichiro.jpg"
          alt="Jantzen Witte with Ichiro Suzuki at T-Mobile Park"
          style={{ width: "100%", display: "block", maxHeight: "520px", objectFit: "cover", objectPosition: "center 20%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.1) 100%)",
          display: "flex", alignItems: "flex-end",
        }}>
          <div className="container" style={{ paddingBottom: "3rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "0.5rem" }}>
              T-Mobile Park · Seattle Mariners
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "white", lineHeight: 1.4, maxWidth: "480px", margin: 0 }}>
              "The best hitters I ever played with all had one thing in common — they made it look effortless."
            </p>
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
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>BE THE BEST BASEBALL</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} Jantzen Witte. All rights reserved.
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
