/* ============================================================
   NATURAL SWING FRAMEWORK — Lead Magnet Page
   Brand: Jantzen Witte / Be The Best Baseball
   Design: Matches existing site (Sports Illustrated × Players Tribune)
   Strategy: Story-first, minimal CTA, value-first funnel
   Russell Brunson / Hormozi / Haynes principles:
   - Hook → Story → Offer
   - Give the framework FIRST, pitch the call AFTER unlock
   - One job per page: lead magnet page = get the email
   ============================================================ */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const OPTIN_ENDPOINT = "/.netlify/functions/optin";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const SOCIAL_PROOF = [
  { name: "Parker Sobiesiak", result: "JUCO → 4-Year Scholarship", stat: ".209 → .421 AVG" },
  { name: "Brady Lester", result: "NAIA → Ohio State University", stat: ".337 AVG · 10 HR · 49 RBI" },
  { name: "Saul Trevino", result: "JUCO → Oklahoma Wesleyan University", stat: ".407 AVG · 1.140 OPS" },
  { name: "Ryan Foster", result: "D2 · University of Jamestown", stat: "2 Hits All Last Spring → Barreling Every Game" },
  { name: "Tony Woodie", result: "P.O. → Single Season HR Record Holder", stat: "3 HR → 10 HR" },
  { name: "Chase Wells", result: "Indy Ball → Detroit Tigers", stat: "" },
  { name: "Daunte Stuart", result: "Indy Ball → Philadelphia Phillies", stat: "4 HR in 6 Games" },
  { name: "Julian Mercado", result: "JUCO All-Star & Home Run Derby", stat: "" },
  { name: "Luke Hargis", result: "High School", stat: "Low 80s → 91 MPH EV" },
  { name: "Spencer Dailey", result: "D3 P.O. → Upper Iowa University", stat: "+5 MPH Bat Speed" },
  { name: "Brooks Burdine", result: "Zero Offers → Air Force Academy (D1)", stat: "" },
  { name: "Alex Martinez", result: "High School", stat: ".497 AVG · 8 2B · 4 HR · 24 RBI in 16 Games" },
  { name: "Dom", result: "Cal → Arizona State (D1)", stat: ".220/4 HR → .275/10 HR" },
  { name: "Brady Greene", result: "High School", stat: "Best Swing of His Life" },
  { name: "Caden Niederhaus", result: "High School", stat: ".220 → .400+ AVG" },
  { name: "Sam Campin", result: "JUCO", stat: "91 → 94 EV · +4-6 MPH" },
];

const FRAMEWORK_PILLARS = [
  {
    number: "01",
    title: "Why You Lost It",
    body: "You had a good swing when you were younger. Before the coaches, before the Instagram videos, before someone told you to stay inside the ball, keep your shoulder in, load your hips, stay back. Every cue they added took something away. The problem was never your talent. It was the noise.",
    quote: "The best hitters I played with all had one thing in common — they made it look effortless.",
  },
  {
    number: "02",
    title: "What Athletic Actually Means",
    body: "Athletic isn't a body type. It's a state of mind in the box. It means your brain is quiet and your body is free. It means you're reacting to the ball, not thinking about your hands. Every drill in this framework is designed to get you back to that state — not by adding mechanics, but by removing the ones that don't belong.",
    quote: null,
  },
  {
    number: "03",
    title: "The Three Things That Actually Matter",
    body: "After 12 years and 5 organizations, it comes down to three things: getting to your launch position, trusting your timing, and getting to your best finish. Everything else is noise. The 32 drills in this framework are organized around these three principles. Not 32 different things to think about — 32 ways to feel the same three things.",
    quote: null,
  },
  {
    number: "04",
    title: "The Drills Are the Practice, Not the Swing",
    body: "This is the part most players miss. The drills don't go with you into the box. They go in the cage, in practice, in your warmup. They're the reps that rewire your body so that when you step in the box, you don't have to think. You just hit. That's the whole system. We want the work in the cage to blend into your natural swing.",
    quote: null,
  },
];

