/* ============================================================
   BE THE BEST BASEBALL — Thank You / Confirmation Page (/thank-you)
   Shown after booking a Strategy Session via GHL calendar
   Framework: Jeremy Haynes Confirmation Page System
   Goals:
   1. Confirm the booking — validate the action, no friction
   2. Urgency video — give believable reasons to show up
   3. Pre-call homework — watch VSL, send swing video
   4. What to expect on the call — reduce anxiety, increase show rate
   5. Breakout objection-handling — answer questions before the call
   6. Social proof from bookers — reinforce the decision
   7. Easy reschedule — prevent ghosting
   Meta Pixel: fires Schedule event on load
   ============================================================ */

import { useEffect } from "react";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYou() {
  useEffect(() => {
    window.trackEvent?.("booking_confirmed", { page: "/thank-you" });
    window.scrollTo(0, 0);
    // Fire Meta Pixel Schedule event — booking confirmed
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Schedule", {
        content_name: "Hitting Strategy Session",
        content_category: "Baseball Coaching",
      });
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>

      {/* ── MINIMAL NAV ─────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e8e4de", height: "56px",
        display: "flex", alignItems: "center",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#111111", lineHeight: 1 }}>B</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.8rem", color: "#111111", letterSpacing: "0.05em", lineHeight: 1.1 }}>BE THE BEST BASEBALL</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: "#999999", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
            </div>
          </a>
        </div>
      </nav>

      {/* ── URGENCY VIDEO (first thing they see per Haynes) ─── */}
      <section style={{ paddingTop: "56px" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.72 0.12 25)",
              textAlign: "center",
              marginBottom: "1rem",
            }}>
              Watch This First
            </p>

            {/* Video embed — DXRYhj2T09Y */}
            <div style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              backgroundColor: "#000",
            }}>
              <iframe
                src="https://www.youtube.com/embed/DXRYhj2T09Y?autoplay=1&rel=0&modestbranding=1"
                title="Watch Before Your Strategy Session"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 300,
              color: "#aaaaaa",
              textAlign: "center",
              marginTop: "0.75rem",
            }}>
              This video explains exactly what we'll cover on the call and why showing up will change your season.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONFIRMATION HERO ───────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem, 6vw, 4rem) 0 0" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "#f5f4f0",
              border: "1px solid oklch(0.42 0.18 25)",
              padding: "0.4rem 1rem", marginBottom: "1.5rem",
            }}>
              <span style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.9rem" }}>✓</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)" }}>
                Your Session Is Booked
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              lineHeight: 1.1,
              color: "#111111",
              marginBottom: "1rem",
            }}>
              You made the right call.<br />Here's what happens next.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#555555",
              maxWidth: "520px",
              margin: "0 auto",
            }}>
              Check your email for your calendar invite. Complete the 3 steps below before we talk — it'll make our session 10x more valuable.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3 THINGS TO DO BEFORE THE CALL ─────────────────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem", textAlign: "center" }}>
              Before The Call
            </p>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              color: "#111111",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
              textAlign: "center",
            }}>
              3 things that will make our session<br />worth 10x more.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                {
                  number: "01",
                  title: "Watch the video above",
                  body: "It's short. It explains exactly how the 90 Day Athlete Accelerator works, who it's for, and what changes in 90 days. You'll get more out of the call if you've seen it.",
                },
                {
                  number: "02",
                  title: "Send us a game swing video",
                  body: "Send us a video of you hitting — cage or game, doesn't matter. This lets us come to the call with specific feedback on your swing instead of starting from scratch.",
                  link: "https://tally.so/r/lb5WQv",
                  linkText: "Submit Your Swing Video →",
                },
                {
                  number: "03",
                  title: "Have a parent on the call",
                  body: "We need the financially responsible party present. If a parent can't make it, reach out and we'll find a time that works for everyone. This isn't a sales call — it's a plan. But we need the right people in the room.",
                },
              ].map(({ number, title, body, link, linkText }: { number: string; title: string; body: string; link?: string; linkText?: string }) => (
                <div key={number} style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "2rem 0",
                  borderBottom: "1px solid #e8e4de",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "oklch(0.42 0.18 25)",
                    lineHeight: 1,
                    flexShrink: 0,
                    width: "60px",
                  }}>
                    {number}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#111111", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.8, color: "#666666", margin: 0 }}>
                      {body}
                    </p>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "1rem",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          backgroundColor: "oklch(0.42 0.18 25)",
                          color: "white",
                          padding: "0.7rem 1.25rem",
                          textDecoration: "none",
                        }}
                      >
                        {linkText}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ON THE CALL ──────────────────────── */}
      <section style={{ backgroundColor: "#f5f4f0", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem", textAlign: "center" }}>
              What Happens On The Call
            </p>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              color: "#111111",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
              textAlign: "center",
            }}>
              No pitch. No pressure.<br />Just a plan.
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "#e8e4de" }}>
              {[
                {
                  step: "First 5 min",
                  title: "We get to know each other",
                  body: "I learn what you’ve tried in the past. What has worked and what hasn’t. No judgment — just context so I can actually help.",
                },
                {
                  step: "Next 10 min",
                  title: "We look at your swing",
                  body: "We take a look at your swing and find the gaps we need to work through. Specific, honest feedback — not generic cues.",
                },
                {
                  step: "Next 10 min",
                  title: "We build your plan",
                  body: "We build your plan of what to work on and how. Simple, repeatable, built around your natural swing.",
                },
                {
                  step: "Final 5 min",
                  title: "We decide together",
                  body: "If the 90 Day Athlete Accelerator is the right fit, we’ll talk about it. If it’s not, we’ll tell you that too. No pressure either way.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} style={{ backgroundColor: "#ffffff", padding: "2rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "0.75rem" }}>
                    {step}
                  </p>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#111111", marginBottom: "0.6rem", lineHeight: 1.2 }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.8, color: "#777777", margin: 0 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF — BOOKER TESTIMONIALS ──────────────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem", textAlign: "center" }}>
              They Were Where You Are
            </p>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              color: "#111111",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
              textAlign: "center",
            }}>
              Players who booked a call<br />and showed up.
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "#e8e4de" }}>
              {[
                {
                  quote: "It's not just drills. We talk through my approach, my swing thoughts, and the mental side of hitting. Witte's experience shows in everything he does.",
                  name: "Brady Lester",
                  tag: "NAIA → Ohio State University · .337 AVG · 10 HR · 49 RBI",
                },
                {
                  quote: "I was so far down in the dumps and I found you as a resource. This is really life-changing. Finished .350 avg, .421 in conference, .468 OBP, .614 SLG. Earned a 4-year scholarship.",
                  name: "Parker Sobiesiak",
                  tag: "JUCO → 4-Year Scholarship",
                },
                {
                  quote: "Before working with Jantzen, I felt tight and unable to get a good, hard, competitive swing. I definitely felt like I was put into better positions to attack the ball and do damage on mistake pitches.",
                  name: "Chase Wells",
                  tag: "Indy Ball → Detroit Tigers",
                },
                {
                  quote: "I feel a million times better than I did before. Honestly, it was a dark spot for me. Confidence wasn't there at all. But I just feel a million times better. And it's not only baseball — this has helped a lot with me.",
                  name: "Teddy Stephenson",
                  tag: "HS → University of the Holy Cross",
                },
                {
                  quote: "Got my feels back in one session.",
                  name: "Brooks Burdine",
                  tag: "Zero Offers → Air Force Academy (D1) + MLB Draft Letters",
                },
                {
                  quote: "His approach is spot on — he tailors the program to the individual. He takes the player's natural swing and adds small, incremental tweaks to get the most out of it. Buy in is 100%.",
                  name: "Travis Foster",
                  tag: "Parent · Ryan Foster's Dad",
                },
              ].map(({ quote, name, tag }) => (
                <div key={name} style={{ backgroundColor: "#fafaf8", padding: "2rem" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "2rem", lineHeight: 0.8, color: "oklch(0.42 0.18 25)", marginBottom: "0.75rem" }}>&ldquo;</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "#333333", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {quote}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "28px", height: "28px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "#111111" }}>{name[0]}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#111111", margin: 0 }}>{name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", margin: 0 }}>{tag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY / NO-SHOW PREVENTION ────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.42 0.18 25)", padding: "clamp(2.5rem, 6vw, 4rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
              color: "white",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}>
              You booked this call for a reason.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "1.5rem",
            }}>
              Your window is closing. Every week you spend overthinking mechanics is a week you're not getting better. We'll see you on the call.
            </p>

          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#f5f4f0", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.5rem",
            }}>
              <span style={{ color: "oklch(0.72 0.12 25)", fontSize: "1.2rem" }}>🛡</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)" }}>
                The Guarantee
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
              color: "#111111",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}>
              +5 MPH exit velocity in 30 days —<br />or we work with you for free until you do.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#777777",
            }}>
              And if you don't care about exit velo — we guarantee your swing will feel more natural than it ever has, or same deal. We make big guarantees because we genuinely want to help as many talented hitters as we can. If we're not getting you results, we don't deserve your money.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#f0ede8", borderTop: "1px solid oklch(0.14 0.005 65)", padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "18px", height: "18px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.65rem", color: "#111111" }}>B</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#aaaaaa", letterSpacing: "0.05em" }}>BE THE BEST BASEBALL</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#cccccc" }}>
            © {new Date().getFullYear()} Jantzen Witte. All rights reserved.
          </span>
        </div>
      </footer>

    </div>
  );
}
