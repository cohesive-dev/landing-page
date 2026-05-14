"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FlipText from "@/components/FlipText";
import ProductMockup from "@/components/ProductMockup";
import CampaignMockup from "@/components/CampaignMockup";
import CallCenterMockup from "@/components/CallCenterMockup";
import CalendlyModal from "@/components/CalendlyModal";

const motions: { index: string; name: string; body: string }[] = [
  {
    index: "01.",
    name: "Find",
    body: "Build targeted lists of local businesses, property owners, and decision-makers.",
  },
  {
    index: "02.",
    name: "Reach",
    body: "Launch personalized outreach across email, phone, SMS, and other channels.",
  },
  {
    index: "03.",
    name: "Follow up",
    body: "AI agents handle replies, missed calls, and past leads so opportunities do not slip.",
  },
  {
    index: "04.",
    name: "Manage",
    body: "Track conversations, interested prospects, booked calls, and performance in one place.",
  },
];

const industries: {
  src: string;
  alt: string;
  weight: number;
  mode: "image" | "text";
  text: string;
}[][] = [
    [
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/hvac.png?w=800&q=80&auto=format",
        alt: "HVAC",
        weight: 1.4,
        mode: "text",
        text: "Find property managers with aging rooftop units, then reach out before their next service window.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/plumbing-contractor.jpg?w=800&q=80&auto=format",
        alt: "Plumbing",
        weight: 0.95,
        mode: "image",
        text: "Find older multi-family buildings nearby, then reach out the moment a freeze hits.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/power-washing.jpg?w=800&q=80&auto=format",
        alt: "Power washing",
        weight: 0.85,
        mode: "text",
        text: "Find strip malls in your area, then reach out before their peak retail season.",
      },
    ],
    [
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/landscaping.avif?w=800&q=80&auto=format",
        alt: "Landscaping",
        weight: 1.0,
        mode: "image",
        text: "Find office parks with contracts ending soon, then reach out before renewal.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/expory-flooring.png?w=800&q=80&auto=format",
        alt: "Epoxy flooring",
        weight: 1.0,
        mode: "text",
        text: "Find new auto shops mid-buildout, then reach out the same week they break ground.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/window-washing.avif?w=800&q=80&auto=format",
        alt: "Window washing",
        weight: 1.2,
        mode: "image",
        text: "Find high-rise offices in your service area, then reach out on a quarterly cadence.",
      },
    ],
    [
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/kitchen-hood.png?w=800&q=80&auto=format",
        alt: "Kitchen hood",
        weight: 1.5,
        mode: "text",
        text: "Find restaurants nearby, then reach out before their next NFPA-96 inspection deadline.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/roofing.avif?w=800&q=80&auto=format",
        alt: "Roofing",
        weight: 1.0,
        mode: "image",
        text: "Find school districts with aging roofs, then reach out before the summer maintenance window.",
      },
    ],
    [
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/painting.avif?w=800&q=80&auto=format",
        alt: "Painting",
        weight: 1.0,
        mode: "image",
        text: "Find churches planning a refresh, then reach out before their next capital campaign closes.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/pest-control.png?w=800&q=80&auto=format",
        alt: "Pest control",
        weight: 1.0,
        mode: "image",
        text: "Find hotels with seasonal pest pressure, then reach out the week activity spikes.",
      },
      {
        src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/commercial-lighting.png?w=800&q=80&auto=format",
        alt: "Commercial lighting",
        weight: 1.0,
        mode: "text",
        text: "Find warehouses due for retrofits, then reach out while utility rebate windows are open.",
      },
    ],
  ];

const COLLAGE_HEIGHT = 760;
const COLLAGE_GAP = 12;

const customerLogos = [
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/anago.avif",
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/corporate_cleaning.avif",
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/gotflow.webp",
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/janpro.avif",
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/kitchenguard.avif",
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/rolling_suds.avif",
  "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/service_master.webp",
];

