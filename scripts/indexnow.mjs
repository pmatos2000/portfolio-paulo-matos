/**
 * Notifica os buscadores do protocolo IndexNow de que URLs mudaram.
 *
 *   npm run indexnow                          deduz as URLs do diff do Git
 *   npm run indexnow -- --dry-run             mostra o que enviaria, sem enviar
 *   npm run indexnow -- --since=HEAD~3        amplia a janela do diff
 *   npm run indexnow -- /blog /premios        modo manual, ignora o Git
 *
 * Rode DEPOIS do deploy ficar verde. Antes disso o buscador chega, lê o HTML
 * antigo e a submissão é desperdiçada.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Pública por design: vive em /<KEY>.txt e prova posse do domínio. Não é credencial. */
const KEY = "4d2930af9ed3935d0910cebafd471dce";
const HOST = "www.pmatos.dev";

/** Endpoint compartilhado: um POST se propaga para Bing, Yandex, Naver, Seznam e Yep. */
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** Guarda o último commit submetido. Fora do Git: é estado local, não do projeto. */
const STATE_FILE = ".indexnow.json";

const APP_DIR = "src/app";
const BLOG_DIR = "src/content/blog";

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

// ---------------------------------------------------------------- descoberta

/** Caminha src/app atrás de page.tsx. Sem glob: evita depender de API experimental. */
const findPageFiles = (dir = APP_DIR, found = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name).replaceAll("\\", "/");
    if (entry.isDirectory()) {
      findPageFiles(path, found);
    } else if (entry.name === "page.tsx") {
      found.push(path);
    }
  }
  return found;
};

/** src/app/projetos/leaf/page.tsx -> /projetos/leaf ; src/app/page.tsx -> / */
const routeOf = (pageFile) => {
  const route = pageFile.replace(`${APP_DIR}`, "").replace("/page.tsx", "");
  return route === "" ? "/" : route;
};

/**
 * Descobre em quais rotas o PostLinks aparece e com qual tag, lendo o JSX.
 * Assim, se você colocar <PostLinks tag="rust" /> numa página nova, o script
 * passa a considerá-la sozinho — sem lista hardcoded para esquecer de atualizar.
 *
 * O `limit` é ignorado de propósito: calcular se um post editado ainda cabe no
 * corte custaria mais do que a URL extra que isso evitaria.
 */
const findTagRoutes = () => {
  const byTag = new Map();
  for (const pageFile of findPageFiles()) {
    const source = readFileSync(pageFile, "utf8");
    for (const match of source.matchAll(/<PostLinks[^>]*\stag="([^"]+)"/g)) {
      const tag = match[1];
      const routes = byTag.get(tag) ?? [];
      routes.push(routeOf(pageFile));
      byTag.set(tag, routes);
    }
  }
  return byTag;
};

/** Slug sem entrada no postLoaders não tem rota: submeter daria 404 no crawl. */
const findPublishedSlugs = () => {
  const source = readFileSync("src/data/posts.ts", "utf8");
  const start = source.indexOf("export const postLoaders");
  const block = source.slice(start, source.indexOf("} satisfies", start));
  return new Set([...block.matchAll(/"([a-z0-9-]+)":\s*\(\)/g)].map((m) => m[1]));
};

const tagsOfPost = (slug) => {
  const source = readFileSync(`${BLOG_DIR}/${slug}.mdx`, "utf8");
  const match = source.match(/tags:\s*\[([^\]]*)\]/);
  return match ? [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
};

/**
 * O bloco `export const meta` do post, para comparar versões.
 *
 * Comparar o bloco inteiro em vez de procurar `title:` no diff é o que faz
 * funcionar com o formato de duas linhas do projeto: em `description:\n "..."`
 * quem muda é a linha da string, não a da chave.
 */
const metaBlockOf = (source) => {
  const start = source.indexOf("export const meta");
  return start < 0 ? "" : source.slice(start, source.indexOf("\n};", start));
};

// ------------------------------------------------------------------ mapeamento

