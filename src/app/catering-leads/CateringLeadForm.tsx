"use client";

import { useState, type FormEvent } from "react";
import {
  BUSINESS_TYPES,
  CONTACT_EMAIL,
  DISQUALIFIED_MESSAGE,
  UTM_KEYS,
  isDisqualifiedBusinessType,
  validateLead,
  type CateringLeadInput,
  type OfferId,
  type UtmKey,
} from "@/lib/catering-leads";

type Phase = "form" | "sending" | "done" | "disqualified" | "fallback";

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#256D85]/40 focus:border-[#256D85]";

function readUtm(): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(window.location.search);
  const utm: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  return utm;
}

export default function CateringLeadForm({ offer }: { offer: OfferId }) {
  const [phase, setPhase] = useState<Phase>("form");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");

    const input: CateringLeadInput = {
      offer,
      fullName: get("name"),
      email: get("email"),
      phone: get("tel"),
      businessType: get("business_type"),
      businessName: get("organization"),
      street: get("street_address"),
      city: get("city"),
      state: get("state"),
      zip: get("postal_code"),
      website: get("hp_field"),
      utm: readUtm(),
      pageUrl: window.location.href,
    };

    // Bars / non-food businesses never become a lead - no network call at all.
    if (isDisqualifiedBusinessType(input.businessType)) {
      setPhase("disqualified");
      return;
    }

    const found = validateLead(input);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setPhase("sending");
    try {
      const res = await fetch("/api/catering-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === "disqualified") {
        setPhase("disqualified");
      } else if (res.ok) {
        // TODO(meta-pixel): this repo does not load a Meta pixel directly (only GTM
        // GTM-WJJNZWWC). When one is added, fire fbq("track", "Lead", { content_name:
        // `catering-leads-${offer}` }) here, after a confirmed 200.
        setPhase("done");
      } else if (res.status === 400 && data.errors && Object.keys(data.errors).length) {
        setErrors(data.errors);
        setPhase("form");
      } else {
        // 503 (webhook not configured), 502 (webhook failed) or anything else.
        setPhase("fallback");
      }
    } catch {
      setPhase("fallback");
    }
  }

  if (phase === "done") {
    return (
      <Panel>
        <p className="text-[1.15rem] font-medium">Thanks - we got your details.</p>
        <p className="mt-2 text-[#475569]">We&apos;ll be in touch to go over your plan before you pay anything.</p>
      </Panel>
    );
  }

  if (phase === "disqualified") {
    return (
      <Panel>
        <p className="text-[1.15rem] font-medium">{DISQUALIFIED_MESSAGE}</p>
        <button
          type="button"
          onClick={() => setPhase("form")}
          className="mt-4 text-[0.85rem] text-[#64748B] underline underline-offset-4 hover:text-[#0B1220] cursor-pointer"
        >
          Picked the wrong business type? Go back
        </button>
      </Panel>
    );
  }

  if (phase === "fallback") {
    return (
      <Panel>
        <p className="text-[1.15rem] font-medium">We couldn&apos;t take your details online right now.</p>
        <p className="mt-2 text-[#475569]">Please email us and we&apos;ll get you set up.</p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Corporate catering leads")}`}
          className="mt-4 inline-flex items-center bg-[#0B1220] text-white px-5 py-2.5 rounded-full text-[0.9rem] font-light hover:bg-[#1F2937] transition-colors"
        >
          Email {CONTACT_EMAIL}
        </a>
      </Panel>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-2xl bg-white border border-black/[0.08] shadow-[0_20px_40px_rgba(11,18,32,0.06)] p-6 sm:p-8 space-y-4"
    >
      <p className="text-[1.1rem] font-medium">Tell us about your business</p>

      <Field label="Full name" name="name" error={errors.fullName}>
        <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" name="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
        </Field>
        <Field label="Phone" name="tel" error={errors.phone}>
          <input id="tel" name="tel" type="tel" autoComplete="tel" required className={inputClass} />
        </Field>
      </div>

      <Field label="Business type" name="business_type" error={errors.businessType}>
        <select id="business_type" name="business_type" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose one
          </option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Business name" name="organization" error={errors.businessName}>
        <input id="organization" name="organization" type="text" autoComplete="organization" required className={inputClass} />
      </Field>

      <Field label="Street address" name="street_address" error={errors.street}>
        <input id="street_address" name="street_address" type="text" autoComplete="street-address" required className={inputClass} />
      </Field>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 sm:col-span-3">
          <Field label="City" name="city" error={errors.city}>
            <input id="city" name="city" type="text" autoComplete="address-level2" required className={inputClass} />
          </Field>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <Field label="State" name="state" error={errors.state}>
            <input id="state" name="state" type="text" autoComplete="address-level1" required maxLength={20} className={inputClass} />
          </Field>
        </div>
        <div className="col-span-3 sm:col-span-2">
          <Field label="ZIP" name="postal_code" error={errors.zip}>
            <input id="postal_code" name="postal_code" type="text" inputMode="numeric" autoComplete="postal-code" required maxLength={10} className={inputClass} />
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="hp_field">Leave this empty</label>
        <input id="hp_field" name="hp_field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={phase === "sending"}
        className="w-full inline-flex justify-center items-center bg-[#0B1220] text-white px-5 py-3 rounded-full text-[0.95rem] font-light hover:bg-[#1F2937] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
      >
        {phase === "sending" ? "Sending..." : "Get catering leads"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[0.85rem] text-[#475569] mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[0.8rem] text-[#B42318]">{error}</p>}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      className="rounded-2xl bg-white border border-black/[0.08] shadow-[0_20px_40px_rgba(11,18,32,0.06)] p-6 sm:p-8"
    >
      {children}
    </div>
  );
}
