import Link from "next/link";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Projetos",
  description:
    "Projetos pessoais que transformam matemática em algo visível e manipulável: simulações na Godot Engine e aplicativos educacionais para Android.",
  path: "/projetos",
});

const ProjetosPage = () => {
  return (
    <div className="contentPage">
      <h1>Projetos</h1>
      <p>
        Meus projetos pessoais têm um fio condutor que não foi planejado, mas
        ficou evidente com o tempo: todos transformam matemática em algo que se
        pode ver e manipular.
      </p>
      <p>
        Não é coincidência. Vim da{" "}
        <Link href="/formacao#matematica-computacional">
          Matemática Computacional
        </Link>
        , e a frustração que me acompanhou aqueles anos era sempre a mesma —
        equações no papel escondem o comportamento que elas descrevem. Uma curva
        de Rhodonea escrita como <code>r = a·cos(kθ)</code> não sugere as formas
        que produz. Um sistema linear resolvido mecanicamente não ensina por que
        o método funciona.
      </p>
      <p>
        Software resolve isso. Não porque simplifica a matemática, mas porque a
        torna manipulável: você mexe num parâmetro e vê o resultado mudar.
      </p>

      <h2>O que há aqui</h2>
      <ul>
        <li>
          <Link href="/projetos/jogos">Jogos e simulações</Link> — usando game
          engines como laboratório de visualização matemática. Hoje: Rosa Polar,
          na Godot Engine.
        </li>
        <li>
          <Link href="/projetos/aplicativos">Aplicativos</Link> — software
          mobile com propósito educacional. Hoje: Zé Chinelão, meu primeiro app
          Android, publicado na Play Store em 2016.
        </li>
      </ul>
      <p>
        Cada projeto tem sua própria página, com o contexto de por que foi
        feito, as decisões técnicas envolvidas e links para o código.
      </p>
    </div>
  );
};

export default ProjetosPage;