/** Mapeia arquivos alterados -> URLs cujo HTML renderizado mudou. */
const mapChangesToPaths = (changes, base) => {
  const publishedSlugs = findPublishedSlugs();
  const tagRoutes = findTagRoutes();
  const paths = new Set();
  const warnings = [];

  /** Um post entrando ou saindo mexe no índice e em toda listagem da tag dele. */
  const addListingsFor = (slug) => {
    paths.add("/blog");
    if (!publishedSlugs.has(slug)) {
      return;
    }
    for (const tag of tagsOfPost(slug)) {
      for (const route of tagRoutes.get(tag) ?? []) {
        paths.add(route);
      }
    }
  };

  for (const { status, file } of changes) {
    if (file.startsWith(`${BLOG_DIR}/`) && file.endsWith(".mdx")) {
      const slug = file.slice(`${BLOG_DIR}/`.length, -".mdx".length);

      /** Deletado: submeter mesmo assim, para o buscador ver o 404 e tirar do índice. */
      if (status === "D") {
        paths.add(`/blog/${slug}`);
        paths.add("/blog");
        continue;
      }

      if (!publishedSlugs.has(slug)) {
        warnings.push(`${file} não está no postLoaders — sem rota, ignorado`);
        continue;
      }

      paths.add(`/blog/${slug}`);

      /** Corpo editado não muda listagem nenhuma; frontmatter muda todas. */
      if (status === "A") {
        addListingsFor(slug);
      } else {
        let previous = "";
        try {
          previous = git("show", `${base}:${file}`);
        } catch {
          previous = "";
        }
        if (metaBlockOf(previous) !== metaBlockOf(readFileSync(file, "utf8"))) {
          addListingsFor(slug);
        }
      }
      continue;
    }

    /** O template dos posts: mexer nele reescreve o HTML de todos eles. */
    if (file === `${APP_DIR}/blog/[slug]/page.tsx`) {
      for (const slug of publishedSlugs) {
        paths.add(`/blog/${slug}`);
      }
      continue;
    }

    if (file.startsWith(`${APP_DIR}/`) && file.endsWith("/page.tsx")) {
      paths.add(routeOf(file));
      continue;
    }

    /** Layout, componentes, CSS e site.ts atingem muita coisa de uma vez. */
    if (file.startsWith("src/")) {
      warnings.push(`${file} pode afetar várias páginas — decida manualmente`);
    }
  }

  return { paths: [...paths].sort(), warnings };
};

// ------------------------------------------------------------------- entrada

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const since = args.find((a) => a.startsWith("--since="))?.slice("--since=".length);
const manualPaths = args.filter((a) => a.startsWith("/"));

let paths = manualPaths;
let head = "";

if (paths.length === 0) {
  head = git("rev-parse", "HEAD");

  let base = since;
  if (!base && existsSync(STATE_FILE)) {
    const { lastCommit } = JSON.parse(readFileSync(STATE_FILE, "utf8"));
    try {
      git("cat-file", "-e", `${lastCommit}^{commit}`);
      base = lastCommit;
    } catch {
      console.warn(`aviso: commit ${lastCommit} do ${STATE_FILE} não existe mais`);
    }
  }
  base ??= "HEAD~1";

  if (git("rev-parse", base) === head) {
    console.log(`nada novo desde ${base.slice(0, 7)} — nenhuma URL a submeter`);
    process.exit(0);
  }

  const changes = git("diff", "--name-status", base, "HEAD")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, ...rest] = line.split("\t");
      return { status: status[0], file: rest.at(-1) };
    });

  const mapped = mapChangesToPaths(changes, base);
  paths = mapped.paths;

  console.log(`intervalo: ${base}..HEAD (${changes.length} arquivo(s) alterado(s))`);
  for (const warning of mapped.warnings) {
    console.warn(`  aviso: ${warning}`);
  }

  if (paths.length === 0) {
    console.log("nenhuma URL afetada");
    process.exit(0);
  }
}

/** A chave vive no host www; submeter URL do apex responde 403. */
const urlList = paths.map((path) => new URL(path, `https://${HOST}`).toString());

if (dryRun) {
  console.log(`\n--dry-run — ${urlList.length} URL(s) seriam enviadas:`);
  for (const url of urlList) {
    console.log(`  ${url}`);
  }
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

/** 200 = aceito e chave validada. 202 = aceito, validação da chave pendente. */
if (response.status !== 200 && response.status !== 202) {
  console.error(`${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

console.log(`${response.status} - ${urlList.length} URL(s) enviada(s):`);
for (const url of urlList) {
  console.log(`  ${url}`);
}

/** Só avança o marcador no modo automático: modo manual não representa o deploy. */
if (head) {
  writeFileSync(STATE_FILE, `${JSON.stringify({ lastCommit: head }, null, 2)}\n`, "utf8");
  console.log(`\nmarcador salvo em ${STATE_FILE} (${head.slice(0, 7)})`);
}
