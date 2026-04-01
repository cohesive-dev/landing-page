import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Cohesive",
  description: "Cohesive AI terms and conditions for subscription, outreach authorization, and cancellation policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fefdfd] flex flex-col" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
      <header className="py-6 px-6 lg:px-8">
        <Link href="/" className="text-2xl font-normal italic text-[#2141EC]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Cohesive
        </Link>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Terms &amp; Conditions</h1>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Subscription Model</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Cohesive AI operates on a monthly subscription basis. By paying the onboarding fee, you agree to maintain an active subscription for at least the first billing cycle. While not required, we typically recommend clients remain subscribed for a minimum of three (3) months, as results (including booked meetings and closed jobs) often materialize within a 2&ndash;3 month window.
              </p>
              <p className="text-gray-600 leading-relaxed">
                After the initial subscription period begins, your subscription will continue on a month-to-month basis and automatically renew on the same calendar day each month (e.g., if you signed up on the 10th, you will be billed on the 10th of each subsequent month).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Client Authorization for Outreach</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                By engaging Cohesive AI&apos;s services, you expressly authorize Cohesive AI to act on your behalf in conducting outbound outreach to prospective customers, including but not limited to email communications, follow-ups, and related campaign activities.
              </p>
              <p className="text-gray-600 leading-relaxed mb-3">You acknowledge and agree that:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Cohesive AI may contact prospects using messaging, domains, and infrastructure managed by Cohesive AI.</li>
                <li>Outreach may be conducted under your brand or on your behalf.</li>
                <li>You are responsible for ensuring that such outreach aligns with your business practices and any applicable laws or regulations.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Cohesive AI will make reasonable efforts to ensure outreach is professional and aligned with your service offering, but does not guarantee specific outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Email Infrastructure &amp; Domains</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Cohesive AI may purchase and manage alternative email domains and related infrastructure on behalf of the client for the purpose of running outbound email campaigns. These domains and accounts are used to support deliverability and campaign performance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ownership and management of such domains remain with Cohesive AI unless otherwise explicitly agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cancellation Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                You may cancel your subscription at any time. Cancellation requests must be submitted via email to{" "}
                <a href="mailto:support@getcohesiveai.com" className="text-[#2141EC] hover:underline">support@getcohesiveai.com</a>{" "}
                prior to your next billing date to avoid charges for the upcoming billing cycle.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If cancellation is requested after a payment has been processed, the subscription will remain active until the end of the current billing period. Cohesive AI reserves the right to collect or attempt to charge any outstanding or overdue invoices prior to completing cancellation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refunds</h2>
              <p className="text-gray-600 leading-relaxed">
                All payments are non-refundable. Once a payment has been processed, no full or partial refunds, credits, or prorated reimbursements will be issued.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Acceptance</h2>
              <p className="text-gray-600 leading-relaxed">
                By submitting payment, you acknowledge and agree to these Terms &amp; Conditions. You confirm that you are authorized to make this purchase on behalf of your business and understand the subscription structure, outreach authorization, and cancellation policy.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        <Link href="/" className="hover:text-gray-600 transition-colors">&larr; Back to home</Link>
      </footer>
    </div>
  );
}
