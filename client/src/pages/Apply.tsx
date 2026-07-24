/* ============================================================
   THE HITTING LAB — Apply Page (/apply)
   VSL + 90 Day Athlete Accelerator Application
   Shown immediately after email opt-in
   Sections:
   1. Nav (minimal)
   2. VSL Hero
   3. Credibility / Guarantee
   4. For You / Not For You
   5. GHL Booking Embed
   6. Footer
   ============================================================ */

import { useEffect } from "react";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export default function Apply() {
  // Track VSL page view
  useEffect(() => {
    window.trackEvent?.("vsl_page_view", { page: "/apply" });
    window.scrollTo(0, 0);
  }, []);

  const handleBookingClick = () => {
    window.trackEvent?.("booking_click", { location: "apply_page" });
  };

  const handleVSLPlay = () => {
    window.trackEvent?.("vsl_play", { page: "/apply" });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── MINIMAL NAV ─────────────────────────────────────── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.88 0.005 80)",
        height: "56px",
        display: "flex",
        alignItems: "center",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "26px", height: "26px",
              backgroundColor: "oklch(0.42 0.18 25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem", color: "white", lineHeight: 1 }}>H</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.03em", lineHeight: 1.1 }}>THE HITTING LAB</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: "oklch(0.55 0.01 65)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
            </div>
          </a>
          <a
            href="#booking"
            onClick={handleBookingClick}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backgroundColor: "oklch(0.42 0.18 25)",
              color: "white",
              border: "none",
              padding: "0.6rem 1.25rem",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Apply Now →
          </a>
        </div>
      </nav>

      {/* ── VSL HERO ────────────────────────────────────────── */}
      <section style={{ paddingTop: "80px", backgroundColor: "oklch(0.10 0.005 65)", paddingBottom: "4rem" }}>
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>

            {/* Pre-headline */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.72 0.12 25)",
              marginBottom: "1.25rem",
            }}>
              The 90 Day Athlete Accelerator — Jantzen Witte
            </p>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
              lineHeight: 1.1,
              color: "white",
              marginBottom: "1.25rem",
            }}>
              Watch this before you<br />book your session.
            </h1>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
            }}>
              This video explains exactly how the 90 Day Athlete Accelerator works,
              who it's for, and the +5 MPH guarantee that backs it up.
            </p>

            {/* VSL Video Embed */}
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                backgroundColor: "#000",
                marginBottom: "1rem",
              }}
              onClick={handleVSLPlay}
            >
              <iframe
                src="https://www.youtube.com/embed/3kOn_Nmbmpk?rel=0&modestbranding=1"
                title="The 90 Day Athlete Accelerator — Jantzen Witte"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
            }}>
              Watch the full video, then apply for your free strategy session below.
            </p>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE STRIP ─────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.42 0.18 25)", padding: "2.5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              color: "white",
              lineHeight: 1.4,
            }}>
              "We guarantee you'll add +5 MPH to your exit velocity in 30 days — or we work with you for free until you do."
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginTop: "1rem",
            }}>
              — Jantzen Witte, Founder · The Hitting Lab
            </p>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ─────────────────────────────────────── */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2" style={{ gap: "3rem", alignItems: "center", maxWidth: "900px", margin: "0 auto" }}>
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
                I spent 12 years in professional baseball — drafted by the Boston Red Sox, played in the College World Series at TCU — and I still had to unlearn everything I thought I knew about hitting.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.35 0.01 65)" }}>
                That's why I built The Hitting Lab. I know exactly what it feels like to be where you are right now.
              </p>
            </div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "oklch(0.88 0.005 80)" }}>
              {[
                { stat: "12", label: "Years Pro Baseball" },
                { stat: "+5 MPH", label: "Guaranteed in 30 Days" },
                { stat: "D1", label: "College World Series" },
                { stat: "BOS", label: "Red Sox Organization" },
              ].map(({ stat, label }) => (
                <div key={label} style={{ backgroundColor: "white", padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "oklch(0.42 0.18 25)", lineHeight: 1, marginBottom: "0.5rem" }}>{stat}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.01 65)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR YOU / NOT FOR YOU ────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.10 0.005 65)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1rem", textAlign: "center" }}>
              The 90 Day Athlete Accelerator
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "white", lineHeight: 1.15, marginBottom: "3rem", textAlign: "center" }}>
              This system works.<br />But only for the right player.
            </h2>

            <div className="grid md:grid-cols-2" style={{ gap: "2px", backgroundColor: "oklch(0.18 0.005 65)" }}>
              {/* For You */}
              <div style={{ backgroundColor: "oklch(0.13 0.005 65)", padding: "2.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.72 0.12 25)", marginBottom: "1.5rem" }}>
                  This is for you if...
                </p>
                {[
                  "You're already putting in the work but it's not translating to games.",
                  "You know you have the talent to play at the next level but feel stuck.",
                  "You're tired of every coach giving you a different, conflicting opinion.",
                  "You want a personalized plan, not generic team advice.",
                  "You're coachable and ready to trust a simplified, proven system.",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    <span style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.9rem", flexShrink: 0, marginTop: "2px" }}>✓</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* Not For You */}
              <div style={{ backgroundColor: "oklch(0.11 0.005 65)", padding: "2.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
                  This is NOT for you if...
                </p>
                {[
                  "You need constant motivation just to show up to practice.",
                  "You want a magic drill that fixes everything overnight.",
                  "You're not willing to unlearn bad habits and trust the process.",
                  "You want generic, cookie-cutter advice instead of an individual plan.",
                  "You blame external factors instead of taking ownership of your results.",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.9rem", flexShrink: 0, marginTop: "2px" }}>✕</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.35)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ─────────────────────────────────── */}
      <section id="booking" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1.25rem" }}>
              Apply for a Strategy Session
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "1rem" }}>
              Your window is closing.<br />Let's get to work.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.45 0.01 65)", marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
              This isn't a sales pitch. It's an honest look at what's happening with your swing and exactly what we need to do to fix it. No pressure. Just a plan.
            </p>

            {/* GHL Booking Embed */}
            <div
              style={{
                border: "1px solid oklch(0.88 0.005 80)",
                minHeight: "700px",
                overflow: "hidden",
              }}
              onClick={handleBookingClick}
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/bookings/jantzen"
                title="Apply for a Strategy Session — Jantzen Witte"
                style={{ width: "100%", height: "700px", border: "none" }}
                scrolling="yes"
              />
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "oklch(0.65 0.008 65)", marginTop: "1rem", textAlign: "center" }}>
              Backed by the +5 MPH Exit Velo Guarantee. If you don't add 5 MPH in 30 days, we work with you for free until you do.
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
