const ExperienciasPage = () => {
  return (
    <div className="contentPage">
      <h2>Experiências e Competências</h2>
      <p>
        Navegue pelas minhas principais experiências profissionais, projetos e
        competências técnicas.
      </p>

      <section id="wegen-coop">
        <h3>WeGen Coop</h3>
        <p>
          Atuei no desenvolvimento de um sistema de gestão de contratos e
          clientes para a venda de energia solar. Fui responsável por módulos
          críticos da aplicação, com foco em segurança, automação e usabilidade.
        </p>
        <ul>
          <li>
            <strong>Gestão de Contratos:</strong> Desenvolvimento e manutenção
            das telas de Lead, Propostas e Contratos, otimizando o fluxo de
            vendas.
          </li>
          <li>
            <strong>Auditoria e Versionamento:</strong> Criação de um sistema de
            histórico para registrar todas as edições realizadas nos contratos.
          </li>
          <li>
            <strong>Monitoramento:</strong> Implementação de logs detalhados
            para rastreabilidade e análise de comportamento do sistema.
          </li>
          <li>
            <strong>Segurança:</strong> Estruturação de um sistema de perfis de
            acesso (Administrador, Colaborador, Cliente, Usina) para garantir a
            segurança dos dados.
          </li>
          <li>
            <strong>Automação:</strong> Integração com a API da Clicksign para
            automatizar a gestão e assinatura de contratos.
          </li>
        </ul>
      </section>

      <section id="dti-digital">
        <h3>Dti digital</h3>
        <p>
          Na Dti, participei de projetos estratégicos para grandes clientes,
          atuando em frentes de alta visibilidade e impacto.
        </p>
        <h4>Projetos para Hermes Pardini:</h4>
        <ul>
          <li>
            <strong>Gestão de Colhedores:</strong> Desenvolvimento de um sistema
            para otimizar a logística e o gerenciamento das equipes de coleta.
          </li>
          <li>
            <strong>Agendamento Domiciliar:</strong> Atuação em um projeto
            crucial durante a pandemia de COVID-19, desenvolvendo o sistema de
            agendamento de exames em casa.
            <br />
            <strong>Tecnologias:</strong> React, Next.js, Banco de dados
            orientado a objetos (Caché).
          </li>
        </ul>
        <h4>Projeto para VLI Logística:</h4>
        <ul>
          <li>
            <strong>Gestão de Frotas:</strong> Desenvolvimento de um sistema
            para o gerenciamento e monitoramento da frota de locomotivas e
            vagões.
            <br />
            <strong>Tecnologias:</strong> React, Next.js, AWS Lambda
            (Functions), SQL Server.
          </li>
        </ul>
      </section>

      <section id="seidor">
        <h3>Seidor Brasil</h3>
        <p>
          Durante minha passagem pela Seidor, atuei como desenvolvedor ABAP, a
          linguagem de programação proprietária da SAP. Fui responsável pela
          criação e manutenção de programas, relatórios e interfaces (RFCs),
          além de realizar extração de dados e automação de processos dentro do
          ecossistema SAP.
        </p>
      </section>

      <section id="professor-particular">
        <h3>Professor Particular</h3>
        <p>
          Durante a faculdade, utilizei meu conhecimento para ajudar outros
          alunos a superarem desafios acadêmicos. Ministrei aulas particulares
          de programação em C e C++, com foco especial em **Estruturas de
          Dados**, auxiliando em trabalhos práticos e na preparação para provas.
          Essa experiência aprimorou minha didática e minha capacidade de
          solidificar conceitos complexos.
        </p>
      </section>

      <section id="outras">
        <h3>Outras Experiências (Técnico)</h3>
        <p>
          Antes de migrar para a área de desenvolvimento de software, tive
          experiências como técnico na PROTOP e PROGETTARE, onde trabalhei em
          projetos de engenharia elétrica para a CEMIG.
        </p>
        <ul>
          <li>Elaboração de projetos de iluminação pública.</li>
          <li>
            Desenvolvimento de projetos de afastamentos e expansão de rede de
            distribuição elétrica.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ExperienciasPage;
