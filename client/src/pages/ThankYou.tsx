/* ============================================================
   THE HITTING LAB — Thank You Page (/thank-you)
   Shown after booking a Strategy Session
   Framework: Craig Ballantyne + Jeremy Haynes
   Goals:
   1. Confirm the booking and reduce no-shows
   2. Prime them for the sales conversation (pre-sell the program)
   3. Give them a "homework" assignment (watch the VSL, send swing video)
   4. Create urgency and social proof to prevent cold feet
   5. Introduce the parent to the program if they weren't on the booking
   ============================================================ */

import { useEffect } from "react";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export default function ThankYou() {
  useEffect(() => {
    window.trackEvent?.("booking_confirmed", { page: "/thank-you" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── MINIMAL NAV ─────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.88 0.005 80)", height: "56px",
        display: "flex", alignItems: "center",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem", color: "white", lineHeight: 1 }}>H</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.03em", lineHeight: 1.1 }}>THE HITTING LAB</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: "oklch(0.55 0.01 65)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
            </div>
          </a>
        </div>
      </nav>

      {/* ── CONFIRMATION HERO ───────────────────────────────── */}
      <section style={{ paddingTop: "80px", backgroundColor: "oklch(0.10 0.005 65)", paddingBottom: "4rem" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>

            {/* Confirmation checkmark */}
            <div style={{
              width: "64px", height: "64px",
              backgroundColor: "oklch(0.42 0.18 25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
              You're on the calendar
            </p>

            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, color: "white", marginBottom: "1.25rem",
            }}>
              Your Strategy Session<br />is confirmed.
            </h1>

            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)",
              fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
              maxWidth: "480px", margin: "0 auto 1rem",
            }}>
              Check your email for the calendar invite and Zoom link. Before we talk, there are three things I need you to do.
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: "1rem", color: "oklch(0.72 0.12 25)",
            }}>
              Do not skip these. They will make our session 10x more valuable.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3 THINGS TO DO BEFORE THE CALL ─────────────────── */}
      {/* Jeremy Haynes framework: pre-sell, prime, and pre-qualify */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem", textAlign: "center" }}>
              Before Our Call
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.15, marginBottom: "3rem", textAlign: "center" }}>
              3 things to do right now.
            </h2>

            {/* Step 1 */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", alignItems: "flex-start" }}>
              <div style={{
                width: "48px", height: "48px", flexShrink: 0,
                backgroundColor: "oklch(0.42 0.18 25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "white" }}>1</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.5rem" }}>
                  Watch this video before we talk.
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "1rem" }}>
                  This 60-second video explains exactly how The Hitting Lab works and what we're going to build together. It will answer most of your questions before the call and make our time together much more productive.
                </p>
                {/* Short VSL embed */}
                <div style={{ position: "relative", paddingBottom: "56.25%", backgroundColor: "#000" }}>
                  <iframe
                    src="https://www.youtube.com/embed/j4X1SbLVQMk?rel=0&modestbranding=1"
                    title="How The Hitting Lab Works — Jantzen Witte"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", alignItems: "flex-start" }}>
              <div style={{
                width: "48px", height: "48px", flexShrink: 0,
                backgroundColor: "oklch(0.12 0.005 65)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "white" }}>2</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.5rem" }}>
                  Send me a game swing video.
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "0.75rem" }}>
                  Before our call, I want to see your actual game swing — not a cage swing. A game swing is where the truth lives. Send it to me at:
                </p>
                <a
                  href="https://instagram.com/jantzenwitte"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    backgroundColor: "oklch(0.42 0.18 25)", color: "white",
                    padding: "0.75rem 1.5rem", textDecoration: "none",
                  }}
                >
                  DM on Instagram @jantzenwitte →
                </a>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "oklch(0.55 0.01 65)", marginTop: "0.75rem" }}>
                  Or email it to: [your email here]
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
              <div style={{
                width: "48px", height: "48px", flexShrink: 0,
                backgroundColor: "oklch(0.12 0.005 65)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "white" }}>3</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.5rem" }}>
                  If you're a parent, read this.
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "0.75rem" }}>
                  I know you've invested a lot in your son's development — travel ball, private lessons, tournaments. I respect that. On our call, I'm going to show you exactly what we do differently, why it works when everything else hasn't, and what the path forward looks like.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)" }}>
                  <strong style={{ fontWeight: 600, color: "oklch(0.12 0.005 65)" }}>Please be on the call.</strong> The decisions we make together will directly impact your son's career. I want you in the room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ON THE CALL ──────────────────────── */}
      {/* Ballantyne: set expectations, reduce anxiety, prime for yes */}
      <section style={{ backgroundColor: "oklch(0.96 0.005 80)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem" }}>
              What to Expect
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Here's exactly what happens<br />on our call.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)", marginBottom: "2.5rem" }}>
              This is not a sales pitch. I'm going to ask you questions, listen to what's happening, and give you an honest assessment of what needs to change. If I think the 90 Day Athlete Accelerator is the right fit, I'll explain exactly how it works. If it's not the right fit, I'll tell you that too.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px", backgroundColor: "oklch(0.88 0.005 80)", textAlign: "left" }}>
              {[
                { time: "0–5 min", label: "Introductions & Goals", desc: "I learn exactly where the player is and where they want to go." },
                { time: "5–15 min", label: "Swing Analysis", desc: "We review the game swing video you sent and I tell you exactly what I see." },
                { time: "15–25 min", label: "The Plan", desc: "I walk you through the specific drills and approach we'd use in the first 30 days." },
                { time: "25–30 min", label: "Next Steps", desc: "If it's a fit, we talk about how to get started. No pressure, no tricks." },
              ].map(({ time, label, desc }) => (
                <div key={label} style={{ backgroundColor: "white", padding: "1.5rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "0.4rem" }}>{time}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.4rem" }}>{label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.6, color: "oklch(0.45 0.01 65)", margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / RESULTS ──────────────────────────── */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem", textAlign: "center" }}>
              The Results
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "2.5rem", textAlign: "center" }}>
              Players who trusted the process.
            </h2>

            <div style={{ display: "grid", gap: "1px", backgroundColor: "oklch(0.88 0.005 80)" }}>
              {[
                {
                  name: "Brady Lester",
                  result: "D3 (Mount Union) → Big 10 (Ohio State)",
                  stats: ".337 AVG · 10 HR · 49 RBI · First Team All-OAC",
                  quote: "I stopped overthinking and just started hitting. The results followed.",
                },
                {
                  name: "Brooks Burdine",
                  result: "Zero offers → D1 (Air Force Academy)",
                  stats: "Uncommitted in high school → Starting freshman at Air Force",
                  quote: "Jantzen showed me exactly what was holding me back. Once I fixed it, everything changed.",
                },
                {
                  name: "Dominic",
                  result: "Cal → Arizona State (PAC 12)",
                  stats: ".276 AVG · 10 HR · Power numbers up significantly",
                  quote: "The simplicity of the approach is what makes it work. Less thinking, more hitting.",
                },
              ].map(({ name, result, stats, quote }) => (
                <div key={name} style={{ backgroundColor: "white", padding: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "oklch(0.12 0.005 65)", margin: 0 }}>{name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", margin: 0 }}>{result}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 400, color: "oklch(0.52 0.01 65)", marginBottom: "0.75rem" }}>{stats}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.95rem", color: "oklch(0.35 0.01 65)", lineHeight: 1.6, margin: 0 }}>"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE REMINDER ──────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.42 0.18 25)", padding: "3rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1rem, 3vw, 1.5rem)", color: "white", lineHeight: 1.5, marginBottom: "0.75rem" }}>
              "We guarantee +5 MPH to your exit velocity in 30 days — or we work with you for free until you do."
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              — Jantzen Witte, Founder · The Hitting Lab
            </p>
          </div>
        </div>
      </section>

      {/* ── URGENCY / NO-SHOW PREVENTION ────────────────────── */}
      {/* Ballantyne: remind them why they booked, reinforce commitment */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "white", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              You booked this call for a reason.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem" }}>
              Something isn't working. You know it. The overthinking, the inconsistency, the gap between what you can do in the cage and what you do in games — it's real, and it's costing you.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: "2rem" }}>
              Show up to this call ready to be honest about where you are and serious about where you want to go. That's all I ask.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: "oklch(0.72 0.12 25)" }}>
              See you on the call. — Jantzen
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "oklch(0.10 0.005 65)", borderTop: "1px solid oklch(0.18 0.005 65)", padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "18px", height: "18px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.65rem", color: "white" }}>H</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>THE HITTING LAB</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} Jantzen Witte. All rights reserved.
          </span>
        </div>
      </footer>

    </div>
  );
}
