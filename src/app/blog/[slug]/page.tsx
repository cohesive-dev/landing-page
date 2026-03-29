import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getFormattedDate } from "@/data/blog-data";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Cohesive Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#fefdfd] flex flex-col" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
      <header className="py-6 px-6 lg:px-8">
        <Link href="/" className="text-2xl font-normal italic text-[#2141EC]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Cohesive
        </Link>
      </header>

      <main className="flex-1 px-6 py-12">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-[#2141EC] hover:underline mb-6 inline-block">&larr; Back to blog</Link>

          {post.category && (
            <span className="block text-sm font-medium text-[#2141EC] mb-2">{post.category}</span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-8">{getFormattedDate(post)}</p>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-xl mb-10 object-cover max-h-96"
            />
          )}

          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-li:text-gray-600
              prose-strong:text-gray-900
              prose-a:text-[#2141EC] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl
              prose-table:border-collapse prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-th:border prose-td:border prose-th:border-gray-200 prose-td:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        <Link href="/blog" className="hover:text-gray-600 transition-colors">&larr; Back to blog</Link>
      </footer>
    </div>
  );
}
