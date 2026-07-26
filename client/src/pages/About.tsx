/* ============================================================
   BE THE BEST BASEBALL — About Page (/about)
   Framework: StoryBrand (Jantzen as Guide, not Hero) +
              Jeremy Haynes (authority → empathy → results → CTA)
   Structure:
   1. Video first — let Jantzen speak
   2. Empathy — "I was you"
   3. Authority — credentials that earn trust
   4. The transformation story — what changed
   5. Who this is for
   6. Social proof
   7. CTA — strategy session
   ============================================================ */

import { useEffect } from "react";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export default function About() {
  useEffect(() => {
    document.title = "About Jantzen Witte — Be The Best Baseball";
    window.trackEvent?.("about_page_view", { page: "/about" });
    window.scrollTo(0, 0);
    return () => { document.title = "Be The Best Baseball — 32-Drill Framework for Serious Hitters"; };
  }, []);

  const crimson = "oklch(0.42 0.18 25)";
  const crimsonLight = "oklch(0.72 0.12 25)";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e8e4de", height: "56px",
        display: "flex", alignItems: "center",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", backgroundColor: crimson, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "white", lineHeight: 1 }}>B</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.8rem", color: "#111111", letterSpacing: "0.05em", lineHeight: 1.1 }}>BE THE BEST BASEBALL</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: "#999999", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
            </div>
          </a>
          <a href="/apply" style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            backgroundColor: crimson, color: "white",
            padding: "0.55rem 1.1rem", textDecoration: "none",
          }}>
            Apply Now →
          </a>
        </div>
      </nav>

      {/* ── 1. VIDEO FIRST ──────────────────────────────────── */}
      <section style={{ paddingTop: "56px", backgroundColor: "#000" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src="https://www.youtube.com/embed/MWocg5rPgfI?rel=0&modestbranding=1"
              title="About Jantzen Witte — Be The Best Baseball"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── 2. STORY ─────────────────────────────────────────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1.5rem" }}>
              About Jantzen
            </p>

            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.15, color: "#111111", marginBottom: "2rem" }}>
              I got voted MVP of my Triple-A team. The next year I hit .192.
            </h1>

            {[
              "That's the whole reason this exists, so I'll start there.",
              "Nobody recruited me.",
              "I was overlooked in high school. No offers, no letters, nothing.",
              "I walked on at TCU and stayed five years. Made it to the College World Series. Got drafted in the 24th round by the Red Sox, which is baseball's way of telling you you're organizational filler and you should be grateful for the plane ticket.",
              "So I ground.",
              "Level by level, year by year. I was almost always the oldest guy at whatever level I was at. I made All-Star teams at basically every stop.",
              "And it never mattered. No matter what I put up, I never got a real look.",
              "I could feel myself falling out of love with the only thing I'd ever wanted to do.",
              "Then it almost happened.",
              "In 2020 Alex Cora called me and invited me to major league spring training.",
              "I'm getting dressed in a clubhouse with David Ortiz and Dustin Pedroia walking around. Guys on the big league roster are pulling me aside telling me to keep doing what I'm doing, that I have a real chance to make this team.",
              "Making the team wasn't even on my radar until somebody said it out loud.",
              "I remember thinking, okay. This is finally my time.",
              "Then COVID hit and spring training shut down.",
              "I went from fifteen thousand dollars a month to four hundred dollars a month in about a week.",
              "I kept training anyway, because I was sure this was my year.",
              "Then I got the call telling me they weren't bringing me back. I wasn't in their top sixty players.",
              "So I quit.",
              "Got a normal job. Told my family I was done.",
              "People were surprised. They hadn't spent ten years being told their numbers weren't the point.",
              "I hated the job. And I missed baseball so much it was embarrassing.",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", fontWeight: 300, lineHeight: 1.9, color: "#444444", marginBottom: "1.1rem" }}>
                {para}
              </p>
            ))}

            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1.3, color: "#111111", margin: "2rem 0", borderLeft: `3px solid ${crimson}`, paddingLeft: "1.5rem" }}>
              One FaceTime call.
            </p>

            {[
              "The Mariners called out of nowhere and I signed. I wasn't in shape, I wasn't myself, and I started slow.",
              "Then I got on a FaceTime call with a coach named Brady North.",
              "He had never seen me hit in person. He'd watched video of my swings, that's it.",
              "He didn't tell me what was wrong with me. He just told me what to do — get my bat a little more vertical in my stance, and throw my top hand at my hip.",
              "And then he said the thing that actually mattered.",
              "He told me: you're going to be early. You're going to hit balls off the end of the bat. Don't freak out. That's what it feels like when you're quicker to it.",
              "He was right. I hit a bunch of balls off the end.",
              "And because he'd warned me, I didn't quit on it.",
              "That same day I hit two of the most solid doubles I've ever hit in my life. I'd never hit a ball that high or that far. I knew right away it was working.",
              "What I understood later was that my bat path had been way too steep. My whole career I was thinking low line drive, line drive up the middle. What he gave me let me slot my path a lot sooner.",
              "That season I hit .299 with 19 home runs and got voted our team MVP.",
              "Then I signed with a team in Japan.",
              "And then it fell apart.",
              "I hit .192 in Japan.",
              "Same swing. Same cue. I'd taken the one thing that saved my career and turned it into my identity. I thought that was just who I was as a hitter now.",
              "What I didn't understand at the time is that the swing is on a spectrum, and it's possible to go too far in one direction.",
              "My whole early career I was too far one way — stay back, stay inside the ball. Brady moved me the other way, and it worked, and then I kept going that direction for about a year past the point where it was helping me.",
              "But that wasn't even the real problem.",
              "The real problem was that I was alone.",
              "Every adjustment I'd ever made in twelve years, somebody in that dugout made with me. I was always super dependent on whatever coaches I had around me, and I didn't realize it until there was nobody there.",
              "In Japan I found out I had no idea how to read my own swing.",
              "I came home. The Padres gave me a spring training invite in 2023 and I was so bad in camp they moved me to the development list before the season even started.",
              "I put together a great first half in Triple-A that year — Player of the Week in June, led the team in home runs.",
              "And then I completely fell apart in the second half. By September I was on the inactive list. By November I was a free agent, thirty-three years old, and totally lost.",
              "That's when I got help from 108.",
              "They changed everything for me, and they're the reason I coach today.",
              "They trained me on the opposite of everything I had ever tried before.",
              "We didn't think about the legs at all. We only worked the upper half. I needed to get around the baseball. I swung a whiffle ball bat. We did drills with movement in them instead of standing still.",
              "They brought out my natural tennis positions. I was a really good tennis player growing up and I could never replicate that move in the batter's box — because my feet were always still, and I'd spent my whole career being told that was correct. The guys at 108 let me have fun and basically pretend I was playing tennis, which is the exact thing I'd spent years trying to avoid because I thought it was bad for my swing.",
              "The Rangers signed me the next April, a week after the season had already started. No spring training. Thrown straight into games cold.",
              "I started slow, and then I felt better in the box than I had in years.",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", fontWeight: 300, lineHeight: 1.9, color: "#444444", marginBottom: "1.1rem" }}>
                {para}
              </p>
            ))}

            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1.3, color: "#111111", margin: "2rem 0", borderLeft: `3px solid ${crimson}`, paddingLeft: "1.5rem" }}>
              I never made it to the big leagues. Twelve years, two real chances, and I never got there.
            </p>

            {[
              "But I learned two things that took me way too long to learn.",
              "The first is that mechanical adjustments matter. They're real. The right one at the right time gave me the best season of my life.",
              "The second is that no adjustment is permanent, because the swing is on a spectrum and you can train one thing too much. The cue that saves you will eventually be the thing holding you back, and you won't feel it happening.",
              "And underneath both of those is the one that actually stings:",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", fontWeight: 300, lineHeight: 1.9, color: "#444444", marginBottom: "1.1rem" }}>
                {para}
              </p>
            ))}

            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1.3, color: "#111111", margin: "2rem 0", borderLeft: `3px solid ${crimson}`, paddingLeft: "1.5rem" }}>
              I was never a hitter with a broken swing. I was a hitter who couldn't see his own swing — and nobody ever taught me how.
            </p>

            {[
              "So when a college guy tells me he's lost and he can't figure it out on his own, I know he isn't weak. Nobody can do it alone. I had a Triple-A MVP on my résumé and I couldn't do it either.",
              "If I'd had remote training that year in Japan, I think it would have worked wonders for me. I didn't have anybody. I just had a swing I couldn't read and a season slipping away.",
              "That's why I built this the way I did.",
              "This is what I wish I'd had when I was in Japan.",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", fontWeight: 300, lineHeight: 1.9, color: "#444444", marginBottom: "1.1rem" }}>
                {para}
              </p>
            ))}

          </div>
        </div>
      </section>

      {/* ── 3. AUTHORITY ────────────────────────────────────── */}
      <section style={{ backgroundColor: "#111111", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1.5rem", textAlign: "center" }}>
              The Resume
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", backgroundColor: "rgba(255,255,255,0.08)" }}>
              {[
                { stat: "12", label: "Years as a Professional" },
                { stat: "5", label: "Organizations" },
                { stat: "1", label: "College World Series" },
                { stat: "1", label: "Major League Season" },
              ].map(({ stat, label }) => (
                <div key={label} style={{ backgroundColor: "#111111", padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "white", lineHeight: 1, marginBottom: "0.5rem" }}>{stat}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", backgroundColor: "rgba(255,255,255,0.08)" }}>
              {[
                { org: "TCU Horned Frogs", detail: "College World Series" },
                { org: "Boston Red Sox", detail: "MLB Organization" },
                { org: "Seibu Lions", detail: "Japan — First Major League HR" },
                { org: "4 Additional Organizations", detail: "12-Year Pro Career" },
              ].map(({ org, detail }) => (
                <div key={org} style={{ backgroundColor: "#111111", padding: "1.5rem 2rem" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "white", marginBottom: "0.25rem" }}>{org}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. THE TRANSFORMATION STORY ─────────────────────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1rem" }}>
              What Changed
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.15, color: "#111111", marginBottom: "1.75rem" }}>
              The best hitters I ever played next to all had one thing in common.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.85, color: "#444444", marginBottom: "1.25rem" }}>
              They made it look effortless. Not because they thought about more. Because they thought about less.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.85, color: "#444444", marginBottom: "1.25rem" }}>
              After 12 years of pro ball — TCU, the Red Sox, Japan, five organizations — I came back and started coaching with one goal: help talented hitters stop overthinking and start trusting what they already have.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.85, color: "#444444", marginBottom: "1.25rem" }}>
              Not more drills. Not more mechanics. A simpler plan — built around your natural swing — and someone watching your swings who actually knows what they're looking at.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, lineHeight: 1.85, color: "#444444" }}>
              That's what the 90 Day Athlete Accelerator is. And that's why it works.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. WHO THIS IS FOR ──────────────────────────────── */}
      <section style={{ backgroundColor: "#f5f4f0", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1rem" }}>
              Who I Work With
            </p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#111111", lineHeight: 1.2, marginBottom: "1.75rem" }}>
              I don't work with everyone.<br />I work with the right players.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: 300, lineHeight: 1.85, color: "#555555", marginBottom: "2rem" }}>
              The players I work with are already talented. They're already putting in the work. What they don't have is a clear plan — and someone who's actually played where they're trying to go, watching their swings and telling them the one thing to fix.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "You're a high school or college hitter who knows you have more in you",
                "You're tired of conflicting advice from coaches, YouTube, and Instagram",
                "You want to play at the next level and understand the window is closing",
                "You're coachable and willing to trust a simplified, proven system",
                "You want a real plan — not generic team advice",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: crimson, fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>✓</span>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: 400, color: "#333333", margin: 0, lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROOF STRIP ──────────────────────────────────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1rem", textAlign: "center" }}>
              What Players Say
            </p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#111111", lineHeight: 1.2, marginBottom: "2.5rem", textAlign: "center" }}>
              Results from players who showed up.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "#e8e4de" }}>
              {[
                { quote: "I was so far down in the dumps and I found you as a resource. This is really life-changing.", name: "Parker Sobiesiak", tag: "JUCO → 4-Year Scholarship · .209 → .421 AVG in Conference" },
                { quote: "Got my feels back in one session.", name: "Brooks Burdine", tag: "Zero Offers → Air Force Academy (D1) + MLB Draft Letters" },
                { quote: "It took hitting from this complex 10 different steps to — all I have to think about now is hit the ball.", name: "Brady Greene", tag: "High School · Kentucky" },
                { quote: "I ended up hitting a distance PR and an exit velocity PR in the same day after a 30-minute call.", name: "Max Frazier", tag: "High School · 87 MPH EV PR Beat Day 1 of Week 2" },
                { quote: "My line drive percentage went from 41 to 57. Miss hit a ball and still got a double — Baseball's just more fun now.", name: "Saul Trevino", tag: "JUCO → Oklahoma Wesleyan University · .407 AVG / 1.140 OPS" },
                { quote: "It's not just drills. We talk through my approach, my swing thoughts, and the mental side of hitting. Witte's experience shows in everything he does.", name: "Brady Lester", tag: "NAIA → Ohio State University · .337 AVG · 10 HR · 49 RBI" },
              ].map(({ quote, name, tag }) => (
                <div key={name} style={{ backgroundColor: "#fafaf8", padding: "2rem", border: "1px solid #e8e4de" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "2rem", lineHeight: 0.8, color: crimson, marginBottom: "0.75rem" }}>&ldquo;</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "#333333", lineHeight: 1.7, marginBottom: "1.5rem" }}>{quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "28px", height: "28px", backgroundColor: crimson, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "white" }}>{name[0]}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#111111", margin: 0 }}>{name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: crimsonLight, margin: 0 }}>{tag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: crimson, padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Ready to stop guessing?
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
              Book a free strategy session. I'll look at your swing, tell you exactly what's holding you back, and build you a plan. No pitch. No pressure. Just an honest read.
            </p>
            <a
              href="/apply"
              onClick={() => window.trackEvent?.("booking_click", { location: "about_cta" })}
              style={{
                display: "inline-block", fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                backgroundColor: "white", color: crimson,
                padding: "1rem 2.5rem", textDecoration: "none",
              }}
            >
              Apply for a Strategy Session →
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", marginTop: "1rem", letterSpacing: "0.05em" }}>
              +5 MPH exit velocity guaranteed in 30 days — or we work with you for free.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#f0ede8", borderTop: "1px solid #e8e4de", padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "18px", height: "18px", backgroundColor: crimson, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.65rem", color: "white" }}>B</span>
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
