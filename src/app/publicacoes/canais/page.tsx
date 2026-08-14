import Link from "next/link";
import { pageMetadata } from "@/data/site";
import styles from "../publicacoes.module.css";

export const metadata = pageMetadata({
  title: "Canais e registros em vídeo",
  description:
    "História dos canais iMisturebas e Programei, com vídeos de Paulo Matos sobre programação, matemática e engenharia.",
  path: "/publicacoes/canais",
});

type VideoItemProps = {
  title: string;
  href: string;
  detail: string;
  description: string;
};

const VideoItem = ({
  title,
  href,
  detail,
  description,
}: VideoItemProps) => (
  <li className={styles.item}>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <span className={styles.itemTitle}>{title}</span>
    </a>
    <span className={styles.detail}>{detail}</span>
    <p className={styles.description}>{description}</p>
  </li>
);

const CanaisPage = () => {
  return (
    <div className={`contentPage ${styles.page}`}>
      <h1>Canais e registros em vídeo</h1>
      <p>
        Mantive dois canais no YouTube antes de concentrar minha documentação
        neste site. Eles estão encerrados, mas alguns vídeos ainda representam
        bem a relação entre programação, matemática, engenharia e ensino que
        aparece nos meus projetos atuais.
      </p>

      <section id="imisturebas-canal">
        <h2>iMisturebas Canal</h2>
        <p>
          O iMisturebas foi minha primeira experiência publicando vídeos. Não
          havia uma linha editorial única: o canal reuniu programação,
          matemática, engenharia, edição de imagens e conteúdo de
          entretenimento. O nome descrevia exatamente essa mistura.
        </p>
        <p>
          Alguns vídeos de entretenimento tiveram centenas de milhares de
          visualizações. Para este portfólio, porém, os números são menos
          importantes que os vídeos técnicos: são eles que registram as
          primeiras tentativas de transformar estudo e projetos em explicações.
        </p>
        <p>
          O <Link href="/publicacoes/artigos#imisturebas">blog iMisturebas</Link>{" "}
          veio depois como apoio ao canal. Ele organizava materiais em texto e
          criava outra forma de chegar aos vídeos por meio das buscas.
        </p>
        <p className={styles.platformLink}>
          <a
            href="https://www.youtube.com/@iMisturebasCanal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o iMisturebas Canal no YouTube
          </a>
        </p>
      </section>

      <section id="videos-selecionados">
        <h2>Vídeos selecionados</h2>
        <p>
          O canal tem conteúdos de assuntos e níveis de produção diferentes.
          Em vez de reproduzir o acervo inteiro, selecionei os vídeos que se
          conectam de forma mais direta à minha formação e ao desenvolvimento
          de software.
        </p>
        <ul className={styles.list}>
          <VideoItem
            title="HP Prime — Transformada de Laplace"
            href="https://www.youtube.com/watch?v=MNyie_cE-aA"
            detail="Matemática · HP Prime"
            description="Uso da calculadora para resolver transformadas de Laplace, conteúdo ligado à formação em matemática e engenharia."
          />
          <VideoItem
            title="HP Prime — Frações parciais"
            href="https://www.youtube.com/watch?v=LF3CK3kvrxA"
            detail="Matemática · HP Prime"
            description="Resolução de frações parciais com uma ferramenta usada em disciplinas de cálculo e engenharia."
          />
          <VideoItem
            title="HP Prime — Sistemas lineares"
            href="https://www.youtube.com/watch?v=nRfItnARUbc"
            detail="Matemática · HP Prime"
            description="Resolução de sistemas lineares, assunto que mais tarde também apareceu no aplicativo Zé Chinelão."
          />
          <VideoItem
            title="Carro v.104"
            href="https://www.youtube.com/watch?v=zmYj62ZDXO0"
            detail="Programação · C · Allegro 5"
            description="Registro de um jogo desenvolvido em C com Allegro 5, anterior aos projetos atuais de jogos e engines."
          />
          <VideoItem
            title="FEMM — motor de indução com rotor bloqueado"
            href="https://www.youtube.com/watch?v=yNb0IY0yJuQ"
            detail="Engenharia elétrica · FEMM · Lua"
            description="Parte visual de um trabalho sobre máquinas elétricas. Usei Lua para controlar o FEMM, executar as simulações e salvar os quadros que formaram o vídeo."
          />
        </ul>
        <p>
          O relatório com a análise e os scripts está disponível em{" "}
          <Link href="/publicacoes/artigos#trabalho-academico">
            artigos.md
          </Link>
          .
        </p>
      </section>

      <section id="programei">
        <h2>Programei</h2>
        <p>
          O Programei foi uma segunda tentativa, desta vez com um assunto
          definido e aulas organizadas em sequência. O canal ficou limitado a
          três vídeos introdutórios de C. Não é um curso completo; seu valor
          aqui é registrar a mudança de um canal geral para uma proposta
          específica de ensino de programação.
        </p>
        <ul className={styles.list}>
          <VideoItem
            title="C — Aula 001: Olá, mundo"
            href="https://www.youtube.com/watch?v=WnlKstTZDYk"
            detail="Curso introdutório de C"
            description="Estrutura inicial de um programa e primeiro código executável."
          />
          <VideoItem
            title="C — Aula 002: Variáveis"
            href="https://www.youtube.com/watch?v=h-UR2j2yHpA"
            detail="Curso introdutório de C"
            description="Declaração de variáveis e armazenamento de valores."
          />
          <VideoItem
            title="C — Aula 003: Tipos primitivos e printf"
            href="https://www.youtube.com/watch?v=khKxwROFGN8"
            detail="Curso introdutório de C"
            description="Tipos básicos da linguagem e saída formatada com printf."
          />
        </ul>
        <p className={styles.platformLink}>
          <a
            href="https://www.youtube.com/@programei5058"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o Programei no YouTube
          </a>
        </p>
      </section>

      <section id="o-que-ficou">
        <h2>O que ficou</h2>
        <p>
          Os canais não continuaram, mas a prática continuou. Hoje documento
          decisões com mais profundidade nos <Link href="/projetos">projetos</Link>{" "}
          e no <Link href="/blog">blog</Link>. A diferença está no formato e no
          rigor; a motivação de aprender construindo e explicar o processo é a
          mesma.
        </p>
      </section>
    </div>
  );
};

export default CanaisPage;
