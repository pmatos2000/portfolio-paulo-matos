import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadPosts } from "@/data/posts";
import { sidebarTree, type TreeItem } from "@/data/sidebarTree";

export const dynamic = "force-static";

const CONTENT_DIR = join(process.cwd(), "src", "content", "blog");

const stripMdx = (source: string) =>
  source
    .replace(/export const meta = \{[\s\S]*?\n\};/, "")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[a-z]*/g, ""))
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const collectPages = (
  nodes: TreeItem[],
  acc: Map<string, string>,
): Map<string, string> => {
  for (const node of nodes) {
    if (node.url) {
      const path = node.url.split("#")[0];
      if (
        path.startsWith("/") &&
        !path.startsWith("/blog/") &&
        !acc.has(path)
      ) {
        acc.set(path, node.title);
      }
    }
    if (node.type === "node") {
      collectPages(node.children, acc);
    }
  }
  return acc;
};

export async function GET() {
  const posts = await loadPosts();

  const postEntries = await Promise.all(
    posts.map(async (post) => {
      const source = await readFile(
        join(CONTENT_DIR, `${post.slug}.mdx`),
        "utf8",
      );
      return {
        url: `/blog/${post.slug}`,
        title: post.title,
        kind: "post" as const,
        tags: post.tags,
        body: stripMdx(source),
      };
    }),
  );

  const pageEntries = [...collectPages(sidebarTree, new Map())].map(
    ([url, title]) => ({ url, title, kind: "page" as const }),
  );

  return Response.json([...postEntries, ...pageEntries]);
}
