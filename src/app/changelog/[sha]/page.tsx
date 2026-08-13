import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Code from "@/components/CodeBlock/Code";
import { getCommit, getCommits } from "@/data/gitLog";
import { pageMetadata } from "@/data/site";
import styles from "./commit.module.css";

type Props = { params: Promise<{ sha: string }> };

/**
 * Janela deslizante: só os commits que o /changelog lista viram página. Um sha
 * fora da janela cai no 404 em vez de tentar buscar em runtime — o que exporia
 * a cota da API do GitHub a quem acessar.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCommits()).map((commit) => ({ sha: commit.sha }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sha } = await params;
  const commit = await getCommit(sha);

  return pageMetadata({
    title: commit ? `${commit.subject} · ${sha}` : sha,
    description: commit
      ? `Diff do commit ${sha}: ${commit.subject}.`
      : `Commit ${sha}.`,
    path: `/changelog/${sha}`,
    absoluteTitle: true,
    noindex: true,
  });
}

const STATUS: Record<string, string> = {
  added: "adicionado",
  removed: "removido",
  modified: "modificado",
  renamed: "renomeado",
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

const CommitPage = async ({ params }: Props) => {
  const { sha } = await params;
  const commit = await getCommit(sha);

  if (!commit) {
    notFound();
  }

  return (
    <div className="contentPage">
      <p className={styles.back}>
        <Link href="/changelog">← Histórico</Link>
      </p>

      <h1 className={styles.title}>
        {commit.type ? (
          <span className={styles.type}>
            {commit.type}
            {commit.scope ? `(${commit.scope})` : ""}
          </span>
        ) : null}
        {commit.subject}
      </h1>

      <p className={styles.meta}>
        <code className={styles.sha}>{commit.sha}</code>
        {commit.date ? (
          <time dateTime={commit.date}>{formatDate(commit.date)}</time>
        ) : null}
        <span className={styles.added}>+{commit.additions}</span>
        <span className={styles.removed}>−{commit.deletions}</span>
        <a href={commit.url} target="_blank" rel="noopener">
          Ver no GitHub
        </a>
      </p>

      {commit.files.map((file) => (
        <section key={file.filename} className={styles.file}>
          <h2 className={styles.filename}>
            <code>{file.filename}</code>
            <span className={styles.status}>
              {STATUS[file.status] ?? file.status}
            </span>
          </h2>

          {file.patch ? (
            <Code lang="diff">{file.patch}</Code>
          ) : (
            <p className={styles.skipped}>
              {file.tooBig
                ? "Diff longo demais para exibir aqui. "
                : "Sem diff textual (arquivo binário ou renomeado). "}
              <a href={commit.url} target="_blank" rel="noopener">
                Ver no GitHub
              </a>
              .
            </p>
          )}
        </section>
      ))}
    </div>
  );
};

export default CommitPage;
