import Link from "next/link";
import Code from "@/components/CodeBlock/Code";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Rustle: engine de jogos 2D em Rust com a cena como documento JSON",
  description:
    "Engine de jogos 2D escrita em Rust, projetada para renderizar pixels idênticos no nativo e na web. As decisões de arquitetura e o que uma prova de conceito de 8 mil linhas ensinou.",
  path: "/projetos/rustle",
  absoluteTitle: true,
});

const SCENE = `{
	"name": "player",
	"tags": ["hero"],
	"transform": { "x": 100, "y": 80 },
	"components": [
		{ "type": "Sprite",  "size": 16 },
		{ "type": "Spinner", "speed": 120 }
	],
	"children": []
}`;

const RustlePage = () => {
  return (
    <div className="contentPage">
      <h1>Rustle — uma engine de jogos 2D em Rust</h1>

      <p>
        <strong>Em construção.</strong> Existe uma prova de conceito completa e
        funcionando, com cerca de 8 mil linhas, e uma reescrita em andamento com
        arquitetura definida e núcleo publicado. Esta página descreve as
        decisões que sustentam as duas.
      </p>

      <h2>A ideia central: a cena é um documento</h2>
      <p>
        A cena é um documento JSON. O editor edita o JSON; a engine apenas
        carrega e desenha.
      </p>
      <Code lang="json">{SCENE}</Code>
      <p>
        Parece um detalhe de serialização, mas é a decisão que simplifica tudo o
        que vem depois. Salvar, recarregar a quente, desfazer, versionar em Git,
        gerar cena por script — tudo vira manipulação de documento, porque a
        fonte da verdade é sempre a mesma e é texto legível.
      </p>

      <h2>Três princípios</h2>

      <p>
        <strong>
          O objeto carrega o que sempre existe; os componentes carregam o resto.
        </strong>{" "}
        Um objeto posicionado tem sua própria posição — ela não é um componente
        que se pode esquecer de adicionar, e nunca volta como um valor opcional
        que o chamador precisa desembrulhar para um caso que não pode acontecer.
        Sprite, comportamento e física são componentes. E um objeto sem lugar no
        espaço, como um controlador, simplesmente não tem posição: o tipo dele
        diz isso. A Unity, em comparação, obriga todo objeto a carregar um{" "}
        <code>Transform</code>, inclusive os que não têm o que fazer com ele.
      </p>

      <p>
        <strong>Paridade por tesselação compartilhada.</strong> Toda a geometria
        vira triângulos por uma função determinística em Rust puro, compilada
        tanto para WebAssembly quanto para nativo. Mesma geometria e mesmo
        shader produzem os mesmos pixels no navegador e na janela. Não é
        "parecido": é o mesmo código gerando a mesma saída, e é isso que separa
        paridade real de aproximação visual.
      </p>

      <p>
        <strong>Tipos dirigem a interface.</strong> Componentes são declarados
        com macros que exportam o schema dos seus campos. A engine reflete esse
        schema e o editor gera os campos de edição sozinho, inclusive para tipos
        compostos. Como a fonte é o binário compilado, o schema nunca diverge do
        que roda de verdade — o modo mais confiável de manter editor e runtime
        em sincronia é não ter duas descrições para manter.
      </p>

      <h2>A regra que protege a arquitetura</h2>
      <p>
        O núcleo da engine depende apenas das próprias macros e de serialização.
        Nada de wgpu, egui ou wasmtime entra ali.
      </p>
      <p>
        Não é purismo. É o que mantém o build de WebAssembly leve — e o
        WebAssembly é como o editor lê os tipos do jogo. O editor, aliás,{" "}
        <strong>não depende da engine</strong>: ele conversa com o jogo só pela
        ABI de WebAssembly. Um erro no editor não pode corromper o runtime, e o
        runtime não carrega código de editor para dentro de um jogo publicado.
      </p>

      <h2>O que a prova de conceito ensinou</h2>
      <p>
        A reescrita não começou do zero conceitual. Ela herda resultados de uma
        POC que rodou de verdade:
      </p>
      <p>
        <strong>Armazenamento em dicionário ordenado.</strong> Busca por
        identificador em tempo constante, com a ordem de inserção preservada na
        iteração — o que torna as fases do ciclo de vida determinísticas.
        Identificadores liberados nunca são reutilizados, então uma referência
        obsoleta resolve para nada, jamais para o objeto errado que ocupou o
        lugar.
      </p>
      <p>
        <strong>Três canais de mutação, separados de propósito.</strong> Mutação
        direta só no próprio objeto; eventos para sinalizar a outros, onde quem
        recebe muta a si mesmo; comandos para mudanças estruturais, aplicados
        num único ponto de sincronização no fim do frame.
      </p>
      <p>
        A razão é concreta. Mutação direta entre objetos no meio da atualização
        deixa o resultado dependente da ordem de iteração — é o bug clássico em
        que A e B produzem resultados diferentes conforme quem roda primeiro, e
        que só aparece quando alguém acrescenta um objeto e desloca a ordem.
        Empurrando o cruzado para eventos e o estrutural para comandos, o que se
        lê durante a atualização é sempre um estado coerente.
      </p>

      <h2>O que ficou de fora, e virou outro projeto</h2>
      <p>
        A POC também levou scripting em runtime até o fim, usando Rune.
        Funcionou — e foi usando que os limites apareceram. Por isso o roteiro
        da reescrita não tem etapa de scripting: essa camada virou um projeto à
        parte, uma linguagem embarcável chamada{" "}
        <Link href="/projetos/leaf">Leaf</Link>, e volta ao Rustle quando
        estiver pronta.
      </p>

      <h2>Estado atual</h2>
      <p>
        O núcleo está publicado: grafo de cena, objetos, componentes e
        transforms hierárquicos, com testes e integração contínua rodando
        formatação, análise estática e testes a cada envio. As próximas etapas
        são acesso tipado a componentes, a camada de macros com reflexão de
        schema, e então serialização.
      </p>
      <p>
        O foco é 2D. A arquitetura já separa as duas dimensões no nível de tipo,
        então um pipeline 3D é uma direção que o projeto deixa aberta — não uma
        promessa com data.
      </p>

      <h2>Competências em destaque</h2>
      <ul>
        <li>
          <strong>Arquitetura de software:</strong> grafo de dependência entre
          crates desenhado para manter o núcleo leve e o editor desacoplado
        </li>
        <li>
          <strong>Rust:</strong> container genérico onde o tipo do transform
          parametriza a dimensão, eliminando estado opcional impossível
        </li>
        <li>
          <strong>WebAssembly:</strong> ABI como fronteira entre editor e jogo,
          e como forma de carregar schema junto do código
        </li>
        <li>
          <strong>Computação gráfica:</strong> tesselação determinística
          compartilhada entre wgpu e WebGPU
        </li>
      </ul>

      <h2>Código fonte</h2>
      <ul>
        <li>
          <a
            href="https://github.com/pmatos2000/rustle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repositório no GitHub
          </a>{" "}
          — inclui a referência de arquitetura completa
        </li>
        <li>
          <Link href="/projetos/leaf">leaf.rs</Link> — a linguagem de script que
          nasceu deste projeto
        </li>
      </ul>
    </div>
  );
};

export default RustlePage;
