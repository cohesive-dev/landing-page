"use client";

import { useEffect, useRef, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "@$%#";

export default function FlipText({
  text,
  duration = 620,
}: {
  text: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const spanRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const scramble = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      startRef.current = null;
      const chars = text.split("");
      const revealPortion = 0.7;
      const settlePortion = 0.16;

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const clamp = (n: number, min: number, max: number) =>
        Math.max(min, Math.min(max, n));

      const tick = (now: number) => {
        if (startRef.current === null) startRef.current = now;

        const elapsed = now - startRef.current;
        const progress = clamp(elapsed / duration, 0, 1);

        const next = chars
          .map((char, index) => {
            if (char === " ") return " ";

            const charStart = (index / chars.length) * revealPortion;
            const charEnd = charStart + settlePortion;
            const localProgress = clamp(
              (progress - charStart) / (charEnd - charStart),
              0,
              1,
            );

            if (progress < charStart) return "";
            if (localProgress >= 1) return char;

            const steps = 14;
            const eased = easeOutCubic(localProgress);
            const flipIndex = Math.floor(eased * steps + index * 5);

            if (localProgress < 0.38) {
              return NUMBERS[(flipIndex + index) % NUMBERS.length];
            }

            if (localProgress < 0.62 && index % 3 === 0) {
              return SYMBOLS[(flipIndex + index) % SYMBOLS.length];
            }

            if (localProgress < 0.78 && index % 2 === 0) {
              return NUMBERS[(flipIndex + index * 2) % NUMBERS.length];
            }

            return LETTERS[(flipIndex + index * 3) % LETTERS.length];
          })
          .join("");

        setDisplay(next);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const parent = spanRef.current?.parentElement;
    if (!parent) return;

    parent.addEventListener("mouseenter", scramble);
    parent.addEventListener("focus", scramble);

    return () => {
      parent.removeEventListener("mouseenter", scramble);
      parent.removeEventListener("focus", scramble);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration]);

  return (
    <span
      ref={spanRef}
      aria-label={text}
      className="relative inline-block whitespace-pre"
    >
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-0">
        {display}
      </span>
    </span>
  );
}
