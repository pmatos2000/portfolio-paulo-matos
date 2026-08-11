import { postLoaders, postSlugs } from "@/data/posts";
import { blogConfig, siteConfig } from "@/data/site";

export const dynamic = "force-static";

const FEED_URL = new URL(blogConfig.feedPath, siteConfig.url).toString();
const BLOG_URL = new URL("/blog", siteConfig.url).toString();

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { meta } = await postLoaders[slug]();
      return {
        ...meta,
        url: new URL(`/blog/${slug}`, siteConfig.url).toString(),
      };
    }),
  );
  posts.sort((a, b) => b.date.localeCompare(a.date));

  const items = posts.map((post) =>
    [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${post.url}</link>`,
      `      <guid isPermaLink="true">${post.url}</guid>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(post.description)}</description>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      "    </item>",
    ].join("\n"),
  );

  const updated = posts[0]?.date ?? "1970-01-01";

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(blogConfig.title)}</title>`,
    `    <link>${BLOG_URL}</link>`,
    `    <description>${escapeXml(blogConfig.description)}</description>`,
    "    <language>pt-br</language>",
    `    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
