/* ============================================================
   EmailGate — full-screen overlay lead capture
   Collects first name + email before unlocking the drill library
   Stores unlock state in localStorage so it persists across visits
   ============================================================ */

import { useState } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

interface Props {
  onUnlock: () => void;
}

export default function EmailGate({ onUnlock }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const isValid = firstName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/UtNl0ujIXlsH5AXSkQYf/webhook-trigger/948f86f0-14b1-475c-a92d-f38771abd33e";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setLoading(true);
    setError("");

    // Fire GHL webhook — fire-and-forget, don't block unlock on response
    try {
      await fetch(GHL_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          source: "The Hitting Lab — Drill Library Gate",
          tags: ["hitting-lab-lead"],
        }),
      });
    } catch (_) {
      // Silently ignore network errors — still unlock the library
    }

    // Store in localStorage so they don't see the gate again
    localStorage.setItem("thl_unlocked", "1");
    localStorage.setItem("thl_name", firstName.trim());

    // Fire GA4 email opt-in event
    window.trackEvent?.("email_opt_in", {
      method: "drill_gate",
      first_name: firstName.trim(),
    });

    setLoading(false);
    onUnlock();
    // Redirect to VSL + application page
    setLocation("/apply");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "oklch(0.08 0.005 65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero-jantzen.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "white",
          padding: "clamp(2rem, 6vw, 3rem)",
        }}
      >
        {/* Masthead */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "oklch(0.42 0.18 25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>H</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.05em" }}>THE HITTING LAB</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", color: "oklch(0.55 0.01 65)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Jantzen Witte</div>
          </div>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            color: "oklch(0.12 0.005 65)",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}
        >
          Stop Guessing.<br />Start Hitting.
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "oklch(0.45 0.01 65)",
            marginBottom: "1.75rem",
          }}
        >
          Enter your name and email to unlock the full 32-drill framework — the same system I used to survive 12 years in pro ball. Free. No spam.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <label
              htmlFor="gate-name"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.52 0.01 65)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              First Name
            </label>
            <input
              id="gate-name"
              type="text"
              placeholder="Jantzen"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                color: "oklch(0.12 0.005 65)",
                backgroundColor: "oklch(0.97 0.003 80)",
                border: "1px solid oklch(0.88 0.005 80)",
                borderRadius: 0,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.42 0.18 25)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.005 80)")}
            />
          </div>

          <div>
            <label
              htmlFor="gate-email"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.52 0.01 65)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Email Address
            </label>
            <input
              id="gate-email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                color: "oklch(0.12 0.005 65)",
                backgroundColor: "oklch(0.97 0.003 80)",
                border: "1px solid oklch(0.88 0.005 80)",
                borderRadius: 0,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.42 0.18 25)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.005 80)")}
            />
          </div>

          {error && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "oklch(0.42 0.18 25)", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backgroundColor: loading ? "oklch(0.62 0.08 25)" : "oklch(0.42 0.18 25)",
              color: "white",
              border: "none",
              padding: "0.95rem 1.5rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s, opacity 0.2s",
              marginTop: "0.25rem",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? "Unlocking..." : "Unlock the Free Framework →"}
          </button>
        </form>

        {/* Trust line */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 300,
            color: "oklch(0.65 0.008 65)",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          No spam. Unsubscribe anytime. Used by coaches &amp; players at every level.
        </p>
      </div>
    </div>
  );
}
