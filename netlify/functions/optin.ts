import type { Handler } from "@netlify/functions";

const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = "UtNl0ujIXlsH5AXSkQYf";

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body = JSON.parse(event.body || "{}");
    const { firstName, lastName, email, source, tags } = body;

    if (!firstName || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "firstName and email are required" }),
      };
    }

    // Create or update contact in GHL
    const ghlRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GHL_API_KEY}`,
          "Version": "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName?.trim() || "",
          email: email.trim(),
          locationId: GHL_LOCATION_ID,
          source: source || "Be The Best Baseball — Drill Library Gate",
          tags: tags || ["hitting-lab-lead"],
        }),
      }
    );

    const ghlData = await ghlRes.json();

    if (!ghlRes.ok) {
      console.error("GHL API error:", ghlData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to create contact", details: ghlData }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, contactId: ghlData?.contact?.id }),
    };
  } catch (err) {
    console.error("Optin function error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
