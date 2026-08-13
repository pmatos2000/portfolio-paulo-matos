import Link from "next/link";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Aplicativos",
  description:
    "Software mobile com propósito educacional: aplicativos Android que exibem o cálculo passo a passo em vez de apenas entregar o resultado.",
  path: "/projetos/aplicativos",
});

const AplicativosPage = () => {
  return (
    <div className="contentPage">
      <h1>Aplicativos</h1>
      <p>
        Meus projetos mobile nasceram de uma pergunta que me acompanha desde a
        época de{" "}
        <Link href="/experiencias#professor-particular">
          professor particular
        </Link>
        : por que quase toda calculadora entrega o resultado e esconde o
        caminho?
      </p>
      <p>
        Para quem está aprendendo, o resultado é a parte menos útil. O que
        ensina é a sequência de passos — e é justamente ela que o software
        costuma jogar fora.
      </p>

      <h2 id="projetos">Projetos</h2>
      <ul>
        <li>
          <Link href="/projetos/aplicativos/ze-chinelao">ze-chinelao.app</Link>{" "}
          — meu primeiro aplicativo Android, de 2016. Resolve divisores, MMC,
          MDC, fatoração, matrizes, equação do segundo grau e sistemas lineares,
          sempre exibindo o cálculo passo a passo. Android nativo com Java e
          Android Studio, publicado na Google Play Store.
        </li>
      </ul>

      <h2 id="o-contexto">O contexto</h2>
      <p>
        Este projeto foi a materialização de um estudo: eu estava lendo{" "}
        <em>Google Android</em>, de Ricardo R. Lecheta, e precisava de algo
        concreto para aplicar o conteúdo. O objetivo declarado era construir um
        app do início ao fim e conseguir publicá-lo — e foi cumprido.
      </p>
      <p>
        O nome vem de uma brincadeira com amigos do CEFET-MG, fãs da Legião
        Urbana: numa gravação ao vivo, Renato Russo grita{" "}
        <em>"Zé Chinelão, onde você estiver, eu te amo!"</em>. O logo, um
        chinelo com os dígitos de Pi, uniu a piada ao propósito.
      </p>
    </div>
  );
};

export default AplicativosPage;
