"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { repoUrl } from "@/data/repo";
import styles from "./commit.module.css";

/**
 * Só hexadecimal, entre 7 e 40 caracteres: sem isso, /changelog/qualquer-coisa
 * montaria uma URL do GitHub a partir de caminho inventado.
 */
const SHA = /^\/changelog\/([0-9a-f]{7,40})$/;

/**
 * Cobre todo sha que não virou página: commit que saiu da janela dos cinco,
 * link antigo compartilhado, e o descompasso entre uma lista em cache e as
 * páginas de outro build.
 *
 * Cliente porque precisa do pathname — o not-found não recebe params. Em troca,
 * manda para o commit exato no GitHub em vez de despejar na lista.
 */
const CommitNotFound = () => {
  const sha = SHA.exec(usePathname())?.[1] ?? null;

  return (
    <div className="contentPage">
      <p className={styles.back}>
        <Link href="/changelog">← Histórico</Link>
      </p>

      <h1 className={styles.title}>Esse commit saiu da janela</h1>

      <p>
        O site gera a página dos cinco commits mais recentes. Este já saiu dessa
        lista — mas continua no GitHub, com o diff completo.
      </p>

      <p className={styles.actions}>
        <a
          className={styles.button}
          href={sha ? `${repoUrl}/commit/${sha}` : `${repoUrl}/commits`}
          target="_blank"
          rel="noopener"
        >
          {sha
            ? `Ver ${sha.slice(0, 7)} no GitHub →`
            : "Ver o histórico no GitHub →"}
        </a>
      </p>
    </div>
  );
};

export default CommitNotFound;
