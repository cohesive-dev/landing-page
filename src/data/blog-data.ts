import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  contentHtml: string;
}

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const filePath = path.join(process.cwd(), "src/data/SEObot.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data: Array<{
    Slug: string;
    Title: string;
    Created: string;
    Updated: string;
    Category: string;
    Summary: string;
    Image: { url: string };
    Content: string;
  }> = JSON.parse(raw);

  const allPosts: BlogPost[] = data.map((post) => ({
    slug: post.Slug,
    title: post.Title,
    date: post.Updated || post.Created,
    category: post.Category || "",
    description: post.Summary || "",
    image: post.Image?.url || "",
    contentHtml: post.Content,
  }));

  // Sort newest first
  allPosts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  cachedPosts = allPosts;
  return allPosts;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getFormattedDate(post: BlogPost): string {
  return formatDate(post.date);
}
