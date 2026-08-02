/* ============================================================
   NATURAL SWING FRAMEWORK — Post-Unlock Funnel Page
   This is the page visitors land on AFTER submitting their email.
   Job: Take the energy of someone who just got the framework
   and channel it into a natural next step — booking a call.
   NO hard pitch. The call is framed as the logical continuation.
   ============================================================ */

import { useEffect, useState } from "react";
import DrillCard from "@/components/DrillCard";
import DrillModal from "@/components/DrillModal";
import { drills } from "@/lib/drills";
import type { Drill } from "@/lib/drills";

// ── 4-WEEK PROGRAM STRUCTURE ────────────────────────────────
const WEEK_PROGRAM = [
  {
    week: 2,
    title: "Bat Path Builder",
    emoji: "💪",
    intro: "Now that you've found your launch position, it's time to build the bat path that gets you there consistently. These four drills train your hands and barrel to work together — not fight each other. The goal this week is to feel the barrel staying through the zone longer.",
    drillSlugs: ["self-toss-fungo", "top-hand-drill", "recoil-drill", "step-back-drill"],
  },
  {
    week: 3,
    title: "Brain Off / Swing Natural",
    emoji: "🧠",
    intro: "This is the week most players skip — and it's the most important one. These drills are designed to get your brain out of the way. You've been thinking too much. These reps are about reacting, not processing. Do them fast. Don't overthink them. That's the whole point.",
    drillSlugs: ["rapid-fire-side-toss", "tracer-drill", "mcgwire-drill", "bat-drop-drill"],
  },
  {
    week: 4,
    title: "Put It Together",
    emoji: "🎯",
    intro: "Everything you've built over the last three weeks comes together here. These drills are about integration — taking what you've trained in the cage and making it feel like yours in the box. By the end of this week, your swing should feel like it belongs to you again.",
    drillSlugs: ["turn-the-corner-drill", "bottom-hand-drill", "step-back-drill-variation", "start-at-release-drill", "silent-swings"],
  },
];

