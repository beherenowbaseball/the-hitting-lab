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

const OPTIN_ENDPOINT = "/.netlify/functions/optin";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function EmailGate({ onUnlock }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    // POST to secure backend endpoint — creates contact in GHL
    let webhookOk = false;
    try {
      const res = await fetch(OPTIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          source: "Be The Best Baseball — Drill Library Gate",
          tags: ["hitting-lab-lead"],
        }),
      });
      webhookOk = res.ok;
      if (!res.ok) {
        // Log for debugging but don't block the user
        console.warn("Optin endpoint returned", res.status);
      }
    } catch (err) {
      // Network error — still unlock so we never lose a lead
      console.warn("Optin endpoint network error:", err);
    }

    // Always unlock regardless of webhook status — never lose a lead
    localStorage.setItem("thl_unlocked", "1");
    localStorage.setItem("thl_name", firstName.trim());
    localStorage.setItem("thl_last_name", lastName.trim());
    localStorage.setItem("thl_email", email.trim());

    // Fire GA4 email opt-in event
    window.trackEvent?.("email_opt_in", {
      method: "drill_gate",
      first_name: firstName.trim(),
      webhook_ok: webhookOk,
    });

    // Fire Meta Pixel Lead event
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
      (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("track", "Lead", {
        content_name: "32-Drill Framework",
        content_category: "Baseball Hitting",
      });
    }

    setLoading(false);
    onUnlock();
    // Redirect to the post-opt-in drills page with welcome video
    setLocation("/drills");
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
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.7rem", color: "oklch(0.12 0.005 65)", letterSpacing: "0.05em" }}>BE THE BEST BASEBALL</div>
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
          Hit the ball harder<br />without overthinking mechanics.
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
          Enter your name and email to unlock the full 32-drill framework — free.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
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
              name="firstName"
              type="text"
              required
              placeholder="Ryan"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); if (error) setError(""); }}
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
            <div style={{ flex: 1 }}>
            <label
              htmlFor="gate-last-name"
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
              Last Name
            </label>
            <input
              id="gate-last-name"
              name="lastName"
              type="text"
              required
              placeholder="Foster"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); if (error) setError(""); }}
              autoComplete="family-name"
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
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
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
          No spam. Unsubscribe anytime. Join 50+ players already in the program.
        </p>
      </div>
    </div>
  );
}
