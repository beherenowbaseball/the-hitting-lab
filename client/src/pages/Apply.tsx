/* ============================================================
   BE THE BEST BASEBALL — Apply Page (/apply)
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
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.03em", lineHeight: 1.1 }}>BE THE BEST BASEBALL</div>
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
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); const el = document.getElementById('booking'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 20; window.scrollTo({ top: y, behavior: 'smooth' }); } (window as any).trackEvent?.('booking_click', { location: 'below_vsl' }); }}
                style={{
                  display: "inline-block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  backgroundColor: "oklch(0.42 0.18 25)",
                  color: "white",
                  padding: "1rem 2.5rem",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Apply for a Strategy Session →
              </a>
            </div>
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
              "We guarantee +5 MPH to your exit velocity in 30 days — or we work with you for free until you do."
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
              marginTop: "1.25rem",
            }}>
              And if you don't care about exit velo — we guarantee your swing will feel more natural than it ever has, or we work with you for free until it does.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              marginTop: "1.25rem",
              maxWidth: "520px",
              margin: "1.25rem auto 0",
            }}>
              We make big guarantees because I genuinely want to help as many talented hitters as I can. If we're not getting you results, we don't deserve your money.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginTop: "1.25rem",
            }}>
              — Jantzen Witte, Founder · Be The Best Baseball
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
                That's why I built the 90 Day Athlete Accelerator. I know exactly what it feels like to be where you are right now.
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
              This framework works.<br />But only for the right player.
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

      {/* ── ALL TESTIMONIALS WALL ───────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.96 0.005 80)", padding: "5rem 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem", textAlign: "center" }}>What They're Saying</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "3rem", textAlign: "center" }}>Every review. Unfiltered.</h2>
          <div className="grid md:grid-cols-3" style={{ gap: "1px", backgroundColor: "oklch(0.95 0.003 80)" }}>
            {[
              { quote: "I was so far down in the dumps and I found you as a resource. This is really life-changing. Finished .350 avg, .421 in conference, .468 OBP, .614 SLG. Earned a 4-year scholarship.", name: "Parker Sobiesiak", tag: "Player · JUCO → 4-Year Scholarship" },
              { quote: "My line drive percentage went from 41 to 57. Miss hit a ball and still got a double — Baseball's just more fun now.", name: "Saul Trevino", tag: "Player · JUCO → Oklahoma Wesleyan University · .407 AVG / 1.140 OPS" },
              { quote: "His aura is bigger. He knows where he's at and what he's doing. When he looks comfortable, he plays phenomenal.", name: "Alma Trevino", tag: "Parent · Saul's Mom" },
              { quote: "Y'all have worked wonders with me. It just clicked. Batted .385 for the whole season, .550 in district, 39 hits.", name: "Hudson Sharp", tag: "Player · High School" },
              { quote: "Before the program, pitches I could have put over the fence — I'd just put up the middle. Now I can tell when I'm not delivering the barrel, and I know exactly how to fix it. There are unlocks still coming.", name: "Sam Campin", tag: "Player · JUCO · 91 → 94 EV" },
              { quote: "Once I found that natural flow of my swing, it just feels better than ever. You can consistently drive balls and not really worry when you're in the box.", name: "Ethan Ketterer", tag: "Player · Eastern University" },
              { quote: "My swing just feels so much cleaner, so much more refined. There's not a whole bunch of moving parts. I just feel athletic when I swing.", name: "Graham TooGood", tag: "Player · HS Freshman, Liberty High School TX" },
              { quote: "I might have gotten one or two hits all of last spring. Turning around this year, I don't think there was a game where I didn't catch a barrel.", name: "Ryan Foster", tag: "Player · D2, University of Jamestown" },
              { quote: "His approach is spot on — he tailors the program to the individual. He takes the player's natural swing and adds small, incremental tweaks to get the most out of it. Buy in is 100%.", name: "Travis Foster", tag: "Parent · Ryan Foster's Dad" },
              { quote: "It took hitting from this complex 10 different steps to — all I have to think about now is hit the ball. My head is so much more calm. Some of the farthest balls I've ever hit in my life. Just constantly.", name: "Brady Greene", tag: "Player · High School, Kentucky" },
              { quote: "This program has been a crazy unlock. Absolutely nuts. It sounds crazy over the internet but it's more real than just working with whoever in person.", name: "Colton Warmack", tag: "Player · High School" },
              { quote: "My experience has been great — there are over 50 guys in here and somehow it still feels like I'm the only one getting trained. This is ran really well and I'm getting better every day.", name: "Tony Woodie", tag: "Player · P.O. → Single Season HR & RBI Record Leader" },
              { quote: "Now that I can just trust it — I don't have to worry about it. I look confident walking into the box and they throw me curveballs. They think they can get me out with them. They can't.", name: "Ryan Duffy", tag: "Player · HS, Massachusetts · Batting 3-4 Hole at 14" },
              { quote: "Got my feels back in one session.", name: "Brooks Burdine", tag: "Player · Air Force Academy Scholarship + MLB Draft Letters" },
              { quote: "I ended up hitting a distance PR and an exit velocity PR in the same day after a 30-minute call. I've gone from a pushy, scared hitter to more confident than ever, crushing the ball to all sides of the field.", name: "Max Fraizer", tag: "Player · 87 MPH EV → PR in Week 2" },
              { quote: "Working with Jantzen this year has been a blast! He transformed my swing in ways that didn't seem within my capabilities at first, but I trusted his process and the results speak for itself!", name: "Anthony Della Rosa", tag: "Player · High School" },
              { quote: "I feel a million times better than I did before. Honestly, it was a dark spot for me. Confidence wasn't there at all. But I just feel a million times better. And it's not only baseball — this has helped a lot with me.", name: "Teddy Stephenson", tag: "Player · HS → University of the Holy Cross" },
              { quote: "I'm doing the piggyback every day. I could just tell the balls come off harder — I could just see the difference. Four home runs in six games.", name: "Daunte Stuart", tag: "Player · Indy Ball → Philadelphia Phillies · 4 HR in 6 Games" },
              { quote: "Yeah dude best swings of my life just like you said.", name: "Toufic", tag: "Player · JUCO" },
              { quote: "It's not just drills. We talk through my approach, my swing thoughts, and the mental side of hitting. The podcast-style Zoom calls with pro players and coaches have been unreal. Witte's experience shows in everything he does.", name: "Brady Lester", tag: "Player · NAIA → Ohio State University" },
              { quote: "The big game changer for me is having a big league player/coach in my corner. In game so far I'm hitting .497 with 8 doubles, 4 HRs, and 24 RBIs in just 16 games.", name: "Alex Martinez", tag: "Player" },
              { quote: "My swing has felt more easy and repeatable while adding an average of 5 mph of bat speed. I've felt more confident and free in the box than ever before.", name: "Spencer Dailey", tag: "Player · D3 P.O. → Upper Iowa University · +5 MPH Bat Speed" },
              { quote: "Before working with Jantzen, I felt tight and unable to get a good, hard, competitive swing. I definitely felt like I was put into better positions to attack the ball and do damage on mistake pitches.", name: "Chase Wells", tag: "Player · Indy Ball → Detroit Tigers" },
              { quote: "Completely changed my game of baseball. After working with him I had one of my best hitting seasons. He doesn't change you — he just makes you better.", name: "Benjamin Wallace", tag: "Player" },
              { quote: "Jantzen has been a mainstay in my sons' development for the past 10 years. He keeps it simple, to the point, and fun — and the improvement in the mindset of hitting has been amazing.", name: "Barney Wiley", tag: "Parent · 10 Years" },
              { quote: "My son has taken lessons with Jantzen off and on for much of his baseball-playing life. He has always been encouraging, positive, and knowledgeable. He truly cares about the players he works with.", name: "Courtney Gregory", tag: "Parent" },
              { quote: "Has gave me a lot of confidence in my swing.", name: "Luke Hargis", tag: "Player" },
            ].map(({ quote, name, tag }) => (
              <div key={name} style={{ backgroundColor: "white", padding: "1.75rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", lineHeight: 0.8, color: "oklch(0.82 0.005 80)", fontStyle: "italic", marginBottom: "0.75rem" }}>&ldquo;</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "0.9rem", color: "oklch(0.25 0.005 65)", lineHeight: 1.6, marginBottom: "1.25rem" }}>{quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: "24px", height: "24px", backgroundColor: "oklch(0.42 0.18 25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.65rem", color: "white" }}>{name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "oklch(0.12 0.005 65)", margin: 0 }}>{name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", margin: 0 }}>{tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 0", borderBottom: "1px solid oklch(0.90 0.005 80)" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1rem", textAlign: "center" }}>Common Questions</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "3rem", textAlign: "center" }}>Everything you want to know before the call.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { q: "Does my parent need to be on the call?", a: "We need the financially responsible party to be present on the strategy session call. If a parent or guardian cannot make the call for a certain reason, we will have to find a time that works for everyone." },
                { q: "How does the feedback work?", a: "You record your swings and send them to us through our private community. We watch every video and send back specific, personalized feedback — not generic cues. You’ll know exactly what to work on before your next session." },
                { q: "Do I need special equipment?", a: "No. You need a bat, a tee or a net, and a phone to record your swings. We ship you a tripod as part of the program so your setup is consistent every session." },
                { q: "How much time does the program take?", a: "This varies greatly by athlete. Some guys send us video once a week. Others every day. We give you the freedom to approach this with what works best for your schedule." },
                { q: "How is this different from my current coach?", a: "Most coaches give you more to think about. We do the opposite. We identify the one or two things that are actually causing your inconsistency and build a simple, repeatable plan around your natural swing — not a template." },
                { q: "What if I don’t see results in 30 days?", a: "We guarantee +5 MPH to your exit velocity in 30 days — or we work with you for free until you do. If you don’t care about exit velo, we guarantee your swing will feel more natural than it ever has. We stand behind this completely." },
                { q: "How much does it cost?", a: "We discuss investment on the strategy session call after we understand exactly where you are and what you need. We don’t post pricing publicly because every athlete’s situation is different. What I can tell you is that it’s significantly less than a year of private lessons that aren’t working." },
                { q: "My son has a coach already. Can he still work with you?", a: "Yes. Most of our athletes have team coaches. We work alongside your existing coaching — we don’t replace it. We focus on the individual swing development and mental approach that team coaches don’t have time for." },
              ].map(({ q, a }, i) => (
                <div key={i} style={{ borderTop: "1px solid oklch(0.90 0.005 80)", padding: "1.5rem 0" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.6rem" }}>{q}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.45 0.01 65)", margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>

            {/* Fallback for people not ready to book */}
            <div style={{ marginTop: "3rem", padding: "2rem", backgroundColor: "oklch(0.97 0.003 80)", textAlign: "center", borderTop: "3px solid oklch(0.42 0.18 25)" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "1rem", color: "oklch(0.12 0.005 65)", marginBottom: "0.5rem" }}>
                Not ready to book yet?
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "oklch(0.45 0.01 65)", marginBottom: "1rem", lineHeight: 1.7 }}>
                Start with the free 32-drill framework first. Enter your name and email to unlock the full library.
              </p>
              <a
                href="/"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.18 25)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Grab the Free 32 Drills First →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ─────────────────────────────────── */}
      <section id="booking" style={{ padding: "clamp(2.5rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.42 0.18 25)", marginBottom: "1.25rem" }}>
              Apply for a Strategy Session
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "oklch(0.12 0.005 65)", lineHeight: 1.2, marginBottom: "1rem" }}>
              Your window is closing.<br />Let's help you hit the ball harder, more often, with less effort — guaranteed.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "oklch(0.45 0.01 65)", marginBottom: "1rem", maxWidth: "520px", margin: "0 auto 1rem" }}>
              This isn't a sales pitch. It's an honest look at what's happening with your swing and exactly what we need to do to fix it. No pressure. Just a plan.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "oklch(0.42 0.18 25)", letterSpacing: "0.08em", marginBottom: "2.5rem" }}>
              I only open 5 new spots per month to ensure every athlete gets my full attention.
            </p>

            {/* GHL Booking Embed */}
            <div
              style={{
                border: "1px solid oklch(0.88 0.005 80)",
                minHeight: "clamp(800px, 120vw, 900px)",
                overflow: "hidden",
              }}
              onClick={handleBookingClick}
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/bookings/jantzen"
                title="Apply for a Strategy Session — Jantzen Witte"
                style={{ width: "100%", height: "clamp(800px, 120vw, 900px)", border: "none" }}
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
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>BE THE BEST BASEBALL</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} Jantzen Witte. All rights reserved.
          </span>
        </div>
      </footer>

    </div>
  );
}
