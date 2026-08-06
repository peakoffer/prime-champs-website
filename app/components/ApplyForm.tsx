"use client";

import { FormEvent, useRef, useState } from "react";

type LeadType = "athlete" | "brand";

const SUPABASE_FUNCTION_URL =
  "https://rmxuwyxpoazsuqvdadlo.supabase.co/functions/v1/website-intake";

// Publishable keys are designed for browser clients. The Edge Function applies
// origin checks, validation, abuse controls, and performs the privileged insert.
const SUPABASE_PUBLIC_KEY =
  "sb_publishable_BvB_25z_7HLt3wlp1DUGhw_OLZwhspi";

const athleteFields = new Set([
  "primary_sport",
  "experience_level",
  "instagram_handle",
  "career_goals",
]);

const brandFields = new Set([
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

export function ApplyForm({ initialType = "athlete" }: { initialType?: LeadType }) {
  const [leadType, setLeadType] = useState<LeadType>(initialType);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function switchType(type: LeadType) {
    setLeadType(type);
    setStatus("idle");
    setMessage("");
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    if (formData.get("company_fax")) {
      setStatus("success");
      setMessage("Your information has been received.");
      return;
    }

    const payload: Record<string, FormDataEntryValue | null> = {
      lead_type: leadType,
      full_name: formData.get("full_name") ?? "",
      email: formData.get("email") ?? "",
      phone: formData.get("phone") ?? "",
      source_url: window.location.href,
      referrer: document.referrer || null,
    };

    const activeFields = leadType === "athlete" ? athleteFields : brandFields;
    activeFields.forEach((field) => {
      payload[field] = formData.get(field) || null;
    });

    try {
      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLIC_KEY,
          "Content-Type": "application/json",
          "x-client-info": "prime-champs-sites/2.0",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok || result.error) {
        if (response.status === 429 || result.error?.toLowerCase().includes("rate")) {
          throw new Error(
            "Too many recent submissions. Please wait before trying again."
          );
        }
        throw new Error(result.error || "The application could not be sent.");
      }

      formRef.current?.reset();
      setStatus("success");
      setMessage(
        leadType === "athlete"
          ? "Your athlete profile is in. We’ll review the fit and follow up by email."
          : "Your campaign brief is in. We’ll review it and follow up by email."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The application could not be sent. Email info@prime-champs.com instead."
      );
    }
  }

  return (
    <section className="application-panel" aria-labelledby="application-heading">
      <div className="form-intro">
        <p className="eyebrow dark">Choose your lane</p>
        <h2 id="application-heading">
          {leadType === "athlete"
            ? "Send your athlete profile."
            : "Build a campaign with real competitive energy."}
        </h2>
        <p>
          {leadType === "athlete"
            ? "A few essentials are enough to start. We review the whole athlete—not follower count alone."
            : "Tell us the audience, objective, timeline, and budget. We’ll review it against athlete fit, timing, and our current capacity."}
        </p>
        <ul className="form-expectations" aria-label="What happens next">
          <li>{leadType === "athlete" ? "Short athlete application" : "Focused campaign brief"}</li>
          <li>Direct review by Prime Champs</li>
          <li>{leadType === "athlete" ? "No representation or deal guarantee" : "No campaign guarantee"}</li>
        </ul>
      </div>

      <div className="application-form-wrap">
        <div className="form-switch" role="group" aria-label="Inquiry type">
          <button
            type="button"
            className={leadType === "athlete" ? "active" : ""}
            onClick={() => switchType("athlete")}
            aria-pressed={leadType === "athlete"}
          >
            I&apos;m an athlete
          </button>
          <button
            type="button"
            className={leadType === "brand" ? "active" : ""}
            onClick={() => switchType("brand")}
            aria-pressed={leadType === "brand"}
          >
            I represent a brand
          </button>
        </div>

        <form ref={formRef} onSubmit={submitLead}>
          <input
            className="honey-field"
            name="company_fax"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="field-grid two">
            <label>
              Full name <span>*</span>
              <input name="full_name" autoComplete="name" required minLength={2} />
            </label>
            <label>
              Email <span>*</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>

          <label>
            Phone <small>Optional</small>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>

          {leadType === "athlete" ? <AthleteFields /> : <BrandFields />}

          <div className="form-submit-row">
            <button className="button-primary form-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : leadType === "athlete" ? "Send my profile ↗" : "Send campaign brief ↗"}
            </button>
            <p>
              By sending this form, you agree to our{" "}
              <a href="/privacy">privacy policy</a>.
            </p>
          </div>

          <div
            className={`form-status ${status}`}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message}
            {status === "error" && (
              <>
                {" "}
                <a href="mailto:info@prime-champs.com">Email us directly.</a>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function AthleteFields() {
  return (
    <>
      <div className="field-grid two">
        <label>
          Primary sport <span>*</span>
          <select name="primary_sport" required defaultValue="">
            <option value="" disabled>Select sport</option>
            <option>Combat sports</option>
            <option>Motorsports</option>
            <option>Surfing</option>
            <option>Volleyball</option>
            <option>Hockey</option>
            <option>Athletics / track</option>
            <option>Action sports</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Competitive level <span>*</span>
          <select name="experience_level" required defaultValue="">
            <option value="" disabled>Select level</option>
            <option>Professional</option>
            <option>National / international</option>
            <option>Collegiate</option>
            <option>Emerging / developmental</option>
            <option>Creator-athlete</option>
          </select>
        </label>
      </div>

      <label>
        Best social profile <span>*</span>
        <input
          name="instagram_handle"
          required
          placeholder="Instagram, TikTok, YouTube, or profile URL"
          autoComplete="url"
        />
      </label>
      <label>
        What are you looking for? <span>*</span>
        <textarea
          name="career_goals"
          required
          maxLength={1000}
          placeholder="Brand deals, representation, campaign support, or something else?"
        />
      </label>
    </>
  );
}

function BrandFields() {
  return (
    <>
      <div className="field-grid two">
        <label>
          Company <span>*</span>
          <input name="company_name" autoComplete="organization" required />
        </label>
        <label>
          Your role <span>*</span>
          <input name="role" autoComplete="organization-title" required />
        </label>
      </div>

      <div className="field-grid two">
        <label>
          Company website
          <input name="company_website" placeholder="yourbrand.com" inputMode="url" />
        </label>
        <label>
          Industry <small>Optional</small>
          <select name="industry" defaultValue="">
            <option value="">Select industry</option>
            <option>Sports and fitness</option>
            <option>Apparel and equipment</option>
            <option>Food and beverage</option>
            <option>Technology</option>
            <option>Media and entertainment</option>
            <option>Financial services</option>
            <option>Health and wellness</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <div className="field-grid two">
        <label>
          Partnership budget <small>Optional</small>
          <select name="partnership_budget" defaultValue="">
            <option value="">Select range</option>
            <option>Under $10K</option>
            <option>$10K–$25K</option>
            <option>$25K–$50K</option>
            <option>$50K–$100K</option>
            <option>$100K+</option>
            <option>Open / not set</option>
          </select>
        </label>
        <label>
          Desired start <small>Optional</small>
          <select name="partnership_timeline" defaultValue="">
            <option value="">Select timeline</option>
            <option>Within 30 days</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6+ months</option>
            <option>Exploring</option>
          </select>
        </label>
      </div>

      <label>
        Target sports <span>*</span>
        <input
          name="target_sports"
          required
          placeholder="For example: MMA, surfing, motorsports"
          maxLength={500}
        />
      </label>
      <label>
        Campaign goal <span>*</span>
        <textarea
          name="campaign_goals"
          required
          maxLength={2000}
          placeholder="Launch, awareness, content, conversion, event activation, or something else?"
        />
      </label>
      <label>
        Audience <small>Optional</small>
        <textarea
          name="target_audience"
          maxLength={2000}
          placeholder="Who needs to believe, care, or act?"
        />
      </label>
    </>
  );
}
