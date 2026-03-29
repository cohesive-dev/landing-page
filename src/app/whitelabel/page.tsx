import Link from "next/link";

const AgencyIcon = () => (
  <div className="w-12 h-12 rounded-2xl bg-[#2141EC]/10 flex items-center justify-center">
    <svg className="w-6 h-6 text-[#2141EC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  </div>
);

const CoachIcon = () => (
  <div className="w-12 h-12 rounded-2xl bg-[#2141EC]/10 flex items-center justify-center">
    <svg className="w-6 h-6 text-[#2141EC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  </div>
);

const SoftwareIcon = () => (
  <div className="w-12 h-12 rounded-2xl bg-[#2141EC]/10 flex items-center justify-center">
    <svg className="w-6 h-6 text-[#2141EC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  </div>
);

export default function WhitelabelPage() {
  return (
    <div className="min-h-screen bg-[#fefdfd] flex flex-col" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
      <header className="py-6 px-6 lg:px-8">
        <Link href="/" className="text-2xl font-normal italic text-[#2141EC]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Cohesive
        </Link>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Whitelabel Partnership</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              We partner with marketing agencies, business coaches, and software vendors to create upsell opportunities to their existing clients.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="border border-gray-200 rounded-xl p-6 text-center flex flex-col items-center">
              <div className="mb-4"><AgencyIcon /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing Agencies</h3>
              <p className="text-sm text-gray-500">Offer an AI-powered CRM under your brand to your trade service clients.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 text-center flex flex-col items-center">
              <div className="mb-4"><CoachIcon /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Coaches</h3>
              <p className="text-sm text-gray-500">Give your clients a turnkey growth platform as part of your coaching package.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 text-center flex flex-col items-center">
              <div className="mb-4"><SoftwareIcon /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Software Vendors</h3>
              <p className="text-sm text-gray-500">Integrate Cohesive into your platform to expand your product offering for trade clients.</p>
            </div>
          </div>

          <div className="text-center bg-[#2141EC]/5 border border-[#2141EC]/10 rounded-2xl p-8">
            <p className="text-gray-700 mb-1 font-medium">Interested in partnering?</p>
            <p className="text-gray-500 text-sm mb-5">Let&apos;s talk about how Cohesive can work under your brand.</p>
            <a
              href="mailto:admin@cohesiveapp.com"
              className="inline-block bg-[#2141EC] text-white px-6 py-3 rounded-full hover:bg-[#1a35bd] transition-all duration-200 font-medium shadow-lg shadow-[#2141EC]/25"
            >
              admin@cohesiveapp.com
            </a>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        <Link href="/" className="hover:text-gray-600 transition-colors">&larr; Back to home</Link>
      </footer>
    </div>
  );
}
