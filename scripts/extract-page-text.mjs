/**
 * Extrai o texto visível das páginas estáticas para o índice de busca.
 *
 * Roda antes do build e do dev (ganchos prebuild/predev do npm) e escreve
 * src/data/pageText.json, que o /search-index.json lê.
 *
 * Por que um script e não direto na rota: o `typescript` é devDependency e
 * pesa dezenas de MB. Importado de dentro de uma rota, o Next tentaria
 * empacotá-lo no bundle do servidor. Aqui ele fica onde é a sua função —
 * ferramenta de build, executada uma vez.
 *
 * Por que AST e não expressão regular: a primeira versão deste extrator usava
 * regex e apagou quatro páginas inteiras em silêncio — o corpo da função é um
 * `{ ... }` sem chaves internas, e a regra que removia expressões JSX comeu o
 * conteúdo junto. Índice de busca que falha calado é pior que índice ausente:
 * ninguém descobre até um visitante procurar algo e não achar.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";

const APP_DIR = join(process.cwd(), "src", "app");
const SKILLS_FILE = join(process.cwd(), "src", "data", "skills.ts");
const OUTPUT_FILE = join(process.cwd(), "src", "data", "pageText.json");

/** JSXText guarda a fonte crua, então as entidades chegam literais. */
const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
};

/** Abaixo disto a extração provavelmente quebrou, e não é página curta. */
const MIN_LENGTH = 50;

const decodeEntities = (value) =>
  value
    .replace(/&[a-z]+;/gi, (entity) => ENTITIES[entity] ?? entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const clean = (value) => decodeEntities(value).replace(/\s+/g, " ").trim();

const parseFile = async (path) =>
  ts.createSourceFile(
    path,
    await readFile(path, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

/** Todo texto entre tags, mais o conteúdo do primeiro h1 separado. */
const extractPage = async (path) => {
  const source = await parseFile(path);
  const chunks = [];
  let heading = "";

  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const text = clean(node.text);
      if (text) {
        chunks.push(text);
      }
    }

    /** O h1 vira `tags` no índice: pontua acima do corpo, abaixo do título. */
    if (!heading && ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName.getText();
      if (tag === "h1") {
        heading = clean(node.getText().replace(/<[^>]*>/g, " "));
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(source);
  return { heading, body: clean(chunks.join(" ")) };
};

/**
 * O conteúdo de /competencias vem do skillsData por .map(), então não existe
 * como texto no JSX — sem isto, ninguém acha "PostgreSQL" buscando no site.
 */
const extractSkills = async () => {
  const source = await parseFile(SKILLS_FILE);
  const values = new Set();

  const visit = (node) => {
    if (ts.isStringLiteral(node) && node.text.trim()) {
      values.add(node.text.trim());
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return [...values].join(" ");
};

/** src/app/projetos/leaf/page.tsx -> /projetos/leaf ; src/app/page.tsx -> / */
const routeOf = (path) => {
  const route = path
    .slice(APP_DIR.length)
    .replaceAll("\\", "/")
    .replace("/page.tsx", "");
  return route === "" ? "/" : route;
};

/** Rota dinâmica fica de fora: o texto dela depende de dado, não do arquivo. */
const findPages = async (dir, found = []) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith("[")) {
        await findPages(path, found);
      }
    } else if (entry.name === "page.tsx") {
      found.push(path);
    }
  }
  return found;
};

const pages = await findPages(APP_DIR);
const byRoute = {};

for (const path of pages.sort()) {
  byRoute[routeOf(path)] = await extractPage(path);
}

if (byRoute["/competencias"]) {
  const skills = await extractSkills();
  byRoute["/competencias"].body =
    `${byRoute["/competencias"].body} ${skills}`.trim();
}

await writeFile(OUTPUT_FILE, `${JSON.stringify(byRoute, null, 2)}\n`, "utf8");

const total = Object.values(byRoute).reduce(
  (sum, page) => sum + page.body.length,
  0,
);
console.log(
  `[pageText] ${pages.length} páginas, ${total.toLocaleString("pt-BR")} caracteres -> src/data/pageText.json`,
);

/** Página sem texto é sinal de extração quebrada, não de página vazia. */
for (const [route, page] of Object.entries(byRoute)) {
  if (page.body.length < MIN_LENGTH) {
    console.warn(`[pageText] aviso: ${route} rendeu quase nenhum texto`);
  }
}
