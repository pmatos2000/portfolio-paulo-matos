import Link from "next/link";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Portfólio em Next.js com a interface do VS Code",
  description:
    "Como este site foi construído: a metáfora do editor de código, o que ela custa em SEO, e as decisões de acessibilidade e performance por trás do resultado.",
  path: "/projetos/portfolio",
  absoluteTitle: true,
});

const PortfolioPage = () => {
  return (
    <div className="contentPage">
      <h1>Portfólio — este site</h1>

      <p>
        Este projeto é o site que você está usando agora. A interface imita o
        Visual Studio Code: barra de atividades à esquerda, explorador com
        árvore de arquivos, abas e trilha de navegação. As páginas não são
        "páginas" — são arquivos. <code>sobre-mim.css</code>,{" "}
        <code>rosa-polar.app</code>, <code>lyncas.tsx</code>.
      </p>
      <p>
        A ideia partiu de uma pergunta simples: se o portfólio é dirigido a
        pessoas que passam o dia dentro de um editor de código, por que ele
        deveria parecer um site institucional?
      </p>

      <h2 id="a-metafora-e-o-que-ela-custa">A metáfora e o que ela custa</h2>
      <p>
        Toda decisão de design tem preço, e vale declarar o desta. Como os links
        do site são nomes de arquivo, o texto âncora — que é um dos sinais que
        buscadores usam para entender o destino de um link — virou{" "}
        <code>sobre-mim.css</code> em vez de "sobre mim". Do ponto de vista de
        SEO, isso é ruim.
      </p>
      <p>
        Aceitei o custo porque a metáfora é o diferencial do site, mas mitiguei
        onde deu: os links da página inicial trazem a descrição junto do nome do
        arquivo, e a trilha de navegação usa os segmentos reais da URL.
      </p>

      <h2 id="tres-problemas-que-so-apareceram-medindo">
        Três problemas que só apareceram medindo
      </h2>

      <p>
        <strong>A árvore escondia o site inteiro dos buscadores.</strong> As
        pastas do explorador nasciam fechadas, e os filhos só entravam no DOM ao
        expandir. Como o HTML servido é renderizado com elas fechadas, cada
        página interna chegava ao Googlebot com exatamente um link interno.
        Páginas sem links que apontem para elas sinalizam, para um buscador, que
        nem o autor as considera importantes. Passando a expandir por padrão, o
        número foi de 1 para 19 links por página.
      </p>

      <p>
        <strong>O tema piscava a cada carregamento.</strong> A preferência
        ficava no <code>localStorage</code> e era aplicada dentro de um{" "}
        <code>useEffect</code> — que, por definição, roda depois da primeira
        pintura. Quem escolhia tema claro via um flash escuro em toda navegação.
        Não existe solução dentro do ciclo de vida do React: a correção é um
        script síncrono e inline, executado antes de qualquer conteúdo, que
        aplica o tema no <code>&lt;html&gt;</code> antes do navegador pintar.
      </p>

      <p>
        <strong>A cor de destaque reprovava em contraste.</strong> O verde{" "}
        <code>#10b981</code> rende 6,57:1 sobre o fundo escuro — folgado. Sobre
        o fundo branco do tema claro, rende 2,54:1, quando o mínimo da WCAG AA é
        4,5:1. Como essa cor é a de todos os links do site, o tema claro era
        difícil de ler para quem tem baixa visão. A correção foi usar{" "}
        <code>#047857</code> apenas no tema claro, que rende 5,48:1 — restrição
        matemática, não questão de gosto.
      </p>

      <h2 id="resultado">Resultado</h2>
      <ul>
        <li>
          <strong>Lighthouse (computador):</strong> 100 em desempenho,
          acessibilidade, práticas recomendadas e SEO.
        </li>
        <li>
          <strong>Lighthouse (celular):</strong> 99 em desempenho, 100 nas
          demais.
        </li>
        <li>
          <strong>Métricas:</strong> CLS zero e nenhum tempo de bloqueio
          relevante da thread principal.
        </li>
      </ul>

      <h2 id="decisoes-tecnicas">Decisões técnicas</h2>
      <ul>
        <li>
          <strong>Server Components por padrão:</strong> só há{" "}
          <code>&quot;use client&quot;</code> onde existe estado ou evento — a
          árvore, as abas, o carrossel e o alternador de tema. O conteúdo é todo
          renderizado no servidor.
        </li>
        <li>
          <strong>Fonte única de navegação:</strong> a árvore do explorador, o
          sitemap, o título da aba e a trilha derivam todos do mesmo arquivo de
          dados. Adicionar uma página é acrescentar uma entrada.
        </li>
        <li>
          <strong>Imagem de compartilhamento gerada em build:</strong> o card
          que aparece ao compartilhar um link é desenhado por código com{" "}
          <code>next/og</code>, imitando o próprio editor. Sem dependência
          adicional e sem custo em tempo de requisição.
        </li>
        <li>
          <strong>Dados estruturados:</strong> JSON-LD de <code>Person</code> na
          home e de <code>BreadcrumbList</code> na trilha, para que buscadores
          leiam a identidade e a hierarquia sem depender de interpretar texto.
        </li>
        <li>
          <strong>Sem framework de estilo:</strong> CSS Modules e variáveis CSS
          para os dois temas. Nenhuma biblioteca de componentes.
        </li>
      </ul>

      <h2 id="historico-de-mudancas">Histórico de mudanças</h2>
      <p>
        O painel <strong>Source Control</strong> da barra lateral lê os commits
        recentes deste repositório na API do GitHub durante o build, e o{" "}
        <Link href="/changelog">CHANGELOG.md</Link> mostra o diff de cada um,
        renderizado com os mesmos temas do editor. É o site se explicando com o
        próprio histórico, em vez de um texto sobre ele.
      </p>

      <h2 id="competencias-em-destaque">Competências em Destaque</h2>
      <ul>
        <li>
          <strong>Next.js 16 e React 19:</strong> App Router, Server Components,
          metadata por rota, geração estática.
        </li>
        <li>
          <strong>TypeScript estrito:</strong> sem <code>any</code>, com tipos
          discriminados modelando a árvore de arquivos.
        </li>
        <li>
          <strong>SEO técnico:</strong> canonical por página, sitemap derivado,{" "}
          <code>robots.txt</code>, Open Graph, dados estruturados.
        </li>
        <li>
          <strong>Acessibilidade:</strong> hierarquia de títulos, marcos
          rotulados, foco visível, contraste verificado nos dois temas.
        </li>
        <li>
          <strong>Responsividade:</strong> layout de aplicação com rolagem
          interna, gaveta lateral no celular e tratamento da faixa de tablet.
        </li>
      </ul>

      <h2 id="codigo-fonte">Código Fonte</h2>
      <ul>
        <li>
          <a
            href="https://github.com/pmatos2000/portfolio-paulo-matos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repositório no GitHub
          </a>
        </li>
        <li>
          <Link href="/">Voltar para a página inicial</Link> — o próprio site é
          a demonstração.
        </li>
      </ul>
    </div>
  );
};

export default PortfolioPage;
