export type Commit = {
  /** Sete caracteres, como o `git log --oneline`. */
  sha: string;
  url: string;
  /** ISO 8601, para o <time dateTime>. */
  date: string;
  /** Prefixo do commit convencional. Null quando a mensagem não segue. */
  type: string | null;
  scope: string | null;
  subject: string;
};

import { REPO } from "@/data/repo";

/** Cinco, não doze: cada commit exibido custa uma chamada a mais no build
    para buscar o diff. O resto do histórico fica a um clique, no GitHub. */
const LIMIT = 5;

/** `tipo(escopo)!: assunto`. Sem casar, o assunto vira a linha inteira. */
const CONVENTIONAL = /^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/;

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string } | null };
};

const parse = (entry: GitHubCommit): Commit => {
  const firstLine = entry.commit.message.split("\n")[0].trim();
  const match = CONVENTIONAL.exec(firstLine);

  return {
    sha: entry.sha.slice(0, 7),
    url: entry.html_url,
    date: entry.commit.author?.date ?? "",
    type: match?.[1] ?? null,
    scope: match?.[2] ?? null,
    subject: match?.[3] ?? firstLine,
  };
};

/**
 * Commits recentes do repositório do site, buscados em build.
 *
 * Sem `cache` de propósito: o padrão do Next busca uma vez por build em rota
 * estática, que é o que se quer — `force-cache` persistiria entre deploys e o
 * painel mostraria commits velhos depois de publicar.
 *
 * Sem autenticação a API do GitHub dá 60 requisições por hora **por IP**, e o
 * IP de build da Vercel é compartilhado. Com LIMIT em 5 são 7 chamadas por
 * build — a lista, o generateStaticParams e um diff por commit. O GITHUB_TOKEN
 * opcional sobe o limite para 5.000, e o catch garante que 403 ou falha de rede
 * devolva lista vazia em vez de derrubar o build.
 */
export const getCommits = async (): Promise<Commit[]> => {
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/commits?per_page=${LIMIT}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    if (!response.ok) {
      console.warn(
        `[gitLog] GitHub respondeu ${response.status}; painel Git vazio.`,
      );
      return [];
    }

    return ((await response.json()) as GitHubCommit[]).map(parse);
  } catch (error) {
    console.warn("[gitLog] falha ao buscar commits; painel Git vazio.", error);
    return [];
  }
};

export type CommitFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  /** Diff unificado. Null quando o GitHub não manda (binário) ou passou do teto. */
  patch: string | null;
  /** Passou do teto: a página mostra o aviso em vez do diff. */
  tooBig: boolean;
};

export type CommitDetail = Commit & {
  files: CommitFile[];
  additions: number;
  deletions: number;
};

/**
 * Tetos para não gerar página de centenas de KB. Um commit de refatoração
 * ampla estouraria os dois, e diff assim não se lê no navegador de qualquer
 * forma — melhor mandar para o GitHub do que servir HTML gigante.
 */
const MAX_PATCH_LINES = 300;
const MAX_FILES = 25;

type GitHubCommitDetail = GitHubCommit & {
  stats?: { additions: number; deletions: number };
  files?: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    patch?: string;
  }[];
};

/** Detalhe de um commit, com o diff de cada arquivo. Null se não der para ler. */
export const getCommit = async (sha: string): Promise<CommitDetail | null> => {
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/commits/${sha}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    if (!response.ok) {
      console.warn(
        `[gitLog] commit ${sha}: GitHub respondeu ${response.status}`,
      );
      return null;
    }

    const data = (await response.json()) as GitHubCommitDetail;

    const files = (data.files ?? []).slice(0, MAX_FILES).map((file) => {
      const lines = file.patch ? file.patch.split("\n").length : 0;
      const tooBig = lines > MAX_PATCH_LINES;
      return {
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        patch: file.patch && !tooBig ? file.patch : null,
        tooBig,
      };
    });

    return {
      ...parse(data),
      files,
      additions: data.stats?.additions ?? 0,
      deletions: data.stats?.deletions ?? 0,
    };
  } catch (error) {
    console.warn(`[gitLog] falha ao ler o commit ${sha}.`, error);
    return null;
  }
};
