import Link from "next/link";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Jogos e simulações",
  description:
    "Game engines usadas como laboratório de visualização matemática: prototipação rápida, plotagem de funções complexas e ensino interativo com a Godot Engine.",
  path: "/projetos/jogos",
});

const JogosPage = () => {
  return (
    <div className="contentPage">
      <h1>Jogos e simulações</h1>
      <p>
        Game engines são, para a maioria das pessoas, ferramentas de fazer
        jogos. Eu as vejo como laboratórios digitais de alta performance.
      </p>
      <p>
        A razão é simples: uma engine já resolve os problemas difíceis de
        qualquer visualização interativa. Ela executa cálculos a 60 quadros por
        segundo, renderiza gráficos de forma otimizada e oferece um ciclo de
        iteração em que você altera uma fórmula e vê o efeito imediatamente.
        Construir isso do zero seria um projeto em si.
      </p>
      <p>Isso abre três usos que me interessam mais que fazer jogos:</p>
      <ul>
        <li>
          <strong>Visualização de dados:</strong> plotar funções complexas de
          forma que a intuição funcione, em vez de depender só da álgebra.
        </li>
        <li>
          <strong>Prototipação rápida:</strong> traduzir uma fórmula em
          algoritmo visual em minutos, testar hipóteses, explorar variações.
        </li>
        <li>
          <strong>Ensino interativo:</strong> ferramentas que deixam o aluno
          mexer nos parâmetros, em vez de assistir.
        </li>
      </ul>

      <h2>Projetos</h2>
      <ul>
        <li>
          <Link href="/projetos/jogos/rosa-polar">rosa-polar.app</Link> —
          simulação interativa da curva de Rhodonea, construída na Godot Engine
          com GDScript. Você manipula as variáveis da equação e observa as
          formas se transformarem em tempo real. Publicado no itch.io, jogável
          direto no navegador.
        </li>
      </ul>
    </div>
  );
};

export default JogosPage;
