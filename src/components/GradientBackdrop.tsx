"use client";

/**
 * Bold, grainy "blue metallic" gradient backdrop: deep navy + lighter blue.
 *
 * Sits behind a section's content as an absolutely-positioned layer. A navy
 * base, a steel-blue metallic sheen, a brand-blue glow, and a film grain.
 * Designed for white text.
 *
 * The host section must be `relative overflow-hidden`.
 */

// Inline fractal-noise SVG used as the grain layer.
const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='160' height='160' filter='url(#n)' opacity='0.85'/>
     </svg>`
  );

export default function GradientBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
      {/* Navy base field + corner anchors */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#0A1530",
          backgroundImage: [
            // diagonal lift from a darker corner to a richer steel blue —
            // gentle, low-contrast stops so it never reads as a band
            "linear-gradient(135deg, rgba(8,18,42,0.55) 0%, rgba(28,54,112,0.38) 35%, rgba(44,78,150,0.30) 60%, rgba(22,40,82,0.40) 82%, rgba(12,24,52,0.5) 100%)",
            // deep anchor in the top-left corner
            "radial-gradient(60% 70% at 6% 4%, rgba(6,14,34,0.9), transparent 58%)",
            // base steel field
            "linear-gradient(180deg, #14254f 0%, #0d1c3e 100%)",
          ].join(", "),
        }}
      />
      {/* Steel-blue metallic sheen — wide, feathered so it reads as a soft
          wash rather than a hard diagonal line */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(122deg, rgba(150,184,242,0) 0%, rgba(150,184,242,0.08) 22%, rgba(186,209,250,0.20) 44%, rgba(170,198,247,0.12) 64%, rgba(150,184,242,0.03) 82%, rgba(150,184,242,0) 100%)",
        }}
      />
      {/* Brand-blue glow anchored bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(75% 80% at 80% 88%, rgba(47,111,237,0.34), rgba(47,111,237,0.10) 50%, transparent 88%)",
        }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.7]"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
