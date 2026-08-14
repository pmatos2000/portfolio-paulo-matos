import Link from "next/link";
import { VscBook, VscHistory, VscMarkdown } from "react-icons/vsc";
import { pageMetadata } from "@/data/site";
import styles from "./publicacoes.module.css";

export const metadata = pageMetadata({
  title: "Publicações",
  description:
    "Artigos, vídeos e registros de Paulo Matos sobre programação, matemática, engenharia e desenvolvimento de software.",
  path: "/publicacoes",
});

const PublicacoesPage = () => {
  return (
    <div className={`contentPage ${styles.page}`}>
      <h1>Publicações</h1>
      <p>
        Antes deste site, publiquei artigos, tutoriais e vídeos em plataformas
        diferentes. Parte desse material ainda é útil; outra parte vale pelo
        registro de como comecei a estudar em público e explicar o que aprendia.
      </p>
      <p>
        Este diretório separa os dois formatos. Os textos estão em{" "}
        <code>artigos.md</code>; os canais e vídeos, em{" "}
        <code>canais.md</code>. O conteúdo novo fica no blog deste site.
      </p>

      <h2>O que há aqui</h2>
      <ul className={styles.directoryList}>
        <li>
          <Link href="/publicacoes/artigos">
            <VscMarkdown aria-hidden="true" />
            <span>
              <strong>artigos.md</strong>
              <small>
                Blog atual, trabalho acadêmico, artigos no Medium, tutoriais no
                GIMP Brasil e o arquivo do iMisturebas.
              </small>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/publicacoes/canais">
            <VscHistory aria-hidden="true" />
            <span>
              <strong>canais.md</strong>
              <small>
                Os canais iMisturebas e Programei, com uma seleção dos vídeos
                que ainda representam essa trajetória.
              </small>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <VscBook aria-hidden="true" />
            <span>
              <strong>blog/</strong>
              <small>Os artigos técnicos publicados atualmente.</small>
            </span>
          </Link>
        </li>
      </ul>

      <h2>Por que manter o material antigo</h2>
      <p>
        Os assuntos e a qualidade de produção mudaram, mas o processo é o
        mesmo: entender um problema, construir alguma coisa e documentar o que
        funcionou. O arquivo existe para preservar essa continuidade, sem
        apresentar projetos encerrados como trabalho atual.
      </p>
    </div>
  );
};

export default PublicacoesPage;
