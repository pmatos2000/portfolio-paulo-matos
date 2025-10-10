export type Level = "Avançado" | "Intermediário" | "Básico";

export type Skill = {
  name: string;
  level: Level;
};

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

export const skillsData: SkillGroup[] = [
  {
    category: "Linguagens e Frameworks",
    skills: [
      { name: "C# (.NET Core/Framework)", level: "Avançado" },
      { name: "ASP.NET/ASP.NET Core", level: "Avançado" },
      { name: "React.js", level: "Avançado" },
      { name: "Entity Framework", level: "Avançado" },
      { name: "TypeScript", level: "Avançado" },
      { name: "HTML5/CSS3", level: "Intermediário" },
      { name: "Next", level: "Intermediário" },
      { name: "SAP ABAP", level: "Básico" },
      { name: "Node", level: "Básico" },
    ],
  },
  {
    category: "Arquitetura e Boas Práticas",
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
    skills: [
      { name: "PostgreSQL", level: "Intermediário" },
      { name: "SQL Server", level: "Básico" },
    ],
  },
  {
    category: "Liderança e Gestão",
    skills: [
      { name: "Liderança Técnica", level: "Avançado" },
      { name: "Análise de Requisitos e Estimativas", level: "Avançado" },
    ],
  },
  {
    category: "Ferramentas e Metodologias",
    skills: [
      { name: "Scrum", level: "Avançado" },
      { name: "Git/Git Flow", level: "Intermediário" },
      { name: "CI/CD e Azure DevOps", level: "Intermediário" },
      { name: "Kanban", level: "Básico" },
    ],
  },
];
