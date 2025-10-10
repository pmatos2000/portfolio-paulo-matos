export type Level = "Avançado" | "Intermediário" | "Básico";

export type Skill = {
  name: string;
  level: Level;
};

export type SkillGroup = {
  category: string;
  description: string;
  skills: Skill[];
};

export const skillsData: SkillGroup[] = [
  {
    category: "Linguagens e Frameworks",
    description:
      "Minhas principais ferramentas para a construção de aplicações robustas e escaláveis, tanto no back-end quanto no front-end.",
    skills: [
      { name: "C# (.NET Core/Framework)", level: "Avançado" },
      { name: "Linguagem C", level: "Avançado" },
      { name: "ASP.NET/ASP.NET Core", level: "Avançado" },
      { name: "React.js", level: "Avançado" },
      { name: "Entity Framework", level: "Avançado" },
      { name: "TypeScript", level: "Avançado" },
      { name: "HTML5/CSS3", level: "Intermediário" },
      { name: "Next.js", level: "Intermediário" },
      { name: "C++", level: "Básico" },
      { name: "SAP ABAP", level: "Básico" },
      { name: "Node.js", level: "Básico" },
    ],
  },
  {
    category: "Desenvolvimento de Jogos e Mobile",
    description:
      "Competências adquiridas através de projetos pessoais e estudos práticos, aplicando lógica e criatividade para criar experiências interativas.",
    skills: [
      { name: "Java", level: "Básico" },
      { name: "Android Nativo", level: "Básico" },
      { name: "Godot Engine", level: "Básico" },
      { name: "GDScript", level: "Básico" },
    ],
  },
  {
    category: "Arquitetura e Boas Práticas",
    description:
      "A base para construir software de alta qualidade: sustentável, testável e de fácil manutenção, aplicando princípios sólidos de engenharia de software.",
    skills: [
      { name: "Arquitetura Limpa", level: "Avançado" },
      { name: "Testes Automatizados", level: "Avançado" },
      { name: "Princípios SOLID", level: "Intermediário" },
      { name: "Padrões de Design", level: "Intermediário" },
      { name: "Microsserviços", level: "Intermediário" },
    ],
  },
  {
    category: "Bancos de Dados",
    description:
      "Experiência com modelagem, consulta e gerenciamento de dados em diferentes paradigmas de bancos de dados.",
    skills: [
      { name: "PostgreSQL", level: "Intermediário" },
      { name: "SQL Server", level: "Básico" },
    ],
  },
  {
    category: "Liderança e Gestão",
    description:
      "Habilidades desenvolvidas na liderança de equipes, garantindo a entrega de projetos alinhados aos objetivos de negócio.",
    skills: [
      { name: "Liderança Técnica", level: "Avançado" },
      { name: "Análise de Requisitos e Estimativas", level: "Avançado" },
    ],
  },
  {
    category: "Ferramentas e Metodologias",
    description:
      "Conhecimento em ferramentas e processos que garantem um ciclo de desenvolvimento ágil, colaborativo e eficiente.",
    skills: [
      { name: "Scrum", level: "Avançado" },
      { name: "Git/Git Flow", level: "Intermediário" },
      { name: "CI/CD e Azure DevOps", level: "Intermediário" },
      { name: "Kanban", level: "Básico" },
    ],
  },
  {
    category: "Hardware e IoT",
    description:
      "Explorações no mundo do hardware e sistemas embarcados, conectando o software ao mundo físico.",
    skills: [{ name: "Arduino", level: "Básico" }],
  },
];