export default function NaturalSwing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => !!localStorage.getItem("nsf_unlocked"));
  const [, setLocation] = useLocation();

  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowGate(false);
    setLocation("/natural-swing/unlocked");
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .pillar-hover:hover {
          background-color: oklch(0.985 0.003 80);
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.3s",
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.88 0.005 80)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <a href="/natural-swing" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", backgroundColor: scrolled ? "oklch(0.42 0.18 25)" : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.3s", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem", color: scrolled ? "white" : "oklch(0.42 0.18 25)", lineHeight: 1, transition: "color 0.3s" }}>B</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: scrolled ? "oklch(0.12 0.005 65)" : "white", letterSpacing: "0.03em", lineHeight: 1.1, transition: "color 0.3s" }}>BE THE BEST BASEBALL</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: scrolled ? "oklch(0.55 0.01 65)" : "rgba(255,255,255,0.55)", letterSpacing: "0.2em", textTransform: "uppercase", transition: "color 0.3s" }}>Jantzen Witte</div>
            </div>
          </a>
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "1.5rem" }}>
            <a href="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: scrolled ? "oklch(0.12 0.005 65)" : "rgba(255,255,255,0.85)", textDecoration: "none" }}>
              Drill Library
            </a>
            <button
              onClick={() => setShowGate(true)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "oklch(0.42 0.18 25)", color: "white", padding: "0.55rem 1.1rem", border: "none", cursor: "pointer" }}
            >
              Get the Framework →
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", padding: "8px", color: scrolled ? "oklch(0.12 0.005 65)" : "white" }} aria-label="Menu">
            <div style={{ width: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "1.5px", backgroundColor: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", height: "1.5px", backgroundColor: "currentColor", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: "1.5px", backgroundColor: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </div>
          </button>
        </div>
        {menuOpen && (
          <div style={{ backgroundColor: "white", borderTop: "1px solid oklch(0.88 0.005 80)", padding: "1.25rem 0" }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <a href="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.12 0.005 65)", textDecoration: "none" }}>Drill Library</a>
              <button onClick={() => { setMenuOpen(false); setShowGate(true); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>Get the Framework →</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ minHeight: "100svh", display: "flex", flexDirection: "row" }}>
        {/* LEFT — Photo */}
        <div className="hidden md:block" style={{ flex: "0 0 45%", backgroundImage: "url('/hero-jantzen.jpg')", backgroundSize: "cover", backgroundPosition: "center top", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, oklch(0.10 0.005 65) 100%)" }} />
        </div>
        {/* RIGHT — Copy */}
        <div style={{ flex: "1 1 55%", backgroundColor: "oklch(0.10 0.005 65)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(3rem, 8vw, 6rem) clamp(2rem, 6vw, 5rem)", position: "relative" }}>
          <div className="block md:hidden absolute inset-0" style={{ backgroundImage: "url('/hero-jantzen.jpg')", backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.15 }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              For Overlooked Hitters — JUCO · NAIA · Indy Ball · High School
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.08, color: "white", marginBottom: "1.25rem" }}>
              You had a good swing once.<br />Let's get it back.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "2rem" }}>
              The Natural Swing Framework — a free guide to becoming athletic in the box again, built from 12 years of pro ball and 75+ players coached back to themselves.
            </p>
            <button
              onClick={() => setShowGate(true)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "oklch(0.42 0.18 25)", color: "white", border: "none", padding: "0.9rem 1.75rem", cursor: "pointer", transition: "opacity 0.2s", width: "100%" }}
              className="sm:w-auto"
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Get the Free Natural Swing Framework →
            </button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 300, color: "rgba(255,255,255,0.35)", marginTop: "0.75rem" }}>
              Free. No credit card. No catch. Just the framework.
            </p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER ─────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.12 0.005 65)", overflow: "hidden", borderTop: "1px solid oklch(0.20 0.005 65)", borderBottom: "1px solid oklch(0.20 0.005 65)" }}>
        <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
              {SOCIAL_PROOF.map(({ name, result, stat }) => (
                <div key={`${copy}-${name}`} style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "0.85rem 2.5rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>{name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)" }}>{result}</span>
                  {stat && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>{stat}</span>}
                  <span style={{ color: "oklch(0.42 0.18 25)", fontSize: "0.6rem" }}>·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY — The Origin ──────────────────────────────── */}
      <section style={{ padding: "6rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "3rem", alignItems: "start" }}>
            {/* Photos */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ position: "relative" }}>
                <img src="/jantzen-young.jpg" alt="Young Jantzen Witte at Perfect Game tournament" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top", minHeight: "280px" }} />
                <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(8,8,8,0.75)", padding: "0.4rem 0.75rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: 0 }}>Perfect Game Tournament · 2007</p>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <img src="/jantzen-japan.jpg" alt="Jantzen Witte with the Seibu Lions" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top", minHeight: "200px" }} />
                <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(8,8,8,0.75)", padding: "0.4rem 0.75rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: 0 }}>First Major League Home Run · Seibu Lions</p>
                </div>
              </div>
            </div>
            {/* Story copy */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem" }}>
                The Story Behind the Framework
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                I was a 12-year pro who had to unlearn almost everything.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", marginBottom: "1.25rem" }}>
                I played 12 years. Five organizations. One College World Series. One major league season in Japan. And somewhere in the middle of all that, I made the same mistake every player I now coach has made — I started thinking too much.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", marginBottom: "1.25rem" }}>
                Stay back. Stay inside. Load your hips. Get your front side out. Keep your shoulder in. I had seven things to think about before the ball left the pitcher's hand. And the more I thought, the worse I hit.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", marginBottom: "1.25rem" }}>
                The hitters I watched who made it look easy weren't thinking about mechanics. They were athletes reacting to a ball. That's what I had been before the coaches got to me. That's what every one of my players was before the coaches got to them.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", marginBottom: "1.5rem" }}>
                The Natural Swing Framework is what I built to get back to that. It's what I've used with 75+ players — JUCO guys, indy ball guys, high school guys who were good enough but got buried under over-coaching. Every single one of them had a good swing before someone took it away.
              </p>
              <div style={{ backgroundColor: "oklch(0.96 0.005 80)", padding: "1.75rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", lineHeight: 0.8, color: "oklch(0.82 0.005 80)", fontStyle: "italic", marginBottom: "1rem" }}>&ldquo;</div>
                <blockquote style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  Your swing used to be natural. Overcoaching and social media changed that. This framework is how you get it back.
                </blockquote>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)" }}>— Jantzen Witte</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE REAL PROBLEM (black) ─────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "clamp(4rem, 8vw, 6rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p className="reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem", textAlign: "center" }}>
              The Real Problem
            </p>
            <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "white", lineHeight: 1.15, marginBottom: "1.5rem", textAlign: "center" }}>
              It's not that you don't work hard enough. It's that you're working on the wrong things.
            </h2>
            <p className="reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem" }}>
              Every hitter I've ever worked with was already putting in the reps. The problem wasn't effort. It was that the reps were reinforcing the wrong patterns — patterns that came from a coach who meant well, or a YouTube video that looked good, or a cue that worked for someone else's body.
            </p>
            <p className="reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem" }}>
              JUCO guys. Indy ball guys. High school guys who were all-conference two years ago and can't figure out what happened. They all have the same story: somewhere between 14 and now, someone convinced them that hitting was complicated. It's not.
            </p>
            <p className="reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.85, color: "rgba(255,255,255,0.85)" }}>
              The Natural Swing Framework is built around one idea: the fastest path back to being athletic in the box is removing what doesn't belong — not adding more.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FRAMEWORK PILLARS ────────────────────────────── */}
      <section style={{ padding: "6rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.75rem" }}>
              The Framework
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.1, maxWidth: "600px" }}>
              Four ideas that change everything about how you hit.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FRAMEWORK_PILLARS.map((pillar, i) => (
              <div
                key={pillar.number}
                className="reveal pillar-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  padding: "2.5rem 0",
                  borderTop: "1px solid oklch(0.90 0.005 80)",
                  borderBottom: i === FRAMEWORK_PILLARS.length - 1 ? "1px solid oklch(0.90 0.005 80)" : "none",
                  transition: "background-color 0.2s",
                  cursor: "default",
                }}
              >
                <div style={{ paddingTop: "0.25rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color: "oklch(0.92 0.003 80)", lineHeight: 1 }}>{pillar.number}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "1rem" }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", marginBottom: pillar.quote ? "1.25rem" : 0 }}>
                    {pillar.body}
                  </p>
                  {pillar.quote && (
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: "oklch(0.52 0.01 65)", borderLeft: "3px solid oklch(0.42 0.18 25)", paddingLeft: "1rem", margin: 0 }}>
                      "{pillar.quote}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF — What players said ─────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "clamp(4rem, 8vw, 6rem) 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem", textAlign: "center" }}>
            In Their Own Words
          </p>
          <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "white", lineHeight: 1.2, marginBottom: "3rem", textAlign: "center" }}>
            What happens when overlooked players become athletic again.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1px", backgroundColor: "oklch(0.18 0.005 65)" }}>
            {[
              {
                quote: "I stopped being a technician and started being an athlete. My swing hasn't felt like this ever before.",
                name: "Julian Mercado",
                tag: "JUCO All-Star · Home Run Derby",
              },
              {
                quote: "Every round I take, it just feels more natural, and I can just go up there with no doubt in my head.",
                name: "Luke Hargis",
                tag: "High School · +10 MPH Exit Velocity",
              },
              {
                quote: "In game I'm hitting .497 with 8 doubles, 4 HRs, and 24 RBIs in just 16 games. Having a coach like Jantzen giving you big league drills is a true gamechanger.",
                name: "Alex Martinez",
                tag: "High School",
              },
              {
                quote: "He doesn't change you — he just makes you better. After working with him I had one of my best hitting seasons.",
                name: "Benjamin Wallace",
                tag: "College Player",
              },
              {
                quote: "I went from 2 hits all last spring to barreling the ball every game. The confidence is different now.",
                name: "Ryan Foster",
                tag: "D2 · University of Jamestown",
              },
              {
                quote: "Swing confidence went from a 4/10 to an 8/10 in three weeks. I can self-correct now without needing a coach every time.",
                name: "Spencer Dailey",
                tag: "D3 P.O. → Upper Iowa University",
              },
            ].map(({ quote, name, tag }) => (
              <div key={name} style={{ backgroundColor: "oklch(0.12 0.005 65)", padding: "2rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", lineHeight: 0.8, color: "oklch(0.42 0.18 25)", fontStyle: "italic", marginBottom: "1rem" }}>&ldquo;</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: "1.5rem" }}>{quote}</p>
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

      {/* ── ICHIRO PHOTO BREAK ───────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img src="/jantzen-ichiro.jpg" alt="Jantzen Witte with Ichiro Suzuki at T-Mobile Park" style={{ width: "100%", display: "block", maxHeight: "480px", objectFit: "cover", objectPosition: "center 20%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.1) 100%)", display: "flex", alignItems: "flex-end" }}>
          <div className="container" style={{ paddingBottom: "3rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "0.5rem" }}>T-Mobile Park · Seattle Mariners</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "white", lineHeight: 1.4, maxWidth: "480px", margin: 0 }}>
              "The best hitters I ever played with all had one thing in common — they made it look effortless."
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN THE FRAMEWORK ──────────────────────────── */}
      <section style={{ padding: "6rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.75rem" }}>
              What You're Getting
            </p>
            <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              The Natural Swing Framework — free, complete, and built for players who are serious.
            </h2>
            <p className="reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", marginBottom: "2.5rem" }}>
              This isn't a highlight reel of drills. It's a system — the same one I use with every player I work with privately. The four-pillar framework above, plus 32 drills organized by what they fix, with video walkthroughs and coaching cues for each one. You get the whole thing, free, the moment you enter your email.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { label: "32 Drills", sub: "Standard + Water Bag — organized by what they fix" },
                { label: "Video Walkthroughs", sub: "Every drill has a YouTube video so you can see it in action" },
                { label: "Coaching Cues", sub: "The exact language I use with pro players — not generic tips" },
                { label: "The 4-Pillar Framework", sub: "The philosophy behind the drills so you understand why they work" },
              ].map(({ label, sub }) => (
                <div key={label} style={{ borderTop: "3px solid oklch(0.42 0.18 25)", paddingTop: "1.25rem" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.5rem" }}>{label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.45 0.01 65)", margin: 0 }}>{sub}</p>
                </div>
              ))}
            </div>
            {/* Email gate CTA */}
            <div style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "2.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "white", lineHeight: 1.4, marginBottom: "1.5rem" }}>
                Enter your email. Get the full framework — free.
              </p>
              <button
                onClick={() => setShowGate(true)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "oklch(0.42 0.18 25)", color: "white", border: "none", padding: "1rem 2.5rem", cursor: "pointer", transition: "opacity 0.2s", marginBottom: "1rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get the Free Natural Swing Framework →
              </button>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 300, color: "rgba(255,255,255,0.3)", margin: 0 }}>
              No spam. No credit card. Join 75+ players who've already used this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "oklch(0.10 0.005 65)", borderTop: "1px solid oklch(0.18 0.005 65)", padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "18px", height: "18px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.65rem", color: "white" }}>B</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>BE THE BEST BASEBALL</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} Jantzen Witte. All rights reserved.
          </span>
        </div>
      </footer>

      {/* ── EMAIL GATE MODAL ─────────────────────────────────── */}
      {showGate && <NaturalSwingGate onUnlock={handleUnlock} />}
    </div>
  );
}

