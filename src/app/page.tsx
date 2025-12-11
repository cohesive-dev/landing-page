export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 transition-all duration-300 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 transition-all duration-300" id="header-content">
            <h1 className="text-2xl font-bold text-indigo-600">Cohesive AI</h1>

            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
            </nav>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <script dangerouslySetInnerHTML={{
        __html: `
        window.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      const headerContent = document.getElementById('header-content');
      
      if (window.scrollY > 50) {
        headerContent.classList.add('bg-white/10', 'backdrop-blur-sm', 'border', 'border-white/20', 'rounded-full', 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]', 'mx-4', 'px-6');
      } else {
        headerContent.classList.remove('bg-white/10', 'backdrop-blur-sm', 'border', 'border-white/20', 'rounded-full', 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]', 'mx-4', 'px-6');
      }
        });
      `
      }} />

      {/* ============================================================= */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* HERO IMAGE BACKGROUND */}
        <div className="flex flex-col w-full justify-center items-center max-w-5xl mx-auto text-center relative mb-150 z-10">
          {/* HEADLINE */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-lg">
            Sell to prospects in
            <span className="text-indigo-600 block md:inline"> your neighborhood</span>
          </h1>

          {/* SUBHEAD */}
          <p className="text-xl text-gray-800 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Turn local leads into commercial clients. Built for cleaners, HVAC pros, roofers, and other skilled trade professionals.
          </p>

          {/* CTA BUTTONS */}
          <div className="relative overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-[200px] p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-40"></div>
            <div className="relative z-10">
              Request A Demo
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 justify-center bg-[#fbfbfb] top-25">
          <img
            src="/hero-city-lg.jpeg"
            alt="Hero Illustration"
            className="w-full object-cover object-center"
          />

          {/* Gradient overlay to enhance image & text contrast */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent"></div> */}
        </div>
      </section >

      {/* ============================================================= */}
      {/*                         FEATURES SECTION                       */}
      {/* ============================================================= */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Trade Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your trade business efficiently and profitably
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-gray-600">AI-powered scheduling that optimizes routes and maximizes your daily productivity.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0zM7 10a2 2 0 11-4 0 2 2 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Management</h3>
              <p className="text-gray-600">Track customer history, preferences, and automate follow-ups to build lasting relationships.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Estimates</h3>
              <p className="text-gray-600">Generate accurate quotes instantly with AI that learns from your past jobs and market rates.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Invoicing</h3>
              <p className="text-gray-600">Create professional invoices automatically and get paid faster with integrated payments.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Analytics</h3>
              <p className="text-gray-600">Make data-driven decisions with insights on revenue, efficiency, and growth trends.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile App</h3>
              <p className="text-gray-600">Access everything on-the-go with a mobile app designed for the field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Trade Business?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of contractors who have streamlined operations with Cohesive AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg hover:bg-gray-100 transition font-semibold">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-indigo-600 transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Cohesive AI</h3>
              <p className="text-gray-400">
                The AI-native CRM built specifically for skilled trade services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Cohesive AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div >
  );
}
