// Shared logic for the /catering-leads ad landing page (DRAFT - not launched).
//
// Kept free of Next.js / React imports so the same code runs in the page, the
// API route and the plain `node --test` suite (tests/catering-leads.test.mjs).

export const OFFERS = {
  "per-lead": {
    headline: "Get corporate catering leads for as low as $5/lead",
    priceLine: "As low as $5 per lead.",
  },
  monthly: {
    headline: "Get 5-10 corporate catering leads for as low as $30/mo",
    priceLine: "As low as $30 a month.",
  },
} as const;

export type OfferId = keyof typeof OFFERS;

export const DEFAULT_OFFER: OfferId = "per-lead";

/** Resolve the `?offer=` query param. Anything unknown falls back to per-lead. */
export function resolveOffer(value: unknown): OfferId {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(OFFERS, v)
    ? (v as OfferId)
    : DEFAULT_OFFER;
}

/** Same options, same order, as the Facebook lead form. */
export const BUSINESS_TYPES = [
  "Full-service restaurant",
  "Fast food / counter service",
  "Coffee / cafe / bakery",
  "Fine dining",
  "Bar / tavern / brewery",
  "Food truck / cart",
  "Caterer",
  "Not a food business",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

/** These never become a lead: no client-side submit, no webhook post. */
export const DISQUALIFIED_BUSINESS_TYPES: readonly BusinessType[] = [
  "Bar / tavern / brewery",
  "Not a food business",
];

export function isDisqualifiedBusinessType(value: unknown): boolean {
  return (
    typeof value === "string" &&
    (DISQUALIFIED_BUSINESS_TYPES as readonly string[]).includes(value)
  );
}

export const DISQUALIFIED_MESSAGE =
  "Thanks - this offer is for restaurants and caterers right now.";

export const CONTACT_EMAIL = "admin@cohesiveapp.com";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export const WEBHOOK_ENV_VAR = "CATERING_LEADS_WEBHOOK_URL";

export interface CateringLeadInput {
  offer: string;
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  businessName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  utm?: Partial<Record<UtmKey, string>>;
  pageUrl?: string;
  /** Honeypot. Real people never see or fill it. */
  website?: string;
}

export interface CateringLeadPayload {
  source: string;
  offer: OfferId;
  headline: string;
  full_name: string;
  email: string;
  phone: string;
  business_type: BusinessType;
  business_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  page_url: string;
  submitted_at: string;
}

const MAX_LEN = 200;

function clean(value: unknown, max = MAX_LEN): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Returns field -> message for every problem; empty object when valid. */
export function validateLead(input: Partial<CateringLeadInput>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!clean(input.fullName)) errors.fullName = "Please enter your name.";
  const email = clean(input.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";
  if (clean(input.phone).replace(/\D/g, "").length < 10) {
    errors.phone = "Please enter a phone number with area code.";
  }
  if (!(BUSINESS_TYPES as readonly string[]).includes(clean(input.businessType))) {
    errors.businessType = "Please choose your business type.";
  }
  if (!clean(input.businessName)) errors.businessName = "Please enter your business name.";
  if (!clean(input.street)) errors.street = "Please enter your street address.";
  if (!clean(input.city)) errors.city = "Please enter your city.";
  if (!clean(input.state)) errors.state = "Please enter your state.";
  if (!/^\d{5}(-\d{4})?$/.test(clean(input.zip))) errors.zip = "Please enter a 5-digit ZIP.";
  return errors;
}

/** The exact JSON body sent to the webhook. Assumes validateLead() passed. */
export function buildLeadPayload(
  input: CateringLeadInput,
  now: Date = new Date(),
): CateringLeadPayload {
  const offer = resolveOffer(input.offer);
  const utm = input.utm ?? {};
  return {
    source: `catering-leads-${offer}`,
    offer,
    headline: OFFERS[offer].headline,
    full_name: clean(input.fullName),
    email: clean(input.email).toLowerCase(),
    phone: clean(input.phone),
    business_type: clean(input.businessType) as BusinessType,
    business_name: clean(input.businessName),
    street: clean(input.street),
    city: clean(input.city),
    state: clean(input.state),
    zip: clean(input.zip),
    utm_source: clean(utm.utm_source),
    utm_medium: clean(utm.utm_medium),
    utm_campaign: clean(utm.utm_campaign),
    utm_content: clean(utm.utm_content),
    utm_term: clean(utm.utm_term),
    fbclid: clean(utm.fbclid, 500),
    page_url: clean(input.pageUrl, 1000),
    submitted_at: now.toISOString(),
  };
}

export type SubmitStatus =
  | "ok"
  | "disqualified"
  | "invalid"
  | "not_configured"
  | "upstream_error";

export interface SubmitResult {
  status: number;
  body: { status: SubmitStatus; errors?: Record<string, string>; message?: string };
}

type FetchLike = (
  url: string,
  init: { method: string; headers: Record<string, string>; body: string; signal?: AbortSignal },
) => Promise<{ ok: boolean; status: number }>;

/**
 * Server-side submit handler. Order matters:
 *   1. honeypot -> pretend success, drop it
 *   2. bars / non-food -> polite end message, NEVER forwarded
 *   3. field validation -> 400
 *   4. webhook env var unset -> 503 (page shows "please email us"), nothing dropped silently
 *   5. forward to webhook -> 200, or 502 if the webhook fails
 */
export async function handleCateringLeadSubmission(
  raw: unknown,
  env: Record<string, string | undefined>,
  fetchImpl: FetchLike,
  now: Date = new Date(),
): Promise<SubmitResult> {
  const input = (raw && typeof raw === "object" ? raw : {}) as Partial<CateringLeadInput>;

  if (clean(input.website)) {
    return { status: 200, body: { status: "ok" } };
  }

  if (isDisqualifiedBusinessType(clean(input.businessType))) {
    return { status: 200, body: { status: "disqualified", message: DISQUALIFIED_MESSAGE } };
  }

  const errors = validateLead(input);
  if (Object.keys(errors).length > 0) {
    return { status: 400, body: { status: "invalid", errors } };
  }

  const webhookUrl = env[WEBHOOK_ENV_VAR]?.trim();
  if (!webhookUrl) {
    return {
      status: 503,
      body: {
        status: "not_configured",
        message: `We couldn't take your details online right now. Please email us at ${CONTACT_EMAIL}.`,
      },
    };
  }

  const payload = buildLeadPayload(input as CateringLeadInput, now);
  try {
    const res = await fetchImpl(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch {
    return {
      status: 502,
      body: {
        status: "upstream_error",
        message: `Something went wrong sending your details. Please email us at ${CONTACT_EMAIL}.`,
      },
    };
  }

  return { status: 200, body: { status: "ok" } };
}

// Kevin 2026-10-12: after the form, ask the lead to book a demo. Name and email are prefilled, and the
// utm fields tag the booking so a Calendly export / API read can split booked vs not-booked leads (the
// team calls the ones who don't book).
export const CALENDLY_DEMO_URL = "https://calendly.com/cohesiveapp/demo";

export function calendlyBookingUrl(input: { fullName?: string; email?: string; offer: string; utm?: Record<string, string | undefined> }): string {
  const url = new URL(CALENDLY_DEMO_URL);
  if (input.fullName?.trim()) url.searchParams.set("name", input.fullName.trim());
  if (input.email?.trim()) url.searchParams.set("email", input.email.trim());
  url.searchParams.set("utm_source", "catering-leads");
  url.searchParams.set("utm_medium", input.offer);
  if (input.utm?.utm_campaign) url.searchParams.set("utm_campaign", input.utm.utm_campaign);
  if (input.utm?.utm_content) url.searchParams.set("utm_content", input.utm.utm_content);
  return url.toString();
}