/* ── EMAIL GATE COMPONENT ───────────────────────────────────── */
function NaturalSwingGate({ onUnlock }: { onUnlock: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) { setError("Please enter your first name."); return; }
    if (!lastName.trim()) { setError("Please enter your last name."); return; }
    if (!isValidEmail(email)) { setError("Please enter a valid email address."); return; }

    setLoading(true);
    setError("");

    try {
      await fetch(OPTIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          source: "Be The Best Baseball — Natural Swing Framework",
          tags: ["hitting-lab-lead", "natural-swing-framework"],
        }),
      });
    } catch {}

    localStorage.setItem("nsf_unlocked", "1");
    localStorage.setItem("nsf_name", firstName.trim());
    localStorage.setItem("nsf_email", email.trim());

    window.trackEvent?.("email_opt_in", { method: "natural_swing_gate", first_name: firstName.trim() });
    if (window.fbq) window.fbq("track", "Lead", { content_name: "Natural Swing Framework", content_category: "Baseball Hitting" });

    setLoading(false);
    onUnlock();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "oklch(0.08 0.005 65)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/hero-jantzen.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "440px", backgroundColor: "white", padding: "clamp(2rem, 6vw, 3rem)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
          <div style={{ width: "22px", height: "22px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.05em" }}>BE THE BEST BASEBALL</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", color: "oklch(0.55 0.01 65)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
          </div>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.5rem, 5vw, 2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          Get the Natural Swing Framework — free.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.7, color: "oklch(0.45 0.01 65)", marginBottom: "1.75rem" }}>
          32 drills, 4 framework pillars, and video walkthroughs — everything you need to become athletic in the box again.
        </p>
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { id: "nsf-first", label: "First Name", placeholder: "Ryan", value: firstName, onChange: setFirstName, autoComplete: "given-name" },
              { id: "nsf-last", label: "Last Name", placeholder: "Foster", value: lastName, onChange: setLastName, autoComplete: "family-name" },
            ].map(({ id, label, placeholder, value, onChange, autoComplete }) => (
              <div key={id} style={{ flex: 1 }}>
                <label htmlFor={id} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)", display: "block", marginBottom: "0.4rem" }}>{label}</label>
                <input id={id} type="text" required placeholder={placeholder} value={value} onChange={(e) => { onChange(e.target.value); if (error) setError(""); }} autoComplete={autoComplete}
                  style={{ width: "100%", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "oklch(0.12 0.005 65)", backgroundColor: "oklch(0.97 0.003 80)", border: "1px solid oklch(0.88 0.005 80)", borderRadius: 0, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.42 0.18 25)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.005 80)")}
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="nsf-email" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)", display: "block", marginBottom: "0.4rem" }}>Email Address</label>
            <input id="nsf-email" type="email" required placeholder="you@email.com" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }} autoComplete="email"
              style={{ width: "100%", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "oklch(0.12 0.005 65)", backgroundColor: "oklch(0.97 0.003 80)", border: "1px solid oklch(0.88 0.005 80)", borderRadius: 0, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.42 0.18 25)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.005 80)")}
            />
          </div>
          {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "oklch(0.42 0.18 25)", margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: loading ? "oklch(0.62 0.08 25)" : "oklch(0.42 0.18 25)", color: "white", border: "none", padding: "0.95rem 1.5rem", cursor: loading ? "not-allowed" : "pointer", transition: "background-color 0.2s, opacity 0.2s", marginTop: "0.25rem" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? "Unlocking..." : "Get the Free Framework →"}
          </button>
        </form>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", fontWeight: 300, color: "oklch(0.65 0.008 65)", marginTop: "1rem", textAlign: "center" }}>
        No spam. Unsubscribe anytime. Used by 75+ players.
        </p>
      </div>
    </div>
  );
}
