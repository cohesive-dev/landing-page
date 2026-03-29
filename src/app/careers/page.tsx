import Link from "next/link";

const jobs = [
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareersPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers at Cohesive</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              We&apos;re building the future of CRM for skilled trades. Join us on our mission to automate local business growth.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Open Positions</h2>
            <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">0 positions available</span>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="relative border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-50 pointer-events-none select-none"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>{job.department}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{job.location}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400 border border-gray-200 rounded-full px-3 py-1 whitespace-nowrap">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[#2141EC]/5 border border-[#2141EC]/10 rounded-2xl p-8">
            <p className="text-gray-700 mb-1 font-medium">Don&apos;t see a role that fits?</p>
            <p className="text-gray-500 text-sm mb-5">We&apos;re always looking for talented people. Reach out and tell us about yourself.</p>
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
