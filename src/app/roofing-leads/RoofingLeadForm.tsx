"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState, type FormEvent } from "react";
import StreetAutocomplete from "./StreetAutocomplete";
import type { AddressParts } from "@/lib/address-parts";
import {
  BUSINESS_TYPES,
  CONTACT_EMAIL,
  DISQUALIFIED_MESSAGE,
  UTM_KEYS,
  isDisqualifiedBusinessType,
  validateLead,
  type RoofingLeadInput,
  type OfferId,
  type UtmKey, calendlyBookingUrl, calendlyEmbedUrl } from "@/lib/roofing-leads";

type Phase = "form" | "sending" | "done" | "disqualified" | "fallback";

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 text-base lg:text-[0.95rem] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#256D85]/40 focus:border-[#256D85]";

function readUtm(): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(window.location.search);
  const utm: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  return utm;
}

export default function RoofingLeadForm({ offer }: { offer: OfferId }) {
  const [phase, setPhase] = useState<Phase>("form");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "done") return;
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string } | null;
      if (data?.event === "calendly.event_scheduled") {
        const w = window as unknown as { fbq?: (...a: unknown[]) => void; dataLayer?: unknown[] };
        w.fbq?.("track", "Schedule", { content_name: `roofing-leads-${offer}` });
        w.dataLayer?.push({ event: "roofing_demo_booked", offer });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [phase, offer]);
  const formRef = useRef<HTMLFormElement>(null);
  const phaseRef = useRef<Phase>("form");
  const partialSent = useRef(false);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Kevin 2026-10-12: "do we capture partial form fills?" A visitor who has typed a valid email or phone and
  // leaves without submitting is sent once as a partial (the group sees "didn't finish"). Never for a
  // disqualified type, never after a submit.
  useEffect(() => {
    function capture() {
      const form = formRef.current;
      if (!form || partialSent.current || phaseRef.current !== "form") return;
      const fd = new FormData(form);
      const get = (k: string) => String(fd.get(k) ?? "").trim();
      const email = get("email");
      const phone = get("tel");
      const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const okPhone = phone.replace(/\D/g, "").length >= 10;
      if ((!okEmail && !okPhone) || get("hp_field") || isDisqualifiedBusinessType(get("business_type"))) return;
      const body = JSON.stringify({
        partial: true,
        offer,
        fullName: get("name"),
        email: okEmail ? email : "",
        phone: okPhone ? phone : "",
        businessType: get("business_type"),
        businessName: get("organization"),
        street: get("street_address"),
        city: get("city"),
        state: get("state"),
        zip: get("postal_code"),
        utm: readUtm(),
        pageUrl: window.location.href,
      });
      partialSent.current = true;
      const blob = new Blob([body], { type: "application/json" });
      if (!navigator.sendBeacon?.("/api/roofing-leads", blob)) {
        void fetch("/api/roofing-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
      }
    }
    // Real exit = pagehide. A tab left in the background counts only after 10 minutes (switching tabs to find
    // an address is not abandoning the form); coming back cancels it.
    let hiddenTimer: ReturnType<typeof setTimeout> | null = null;
    const onVisibility = () => {
      if (hiddenTimer) { clearTimeout(hiddenTimer); hiddenTimer = null; }
      if (document.visibilityState === "hidden") hiddenTimer = setTimeout(capture, 10 * 60 * 1000);
    };
    window.addEventListener("pagehide", capture);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (hiddenTimer) clearTimeout(hiddenTimer);
      window.removeEventListener("pagehide", capture);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [offer]);

  function fillAddress(parts: AddressParts) {
    const form = formRef.current;
    if (!form) return;
    const set = (name: string, value: string) => {
      const el = form.elements.namedItem(name);
      if (el instanceof HTMLInputElement) el.value = value;   // empty clears it, so two addresses never mix
    };
    set("city", parts.city);
    set("state", parts.state);
    set("postal_code", parts.zip);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");

    const input: RoofingLeadInput = {
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

    // Non-roofers never become a lead - no network call at all.
    if (isDisqualifiedBusinessType(input.businessType)) {
      setPhase("disqualified");
      return;
    }

    const found = validateLead(input);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setPhase("sending");
    try {
      const res = await fetch("/api/roofing-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === "disqualified") {
        setPhase("disqualified");
      } else if (res.ok) {
        // The Cohesive AI pixel (610694474798655) loads through GTM; fire Lead only after a confirmed 200.
        const w = window as unknown as { fbq?: (...a: unknown[]) => void; dataLayer?: unknown[] };
        w.fbq?.("track", "Lead", { content_name: `roofing-leads-${offer}` });
        w.dataLayer?.push({ event: "roofing_lead", offer });
        setBookingUrl(calendlyBookingUrl({ fullName: input.fullName, email: input.email, phone: input.phone, offer, utm: input.utm }));
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
        <p className="mt-2 text-[#475569]">Last step: book a live demo with our team so we can show you results for other roofing companies we work with.</p>
        {bookingUrl && (
          <>
            {/* Kevin 2026-10-13: the scheduler is embedded so booking is one step (name/email prefilled). */}
            <iframe
              title="Book a time"
              src={calendlyEmbedUrl(bookingUrl)}
              className="mt-5 w-full rounded-xl border border-black/10"
              style={{ height: 700 }}
              loading="eager"
            />
            <a
              href={bookingUrl}
              className="mt-4 inline-block text-[0.85rem] text-[#5B6473] underline underline-offset-4 hover:text-[#0B1220]"
            >
              Calendar not loading? Book a time here
            </a>
          </>
        )}
      </Panel>
    );
  }

  if (phase === "fallback") {
    return (
      <Panel>
        <p className="text-[1.15rem] font-medium">We couldn&apos;t take your details online right now.</p>
        <p className="mt-2 text-[#475569]">Please email us and we&apos;ll get you set up.</p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Roofing leads")}`}
          className="mt-4 inline-flex items-center bg-[#0B1220] text-white px-5 py-2.5 rounded-full text-[0.9rem] font-light hover:bg-[#1F2937] transition-colors"
        >
          Email {CONTACT_EMAIL}
        </a>
      </Panel>
    );
  }

  return (
    <>
      {phase === "disqualified" && (
        <Panel>
          <p className="text-[1.15rem] font-medium">{DISQUALIFIED_MESSAGE}</p>
          <button
            type="button"
            onClick={() => { setErrors({}); setPhase("form"); }}
            className="mt-4 text-[0.85rem] text-[#5B6473] underline underline-offset-4 hover:text-[#0B1220] cursor-pointer"
          >
            Picked the wrong business type? Go back
          </button>
        </Panel>
      )}
    <form
      ref={formRef}
      hidden={phase === "disqualified"}
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

      <Field label="What roofing work do you do?" name="business_type" error={errors.businessType}>
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
        <StreetAutocomplete className={inputClass} aria-describedby="street_address-hint" onPick={fillAddress} />
      </Field>
      <p id="street_address-hint" className="-mt-2 text-[0.8rem] text-[#5B6473]">
        Your office or shop address. We look for property managers near you.
      </p>

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
        {phase === "sending" ? "Sending..." : "Get roofing leads"}
      </button>
      <p className="text-[0.75rem] leading-relaxed text-[#5B6473]">
        Contact details you enter may be saved before you submit, so we can follow up on an unfinished request.{" "}
        <a href="/privacy" className="underline">Privacy policy</a>
      </p>
    </form>
    </>
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
      {isValidElement(children)
        ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            "aria-invalid": error ? true : undefined,
            "aria-describedby":
              [(children.props as Record<string, unknown>)["aria-describedby"], error && `${name}-error`]
                .filter(Boolean)
                .join(" ") || undefined,
          })
        : children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1 text-[0.8rem] text-[#B42318]">
          {error}
        </p>
      )}
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
