/* ============================================================
   BE THE BEST BASEBALL — Thank You / Confirmation Page (/thank-you)
   Jeremy Haynes Framework — All 7 improvements applied:
   1. Video FIRST — above everything
   2. Urgency framing below video — why this call matters NOW
   3. "Reply YES" micro-commitment
   4. Pre-call homework framed as hard assignment
   5. Social proof = "Players who showed up to the call"
   6. Guarantee BEFORE urgency strip
   7. "Add to Calendar" link
   Meta Pixel: fires Schedule event on load
   ============================================================ */

import { useEffect } from "react";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Build calendar links
function buildGoogleCalendarLink() {
  const title = encodeURIComponent("Hitting Strategy Session — Be The Best Baseball");
  const details = encodeURIComponent(
    "Your strategy session with Jantzen Witte.\n\nBefore the call:\n1. Watch the video at drills.bethebestbaseball.com/thank-you\n2. Submit your swing video at tally.so/r/lb5WQv\n3. Have a parent present"
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
}

function buildAppleCalendarLink() {
  const title = encodeURIComponent("Hitting Strategy Session — Be The Best Baseball");
  const notes = encodeURIComponent(
    "Your strategy session with Jantzen Witte.\nBefore the call:\n1. Watch the video at drills.bethebestbaseball.com/thank-you\n2. Submit your swing video at tally.so/r/lb5WQv\n3. Have a parent present"
  );
  // .ics download for Apple Calendar
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${decodeURIComponent(title)}`,
    `DESCRIPTION:${decodeURIComponent(notes)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");
  const blob = new Blob([icsContent], { type: "text/calendar" });
  return URL.createObjectURL(blob);
}

export default function ThankYou() {
  useEffect(() => {
    window.trackEvent?.("booking_confirmed", { page: "/thank-you" });
    window.scrollTo(0, 0);
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Schedule", {
        content_name: "Hitting Strategy Session",
        content_category: "Baseball Coaching",
      });
    }
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
        </div>
      </nav>

      {/* ── 1. VIDEO FIRST ──────────────────────────────────── */}
      <section style={{ paddingTop: "56px", backgroundColor: "#000" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src="https://www.youtube.com/embed/DXRYhj2T09Y?rel=0&modestbranding=1"
              title="Watch Before Your Strategy Session"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── 2. URGENCY FRAMING + CONFIRMATION ───────────────── */}
      <section style={{ padding: "clamp(2.5rem, 6vw, 4rem) 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "#f5f4f0", border: `1px solid ${crimson}`,
              padding: "0.4rem 1rem", marginBottom: "1.5rem",
            }}>
              <span style={{ color: crimsonLight, fontSize: "0.9rem" }}>✓</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: crimsonLight }}>
                Your Session Is Booked
              </span>
            </div>

            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1, color: "#111111", marginBottom: "1.25rem" }}>
              You made the right call.<br />Here's why it matters.
            </h1>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", fontWeight: 300, lineHeight: 1.8, color: "#444444", marginBottom: "1.5rem", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
              Recruiting windows close. Seasons don't come back. The guys who get ahead aren't the most talented — they're the ones who stopped guessing and got a real plan first. That's what this call is.
            </p>

            {/* Add to Calendar */}
            <a
              href={buildGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: crimson, border: `1px solid ${crimson}`,
                padding: "0.65rem 1.25rem", textDecoration: "none",
              }}
            >
              📅 Add to Google Calendar
            </a>

          </div>
        </div>
      </section>

      {/* ── 4. WHAT TO DO NOW ───────────────────────────────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "2.5rem", textAlign: "center", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              What To Do Now
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

              {/* Step 1 — Add to Calendar */}
              <div style={{ display: "flex", gap: "1.5rem", padding: "1.75rem 0", borderBottom: "1px solid #e8e4de", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: crimson, lineHeight: 1, flexShrink: 0, width: "50px" }}>1</div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", fontWeight: 500, color: "#111111", margin: "0 0 0.75rem 0", lineHeight: 1.4 }}>
                    Add the call to your calendar so you don't miss it.
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a href={buildGoogleCalendarLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: crimson, color: "white", padding: "0.7rem 1.25rem", textDecoration: "none" }}>
                      📅 Google Calendar
                    </a>
                    <a href={buildAppleCalendarLink()} download="hitting-strategy-session.ics" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "#111111", color: "white", padding: "0.7rem 1.25rem", textDecoration: "none" }}>
                      🍎 Apple Calendar
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 2 — Reply YES */}
              <div style={{ display: "flex", gap: "1.5rem", padding: "1.75rem 0", borderBottom: "1px solid #e8e4de", alignItems: "center" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: crimson, lineHeight: 1, flexShrink: 0, width: "50px" }}>2</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", fontWeight: 500, color: "#111111", margin: 0, lineHeight: 1.4 }}>
                  Reply <strong>"YES"</strong> to the text we just sent you.
                </p>
              </div>

              {/* Step 3 — Submit swing video */}
              <div style={{ display: "flex", gap: "1.5rem", padding: "1.75rem 0", borderBottom: "1px solid #e8e4de", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: crimson, lineHeight: 1, flexShrink: 0, width: "50px" }}>3</div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", fontWeight: 500, color: "#111111", margin: "0 0 0.75rem 0", lineHeight: 1.4 }}>
                    Submit a video of you hitting so we can come prepared.
                  </p>
                  <a href="https://tally.so/r/lb5WQv" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: crimson, color: "white", padding: "0.7rem 1.25rem", textDecoration: "none" }}>
                    Submit Your Swing Video →
                  </a>
                </div>
              </div>

              {/* Step 4 — Parent on call */}
              <div style={{ display: "flex", gap: "1.5rem", padding: "1.75rem 0", alignItems: "center" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: crimson, lineHeight: 1, flexShrink: 0, width: "50px" }}>4</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", fontWeight: 500, color: "#111111", margin: 0, lineHeight: 1.4 }}>
                  Show up to the call with a parent.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ON THE CALL ──────────────────────── */}
      <section style={{ backgroundColor: "#f5f4f0", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1rem", textAlign: "center" }}>
              What Happens On The Call
            </p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#111111", lineHeight: 1.15, marginBottom: "2.5rem", textAlign: "center" }}>
              No pitch. No pressure.<br />Just a plan.
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "#e8e4de" }}>
              {[
                { step: "First 5 min", title: "We get to know each other", body: "I learn what you've tried in the past. What has worked and what hasn't. No judgment — just context so I can actually help." },
                { step: "Next 10 min", title: "We look at your swing", body: "We take a look at your swing and find the gaps we need to work through. Specific, honest feedback — not generic cues." },
                { step: "Next 10 min", title: "We build your plan", body: "We build your plan of what to work on and how. Simple, repeatable, built around your natural swing." },
                { step: "Final 5 min", title: "We decide together", body: "If the 90 Day Athlete Accelerator is the right fit, we'll talk about it. If it's not, we'll tell you that too. No pressure either way." },
              ].map(({ step, title, body }) => (
                <div key={step} style={{ backgroundColor: "#ffffff", padding: "2rem", border: "1px solid #e8e4de" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: crimsonLight, marginBottom: "0.75rem" }}>{step}</p>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#111111", marginBottom: "0.6rem", lineHeight: 1.2 }}>{title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.8, color: "#777777", margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SOCIAL PROOF — "PLAYERS WHO SHOWED UP" ──────── */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: crimsonLight, marginBottom: "1rem", textAlign: "center" }}>
              Players Who Showed Up To The Call
            </p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#111111", lineHeight: 1.15, marginBottom: "2.5rem", textAlign: "center" }}>
              They booked. They showed up.<br />This is what happened.
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "#e8e4de" }}>
              {[
                { quote: "It's not just drills. We talk through my approach, my swing thoughts, and the mental side of hitting. The podcast-style Zoom calls with pro players and coaches have been unreal — hearing what it actually takes to reach the next level has been eye-opening. Witte's experience shows in everything he does.", name: "Brady Lester", tag: "NAIA → Ohio State University · .337 AVG · 10 HR · 49 RBI" },
                { quote: "I was so far down in the dumps and I found you as a resource. This is really life-changing.", name: "Parker Sobiesiak", tag: "JUCO → 4-Year Scholarship · .209 → .421 AVG in Conference" },
                { quote: "Before working with Jantzen, I felt tight and unable to get a good, hard, competitive swing. I definitely felt like I was put into better positions to attack the ball and do damage on mistake pitches.", name: "Chase Wells", tag: "Indy Ball → Detroit Tigers" },
                { quote: "I feel a million times better than I did before. Honestly, it was a dark spot for me. Confidence wasn't there at all. But I just feel a million times better. And it's not only baseball — this has helped a lot with me.", name: "Teddy Stephenson", tag: "High School → University of the Holy Cross" },
                { quote: "Got my feels back in one session.", name: "Brooks Burdine", tag: "Zero Offers → Air Force Academy (D1) + MLB Draft Letters" },
                { quote: "My line drive percentage went from 41 to 57. Miss hit a ball and still got a double — Baseball's just more fun now.", name: "Saul Trevino", tag: "JUCO → Oklahoma Wesleyan University · .407 AVG / 1.140 OPS" },
                { quote: "His aura is bigger. He knows where he's at and what he's doing. When he looks comfortable, he plays phenomenal.", name: "Alma Trevino", tag: "Parent · Saul's Mom" },
                { quote: "Y'all have worked wonders with me. It just clicked. Batted .385 for the whole season, .550 in district, 39 hits.", name: "Hudson Sharp", tag: "High School · .385 Season · .550 in District · 39 Hits" },
                { quote: "I'm doing the piggyback every day. I could just tell the balls come off harder — I could just see the difference. Four home runs in six games.", name: "Daunte Stuart", tag: "Indy Ball → Philadelphia Phillies · 4 HR in 6 Games" },
                { quote: "My swing has felt more easy and repeatable while adding an average of 5 mph of bat speed. I've felt more confident and free in the box than ever before.", name: "Spencer Dailey", tag: "D3 → Upper Iowa University · +5 MPH Bat Speed" },
                { quote: "I ended up hitting a distance PR and an exit velocity PR in the same day after a 30-minute call. I've gone from a pushy, scared hitter to more confident than ever, crushing the ball to all sides of the field.", name: "Max Frazier", tag: "High School · 87 MPH EV PR Beat Day 1 of Week 2" },
                { quote: "Mid-season turnaround. 10 home runs and a D1 transfer.", name: "Dom", tag: "Cal → Arizona State (D1) · .220 / 4 HR → .275 / 10 HR" },
                { quote: "Before the program, pitches I could have put over the fence in left field — I'd just put up the middle because I'd never get the delivery of the barrel. Now I can tell when I'm not delivering it, and I know exactly how to fix it. There are unlocks still coming.", name: "Sam Campin", tag: "College · 91 → 94 EV · +4–6 MPH Off Flips in 2 Weeks" },
                { quote: "Once I found that natural flow of my swing, it just feels better than ever. You can consistently drive balls and not really worry when you're in the box.", name: "Ethan Ketterer", tag: "College · Eastern University" },
                { quote: "My swing just feels so much cleaner, so much more refined. There's not a whole bunch of moving parts. I just feel athletic when I swing.", name: "Graham TooGood", tag: "High School Freshman · Liberty High School TX" },
                { quote: "There are certain people that need to be coaches, and to me you're one of those guys. It was well worth the money.", name: "Graham TooGood's Dad", tag: "Parent" },
                { quote: "I might have gotten one or two hits all of last spring. Turning around this year, I don't think there was a game where I didn't catch a barrel.", name: "Ryan Foster", tag: "D2 · University of Jamestown · 2 Hits All Last Spring → Barreling Every Game" },
                { quote: "His approach is spot on — he tailors the program to the individual. He takes the player's natural swing and adds small, incremental tweaks to get the most out of it versus trying to rebuild the entire swing. Buy in is 100%.", name: "Travis Foster", tag: "Parent · Ryan Foster's Dad" },
                { quote: "It took hitting from this complex 10 different steps to — all I have to think about now is hit the ball. My head is so much more calm. Some of the farthest balls I've ever hit in my life. Just constantly.", name: "Brady Greene", tag: "High School · Kentucky" },
                { quote: "My experience has been great. There are over 50 guys and counting in here and still somehow it feels like I'm the only one getting trained. This is ran really well and I'm getting better every day.", name: "Tony Woodie", tag: "JUCO · 3 HR → 8 HR (Single Season HR & RBI Record)" },
                { quote: "This program has been a crazy unlock. Absolutely nuts. It sounds crazy over the internet but it's more real than just working with whoever in person.", name: "Colton Warmack", tag: "JUCO" },
                { quote: "Now that I can just trust it — I don't have to worry about it. I look confident walking into the box and they throw me curveballs. They think they can get me out with them. They can't.", name: "Ryan Duffy", tag: "High School · Massachusetts · Batting 3-4 Hole at 14" },
                { quote: "He learned so much from Jantzen, tells me what we need to do. I do what he tells me. It's been amazing seeing the progress.", name: "Ryan Duffy's Mom", tag: "Parent" },
                { quote: "Working with Jantzen this year has been a blast! He transformed my swing in ways that didn't seem within my capabilities at first, but I trusted his process and the results speak for itself!", name: "Anthony Della Rosa", tag: "High School" },
                { quote: "Yeah dude best swings of my life just like you said.", name: "Toufic", tag: "JUCO · 5★" },
                { quote: "Completely changed my game. After working with Jantzen I had one of my best hitting seasons. He doesn't change you — he just makes you better.", name: "Benjamin Wallace", tag: "Player · 5★" },
                { quote: "Has gave me a lot of confidence in my swing.", name: "Luke Hargis", tag: "High School Catcher" },
                { quote: "Jantzen is one of the most encouraging, positive, and knowledgeable coaches I've ever worked with. He truly cares about the players he works with.", name: "Courtney Gregory", tag: "Parent" },
                { quote: "The improvement in the mindset of hitting has been amazing.", name: "Barney Wiley", tag: "Parent · 10 Years" },
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

      {/* ── 6. GUARANTEE (before urgency strip) ─────────────── */}
      <section style={{ backgroundColor: "#f5f4f0", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <span style={{ color: crimsonLight, fontSize: "1.2rem" }}>🛡</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: crimsonLight }}>The Guarantee</span>
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#111111", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              +5 MPH exit velocity in 30 days —<br />or we work with you for free until you do.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.8, color: "#666666" }}>
              And if you don't care about exit velo — we guarantee your swing will feel more natural than it ever has, or same deal. We make big guarantees because we genuinely want to help as many talented hitters as we can. If we're not getting you results, we don't deserve your money.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. URGENCY STRIP (last thing they read) ─────────── */}
      <section style={{ backgroundColor: crimson, padding: "clamp(2.5rem, 6vw, 4rem) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>
              You booked this call for a reason.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.85rem, 2vw, 0.95rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem" }}>
              Your window is closing. Every week you spend overthinking mechanics is a week you're not getting better. We'll see you on the call.
            </p>
            <a href={buildGoogleCalendarLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "white", color: crimson, padding: "0.85rem 1.75rem", textDecoration: "none" }}>
              📅 Add to Google Calendar
            </a>
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