export default function Home() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userFlipped, setUserFlipped] = useState<Record<string, boolean>>({});
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(360);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Radial wash anchored over the text area. Smaller viewports get a larger ellipse
  // (covers more of the image), wider viewports get a tighter ellipse on the left.
  const heroFadeGradient = (() => {
    const t = Math.max(0, Math.min(1, (viewportWidth - 360) / (1280 - 360)));
    const ew = 160 - 80 * t;            // ellipse width: 160% -> 80%
    const eh = 115 - 25 * t;            // ellipse height: 115% -> 90%
    const cx = 12 + 13 * t;             // center x: 12% -> 25%
    return `radial-gradient(ellipse ${ew}% ${eh}% at ${cx}% 50%, rgba(250,248,244,1) 0%, rgba(250,248,244,0.92) 30%, rgba(250,248,244,0.55) 60%, rgba(250,248,244,0.15) 85%, rgba(250,248,244,0) 100%)`;
  })();

  const openDemo = () => setShowCalendly(true);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0B1220]">
      {/* ============================================================= */}
      {/*                           HEADER                               */}
      {/* ============================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled
          ? "bg-[#FAF8F4]/85 backdrop-blur-md border-b border-black/[0.06]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[88rem] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-[1.4rem] font-normal italic text-[#0B1220]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Cohesive
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[0.93rem] text-[#475569]">
            <a href="#system" className="hover:text-[#0B1220] transition-colors">Platform</a>
            <a href="#use-cases" className="hover:text-[#0B1220] transition-colors">Industries</a>
            <a href="/api-docs" className="hover:text-[#0B1220] transition-colors">Developers</a>
            <a href="#contact" className="hover:text-[#0B1220] transition-colors">Company</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openDemo}
              className="hidden sm:inline-flex items-center bg-[#0B1220] text-white text-[0.9rem] font-extralight px-4 py-2 rounded-full hover:bg-[#1F2937] transition-colors cursor-pointer"
            >
              <FlipText text="Book a Demo" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================= */}
      {/*                            HERO                                */}
      {/* ============================================================= */}
      <section className="relative pt-40 pb-28 px-6 lg:px-10 overflow-hidden">
        {/* Hero artwork pinned to the right edge of the viewport */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 pointer-events-none h-full w-full sm:w-[80vw] lg:w-[55vw] opacity-60 lg:opacity-100"
        >
          <img
            src="https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/hero-skyline.png"
            alt=""
            className="absolute top-10 lg:top-30 inset-x-0 bottom-0 w-full h-[74%] object-cover object-right animate-fade-in select-none"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.6) 28%, black 44%, black 100%), linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.6) 28%, black 44%, black 100%), linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
              WebkitMaskComposite: "destination-in",
            }}
          />
        </div>


        {/* Legibility wash, interpolated by viewport width: narrower screens get a heavier fade
            that extends further across the image; wide screens get a light left-edge fade. */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundImage: heroFadeGradient }}
        />

        {/* Subtle accent glow on the right */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(40% 45% at 85% 30%, rgba(37,109,133,0.08), transparent 65%)",
          }}
        />

        <div className="max-w-[72rem] mx-auto lg:mx-40 relative z-10 w-full">
          <div className="max-w-[58rem]">
            <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[#64748B] mb-7">
              Built to help you win Main Street
            </p>

            <h1 className="text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.02] tracking-[-0.035em] font-medium text-[#0B1220]">
              The AI growth engine for
              <br className="hidden sm:block" />
              <span className="italic font-normal" style={{ fontFamily: "var(--font-playfair)" }}>
                {" "}businesses that sell locally
              </span>
              .
            </h1>

            <p className="hidden lg:block mt-8 text-[1.08rem] sm:text-[1.18rem] leading-[1.55] text-[#475569] max-w-[44rem]">
              Cohesive finds, reaches, and follows up with local businesses that traditional
              sales channels miss, from salons to gyms to grocery stores, all on auto-pilot.
            </p>

            {/* Mobile CTA: single outlined demo button */}
            <div className="mt-10 lg:hidden">
              <button
                onClick={openDemo}
                className="inline-flex items-center gap-2 text-[#0B1220] px-5 py-3 rounded-full text-[0.95rem] font-light border border-[#0B1220]/80 hover:bg-[#0B1220]/[0.04] transition-colors cursor-pointer"
              >
                <FlipText text="Book a Demo" />
                <svg className="w-3.5 pt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex mt-10 flex-wrap items-center gap-3">
              <button
                onClick={openDemo}
                className="inline-flex items-center gap-2 bg-[#0B1220] text-white px-5 py-3 rounded-full text-[0.95rem] font-light hover:bg-[#1F2937] transition-colors cursor-pointer"
              >
                <FlipText text="Book a Demo" />
                <svg className="w-3.5 pt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <a
                href="#system"
                className="inline-flex items-center gap-2 text-[#0B1220] px-5 py-3 rounded-full text-[0.95rem] font-light border border-black/40 hover:border-black/50 hover:bg-black/[0.03] transition-colors"
              >
                <FlipText text="See how it works" />
              </a>
            </div>

            <div className="mt-6 pt-4 lg:mt-14 lg:pt-8 max-w-[44rem] grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6">
              <HeroStat value="1,000+" label="Service businesses" />
              <HeroStat value="220K+" label="Conversations handled" />
              <HeroStat value="3 channels" label="Email, phone, SMS" />
              <HeroStat value="24/7" label="AI follow-up" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                       TRUSTED BY                               */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-14 px-6 lg:px-10">
        <div className="max-w-[88rem] mx-auto">
          <p className="text-[0.74rem] uppercase tracking-[0.2em] text-[#64748B] text-center mb-8">
            Trusted by service brands selling into local markets
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAF8F4] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAF8F4] to-transparent z-10" />
            <div className="flex animate-marquee gap-20 items-center w-max">
              {[0, 1].map((copy) =>
                customerLogos.map((src, i) => (
                  <img
                    key={`${copy}-${i}`}
                    src={src}
                    alt=""
                    className="h-8 object-contain opacity-60 shrink-0"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                       THE CATEGORY                             */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-28 px-6 lg:px-10">
        <div className="max-w-[72rem] mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-[1rem] sm:text-[1.05rem] uppercase tracking-[0.22em] text-[#0B1220]">
              The category
            </p>
          </div>
          <div className="md:col-span-8 max-w-[44rem]">
            <h2 className="text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.025em] font-medium text-[#0B1220]">
              Main Street is still the
              <span className="italic font-normal" style={{ fontFamily: "var(--font-playfair)" }}>
                {" "}hardest market to reach
              </span>
              .
            </h2>
            <div className="mt-7 space-y-5 text-[1.05rem] leading-[1.65] text-[#475569]">
              <p>
                Most sales tools are built around LinkedIn profiles, corporate databases, and
                office-based buyers. Main Street businesses do not always show up cleanly in
                traditional B2B channels.
              </p>
              <p>
                Restaurants, gyms, grocers, clinics, salons, and local operators are fragmented,
                poorly categorized, hard to contact, and easy to miss.
              </p>
              <p className="text-[#0B1220] font-medium">
                Cohesive turns that messy local market into a repeatable growth engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                    FOUR GROWTH MOTIONS                         */}
      {/* ============================================================= */}
      <section id="system" className="border-t border-black/[0.06] py-28 px-6 lg:px-10">
        <div className="max-w-[72rem] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-20">
            <div className="md:col-span-4">
              <p className="text-[1rem] sm:text-[1.05rem] uppercase tracking-[0.22em] text-[#0B1220]">
                The platform
              </p>
            </div>
            <div className="md:col-span-8 max-w-[40rem]">
              <h2 className="text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.025em] font-medium text-[#0B1220]">
                One platform. Four growth motions.
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-black/[0.08]">
            {motions.map((m, i) => (
              <div
                key={m.name}
                className={`pt-6 lg:pt-8 pb-10 lg:pb-12 px-4 lg:px-5 ${i !== motions.length - 1 ? "lg:border-r border-black/[0.08]" : ""
                  } ${i % 2 === 0 ? "sm:border-r sm:border-black/[0.08] lg:border-r" : ""}`}
              >
                <p className="text-[2.75rem] sm:text-[3.25rem] leading-none tracking-[-0.04em] font-medium text-[#2F6FED] mb-5">
                  {m.index}
                </p>
                <h3 className="text-[1.55rem] tracking-[-0.015em] font-medium text-[#0B1220] mb-4">
                  {m.name}
                </h3>
                <p className="text-[0.98rem] leading-[1.6] text-[#475569]">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                       PRODUCT VISUAL                           */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-28 px-6 lg:px-10">
        <div className="max-w-[80rem] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <p className="text-[1rem] sm:text-[1.05rem] uppercase tracking-[0.22em] text-[#0B1220]">
                Command center
              </p>
            </div>
            <div className="md:col-span-8 max-w-[42rem]">
              <h2 className="text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.025em] font-medium text-[#0B1220]">
                Your growth command center.
              </h2>
              <p className="mt-6 text-[1.02rem] leading-[1.65] text-[#475569]">
                Campaign status, AI follow-up, interested leads, booked calls, and performance
                across every market and every channel. Run local growth as one system instead of
                six tabs.
              </p>
            </div>
          </div>

          <CampaignMockup />

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 text-[0.88rem] text-[#475569]">
            <ProductBullet label="Campaigns" body="Targeted lists, channels, and cadences in flight." />
            <ProductBullet label="AI follow-up" body="Replies, missed calls, and stale leads kept warm." />
            <ProductBullet label="Interested leads" body="Booked calls and qualified pipeline in one view." />
            <ProductBullet label="Performance" body="Reply rates, conversions, and revenue by market." />
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                         LEAD LISTS                             */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-28 px-6 lg:px-10">
        <div className="max-w-[80rem] mx-auto">
          <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[#64748B] mb-6">
            Find thousands of potential buyers in your service area
          </p>
          <h2 className="text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.025em] font-medium text-[#0B1220] max-w-[44rem] mb-12">
            Hyper-local, hyper-targeted lead lists.
            <span className="italic font-normal" style={{ fontFamily: "var(--font-playfair)" }}>
              {" "}Right at your fingertips
            </span>
            .
          </h2>
          <ProductMockup />
        </div>
      </section>

      {/* ============================================================= */}
      {/*                      AI FOLLOW-UP                              */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-28 px-6 lg:px-10">
        <div className="max-w-[80rem] mx-auto">
          <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[#64748B] mb-6">
            Beyond cold outbound
          </p>
          <h2 className="text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.025em] font-medium text-[#0B1220] max-w-[44rem] mb-12">
            Re-engage every account
            <span className="italic font-normal" style={{ fontFamily: "var(--font-playfair)" }}>
              {" "}already in your CRM
            </span>
            .
          </h2>
          <CallCenterMockup />
        </div>
      </section>

      {/* ============================================================= */}
      {/*                          USE CASES                             */}
      {/* ============================================================= */}
      <section id="use-cases" className="border-t border-black/[0.06] py-28 px-6 lg:px-10">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-4">
              <p className="text-[1rem] sm:text-[1.05rem] uppercase tracking-[0.22em] text-[#0B1220]">
                Who it is for
              </p>
            </div>
            <div className="md:col-span-8 max-w-[44rem]">
              <h2 className="text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.025em] font-medium text-[#0B1220]">
                Built for service businesses selling into local markets.
              </h2>
              <p className="mt-6 text-[1.02rem] leading-[1.65] text-[#475569]">
                Commercial cleaning. Painting and coatings. Roofing and exteriors. HVAC,
                plumbing, and mechanical. Facility services. Property services. And every local
                service business selling to nearby companies, property managers, homeowners, and
                commercial facilities.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {industries.map((col, ci) => {
              const itemsAvailable = COLLAGE_HEIGHT - COLLAGE_GAP * (col.length - 1);
              const totalWeight = col.reduce((s, x) => s + x.weight, 0);
              return (
                <div key={ci} className="flex-1 flex flex-col gap-3">
                  {col.map((img, i) => {
                    const height = (img.weight / totalWeight) * itemsAvailable;
                    const startsAsImage = img.mode === "image";
                    const key = `${ci}-${i}`;
                    const isFlipped = !!userFlipped[key] !== (hoveredKey === key);
                    const imageVisible = startsAsImage !== isFlipped;
                    return (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-xl border border-black/[0.06] bg-[#efece8] cursor-pointer select-none h-56 md:h-[var(--card-h)]"
                        style={{
                          ["--card-h" as string]: `${height}px`,
                          touchAction: "manipulation",
                        }}
                        onMouseEnter={() => setHoveredKey(key)}
                        onMouseLeave={() =>
                          setHoveredKey((prev) => (prev === key ? null : prev))
                        }
                        onClick={() =>
                          setUserFlipped((prev) => ({ ...prev, [key]: !prev[key] }))
                        }
                      >
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${imageVisible ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <span className="absolute bottom-3 left-3 inline-flex items-center bg-white/95 backdrop-blur-sm text-[#0B1220] text-[0.72rem] font-medium tracking-[0.04em] px-3 py-1 rounded-full border border-black/[0.06]">
                            {img.alt}
                          </span>
                        </div>
                        <div
                          className={`absolute inset-0 flex flex-col justify-end p-5 bg-[#0B1220] text-white transition-opacity duration-300 ${imageVisible ? "opacity-0" : "opacity-100"
                            }`}
                          style={{
                            backgroundImage:
                              "radial-gradient(80% 60% at 90% 0%, rgba(37,109,133,0.32), transparent 60%), radial-gradient(60% 60% at 0% 100%, rgba(47,111,237,0.18), transparent 60%)",
                          }}
                        >
                          <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/55 mb-3">
                            {img.alt}
                          </p>
                          <p className="text-[0.95rem] md:text-[1rem] leading-[1.45] text-white/95">
                            {img.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                          BACKED BY                             */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-20 px-6 lg:px-10">
        <div className="max-w-[80rem] mx-auto flex flex-col items-center text-center">
          <p className="text-[0.74rem] uppercase tracking-[0.2em] text-[#64748B] mb-8">
            Backed by
          </p>
          <div className="flex flex-wrap items-start justify-center gap-x-14 gap-y-8">
            <InvestorLink href="https://www.ycombinator.com" src="https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/investors/yc.svg" name="Y Combinator" />
            <InvestorLink href="https://www.pioneerfund.vc" src="https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/investors/pioneer.png" name="Pioneer Fund" />
            <InvestorLink href="https://www.liquid2.vc" src="https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/investors/liquid2.svg" name="Liquid 2" />
            <InvestorLink href="https://www.unshackledvc.com" src="https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/investors/unshackled.png" name="Unshackled" />
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                         FINAL CTA                              */}
      {/* ============================================================= */}
      <section className="border-t border-black/[0.06] py-32 px-6 lg:px-10 bg-[#0B1220] text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 80% 30%, rgba(37,109,133,0.28), transparent 60%), radial-gradient(50% 60% at 10% 90%, rgba(47,111,237,0.16), transparent 60%)",
          }}
        />
        <div className="max-w-[72rem] mx-auto relative">
          <h2 className="text-[2.4rem] sm:text-[3.4rem] leading-[1.05] tracking-[-0.03em] font-medium max-w-[42rem]">
            Turn local growth
            <span
              className="italic font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {" "}into a system
            </span>
            .
          </h2>
          <p className="mt-7 text-[1.05rem] leading-[1.65] text-white/65 max-w-[36rem]">
            See how Cohesive can automate prospecting, outreach, follow-up, and lead management
            for your market.
          </p>
          <div className="mt-10">
            <button
              onClick={openDemo}
              className="inline-flex items-center gap-2 bg-white text-[#0B1220] px-6 py-3.5 rounded-full text-[0.98rem] font-extralight hover:bg-white/90 transition-colors cursor-pointer"
            >
              <FlipText text="Book a Demo" />
              <svg className="w-3.5 pt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                           FOOTER                               */}
      {/* ============================================================= */}
      <footer id="contact" className="bg-[#0B1220] text-white/70 pt-20 pb-12 px-6 lg:px-10 border-t border-white/[0.07]">
        <div className="max-w-[80rem] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 pb-16">
            <div className="md:col-span-5">
              <h3
                className="text-[1.6rem] font-normal italic text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Cohesive
              </h3>
              <p className="text-white/55 max-w-[28rem] leading-[1.6] text-[0.95rem]">
                The AI growth engine for businesses that sell locally.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-white text-[0.82rem] uppercase tracking-[0.16em] mb-5">
                Platform
              </h4>
              <ul className="space-y-3 text-[0.95rem]">
                <li><a href="#system" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Industries</a></li>
                <li><a href="/api-docs" className="hover:text-white transition-colors">Developers</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-white text-[0.82rem] uppercase tracking-[0.16em] mb-5">
                Company
              </h4>
              <ul className="space-y-3 text-[0.95rem]">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/whitelabel" className="hover:text-white transition-colors">Whitelabel</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-white text-[0.82rem] uppercase tracking-[0.16em] mb-5">
                Contact
              </h4>
              <ul className="space-y-3 text-[0.95rem]">
                <li><a href="mailto:admin@cohesiveapp.com" className="hover:text-white transition-colors">admin@cohesiveapp.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between text-white/45 text-[0.85rem] gap-4">
            <p>© 2025 Cohesive. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}
    </div>
  );
}

function ProductBullet({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[#2F6FED] font-medium mb-2">
        {label}
      </p>
      <p className="leading-[1.55]">{body}</p>
    </div>
  );
}

function FollowUpItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[0.5rem] block w-1.5 h-1.5 rounded-full bg-[#2F6FED] shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function InvestorLink({
  href,
  src,
  name,
}: {
  href: string;
  src: string;
  name: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-100 opacity-90"
    >
      <img
        src={src}
        alt={name}
        className="h-10 w-auto object-contain"
      />
      <span className="text-[0.82rem] text-[#64748B] group-hover:text-[#0B1220] transition-colors">
        {name}
      </span>
    </a>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[clamp(1.3rem,calc(1.2vw_+_1rem),1.75rem)] tracking-[-0.02em] font-medium text-[#0B1220] leading-none">
        {value}
      </p>
      <p className="mt-2 text-[clamp(0.74rem,calc(0.6vw_+_0.6rem),0.9rem)] text-[#64748B] leading-snug">
        {label}
      </p>
    </div>
  );
}
