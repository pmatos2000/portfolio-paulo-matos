import styles from "./rosa-polar.module.css";

const RosaPolarPage = () => {
  return (
    <div className={styles.projectPage}>
      <h2>Rosa Polar - Uma Simulação Matemática com Godot</h2>

      <p>
        Este projeto é uma exploração visual da beleza matemática, trazendo a
        "Rosa Polar" (ou curva de Rhodonea) à vida de forma interativa.
        Utilizando o motor de jogos Godot Engine, a aplicação permite que o
        usuário manipule as variáveis da equação matemática e observe, em tempo
        real, as formas hipnotizantes que são geradas.
      </p>
      <p>
        O objetivo não era criar um jogo, mas sim demonstrar como uma game
        engine pode ser uma ferramenta poderosa para a prototipação e simulação
        de conceitos abstratos, transformando fórmulas complexas em arte
        interativa.
      </p>

      <h3>Demonstração</h3>
      <div className={styles.videoContainer}>
        <iframe
          src="https://www.youtube.com/embed/AKIcIY77HKY"
          title="Godot - Rose Curve"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      <h3>Godot como Ferramenta de Simulação Matemática</h3>
      <p>
        Minha formação em <strong>Matemática Computacional</strong> me deu uma
        base sólida para enxergar além do óbvio. Enquanto muitos veem a Godot
        Engine apenas como uma plataforma para criar jogos, eu a enxergo como um
        laboratório digital de alta performance.
      </p>
      <p>
        A capacidade do Godot de executar cálculos em tempo real e renderizar
        gráficos de forma otimizada o torna perfeito para:
      </p>
      <ul>
        <li>
          <strong>Visualização de Dados:</strong> Plotar gráficos e funções
          complexas, como a curva de Rhodonea, permitindo uma compreensão muito
          mais intuitiva do que equações estáticas em um papel.
        </li>
        <li>
          <strong>Prototipação Rápida:</strong> Com a linguagem GDScript, é
          possível traduzir rapidamente fórmulas matemáticas em algoritmos
          visuais, testando hipóteses e explorando variações de forma ágil.
        </li>
        <li>
          <strong>Ensino Interativo:</strong> Ferramentas como esta podem ser
          usadas em ambientes educacionais para ensinar matemática de uma forma
          muito mais engajadora e prática.
        </li>
      </ul>
      <p>
        Este projeto é um exemplo prático dessa filosofia: aplicar o
        conhecimento matemático e a lógica de programação para criar
        experiências digitais únicas.
      </p>

      <h3>Competências em Destaque</h3>
      <ul>
        <li>
          <strong>Desenvolvimento de Jogos/Simulações:</strong> Godot Engine,
          GDScript
        </li>
        <li>
          <strong>Matemática Aplicada:</strong> Implementação de equações
          matemáticas (curva de Rhodonea)
        </li>
        <li>
          <strong>Lógica de Programação:</strong> Estruturação de algoritmos
          para simulação visual
        </li>
        <li>
          <strong>Publicação e Deploy:</strong> Experiência com a plataforma
          itch.io para distribuição de aplicações interativas
        </li>
      </ul>

      <h3>Download e Interação</h3>
      <ul>
        <li>
          <a
            href="https://magolaplace.itch.io/rose-curve"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jogar no Navegador / Download via itch.io
          </a>
        </li>
        <li>
          <a
            href="https://github.com/pmatos2000/godot_study/tree/main/rose-curve"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorar o Código Fonte no GitHub
          </a>
        </li>
      </ul>
    </div>
  );
};

export default RosaPolarPage;
