import Link from "next/link";
import { getAllPosts, getFormattedDate } from "@/data/blog-data";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#fefdfd] flex flex-col" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
      <header className="py-6 px-6 lg:px-8">
        <Link href="/" className="text-2xl font-normal italic text-[#2141EC]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Cohesive
        </Link>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Insights on AI, lead generation, and growth strategies for local service businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:border-[#2141EC]/30 hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-5 flex flex-col flex-1">
                  {post.category && (
                    <span className="text-xs font-medium text-[#2141EC] mb-2">{post.category}</span>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#2141EC] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">{getFormattedDate(post)}</p>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                  <span className="text-sm text-[#2141EC] font-medium mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        <Link href="/" className="hover:text-gray-600 transition-colors">&larr; Back to home</Link>
      </footer>
    </div>
  );
}
