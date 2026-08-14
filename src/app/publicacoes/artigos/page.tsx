import Link from "next/link";
import { pageMetadata } from "@/data/site";
import styles from "../publicacoes.module.css";

export const metadata = pageMetadata({
  title: "Artigos e publicações",
  description:
    "Artigos e trabalhos de Paulo Matos publicados no pmatos.dev, Medium, GIMP Brasil, Blogger e Google Drive.",
  path: "/publicacoes/artigos",
});

type ExternalItemProps = {
  title: string;
  href: string;
  detail: string;
  description: string;
};

const ExternalItem = ({
  title,
  href,
  detail,
  description,
}: ExternalItemProps) => (
  <li className={styles.item}>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <span className={styles.itemTitle}>{title}</span>
    </a>
    <span className={styles.detail}>{detail}</span>
    <p className={styles.description}>{description}</p>
  </li>
);

const ArtigosPage = () => {
  return (
    <div className={`contentPage ${styles.page}`}>
      <h1>Artigos e publicações</h1>
      <p>
        Meus textos estão distribuídos entre este site e plataformas que usei
        antes dele. A lista abaixo preserva os originais e deixa claro o
        contexto em que cada grupo foi publicado.
      </p>

      <section id="neste-site">
        <h2>Neste site</h2>
        <p>
          O <Link href="/blog">blog do pmatos.dev</Link> é onde publico
          atualmente. Os textos partem de problemas que encontrei em projetos:
          decisões de arquitetura, detalhes de implementação e o que só ficou
          evidente depois de testar uma ideia.
        </p>
      </section>

      <section id="trabalho-academico">
        <h2>Trabalho acadêmico</h2>
        <p>
          Em 2015, escrevi com João Pedro Samarino um relatório computacional
          sobre transformadores e máquinas elétricas. O trabalho combinou a
          análise dos modelos com automação no FEMM: os scripts em Lua variavam
          parâmetros, executavam as simulações, coletavam resultados e salvavam
          os quadros usados nos vídeos.
        </p>
        <ul className={styles.list}>
          <ExternalItem
            title="Relatório do Trabalho Computacional III"
            href="https://drive.google.com/file/d/178RvbjryDmwrpx21ogSsdBtnNdguw5Ew/view"
            detail="Máquinas elétricas · FEMM · Lua · 2015"
            description="Relatório de 51 páginas, escrito com João Pedro Samarino, com as análises e os scripts usados para automatizar as simulações."
          />
        </ul>
      </section>

      <section id="medium">
        <h2>Medium</h2>
        <p>
          Publiquei três artigos sobre C# no Medium. Dois formam uma introdução
          a testes unitários; o terceiro discute o uso de{" "}
          <code>IEnumerable</code>.
        </p>
        <ul className={styles.list}>
          <ExternalItem
            title="Você realmente sabe usar o IEnumerable do C#?"
            href="https://medium.com/@pmatos2000/voc%C3%AA-realmente-sabe-usar-o-ienumerable-do-c-135c162cc40f"
            detail="C# · IEnumerable"
            description="O que a interface representa, como a execução adiada afeta o código e quando materializar uma sequência."
          />
          <ExternalItem
            title="Quase tudo sobre testes unitários em C# — parte 1"
            href="https://medium.com/@pmatos2000/quase-tudo-que-voc%C3%AA-precisa-saber-sobre-testes-unit%C3%A1rios-em-c-parte-1-44254fec4788"
            detail="C# · Testes unitários"
            description="Os conceitos básicos, a estrutura de um teste e o papel dos testes automatizados."
          />
          <ExternalItem
            title="Quase tudo sobre testes unitários em C# — parte 2"
            href="https://medium.com/@pmatos2000/quase-tudo-que-voc%C3%AA-precisa-saber-sobre-testes-unit%C3%A1rios-em-c-parte-2-2277c3f42db4"
            detail="C# · Testes unitários"
            description="A continuação da série, com a aplicação dos conceitos em exemplos de código."
          />
        </ul>
        <p className={styles.platformLink}>
          <a
            href="https://medium.com/@pmatos2000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o perfil no Medium
          </a>
        </p>
      </section>

      <section id="gimp-brasil">
        <h2>GIMP Brasil</h2>
        <p>
          Entre 2011 e 2012, o GIMP Brasil publicou seis tutoriais que escrevi
          sobre edição de imagens. Eles pertencem a uma fase anterior à minha
          atuação profissional em software, mas já mostram a prática de
          transformar uma experiência em instruções reproduzíveis.
        </p>
        <ul className={styles.list}>
          <ExternalItem
            title="Wallpaper com faixa de cores e brilho"
            href="https://www.gimpbrasil.org/2012/06/wallpaper-faixa-de-cores-e-brilho.html"
            detail="GIMP Brasil · 2012"
            description="Composição de um papel de parede, documentada desde a criação do fundo até os ajustes finais."
          />
          <ExternalItem
            title="Efeito retícula"
            href="https://www.gimpbrasil.org/2012/08/efeito-reticula.html"
            detail="GIMP Brasil · 2012"
            description="Criação do padrão de pontos usado para simular o efeito de impressão em retícula."
          />
          <ExternalItem
            title="Texto no estilo Web 2 usando degradê"
            href="https://www.gimpbrasil.org/2011/04/criando-um-texto-no-estilo-web-2-usando-degrade.html"
            detail="GIMP Brasil · 2011"
            description="Um dos tutoriais do meu blog antigo que foi preservado e republicado pelo GIMP Brasil."
          />
          <ExternalItem
            title="Fotos em HD e HDR"
            href="https://www.gimpbrasil.org/2012/02/fotos-em-hd-e-hdr.html"
            detail="GIMP Brasil · 2012"
            description="Tratamento de fotografia para acentuar contraste, detalhes e cores."
          />
          <ExternalItem
            title="Efeito camuflagem"
            href="https://www.gimpbrasil.org/2011/05/efeito-camuflagem.html"
            detail="GIMP Brasil · 2011"
            description="Construção de uma textura de camuflagem usando os recursos do GIMP."
          />
          <ExternalItem
            title="Efeito rodamoinho"
            href="https://www.gimpbrasil.org/2011/04/efeito-rodamoinho.html"
            detail="GIMP Brasil · 2011"
            description="Aplicação de distorção e composição para produzir o efeito de rodamoinho."
          />
        </ul>
        <p className={styles.platformLink}>
          <a
            href="https://www.gimpbrasil.org/?s=paulo+matos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver os resultados para Paulo Matos no GIMP Brasil
          </a>
        </p>
      </section>

      <section id="imisturebas">
        <h2>Blog iMisturebas</h2>
        <p>
          O iMisturebas no Blogger foi criado para complementar o canal de mesmo
          nome. Os textos organizavam materiais que não cabiam bem em vídeo e
          ajudavam pessoas a encontrar o canal pelas buscas. A mistura de
          programação, receitas e outros assuntos vinha do propósito do
          projeto: documentar interesses diferentes, não manter uma publicação
          especializada.
        </p>
        <ul className={styles.list}>
          <ExternalItem
            title="Blog iMisturebas"
            href="https://imisturebas.blogspot.com/"
            detail="Blogger · arquivo"
            description="O arquivo completo, com publicações de diferentes assuntos."
          />
          <ExternalItem
            title="Programação no iMisturebas"
            href="https://imisturebas.blogspot.com/p/programacao.html"
            detail="Blogger · programação"
            description="O índice que reunia as publicações relacionadas a programação."
          />
        </ul>
        <p>
          A relação entre o blog e os vídeos está explicada em{" "}
          <Link href="/publicacoes/canais">canais.md</Link>.
        </p>
      </section>
    </div>
  );
};

export default ArtigosPage;
