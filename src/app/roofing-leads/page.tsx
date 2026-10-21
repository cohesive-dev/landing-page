import type { Metadata } from "next";
import Link from "next/link";
import RoofingLeadForm from "./RoofingLeadForm";
import { OFFERS, resolveOffer } from "@/lib/roofing-leads";

// Roofing-leads ad landing page (Kevin 2026-10-21: copy of /catering-leads). Kept out of search and the sitemap.
export const metadata: Metadata = {
  title: "Roofing leads from property managers | Cohesive",
  description:
    "We email property managers, HOAs and building owners near you and send you the ones who want a roof quote.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    index: "01.",
    title: "We find property managers near you",
    body: "Property managers, HOAs and building owners in your service area.",
  },
  {
    index: "02.",
    title: "We email them for you",
    body: "We send cold email on your roofing company's behalf, the same way we find our own customers.",
  },
  {
    index: "03.",
    title: "We send you the ones who want a roof quote",
    body: "You get their details and follow up to quote the job.",
  },
];

export default async function RoofingLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const offer = resolveOffer((await searchParams).offer);
  const { headline, priceLine } = OFFERS[offer];

  const faqs = [
    {
      q: "What does it cost?",
      a: `${priceLine} Your plan depends on your business; we'll confirm before you pay anything.`,
    },
    {
      q: "Who counts as a lead?",
      a: "A property manager, HOA or building owner near you who replied that they want a roof inspection, estimate or quote. It is not a signed job.",
    },
    {
      q: "Do I need to do anything?",
      a: "Follow up with the leads we send you and quote the job.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0B1220] flex flex-col">
      <header className="px-6 lg:px-10">
        <div className="max-w-[72rem] mx-auto h-16 flex items-center">
          <Link
            href="/"
            className="text-[1.4rem] font-normal italic text-[#0B1220]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Cohesive
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Above the fold: headline, one sub-line, form */}
        <section className="px-6 lg:px-10 pt-8 pb-20">
          <div className="max-w-[72rem] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6 lg:pt-10">
              <p className="text-[0.702rem] uppercase tracking-[0.18em] text-[#5B6473] mb-5">
                For roofing companies
              </p>
              <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.03em] font-medium">
                {headline}
              </h1>
              <p className="mt-6 text-[1.05rem] leading-[1.55] text-[#475569] max-w-[34rem]">
                We email property managers, HOAs and building owners near you and send you the
                ones who want a roof quote.
              </p>
              <p className="mt-4 text-[0.95rem] text-[#0B1220] font-medium">{priceLine}</p>
            </div>

            <div className="lg:col-span-6">
              <RoofingLeadForm offer={offer} />
              {/* Kevin 2026-10-12: offer terms, very small gray text. */}
              <p className="mt-4 text-[0.68rem] leading-snug text-[#5B6473]">
                Offer Terms: This software discount is available regardless of whether you purchase insurance through
                us. No insurance purchase or quote is required. Offer is subject to our standard customer qualification
                and eligibility criteria.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-10 py-20 bg-white border-y border-black/[0.06]">
          <div className="max-w-[72rem] mx-auto">
            <h2 className="text-[1.8rem] tracking-[-0.02em] font-medium mb-10">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.index}>
                  <p className="text-[0.85rem] text-[#256D85] font-medium mb-3">{s.index}</p>
                  <h3 className="text-[1.15rem] font-medium mb-2">{s.title}</h3>
                  <p className="text-[#475569] leading-[1.55]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-10 py-20">
          <div className="max-w-[48rem] mx-auto">
            <h2 className="text-[1.8rem] tracking-[-0.02em] font-medium mb-8">Questions</h2>
            <dl className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-medium text-[1.05rem]">{f.q}</dt>
                  <dd className="mt-2 text-[#475569] leading-[1.55]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="px-6 lg:px-10 py-8 text-[0.85rem] text-[#5B6473]">
        <div className="max-w-[72rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© Cohesive</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-[#0B1220] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0B1220] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
