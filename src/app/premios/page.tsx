import { MdOutlineStar, MdWorkspacePremium } from "react-icons/md"; // Ícones para destaque

const PremiosPage = () => {
  return (
    <div className="contentPage">
      <h2>Prêmios e Reconhecimentos</h2>
      <p>
        Uma coleção das principais premiações e reconhecimentos que recebi ao
        longo da minha trajetória acadêmica e profissional, refletindo meu
        compromisso com a excelência, o trabalho em equipe e a inovação.
      </p>

      <section id="obmep">
        <h3>
          <MdOutlineStar /> Olimpíada Brasileira de Matemática (OBMEP)
        </h3>
        <p>
          A OBMEP é um projeto nacional realizado pelo Instituto de Matemática
          Pura e Aplicada (IMPA) para estimular o estudo da matemática e
          identificar talentos na área em todo o Brasil. Tive a honra de ser
          premiado em duas ocasiões, conquistas que representam minha dedicação
          e aptidão para a resolução de problemas lógicos e matemáticos.
        </p>
        <ul>
          <li>
            <strong>Medalha de Bronze</strong>
          </li>
          <li>
            <strong>Menção Honrosa</strong>
          </li>
        </ul>
      </section>

      <section id="cases-ageis">
        <h3>
          <MdWorkspacePremium /> Cases Mais Ágeis do Brasil (4º Lugar)
        </h3>
        <p>
          O prêmio "Cases Mais Ágeis do Brasil", organizado pela Agile Trends,
          reconhece as melhores iniciativas e resultados na aplicação de
          metodologias ágeis no país. Conquistamos o quarto lugar em 2022, um
          reconhecimento nacional pelo trabalho de alto impacto e pela
          excelência na entrega de valor utilizando práticas ágeis.
        </p>
        <a
          href="https://agiletrendsbr.com/premiacao-agilidade-brasil-2022/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver detalhes da premiação
        </a>
      </section>

      <section id="squad-de-verdade">
        <h3>
          <MdWorkspacePremium /> Reconhecimento "Squad de Verdade"
        </h3>
        <p>
          "Squad de Verdade" é um reconhecimento concedido pela comunidade "Os
          Agilistas", uma das maiores comunidades sobre agilidade no Brasil. Ele
          celebra equipes que demonstram alta performance, colaboração exemplar
          e uma aplicação genuína dos valores e princípios ágeis no dia a dia.
          Este prêmio destaca a sinergia e os resultados excepcionais do nosso
          time.
        </p>
        <a
          href="https://osagilistas.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conhecer a comunidade Os Agilistas
        </a>
      </section>

      {/* Seção Pitch Destaque */}
      <section id="pitch-destaque">
        <h3>
          <MdOutlineStar /> Pitch Destaque em Empreendedorismo e Inovação
        </h3>
        <p>
          Durante a disciplina "Oficina De Projetos, Empreendedorismo E
          Inovação" na UFMG, recebi o prêmio de "Pitch Destaque". O curso aborda
          intensivamente temas como proposta de valor, modelagem de negócios,
          MVP e técnicas de comunicação eficaz. O reconhecimento foi concedido à
          apresentação que melhor articulou uma ideia de negócio inovadora,
          validando o potencial da solução de mercado proposta.
        </p>
      </section>
    </div>
  );
};

export default PremiosPage;
