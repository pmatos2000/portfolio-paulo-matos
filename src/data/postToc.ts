import { readFile } from "node:fs/promises";
import { join } from "node:path";
import GithubSlugger from "github-slugger";

export type TocHeading = {
  /** Idêntico ao id que o rehype-slug injeta no <h2>/<h3> renderizado. */
  id: string;
  text: string;
  /** h3 aninhado sob o h2 anterior. Vazio nos h3. */
  children: TocHeading[];
};

const CONTENT_DIR = join(process.cwd(), "src", "content", "blog");

/** Blocos cercados saem antes: um `# comentário` dentro deles viraria título. */
const FENCED = /^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\1\2[ \t]*$/gm;
const HEADING = /^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/gm;

/**
 * Markdown inline para texto puro — que é o que o rehype-slug enxerga, já que
 * ele age sobre a árvore renderizada. Sem isto, `Option<T>` com crases geraria
 * um id diferente do que o navegador recebe, e a âncora não acharia nada.
 */
const inlineToText = (raw: string) =>
  raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(`+)(.*?)\1/g, "$2")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Só h2 e h3 saem no índice, mas todos os níveis passam pelo slugger: é o que
 * reproduz o sufixo de desambiguação (`titulo-1`) que o rehype-slug daria a
 * títulos repetidos. Pular níveis aqui dessincronizaria os contadores.
 */
export const extractToc = (source: string): TocHeading[] => {
  const slugger = new GithubSlugger();
  const raiz: TocHeading[] = [];

  for (const match of source.replace(FENCED, "").matchAll(HEADING)) {
    const level = match[1].length;
    const text = inlineToText(match[2]);
    const id = slugger.slug(text);

    if (level === 2) {
      raiz.push({ id, text, children: [] });
    } else if (level === 3 && raiz.length > 0) {
      raiz[raiz.length - 1].children.push({ id, text, children: [] });
    }
  }

  return raiz;
};

/** Lê o .mdx cru em build, como o /search-index.json já faz. */
export const getPostToc = async (slug: string): Promise<TocHeading[]> =>
  extractToc(await readFile(join(CONTENT_DIR, `${slug}.mdx`), "utf8"));
