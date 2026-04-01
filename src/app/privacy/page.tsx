import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Cohesive",
  description: "Learn how Cohesive AI collects, uses, and safeguards your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fefdfd] flex flex-col" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
      <header className="py-6 px-6 lg:px-8">
        <Link href="/" className="text-2xl font-normal italic text-[#2141EC]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Cohesive
        </Link>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Effective Date: July 5th, 2025</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <p className="text-gray-600 leading-relaxed">
              Cohesive AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services or visit our website (the &ldquo;Services&rdquo;).
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-3">We collect the following types of information:</p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">a. Information You Provide:</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Name, email address, company name, job title</li>
                <li>Payment and billing information (handled securely via Stripe)</li>
                <li>Any information you voluntarily submit via forms, email, or chat (such as phone numbers for SMS notifications)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">b. Automatically Collected Information:</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>IP address and device/browser type</li>
                <li>Pages visited, time spent on site, and general usage data (via tools like Google Analytics or similar)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Provide and improve our services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Communicate with you regarding product updates, billing, or support</li>
                <li>Personalize your experience</li>
                <li>Ensure legal and regulatory compliance</li>
              </ul>
              <p className="text-gray-600">
                We do not sell or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <p className="text-gray-600 mb-3">
                We use industry-standard encryption, secure payment gateways (e.g., Stripe), and best practices to protect your personal data.
              </p>
              <p className="text-gray-600">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we work diligently to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Retention</h2>
              <p className="text-gray-600">
                We retain your information only as long as necessary to fulfill the purposes outlined in this policy or as required by law. You may request deletion of your data by contacting us (see Section 6).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies &amp; Tracking</h2>
              <p className="text-gray-600">
                We may use cookies or similar technologies to analyze site traffic and improve user experience. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-3">You may request to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Access, correct, or delete your personal data</li>
                <li>Opt out of marketing communications</li>
                <li>Ask questions about how your data is handled</li>
              </ul>
              <p className="text-gray-600">
                To do so, please contact us at{" "}
                <a href="mailto:support@getcohesiveai.com" className="text-[#2141EC] hover:underline">support@getcohesiveai.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-600">
                We use trusted third-party services like Stripe (for payments) and analytics providers. These services may collect and process data according to their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. When we do, we&apos;ll revise the &ldquo;Effective Date&rdquo; above. Continued use of our services after any changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions or concerns about this Privacy Policy, contact us at:{" "}
                <a href="mailto:support@getcohesiveai.com" className="text-[#2141EC] hover:underline">support@getcohesiveai.com</a>
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
