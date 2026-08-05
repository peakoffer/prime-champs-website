import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type LeadType = "athlete" | "brand";

const allowedOrigins = new Set([
  "https://www.prime-champs.com",
  "https://prime-champs.com",
  "https://prime-champs-redesign.zacattk1000.chatgpt.site",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
]);

const allowedFields = new Set([
  "primary_sport",
  "experience_level",
  "instagram_handle",
  "tiktok_handle",
  "youtube_handle",
  "twitter_handle",
  "social_media_following",
  "notable_achievements",
  "current_sponsorships",
  "career_goals",
  "additional_info",
  "company_name",
  "role",
  "company_website",
  "industry",
  "partnership_budget",
  "target_sports",
  "campaign_goals",
  "target_audience",
  "partnership_timeline",
]);

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin",
  };
}

function respond(origin: string, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin),
  });
}

function clean(value: unknown, max = 2_000): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(/\u0000/g, "");
  return normalized ? normalized.slice(0, max) : null;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char] ?? char);
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function envKey(groupName: string, fallbackName: string) {
  const group = Deno.env.get(groupName);
  if (group) {
    try {
      const keys = JSON.parse(group) as Record<string, string>;
      if (keys.default) return keys.default;
    } catch {
      // Use the legacy built-in variable when a key group is unavailable.
    }
  }
  return Deno.env.get(fallbackName) ?? "";
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") ?? "";
  if (!allowedOrigins.has(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed." }), {
      status: 403,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return respond(origin, { error: "Method not allowed." }, 405);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 50_000) {
    return respond(origin, { error: "Submission is too large." }, 413);
  }

  const publishableKey = envKey("SUPABASE_PUBLISHABLE_KEYS", "SUPABASE_ANON_KEY");
  if (!publishableKey || request.headers.get("apikey") !== publishableKey) {
    return respond(origin, { error: "Invalid client credential." }, 401);
  }

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return respond(origin, { error: "Invalid JSON payload." }, 400);
  }

  if (clean(input.company_fax, 200)) {
    return respond(origin, { ok: true });
  }

  const leadType = clean(input.lead_type, 20) as LeadType | null;
  const fullName = clean(input.full_name, 120);
  const email = clean(input.email, 254)?.toLowerCase() ?? null;
  const phone = clean(input.phone, 50);

  if (!leadType || !["athlete", "brand"].includes(leadType)) {
    return respond(origin, { error: "Choose an athlete or brand inquiry." }, 400);
  }
  if (!fullName || fullName.length < 2) {
    return respond(origin, { error: "Enter your full name." }, 400);
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(origin, { error: "Enter a valid email address." }, 400);
  }

  const details: Record<string, string> = {};
  for (const field of allowedFields) {
    const value = clean(input[field], field.includes("website") ? 500 : 2_000);
    if (value) details[field] = value;
  }

  const requiredFields = leadType === "athlete"
    ? ["primary_sport", "experience_level", "career_goals"]
    : ["company_name", "role", "target_sports", "campaign_goals"];
  const missing = requiredFields.find((field) => !details[field]);
  if (missing) {
    return respond(origin, { error: "Complete the required inquiry fields." }, 400);
  }

  const ip = clean(
    request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "",
    100,
  );
  const [emailHash, ipHash] = await Promise.all([
    sha256(email),
    ip ? sha256(ip) : Promise.resolve(null),
  ]);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const secretKey = envKey("SUPABASE_SECRET_KEYS", "SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !secretKey) {
    console.error("website-intake is missing Supabase environment variables");
    return respond(origin, { error: "The inquiry service is unavailable." }, 503);
  }

  const supabase = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const rateFilters = [`email_hash.eq.${emailHash}`];
  if (ipHash) rateFilters.push(`ip_hash.eq.${ipHash}`);

  const { count: recentCount, error: countError } = await supabase
    .from("website_leads")
    .select("id", { count: "exact", head: true })
    .or(rateFilters.join(","))
    .gte("created_at", oneHourAgo);

  if (countError) {
    console.error("website-intake rate check failed", countError.message);
    return respond(origin, { error: "The inquiry service is unavailable." }, 503);
  }
  if ((recentCount ?? 0) >= 5) {
    return respond(origin, { error: "Too many recent submissions. Please try again later." }, 429);
  }

  const isTest = email.endsWith("@invalid.example");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const resendFrom = Deno.env.get("RESEND_FROM_EMAIL");
  const notifyTo = Deno.env.get("LEAD_NOTIFICATION_EMAIL") ?? "info@prime-champs.com";
  const canNotify = Boolean(resendKey && resendFrom && !isTest);

  const { data: lead, error: insertError } = await supabase
    .from("website_leads")
    .insert({
      lead_type: leadType,
      full_name: fullName,
      email,
      phone,
      company_name: details.company_name ?? null,
      primary_sport: details.primary_sport ?? null,
      details,
      source_url: clean(input.source_url, 1_000),
      referrer: clean(input.referrer, 1_000),
      request_origin: origin,
      user_agent: clean(request.headers.get("user-agent"), 500),
      ip_hash: ipHash,
      email_hash: emailHash,
      notification_status: isTest ? "suppressed" : canNotify ? "pending" : "not_configured",
      is_test: isTest,
    })
    .select("id")
    .single();

  if (insertError || !lead) {
    console.error("website-intake insert failed", insertError?.message);
    return respond(origin, { error: "The inquiry could not be saved." }, 500);
  }

  if (canNotify) {
    const summary = Object.entries(details)
      .map(([key, value]) => `<li><strong>${escapeHtml(key.replaceAll("_", " "))}:</strong> ${escapeHtml(value)}</li>`)
      .join("");
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [notifyTo],
          reply_to: email,
          subject: `New Prime Champs ${leadType} inquiry — ${fullName}`,
          html: `<h1>New ${escapeHtml(leadType)} inquiry</h1><p><strong>Name:</strong> ${escapeHtml(fullName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}<ul>${summary}</ul>`,
        }),
      });
      await supabase
        .from("website_leads")
        .update({
          notification_status: emailResponse.ok ? "sent" : "failed",
          notified_at: emailResponse.ok ? new Date().toISOString() : null,
        })
        .eq("id", lead.id);
      if (!emailResponse.ok) console.error("website-intake Resend delivery failed", emailResponse.status);
    } catch (error) {
      console.error("website-intake notification failed", error);
      await supabase.from("website_leads").update({ notification_status: "failed" }).eq("id", lead.id);
    }
  }

  return respond(origin, { ok: true }, 201);
});