// Helper: extract YouTube video ID from any YouTube URL
function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function WeekSection({ week, title, emoji, intro, drillSlugs, onDrillClick }: {
  week: number; title: string; emoji: string; intro: string;
  drillSlugs: string[]; onDrillClick: (d: Drill) => void;
}) {
  const weekDrills = drillSlugs
    .map((slug) => drills.find((d) => d.slug === slug))
    .filter(Boolean) as Drill[];

  return (
    <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
      <div className="container">
        {/* Week header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.5rem" }}>
            Week {week}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.1, marginBottom: "1rem" }}>
            {emoji} {title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "oklch(0.35 0.01 65)", maxWidth: "640px" }}>
            {intro}
          </p>
        </div>

        {/* Drills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {weekDrills.map((drill, i) => {
            const vidId = getYouTubeId(drill.videoUrl);
            return (
              <div key={drill.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem", alignItems: "start", paddingTop: i > 0 ? "2rem" : 0, borderTop: i > 0 ? "1px solid oklch(0.93 0.003 80)" : "none" }}>
                {/* Video */}
                <div>
                  {vidId ? (
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", backgroundColor: "oklch(0.08 0.005 65)", borderRadius: "2px" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1`}
                        title={drill.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: "16/9", backgroundColor: "oklch(0.93 0.003 80)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "oklch(0.55 0.01 65)", fontSize: "0.8rem" }}>Video coming soon</span>
                    </div>
                  )}
                </div>
                {/* Copy */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "oklch(0.92 0.003 80)", lineHeight: 1 }}>0{i + 1}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, margin: 0 }}>{drill.name}</h3>
                  </div>
                  {drill.tagline && (
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.95rem", color: "oklch(0.42 0.18 25)", marginBottom: "0.75rem" }}>{drill.tagline}</p>
                  )}
                  {drill.whatItIs && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "0.75rem" }}>{drill.whatItIs}</p>
                  )}
                  {drill.coachingCues && (
                    <div style={{ borderLeft: "3px solid oklch(0.42 0.18 25)", paddingLeft: "1rem", marginTop: "1rem" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.4rem" }}>Coaching Cue</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.9rem", color: "oklch(0.35 0.01 65)", margin: 0 }}>{drill.coachingCues}</p>
                    </div>
                  )}
                  <button
                    onClick={() => onDrillClick(drill)}
                    style={{ marginTop: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", background: "none", border: "1px solid oklch(0.42 0.18 25)", padding: "0.5rem 1rem", cursor: "pointer" }}
                  >
                    Full Drill Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
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

const CALL_STEPS = [
  {
    number: "01",
    title: "You send me a swing video",
    body: "Before the call, I look at your swings. Cage or game.",
  },
  {
    number: "02",
    title: "I tell you exactly what I see",
    body: "Not a list of 10 things. The one or two things that are actually limiting you. Most players have never heard this clearly before.",
  },
  {
    number: "03",
    title: "I prescribe your 3 drills",
    body: "Out of the 32 in the framework, I tell you which 3 are yours. The ones that will move the needle fastest for your specific swing.",
  },
  {
    number: "04",
    title: "If it makes sense, we talk about working together",
    body: "If after the call you want help implementing this over 90 days, I'll share what that looks like. No pressure. No pitch. You'll know if it's right.",
  },
];

export default function NaturalSwingUnlocked() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const firstName = localStorage.getItem("nsf_name") || localStorage.getItem("thl_name") || "";

  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookingUrl = "https://api.leadconnectorhq.com/widget/bookings/jantzen";

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.3s", backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid oklch(0.88 0.005 80)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <a href="/natural-swing" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem", color: "white", lineHeight: 1 }}>B</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.03em", lineHeight: 1.1 }}>BE THE BEST BASEBALL</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: "oklch(0.55 0.01 65)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
            </div>
          </a>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "oklch(0.42 0.18 25)", color: "white", padding: "0.55rem 1.1rem", textDecoration: "none" }}>
            Book Your Free Call →
          </a>
        </div>
      </nav>

      {/* ── WELCOME / BRIDGE HERO ────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", paddingTop: "calc(56px + 5rem)", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ maxWidth: "640px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              {firstName ? `You're in, ${firstName}.` : "You're in."} The framework is yours.
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, color: "white", marginBottom: "1.5rem" }}>
              32 drills is too many.<br />Let's find the ones best for you.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem" }}>
              The framework gives you everything. But having 32 drills without knowing which ones are yours is the same problem you already had — too much to think about.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem" }}>
              A free 20-minute swing call with me. You send a video. I watch it. I tell you the one or two things actually holding you back, and I prescribe your 3 drills from the library. That's it.
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "oklch(0.42 0.18 25)", color: "white", padding: "1rem 2.25rem", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Book Your Free 20-Minute Swing Call →
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 300, color: "rgba(255,255,255,0.3)", marginTop: "0.75rem" }}>
              No pitch. No pressure. Just an honest look at your swing.
            </p>
          </div>
          {/* YouTube video embed */}
          <div style={{ marginTop: "3.5rem", maxWidth: "640px" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "4px", backgroundColor: "oklch(0.08 0.005 65)" }}>
              <iframe
                src="https://www.youtube.com/embed/3kOn_Nmbmpk?rel=0&modestbranding=1"
                title="The Natural Swing Framework — How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS ON THE CALL ─────────────────────────── */}
      <section style={{ padding: "6rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.75rem" }}>
              What Happens on the Call
            </p>
            <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "3rem" }}>
              Four steps. Twenty minutes. A plan that's actually yours.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CALL_STEPS.map((step, i) => (
                <div key={step.number} className="reveal" style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "1.5rem", padding: "2rem 0", borderTop: "1px solid oklch(0.90 0.005 80)", borderBottom: i === CALL_STEPS.length - 1 ? "1px solid oklch(0.90 0.005 80)" : "none" }}>
                  <div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "oklch(0.92 0.003 80)", lineHeight: 1 }}>{step.number}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "0.75rem" }}>{step.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", margin: 0 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JANTZEN QUOTE ────────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", lineHeight: 0.8, color: "oklch(0.42 0.18 25)", fontStyle: "italic", marginBottom: "1.5rem" }}>&ldquo;</div>
            <blockquote className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.2rem, 3vw, 1.7rem)", color: "white", lineHeight: 1.45, marginBottom: "1.5rem" }}>
              Your swing used to be natural. Overcoaching and social media changed that. The call is where we figure out exactly what was taken from you — and how to get it back.
            </blockquote>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)" }}>— Jantzen Witte · 12-Year Pro</p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER ─────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.12 0.005 65)", overflow: "hidden", borderTop: "1px solid oklch(0.20 0.005 65)", borderBottom: "1px solid oklch(0.20 0.005 65)" }}>
        <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
              {[
                { name: "Parker Sobiesiak", result: "JUCO → 4-Year Scholarship" },
                { name: "Brady Lester", result: "NAIA → Ohio State University" },
                { name: "Saul Trevino", result: "JUCO → .407 AVG · 1.140 OPS" },
                { name: "Ryan Foster", result: "2 Hits All Last Spring → Barreling Every Game" },
                { name: "Tony Woodie", result: "P.O. → Single Season HR Record" },
                { name: "Chase Wells", result: "Indy Ball → Detroit Tigers" },
                { name: "Daunte Stuart", result: "Indy Ball → Philadelphia Phillies" },
                { name: "Julian Mercado", result: "JUCO All-Star & Home Run Derby" },
                { name: "Luke Hargis", result: "Low 80s → 91 MPH Exit Velo" },
                { name: "Brooks Burdine", result: "Zero Offers → Air Force Academy (D1)" },
              ].map(({ name, result }) => (
                <div key={`${copy}-${name}`} style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "0.85rem 2.5rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>{name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)" }}>{result}</span>
                  <span style={{ color: "oklch(0.42 0.18 25)", fontSize: "0.6rem" }}>·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── THE DRILL LIBRARY (full 32) ──────────────────────── */}
      {/* ── WEEK 1 REMINDER ─────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.97 0.003 80)", padding: "3rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.5rem" }}>
            Start Here
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Week 1 — Find Your Launch Position
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "oklch(0.45 0.01 65)", lineHeight: 1.7, maxWidth: "600px", marginBottom: "1.5rem" }}>
            Everyone starts with the same four drills. Piggyback, Wiffle Ball, Happy Gilmore, and the Ali Drill. These are your foundation. Don't skip ahead until these feel natural.
          </p>
          <a href="/natural-swing#week1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", textDecoration: "none", borderBottom: "1px solid oklch(0.42 0.18 25)", paddingBottom: "2px" }}>
            ← Back to Week 1 drills
          </a>
        </div>
      </section>

      {/* ── WEEKS 2, 3, 4 ───────────────────────────────────── */}
      {WEEK_PROGRAM.map((w) => (
        <WeekSection
          key={w.week}
          week={w.week}
          title={w.title}
          emoji={w.emoji}
          intro={w.intro}
          drillSlugs={w.drillSlugs}
          onDrillClick={setSelectedDrill}
        />
      ))}

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "7rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "540px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.25rem" }}>
              The Next Step
            </p>
            <h2 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "white", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              You have the framework.<br />Now let's find your three drills.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>
              20 minutes. Free. Send a swing video beforehand and I'll come prepared with exactly what I see and exactly what to do about it.
            </p>
            <p style={{ fontFamily: "'Playfair Display'", fontStyle: "italic", fontSize: "0.9rem", color: "oklch(0.72 0.12 25)", marginBottom: "2rem" }}>
              Backed by the +5 MPH Exit Velo Guarantee — or we work with you for free until you get there.
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "oklch(0.42 0.18 25)", color: "white", padding: "1rem 2.25rem", textDecoration: "none", transition: "opacity 0.2s", marginBottom: "1rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Book Your Free Swing Call →
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 300, color: "rgba(255,255,255,0.25)", margin: 0 }}>
              No pitch. No pressure. Just an honest look at your swing.
            </p>
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

      {selectedDrill && <DrillModal drill={selectedDrill} onClose={() => setSelectedDrill(null)} />}
    </div>
  );
}
