"use client";

import { useEffect, useRef, useState } from "react";
import { addressParts, type AddressParts } from "@/lib/address-parts";

// Kevin 2026-10-12: "Can we autofill address please." Google Places (New) over plain fetch, not the Maps JS
// script: if the key is blocked for this domain the requests just fail and the field keeps working as a normal
// input (the Maps script would grey the input out instead). Browser key (public by design, referrer-restricted
// in Google Cloud); the env var overrides it.
const PLACES_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyAY9tn6cTVbNDzeRLL4dU96CEbvpBLBOpI";

type Suggestion = { placeId: string; text: string };

export default function StreetAutocomplete({
  className,
  onPick,
  describedBy,
}: {
  className: string;
  onPick: (parts: AddressParts) => void;
  describedBy?: string;
}) {
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const session = useRef<string>("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function token() {
    if (!session.current) session.current = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
    return session.current;
  }

  function query(text: string) {
    if (timer.current) clearTimeout(timer.current);
    if (text.trim().length < 3) { setItems([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Goog-Api-Key": PLACES_KEY },
          body: JSON.stringify({ input: text, includedRegionCodes: ["us"], sessionToken: token() }),
        });
        if (!res.ok) { setItems([]); setOpen(false); return; }
        const data = (await res.json()) as { suggestions?: { placePrediction?: { placeId: string; text?: { text?: string } } }[] };
        const next = (data.suggestions ?? [])
          .map((s) => s.placePrediction)
          .filter((p): p is { placeId: string; text?: { text?: string } } => Boolean(p?.placeId))
          .slice(0, 5)
          .map((p) => ({ placeId: p.placeId, text: p.text?.text ?? "" }));
        setItems(next);
        setActive(-1);
        setOpen(next.length > 0);
      } catch {
        setItems([]);
        setOpen(false);
      }
    }, 250);
  }

  async function pick(s: Suggestion) {
    setOpen(false);
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(s.placeId)}?sessionToken=${encodeURIComponent(token())}`,
        { headers: { "X-Goog-Api-Key": PLACES_KEY, "X-Goog-FieldMask": "addressComponents" } },
      );
      session.current = "";
      if (!res.ok) return;
      const data = (await res.json()) as { addressComponents?: Parameters<typeof addressParts>[0] };
      const parts = addressParts(data.addressComponents);
      if (inputRef.current && parts.street) inputRef.current.value = parts.street;
      onPick(parts);
    } catch {
      /* keep whatever the visitor typed */
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id="street_address"
        name="street_address"
        type="text"
        autoComplete="street-address"
        required
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="street_address-options"
        aria-activedescendant={active >= 0 ? `street_address-option-${active}` : undefined}
        aria-describedby={describedBy}
        className={className}
        onChange={(e) => query(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!open || items.length === 0) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % items.length); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i <= 0 ? items.length - 1 : i - 1)); }
          else if (e.key === "Enter" && active >= 0) { e.preventDefault(); void pick(items[active]); }
          else if (e.key === "Escape") { setOpen(false); }
        }}
      />
      {open && (
        <ul
          id="street_address-options"
          role="listbox"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-black/15 bg-white shadow-lg"
        >
          {items.map((s, i) => (
            <li
              key={s.placeId}
              id={`street_address-option-${i}`}
              role="option"
              aria-selected={i === active}
              className={`cursor-pointer px-3.5 py-2 text-[0.9rem] ${i === active ? "bg-[#F1F5F9]" : ""}`}
              onMouseDown={(e) => { e.preventDefault(); void pick(s); }}
            >
              {s.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
