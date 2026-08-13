import Link from "next/link";
import { VscGitCommit } from "react-icons/vsc";
import { getCommits } from "@/data/gitLog";
import { repoUrl } from "@/data/repo";
import { pageMetadata } from "@/data/site";
import styles from "./changelog.module.css";

export const metadata = pageMetadata({
  title: "Histórico de mudanças",
  description:
    "Os commits recentes deste site, com o diff de cada um. O que mudou, quando, e por quê.",
  path: "/changelog",
  absoluteTitle: true,
  /** Lista de mensagem de commit é conteúdo fino, e o GitHub já é a fonte. */
  noindex: true,
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

const ChangelogPage = async () => {
  const commits = await getCommits();

  return (
    <div className="contentPage">
      <h1>Histórico de mudanças</h1>
      <p>
        Os cinco commits mais recentes deste site, lidos do GitHub durante o
        build. Clique em qualquer um para ver o diff.
      </p>

      {commits.length === 0 ? (
        <p>
          Não consegui ler o histórico no último build.{" "}
          <a href={`${repoUrl}/commits`} target="_blank" rel="noopener">
            Ver no GitHub
          </a>
          .
        </p>
      ) : (
        <ol className={styles.list}>
          {commits.map((commit) => (
            <li key={commit.sha} className={styles.item}>
              <Link className={styles.link} href={`/changelog/${commit.sha}`}>
                <span className={styles.icon}>
                  <VscGitCommit size={18} aria-hidden="true" />
                </span>
                <span className={styles.body}>
                  <span className={styles.subject}>
                    {commit.type ? (
                      <span className={styles.type}>
                        {commit.type}
                        {commit.scope ? `(${commit.scope})` : ""}
                      </span>
                    ) : null}
                    {commit.subject}
                  </span>
                  <span className={styles.meta}>
                    <code className={styles.sha}>{commit.sha}</code>
                    {commit.date ? (
                      <time dateTime={commit.date}>
                        {formatDate(commit.date)}
                      </time>
                    ) : null}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <p className={styles.footer}>
        <a
          className={styles.button}
          href={`${repoUrl}/commits`}
          target="_blank"
          rel="noopener"
        >
          Ver o histórico completo no GitHub →
        </a>
      </p>
    </div>
  );
};

export default ChangelogPage;
