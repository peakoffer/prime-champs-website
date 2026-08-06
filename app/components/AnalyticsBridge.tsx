"use client";

import { useEffect } from "react";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

const EVENT_ENDPOINT =
  "https://rmxuwyxpoazsuqvdadlo.supabase.co/functions/v1/website-intake";
const SUPABASE_PUBLIC_KEY =
  "sb_publishable_BvB_25z_7HLt3wlp1DUGhw_OLZwhspi";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function getSessionId() {
  const storageKey = "prime_champs_session";
  const sessionId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

  try {
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) return existing;
    window.sessionStorage.setItem(storageKey, sessionId);
  } catch {
    // Storage can be unavailable in strict privacy modes; the event can still be sent.
  }

  return sessionId;
}

export function trackEvent(name: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") return;

  try {
    const detail = {
      event: `prime_champs_${name}`,
      path: window.location.pathname,
      ...properties,
    };

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent("prime-champs:conversion", { detail }));

    void fetch(EVENT_ENDPOINT, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLIC_KEY,
        "Content-Type": "application/json",
        "x-client-info": "prime-champs-sites/3.0",
      },
      body: JSON.stringify({
        event_type: name,
        event_data: {
          ...properties,
          path: window.location.pathname,
          referrer: document.referrer || null,
          session_id: getSessionId(),
        },
      }),
      keepalive: true,
    }).catch(() => {
      // Analytics must never interrupt the visitor journey.
    });
  } catch {
    // Analytics must never interrupt the visitor journey.
  }
}

export function AnalyticsBridge() {
  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();

    function handleClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const tracked = target?.closest<HTMLElement>("[data-track]");
      if (!tracked) return;

      trackEvent(tracked.dataset.track ?? "cta_click", {
        label: tracked.dataset.trackLabel ?? tracked.textContent?.trim() ?? null,
        location: tracked.dataset.trackLocation ?? null,
        destination: tracked instanceof HTMLAnchorElement ? tracked.href : null,
      });
    }

    function handleFormStart(event: Event) {
      const target = event.target as Element | null;
      const form = target?.closest<HTMLFormElement>("form[data-track-form]");
      if (!form || startedForms.has(form)) return;

      startedForms.add(form);
      trackEvent("form_started", {
        form: form.dataset.trackForm ?? "application",
        lead_type: form.dataset.leadType ?? null,
      });
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("input", handleFormStart, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("input", handleFormStart, true);
    };
  }, []);

  return null;
}
