// Run: npm test   (node --test with native TypeScript type stripping, Node >= 22.6)
// Never posts anywhere: every test injects a fake fetch.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildLeadPayload,
  handleCateringLeadSubmission,
  isDisqualifiedBusinessType,
  resolveOffer,
  OFFERS,
} from "../src/lib/catering-leads.ts";

const NOW = new Date("2026-10-12T15:00:00.000Z");
const ENV_SET = { CATERING_LEADS_WEBHOOK_URL: "https://example.invalid/hook" };

const valid = {
  offer: "monthly",
  fullName: "  Maria Lopez ",
  email: "Maria@Example.com",
  phone: "(555) 555-0100",
  businessType: "Full-service restaurant",
  businessName: "Lopez Kitchen",
  street: "12 Main St",
  city: "Albany",
  state: "NY",
  zip: "12207",
  utm: { utm_source: "facebook", utm_campaign: "catering-test", utm_content: "headline-b", fbclid: "abc123" },
  pageUrl: "https://getcohesiveai.com/catering-leads?offer=monthly&utm_source=facebook",
};

function fakeFetch(response = { ok: true, status: 200 }) {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, init });
    return response;
  };
  fn.calls = calls;
  return fn;
}

test("bars and non-food businesses are blocked and never forwarded", async () => {
  for (const businessType of ["Bar / tavern / brewery", "Not a food business"]) {
    assert.equal(isDisqualifiedBusinessType(businessType), true);
    const f = fakeFetch();
    const res = await handleCateringLeadSubmission({ ...valid, businessType }, ENV_SET, f, NOW);
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "disqualified");
    assert.equal(res.body.message, "Thanks - this offer is for restaurants and caterers right now.");
    assert.equal(f.calls.length, 0, "a disqualified lead must not be posted");
  }
  assert.equal(isDisqualifiedBusinessType("Caterer"), false);
  assert.equal(isDisqualifiedBusinessType("Food truck / cart"), false);
});

test("a valid submission builds the expected payload and posts it once", async () => {
  const f = fakeFetch();
  const res = await handleCateringLeadSubmission(valid, ENV_SET, f, NOW);
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].url, ENV_SET.CATERING_LEADS_WEBHOOK_URL);
  assert.equal(f.calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(f.calls[0].init.body), {
    source: "catering-leads-monthly",
    offer: "monthly",
    headline: "Get 5-10 corporate catering leads for as low as $30/mo",
    full_name: "Maria Lopez",
    email: "maria@example.com",
    phone: "(555) 555-0100",
    business_type: "Full-service restaurant",
    business_name: "Lopez Kitchen",
    street: "12 Main St",
    city: "Albany",
    state: "NY",
    zip: "12207",
    utm_source: "facebook",
    utm_medium: "",
    utm_campaign: "catering-test",
    utm_content: "headline-b",
    utm_term: "",
    fbclid: "abc123",
    page_url: valid.pageUrl,
    submitted_at: "2026-10-12T15:00:00.000Z",
  });
});

test("offer param defaults to per-lead and switches the source", () => {
  assert.equal(resolveOffer(undefined), "per-lead");
  assert.equal(resolveOffer("bogus"), "per-lead");
  assert.equal(resolveOffer("toString"), "per-lead");
  assert.equal(resolveOffer(["monthly"]), "monthly");
  assert.equal(OFFERS["per-lead"].headline, "Get corporate catering leads for as low as $5/lead");
  const p = buildLeadPayload({ ...valid, offer: "nope" }, NOW);
  assert.equal(p.source, "catering-leads-per-lead");
  assert.equal(p.offer, "per-lead");
});

test("missing webhook env var returns 503 and posts nothing", async () => {
  for (const env of [{}, { CATERING_LEADS_WEBHOOK_URL: "   " }]) {
    const f = fakeFetch();
    const res = await handleCateringLeadSubmission(valid, env, f, NOW);
    assert.equal(res.status, 503);
    assert.equal(res.body.status, "not_configured");
    assert.match(res.body.message, /admin@cohesiveapp\.com/);
    assert.equal(f.calls.length, 0);
  }
});

test("invalid fields return 400 with per-field errors", async () => {
  const f = fakeFetch();
  const res = await handleCateringLeadSubmission({ ...valid, email: "nope", zip: "12" }, ENV_SET, f, NOW);
  assert.equal(res.status, 400);
  assert.deepEqual(Object.keys(res.body.errors).sort(), ["email", "zip"]);
  assert.equal(f.calls.length, 0);
});

test("webhook failure returns 502 so the page shows the email fallback", async () => {
  const res = await handleCateringLeadSubmission(valid, ENV_SET, fakeFetch({ ok: false, status: 500 }), NOW);
  assert.equal(res.status, 502);
  const res2 = await handleCateringLeadSubmission(valid, ENV_SET, async () => { throw new Error("down"); }, NOW);
  assert.equal(res2.status, 502);
});

test("honeypot submissions are dropped silently", async () => {
  const f = fakeFetch();
  const res = await handleCateringLeadSubmission({ ...valid, website: "http://spam" }, ENV_SET, f, NOW);
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 0);
});
