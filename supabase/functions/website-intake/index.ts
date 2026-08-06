import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type LeadType = "athlete" | "brand";
type SupabaseClient = ReturnType<typeof createClient>;

const allowedOrigins = new Set([
  "https://www.prime-champs.com",
  "https://prime-champs.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
]);

const allowedFields = new Set([
  "primary_sport",
  "experience_level",
  "instagram_handle",
  "career_goals",
  "company_name",
  "role",
  "company_website",
  "industry",
  "partnership_budget",
  "target_sports",
  "campaign_goals",
  "target_audience",
  "partnership_timeline",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
]);

const allowedEvents = new Set([
  "cta_click",
  "form_type_selected",
  "form_started",
  "form_submit_success",
  "form_submit_error",
]);

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
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
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
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

function cleanEventData(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const output: Record<string, string | number | boolean | null> = {};
  for (const [key, entry] of Object.entries(value).slice(0, 20)) {
    const safeKey = key.replace(/[^a-z0-9_]/gi, "").slice(0, 50);
    if (!safeKey) continue;
    if (typeof entry === "string") output[safeKey] = clean(entry, 500);
    if (typeof entry === "number" && Number.isFinite(entry)) output[safeKey] = entry;
    if (typeof entry === "boolean" || entry === null) output[safeKey] = entry;
  }
  return output;
}

function normalizeSocialProfile(value: string) {
  const trimmed = value.trim();
  if (!trimmed.includes(".") && !trimmed.includes("/")) {
    return { instagram_handle: trimmed.replace(/^@/, "").toLowerCase() };
  }

  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    const handle = url.pathname.split("/").filter(Boolean)[0]?.replace(/^@/, "").toLowerCase() ?? null;
    if (url.hostname.includes("instagram.com")) {
      return { instagram_handle: handle, instagram_url: url.toString() };
    }
    if (url.hostname.includes("tiktok.com")) {
      return { tiktok_handle: handle, tiktok_url: url.toString() };
    }
    return { profile_url: url.toString() };
  } catch {
    return { profile_url: trimmed };
  }
}

