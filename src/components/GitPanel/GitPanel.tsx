import Link from "next/link";
import { VscGitCommit, VscRepo } from "react-icons/vsc";
import type { Commit } from "@/data/gitLog";
import { repoUrl } from "@/data/gitLog";
import styles from "./GitPanel.module.css";

type GitPanelProps = { commits: Commit[] };

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(iso));

/**
 * Histórico do repositório deste site.
 *
 * Data absoluta em vez de "há 2 horas": o dado é congelado no build, então um
 * tempo relativo envelheceria em silêncio até o próximo deploy.
 */
const GitPanel = ({ commits }: GitPanelProps) => (
  <aside className={styles.panel} aria-label="Controle de versão">
    <p className={styles.title}>SOURCE CONTROL</p>

    <a className={styles.repo} href={repoUrl} target="_blank" rel="noopener">
      <VscRepo size={16} aria-hidden="true" />
      <span>portfolio-paulo-matos</span>
    </a>

    {commits.length === 0 ? (
      <p className={styles.empty}>
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
                <VscGitCommit size={16} aria-hidden="true" />
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

    {commits.length > 0 ? (
      <p className={styles.footer}>
        <Link href="/changelog">Ver o histórico</Link>
      </p>
    ) : null}
  </aside>
);

export default GitPanel;
