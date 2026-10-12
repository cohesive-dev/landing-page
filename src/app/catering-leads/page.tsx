import type { Metadata } from "next";
import Link from "next/link";
import CateringLeadForm from "./CateringLeadForm";
import { OFFERS, resolveOffer } from "@/lib/catering-leads";

// Ad landing page (DRAFT - DO NOT LAUNCH). Kept out of search and the sitemap.
export const metadata: Metadata = {
  title: "Corporate catering leads for restaurants | Cohesive",
  description:
    "We find offices near your restaurant that order catered team lunches, email them for you, and send you the ones who are interested.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    index: "01.",
    title: "We find offices near you",
    body: "Real estate offices, construction companies, law firms and other offices nearby that order catered team lunches.",
  },
  {
    index: "02.",
    title: "We email them for you",
    body: "We send cold email on your restaurant's behalf, the same way we find our own customers.",
  },
  {
    index: "03.",
    title: "We send you the ones who are interested",
    body: "You get their details and reply to them.",
  },
];

export default async function CateringLeadsPage({
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
      q: "What kind of companies?",
      a: "Offices near you that order team lunches, such as real estate offices, construction companies and law firms.",
    },
    {
      q: "Do I need to do anything?",
      a: "Reply to the leads we send you.",
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
              <p className="text-[0.702rem] uppercase tracking-[0.18em] text-[#64748B] mb-5">
                For restaurants and caterers
              </p>
              <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.03em] font-medium">
                {headline}
              </h1>
              <p className="mt-6 text-[1.05rem] leading-[1.55] text-[#475569] max-w-[34rem]">
                We find offices near your restaurant that order catered team lunches, email them
                for you, and send you the ones who are interested.
              </p>
              <p className="mt-4 text-[0.95rem] text-[#0B1220] font-medium">{priceLine}</p>
            </div>

            <div className="lg:col-span-6">
              <CateringLeadForm offer={offer} />
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

      <footer className="px-6 lg:px-10 py-8 text-[0.85rem] text-[#64748B]">
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
