"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import GlassyButton from "@/components/GlassyButton";
import CalendlyModal from "@/components/CalendlyModal";
import { ScheduleAnim, CustomerAnim, EstimateAnim, InvoiceAnim, AnalyticsAnim, MobileAnim } from "@/components/FeatureAnimations";
import { BalancedMasonryGrid, Frame } from "@masonry-grid/react";

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => {
      const t = Math.min(window.scrollY / 100, 1);
      const blur = Math.round(12 + t * 40);
      const bg = (0.05 + t * 0.2).toFixed(2);
      const val = `blur(${blur}px) saturate(180%)`;
      header.style.backdropFilter = val;
      (header.style as unknown as Record<string, string>).webkitBackdropFilter = val;
      header.style.background = `rgba(255, 255, 255, ${bg})`;
      header.style.maxWidth = `${100 - t * 20}rem`;
      header.style.boxShadow = t > 0
        ? `0 8px 32px rgba(31, 38, 135, ${(t * 0.15).toFixed(2)}), inset 0 4px 20px rgba(255, 255, 255, ${(t * 0.3).toFixed(2)})`
        : 'none';
      header.classList.toggle('scrolled', window.scrollY > 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const collageImages = [
    { src: "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=800&q=80&auto=format", alt: "Roofing", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1643225523483-e2c434191bba?w=800&q=80&auto=format", alt: "Roofing", w: 3, h: 4 },

    { src: "https://images.unsplash.com/photo-1421940943431-d392fcc1079f?w=800&q=80&auto=format", alt: "Window washing", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1651437342377-6ffb50cfb2a1?w=800&q=80&auto=format", alt: "Window washing", w: 3, h: 4 },

    { src: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80&auto=format", alt: "Painting", w: 3, h: 4 },
    { src: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=800&q=80&auto=format", alt: "Painting", w: 4, h: 3 },

    { src: "https://images.unsplash.com/photo-1631889477974-6394c9988436?w=800&q=80&auto=format", alt: "Flooring", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80&auto=format", alt: "Flooring", w: 3, h: 4 },

    { src: "https://images.unsplash.com/photo-1734079692160-fcbe4be6ab96?w=800&q=80&auto=format", alt: "Landscaping", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1597201278257-3687be27d954?w=800&q=80&auto=format", alt: "Landscaping", w: 3, h: 4 },

    { src: "https://images.unsplash.com/photo-1647022528152-52ed9338611d?w=800&q=80&auto=format", alt: "HVAC", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1615774925655-a0e97fc85c14?w=800&q=80&auto=format", alt: "HVAC", w: 3, h: 4 },

    // Fillers to make the masonry bottom feel full
    { src: "https://images.unsplash.com/photo-1631889477974-6394c9988436?w=800&q=80&auto=format", alt: "Flooring", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80&auto=format", alt: "Painting", w: 3, h: 4 },
    { src: "https://images.unsplash.com/photo-1597201278257-3687be27d954?w=800&q=80&auto=format", alt: "Landscaping", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1647022528152-52ed9338611d?w=800&q=80&auto=format", alt: "HVAC", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1421940943431-d392fcc1079f?w=800&q=80&auto=format", alt: "Window washing", w: 3, h: 4 },
    { src: "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=800&q=80&auto=format", alt: "Roofing", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=800&q=80&auto=format", alt: "Roofing", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=800&q=80&auto=format", alt: "Roofing", w: 4, h: 3 }
  ];

  const newCollageImages = [
    { src: "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=800&q=80&auto=format", alt: "Roofing", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1643225523483-e2c434191bba?w=800&q=80&auto=format", alt: "Roofing", w: 4, h: 4 },

    { src: "https://images.unsplash.com/photo-1421940943431-d392fcc1079f?w=800&q=80&auto=format", alt: "Window washing", w: 4, h: 2.5 },
    { src: "https://images.unsplash.com/photo-1651437342377-6ffb50cfb2a1?w=800&q=80&auto=format", alt: "Window washing", w: 4, h: 4 },

    { src: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80&auto=format", alt: "Painting", w: 4, h: 4 },
    { src: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=800&q=80&auto=format", alt: "Painting", w: 4, h: 3 },

    { src: "https://images.unsplash.com/photo-1631889477974-6394c9988436?w=800&q=80&auto=format", alt: "Flooring", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80&auto=format", alt: "Flooring", w: 4, h: 4 },

    { src: "https://images.unsplash.com/photo-1734079692160-fcbe4be6ab96?w=800&q=80&auto=format", alt: "Landscaping", w: 4, h: 4 },
    { src: "https://images.unsplash.com/photo-1597201278257-3687be27d954?w=800&q=80&auto=format", alt: "Landscaping", w: 4, h: 4 },

    { src: "https://images.unsplash.com/photo-1647022528152-52ed9338611d?w=800&q=80&auto=format", alt: "HVAC", w: 4, h: 3 },
    { src: "https://images.unsplash.com/photo-1615774925655-a0e97fc85c14?w=800&q=80&auto=format", alt: "HVAC", w: 4, h: 4 },
  ];


  return (
    <div className="min-h-screen bg-[#fefdfd]">
      {/* Header */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div ref={headerRef} className="mx-auto liquid-glass px-4 py-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-normal italic text-[#2141EC] pb-1 px-1" style={{ fontFamily: 'var(--font-playfair)' }}>Cohesive</h1>

            <nav className="hidden md:flex items-center bg-white/40 rounded-full px-1 py-1 gap-1">
              <a href="#features" className="text-gray-700 hover:text-[#2141EC] hover:bg-white/60 transition-all font-medium px-4 py-1.5 rounded-full">Features</a>
              <a href="#about" className="text-gray-700 hover:text-[#2141EC] hover:bg-white/60 transition-all font-medium px-4 py-1.5 rounded-full">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#2141EC] hover:bg-white/60 transition-all font-medium px-4 py-1.5 rounded-full">Contact</a>
              <a href="/api-docs" className="text-gray-700 hover:text-[#2141EC] hover:bg-white/60 transition-all font-medium px-4 py-1.5 rounded-full">API</a>
            </nav>

            <button onClick={() => setShowCalendly(true)} className="hidden md:block bg-[#2141EC] text-white px-5 py-2.5 hover:bg-[#1a35bd] transition-all duration-200 font-medium shadow-lg shadow-[#2141EC]/25 hover:shadow-[#2141EC]/40 hover:scale-105 cursor-pointer" style={{ borderRadius: '9999px' }}>
              Request a demo
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================= */}
      {/*                         HERO SECTION                           */}
      {/* ============================================================= */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Hero content */}
        <div className="flex flex-col w-full justify-center items-center max-w-5xl mx-auto text-center relative mb-70 sm:mb-64 md:mb-110 z-10">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-[#2141EC]/5 border border-[#2141EC]/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-[#1a35bd]">AI-Powered CRM for Trade Pros</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 leading-[1.15] tracking-[-0.02em]">
            Automate local
            <span className="text-[#2141EC] block italic py-1" style={{ fontFamily: 'var(--font-playfair)' }}> business growth</span>
          </h1>

          {/* Subhead */}
          <p className="animate-fade-up-delay-2 text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Completely automated lead generation and marketing to local businesses. Fully done for you on auto-pilot.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-2">
            <GlassyButton />
          </div>
        </div>

        {/* Background image */}
        <div className="absolute inset-0 z-0 justify-center bg-[#fefdfd] top-[70vh] sm:top-[60vh] md:top-80">
          <img
            src="https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/hero-1.png"
            alt="Hero Illustration"
            className="w-full object-cover object-center animate-fade-in"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.8) 20%, black 35%, black 70%, transparent 95%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.8) 20%, black 35%, black 70%, transparent 95%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskComposite: 'destination-in',
            }}
          />
        </div>
      </section>

      {/* ============================================================= */}
      {/*                      LOGO MARQUEE                              */}
      {/* ============================================================= */}
      <div className="relative z-10 overflow-hidden pb-12 max-w-[85rem] mx-auto">
        <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-10">Trusted by 1000+ businesses</p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fefdfd] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fefdfd] to-transparent z-10"></div>
          <div className="flex animate-marquee gap-16 items-center w-max">
            {[0, 1].map((copy) =>
              [
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/anago.avif",
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/corporate_cleaning.avif",
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/gotflow.webp",
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/janpro.avif",
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/kitchenguard.avif",
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/rolling_suds.avif",
                "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/service_master.webp",
              ].map((src, i) => (
                <img key={`${copy}-${i}`} src={src} alt="" className="h-12 object-contain opacity-70 hover:opacity-100 transition-all duration-300 shrink-0" />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/*                    INDUSTRIES COLLAGE                          */}
      {/* ============================================================= */}
      {/* <div className="relative z-10 pb-16 pt-2">
        <div
          className="max-w-[77rem] max-h-[620px] mx-auto overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <BalancedMasonryGrid frameWidth={220} gap={4}>
            {collageImages.map((img, i) => (
              <Frame key={i} width={img.w} height={img.h}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" loading="lazy" />
              </Frame>
            ))}
          </BalancedMasonryGrid>
        </div>
      </div> */}

      {/* ============================================================= */}
      {/*                    PRODUCT SCREENSHOT                          */}
      {/* ============================================================= */}
      <ProductSlideshow />


      {/* ============================================================= */}
      {/*                         FEATURES SECTION                       */}
      {/* ============================================================= */}
      <section id="features" className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#2141EC] uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Built for Trade Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <CustomerAnim />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hyper-Local Leads</h3>
              <p className="text-gray-500 leading-relaxed">Discover businesses in your neighborhood ready to buy. Targeted, local leads delivered straight to your pipeline.</p>
            </div>

            <div className="feature-card p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <ScheduleAnim />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best-Practice Email</h3>
              <p className="text-gray-500 leading-relaxed">Warm inboxes, dynamic send schedules, and proven templates that land in the inbox — not spam.</p>
            </div>

            <div className="feature-card p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <EstimateAnim />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Parallel Dialer</h3>
              <p className="text-gray-500 leading-relaxed">Call multiple prospects at once and connect with the first to pick up. 5x your outreach in half the time.</p>
            </div>

            <div className="feature-card p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <InvoiceAnim />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Follow-Ups</h3>
              <p className="text-gray-500 leading-relaxed">Never let a lead go cold. Smart sequences follow up across email, phone, and SMS on autopilot.</p>
            </div>

            <div className="feature-card p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <AnalyticsAnim />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-500 leading-relaxed">Track open rates, call outcomes, and pipeline health. Know exactly what&apos;s working and double down.</p>
            </div>

            <div className="feature-card p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <MobileAnim />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Notifications</h3>
              <p className="text-gray-500 leading-relaxed">Get instant alerts on mobile and SMS when a lead responds. Never miss a hot prospect, even in the field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                         ABOUT SECTION                          */}
      {/* ============================================================= */}
      <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#2141EC] uppercase tracking-widest mb-3">About us</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Built by people who <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>get it</span>
            </h2>
          </div>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              We&apos;re a team of engineers, marketers, and former skilled trade business owners. We didn&apos;t just study this industry from the outside — we&apos;ve lived it. We&apos;ve driven the trucks, quoted the jobs, chased the invoices, and felt the frustration of watching leads slip through the cracks because our tools weren&apos;t built for the way we actually work.
            </p>
            <p>
              We know what it&apos;s like to juggle a growing client base with a phone full of sticky-note reminders. To spend your evenings doing admin instead of spending time with your family. To lose a commercial contract to a competitor simply because they followed up first.
            </p>
            <p>
              That&apos;s why we built Cohesive. Not another generic CRM crammed with features you&apos;ll never use — but a purpose-built platform designed around the real workflows of HVAC technicians, roofers, cleaners, plumbers, and every other trade professional out there grinding to grow their business.
            </p>
            <p className="text-gray-900 font-medium">
              We&apos;re building the tool we wish we had. And we&apos;re just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                         CTA SECTION                            */}
      {/* ============================================================= */}
      <section className="py-24 bg-gradient-to-br from-[#2141EC] via-[#1b2d8a] to-[#0a0f2e] relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#4f6af0]/20 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2141EC]/15 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4f6af0]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Ready to <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>Transform</span> Your Trade Business?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of contractors who have streamlined operations with Cohesive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowCalendly(true)} className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200 font-medium cursor-pointer">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*                         FOOTER                                 */}
      {/* ============================================================= */}
      <footer id="contact" className="bg-gradient-to-b from-[#0a0f2e] to-[#060a1a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-normal italic text-white mb-4 py-1 px-1" style={{ fontFamily: 'var(--font-playfair)' }}>Cohesive</h3>
              <p className="text-gray-400 leading-relaxed">
                The AI-native CRM built specifically for skilled trade services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/whitelabel" className="hover:text-white transition-colors">Whitelabel Partnership</a></li>
                <li><a href="/api-docs" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="mailto:admin@cohesiveapp.com" className="hover:text-white transition-colors">admin@cohesiveapp.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#2141EC]/15 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-sm gap-4">
            <p>&copy; 2025 Cohesive. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}
    </div>
  );
}

function ProductSlideshow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const slides: Slide[] = [
    {
      src: "https://cohesive-b0d5d2agc3g8bgha.z03.azurefd.net/landing-assets/product_screenshot_1.png",
      alt: "Cohesive CRM dashboard showing leads and contacts",
      eyebrow: "Lead Management",
      title: <>Your leads, organized and <span className="italic" style={{ fontFamily: "var(--font-playfair)" }}>ready to close</span></>,
      body: "Every prospect in one pipeline — from first touch to closed deal. No spreadsheets, no missed follow-ups, no leads slipping through.",
    },
    {
      src: "/call_center_screenshot.png",
      alt: "Cohesive AI call center transcript and SMS conversation",
      eyebrow: "AI Outreach",
      title: <>Calls and texts on <span className="italic" style={{ fontFamily: "var(--font-playfair)" }}>autopilot</span></>,
      body: "AI works the phones and the inbox the moment a lead goes quiet — booking jobs while you sleep so you never leave money on the table.",
    },
  ];

  const slideOffset = Math.max(0, Math.min(1, (progress - 0.45) / 0.1));
  const activeIndex = slideOffset > 0.5 ? 1 : 0;

  return (
    <section ref={sectionRef} className="relative z-10 bg-white" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-[#2141EC] uppercase tracking-widest">See us in action</p>
          </div>

          <div className="relative w-full h-[74vh] max-h-[720px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <SlideRow {...slides[0]} />
            </div>
            <div
              className="absolute inset-0 z-10"
              style={{
                transform: `translateY(${(1 - slideOffset) * 100}%)`,
                transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <SlideRow {...slides[1]} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? 24 : 8,
                  background: activeIndex === i ? "#2141EC" : "rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Slide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
};

function SlideRow({ src, alt, eyebrow, title, body }: Slide) {
  return (
    <div className="grid md:grid-cols-7 gap-6 md:gap-8 h-full items-stretch">
      <div
        className="md:col-span-2 rounded-2xl border border-gray-200 ring-1 ring-black/5 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundColor: "#fbfbfd",
          backgroundImage:
            "radial-gradient(rgba(33, 65, 236, 0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.85), rgba(33,65,236,0.03))",
          backgroundSize: "14px 14px, 100% 100%",
        }}
      >
        <p className="text-xs font-semibold text-[#2141EC] uppercase tracking-widest mb-3">{eyebrow}</p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-4">{title}</h3>
        <p className="text-base text-gray-600 leading-relaxed">{body}</p>
      </div>
      <div
        className="md:col-span-5 rounded-2xl overflow-hidden shadow-2xl shadow-[#2141EC]/10 border border-gray-200 ring-1 ring-black/5 flex items-center justify-center px-5 md:px-7 py-4 md:py-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(33, 65, 236, 0.06), transparent 55%), radial-gradient(circle at 80% 90%, rgba(33, 65, 236, 0.05), transparent 55%), linear-gradient(135deg, #fcfdff 0%, #eef2fa 100%)",
        }}
      >
        <img src={src} alt={alt} className="w-full h-auto max-h-full object-contain rounded-lg" />
      </div>
    </div>
  );
}