async function routeLeadToCrm(
  supabase: SupabaseClient,
  lead: { id: string; lead_type: LeadType; full_name: string; email: string; phone: string | null },
  details: Record<string, string>,
) {
  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select("id")
    .eq("slug", "prime-champs")
    .single();

  if (organizationError || !organization) {
    throw new Error("Prime Champs organization was not found.");
  }

  if (lead.lead_type === "brand") {
    const { error: notificationError } = await supabase
      .from("activity_notifications")
      .insert({
        organization_id: organization.id,
        type: "website_brand_inquiry",
        title: "New website brand inquiry",
        message: `${lead.full_name} from ${details.company_name} submitted a campaign brief.`,
        metadata: {
          website_lead_id: lead.id,
          email: lead.email,
          phone: lead.phone,
          company_name: details.company_name,
          role: details.role,
          campaign_goals: details.campaign_goals,
          target_sports: details.target_sports,
        },
        link: "/",
      });
    if (notificationError) throw notificationError;

    const { error: routeUpdateError } = await supabase
      .from("website_leads")
      .update({
        organization_id: organization.id,
        routing_status: "routed",
        routed_at: new Date().toISOString(),
      })
      .eq("id", lead.id);
    if (routeUpdateError) throw routeUpdateError;
    return null;
  }

  const social = normalizeSocialProfile(details.instagram_handle);
  let existingAthlete: { id: string } | null = null;

  const { data: emailMatch } = await supabase
    .from("athletes")
    .select("id")
    .eq("organization_id", organization.id)
    .eq("email", lead.email)
    .limit(1)
    .maybeSingle();
  existingAthlete = emailMatch;

  if (!existingAthlete && social.instagram_handle) {
    const { data: handleMatch } = await supabase
      .from("athletes")
      .select("id")
      .eq("organization_id", organization.id)
      .eq("instagram_handle", social.instagram_handle)
      .limit(1)
      .maybeSingle();
    existingAthlete = handleMatch;
  }

  let athleteId = existingAthlete?.id ?? null;
  if (!athleteId) {
    const notes = [
      "Inbound website application.",
      `Competitive level: ${details.experience_level}`,
      `Goals: ${details.career_goals}`,
      lead.phone ? `Phone: ${lead.phone}` : null,
      `Website lead: ${lead.id}`,
    ].filter(Boolean).join("\n");

    const { data: athlete, error: athleteError } = await supabase
      .from("athletes")
      .insert({
        organization_id: organization.id,
        name: lead.full_name,
        sport: details.primary_sport,
        email: lead.email,
        ...social,
        notes,
        source: "manual",
        enrichment_status: "pending",
        pipeline_stage: "approval",
      })
      .select("id")
      .single();
    if (athleteError || !athlete) throw athleteError ?? new Error("Athlete routing failed.");
    athleteId = athlete.id;
  }

  const { error: notificationError } = await supabase
    .from("activity_notifications")
    .insert({
      organization_id: organization.id,
      athlete_id: athleteId,
      type: "website_athlete_application",
      title: "New website athlete application",
      message: `${lead.full_name} applied through prime-champs.com.`,
      metadata: { website_lead_id: lead.id, matched_existing: Boolean(existingAthlete) },
      link: `/athletes/${athleteId}`,
    });
  if (notificationError) console.error("Website lead notification failed", notificationError.message);

  const { error: routeUpdateError } = await supabase
    .from("website_leads")
    .update({
      organization_id: organization.id,
      crm_athlete_id: athleteId,
      routing_status: "routed",
      routed_at: new Date().toISOString(),
    })
    .eq("id", lead.id);
  if (routeUpdateError) throw routeUpdateError;

  return athleteId;
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

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const secretKey = envKey("SUPABASE_SECRET_KEYS", "SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !secretKey) {
    console.error("website-intake is missing Supabase environment variables");
    return respond(origin, { error: "The inquiry service is unavailable." }, 503);
  }
  const supabase = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const eventType = clean(input.event_type, 64);
  if (eventType) {
    if (!allowedEvents.has(eventType)) {
      return respond(origin, { error: "Unknown event type." }, 400);
    }
    const { error: eventError } = await supabase.from("analytics_events").insert({
      event_type: `website_${eventType}`,
      metadata: cleanEventData(input.event_data),
    });
    if (eventError) {
      console.error("website-intake event insert failed", eventError.message);
      return respond(origin, { error: "Event could not be recorded." }, 500);
    }
    return respond(origin, { ok: true }, 202);
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
    ? ["primary_sport", "experience_level", "instagram_handle", "career_goals"]
    : ["company_name", "role", "target_sports", "campaign_goals"];
  if (requiredFields.some((field) => !details[field])) {
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

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1_000).toISOString();
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
    .select("id,lead_type,full_name,email,phone")
    .single();

  if (insertError || !lead) {
    console.error("website-intake insert failed", insertError?.message);
    return respond(origin, { error: "The inquiry could not be saved." }, 500);
  }

  if (!isTest) {
    try {
      await routeLeadToCrm(supabase, lead, details);
    } catch (error) {
      const routingError = error instanceof Error ? error.message : "Unknown routing error";
      console.error("website-intake CRM routing failed", routingError);
      await supabase.from("website_leads").update({
        routing_status: "failed",
        routing_error: routingError.slice(0, 1_000),
      }).eq("id", lead.id);
    }
  } else {
    await supabase.from("website_leads").update({ routing_status: "not_applicable" }).eq("id", lead.id);
  }

  await supabase.from("analytics_events").insert({
    event_type: "website_form_submitted",
    metadata: { website_lead_id: lead.id, lead_type: leadType, is_test: isTest },
  });

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
      await supabase.from("website_leads").update({
        notification_status: emailResponse.ok ? "sent" : "failed",
        notified_at: emailResponse.ok ? new Date().toISOString() : null,
      }).eq("id", lead.id);
      if (!emailResponse.ok) console.error("website-intake Resend delivery failed", emailResponse.status);
    } catch (error) {
      console.error("website-intake notification failed", error);
      await supabase.from("website_leads").update({ notification_status: "failed" }).eq("id", lead.id);
    }
  }

  return respond(origin, { ok: true }, 201);
});
