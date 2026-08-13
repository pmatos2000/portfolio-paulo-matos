import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadPosts } from "@/data/posts";
import { sidebarTree, type TreeItem } from "@/data/sidebarTree";

export const dynamic = "force-static";

const CONTENT_DIR = join(process.cwd(), "src", "content", "blog");
const PAGE_TEXT = join(process.cwd(), "src", "data", "pageText.json");

type PageText = { heading: string; body: string };

/**
 * Texto das páginas estáticas, gerado por scripts/extract-page-text.mjs
 * nos ganchos prebuild/predev.
 *
 * Ausente, o índice sai só com títulos — como era antes — em vez de derrubar o
 * build. O aviso existe porque a falha seria invisível: a busca continuaria
 * funcionando, achando menos.
 */
const readPageText = async (): Promise<Record<string, PageText>> => {
  try {
    return JSON.parse(await readFile(PAGE_TEXT, "utf8"));
  } catch {
    console.warn(
      "[search-index] pageText.json ausente; páginas entram sem corpo. Rode `npm run page-text`.",
    );
    return {};
  }
};

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

  const pageTexts = await readPageText();

  const pageEntries = [...collectPages(sidebarTree, new Map())].map(
    ([url, title]) => {
      const page = pageTexts[url];
      return {
        url,
        /** Nome de arquivo, como a árvore mostra. */
        title,
        kind: "page" as const,
        /** O h1 real vai em tags: pontua acima do corpo e abaixo do título,
            que é exatamente onde ele deve ficar. O SearchPanel usa tags só
            para pontuar, nunca para exibir. */
        ...(page?.heading ? { tags: [page.heading] } : {}),
        ...(page?.body ? { body: page.body } : {}),
      };
    },
  );

  return Response.json([...postEntries, ...pageEntries]);
}
