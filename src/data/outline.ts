import { VscSymbolString } from "react-icons/vsc";
import type { BlogYear } from "@/data/blogTree";
import type { TocHeading } from "@/data/postToc";
import {
  findItem,
  type OutlineEntry,
  postSlugFromPath,
  sidebarTree,
  type TreeItem,
} from "@/data/sidebarTree";

/**
 * Importa só tipos de `postToc` e `blogTree` de propósito: aqueles módulos
 * tocam `node:fs`, e este roda no cliente. `import type` some na compilação.
 */

/** h2 com h3 dentro vira nó com url: o chevron abre, o nome navega. */
export const tocToItems = (
  slug: string,
  headings: TocHeading[],
  prefix: string,
): TreeItem[] =>
  headings.map((heading) => {
    const base = {
      id: `${prefix}:${slug}#${heading.id}`,
      title: heading.text,
      icon: VscSymbolString,
      url: `/blog/${slug}#${heading.id}`,
    };
    return heading.children.length > 0
      ? {
          ...base,
          type: "node" as const,
          children: tocToItems(slug, heading.children, prefix),
        }
      : { ...base, type: "leaf" as const };
  });

/**
 * O outline da página atual, quando ela tem um.
 *
 * Duas fontes, nenhuma nova: post vem do índice extraído em build; página com
 * seções ancoradas reaproveita as próprias folhas da árvore — assim o rótulo
 * do Outline é o mesmo que o Explorer mostra logo acima, e o id coincide, o
 * que faz os dois acenderem juntos sem lógica extra.
 *
 * As demais páginas devolvem lista vazia e a seção não aparece, como o VS Code
 * faz em arquivo sem símbolos.
 */
export const outlineFor = (pathname: string, years: BlogYear[]): TreeItem[] => {
  const slug = postSlugFromPath(pathname);

  if (slug) {
    const post = years
      .flatMap((year) => year.posts)
      .find((entry) => entry.slug === slug);
    return post ? tocToItems(slug, post.toc, "outline") : [];
  }

  const item = findItem(sidebarTree, (entry) => entry.url === pathname);
  if (!item) {
    return [];
  }

  /** Declarado à mão tem precedência: permite dar outline a página cujas
      seções não viraram folhas, e sobrescrever o rótulo onde viraram. */
  if (item.outline?.length) {
    return item.outline.map((entry: OutlineEntry) => ({
      id: `outline:${pathname}#${entry.hash}`,
      type: "leaf" as const,
      title: entry.title,
      icon: VscSymbolString,
      url: `${pathname}#${entry.hash}`,
    }));
  }

  if (item.type !== "node") {
    return [];
  }

  return item.children.filter(
    (child) => child.type === "leaf" && child.url.startsWith(`${pathname}#`),
  );
};
