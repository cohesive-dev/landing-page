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
  "Caterer only (no physical location)",
  "Not a food business",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

/** These never become a lead: no client-side submit, no webhook post. */
export const DISQUALIFIED_BUSINESS_TYPES: readonly BusinessType[] = [
  "Bar / tavern / brewery",
  "Food truck / cart", // Kevin 2026-10-12: food trucks decline too
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
// Kevin 2026-10-12 ("could we just do this via n8n?"): the default destination is the n8n workflow
// "Cohesive AI catering leads (website) -> Slack group (En, Mario, Christopher)", which re-validates the lead,
// drops bars / food trucks / non-food / test identities and posts to the group DM. The env var still overrides it.
export const DEFAULT_WEBHOOK_URL = "https://cohesive-ai.app.n8n.cloud/webhook/cai-catering-leads-991ad10d836d";

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
  /** Sent by the page when a visitor leaves after giving an email or phone without submitting. */
  partial?: boolean;
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
  /** true = the visitor left before submitting (only email and/or phone are guaranteed). */
  partial?: boolean;
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
    ...(input.partial === true ? { partial: true } : {}),
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
) => Promise<{ ok: boolean; status: number; json?: () => Promise<unknown> }>;

// Kevin 2026-10-12: every lead goes to a Slack group DM (En, Mario, Christopher). With both of these set the
// route posts there directly; otherwise it posts to CATERING_LEADS_WEBHOOK_URL, or DEFAULT_WEBHOOK_URL (n8n) when unset.
export const SLACK_TOKEN_ENV_VAR = "CATERING_LEADS_SLACK_BOT_TOKEN";
export const SLACK_CHANNEL_ENV_VAR = "CATERING_LEADS_SLACK_CHANNEL";

const OFFER_LABEL: Record<string, string> = { "per-lead": "$5/lead offer", monthly: "$30/mo offer" };

// The "Email:" line is read back by the booking checker (Calendly match), so keep it on its own line.
export function slackLeadText(raw: CateringLeadPayload): string {
  const p = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v.replace(/[\r\n\u2028\u2029]+/g, " ").trim() : v]),
  ) as CateringLeadPayload;
  const address = [p.street, p.city, p.state, p.zip].filter(Boolean).join(", ");
  return [
    p.partial
      ? `Partial catering lead (website, ${OFFER_LABEL[p.offer] ?? p.offer}): left without submitting - follow up`
      : `New catering lead (website, ${OFFER_LABEL[p.offer] ?? p.offer})`,
    (p.business_name || p.business_type) &&
      `Business: ${p.business_name}${p.business_type ? ` (${p.business_type})` : ""}`,
    p.full_name && `Name: ${p.full_name}`,
    p.phone && `Phone: ${p.phone}`,
    p.email && `Email: ${p.email}`,
    address && `Address: ${address}`,
    p.utm_campaign && `Campaign: ${p.utm_campaign}${p.utm_content ? ` / ${p.utm_content}` : ""}`,
    p.partial
      ? "They left the form before submitting, so they were not asked to book. Reach out with whatever they gave."
      : "They were asked to book a demo (calendly.com/cohesiveapp/demo). Booking status will be posted in this thread; call them if they don't book.",
  ].filter(Boolean).join("\n");
}

/**
 * Server-side submit handler. Order matters:
 *   1. honeypot -> pretend success, drop it
 *   2. bars / food trucks / non-food -> polite end message, NEVER forwarded
 *   3. field validation -> 400
 *   4. Slack token + channel set -> post to the group DM: 200, or 502 if Slack fails (webhook not consulted)
 *   5. else forward to CATERING_LEADS_WEBHOOK_URL, or the default n8n webhook -> 200, or 502 if it fails
 *      (the page then shows "please email us", nothing dropped silently)
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

  const partial = input.partial === true;
  if (partial) {
    // An unfinished form: a valid email or phone is enough; everything else is sent as typed (or empty).
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(input.email));
    const okPhone = clean(input.phone).replace(/\D/g, "").length >= 10;
    if (!okEmail && !okPhone) return { status: 400, body: { status: "invalid", errors: {} } };
  } else {
    const errors = validateLead(input);
    if (Object.keys(errors).length > 0) {
      return { status: 400, body: { status: "invalid", errors } };
    }
  }

  const slackToken = env[SLACK_TOKEN_ENV_VAR]?.trim();
  const slackChannel = env[SLACK_CHANNEL_ENV_VAR]?.trim();
  if (slackToken && slackChannel) {
    const payload = buildLeadPayload(input as CateringLeadInput, now);
    try {
      const res = await fetchImpl("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${slackToken}` },
        body: JSON.stringify({ channel: slackChannel, text: slackLeadText(payload), unfurl_links: false }),
        signal: AbortSignal.timeout(10_000),
      });
      // Slack answers 200 with {ok:false} on errors, so the body decides.
      const data = (res.json ? await res.json() : {}) as { ok?: boolean };
      if (!res.ok || data.ok !== true) throw new Error(`slack responded ${res.status}`);
    } catch {
      return {
        status: 502,
        body: {
          status: "upstream_error",
          message: `We couldn't take your details online right now. Please email us at ${CONTACT_EMAIL}.`,
        },
      };
    }
    return { status: 200, body: { status: "ok" } };
  }

  const webhookUrl = env[WEBHOOK_ENV_VAR]?.trim() || DEFAULT_WEBHOOK_URL;

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

export function calendlyBookingUrl(input: { fullName?: string; email?: string; phone?: string; offer: string; utm?: Record<string, string | undefined> }): string {
  const url = new URL(CALENDLY_DEMO_URL);
  if (input.fullName?.trim()) url.searchParams.set("name", input.fullName.trim());
  if (input.email?.trim()) url.searchParams.set("email", input.email.trim().toLowerCase());
  // a1 = the demo event's first custom question, its required "phone number in case Google Meet fails" (10/13).
  if (input.phone?.trim()) url.searchParams.set("a1", input.phone.trim());
  url.searchParams.set("utm_source", "catering-leads");
  url.searchParams.set("utm_medium", input.offer);
  if (input.utm?.utm_campaign) url.searchParams.set("utm_campaign", input.utm.utm_campaign);
  if (input.utm?.utm_content) url.searchParams.set("utm_content", input.utm.utm_content);
  return url.toString();
}

// The same booking URL as an inline embed (Calendly's embed parameters; the embed posts calendly.* events to the page).
export function calendlyEmbedUrl(bookingUrl: string, domain = "getcohesiveai.com"): string {
  const url = new URL(bookingUrl);
  url.searchParams.set("embed_domain", domain);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
}
