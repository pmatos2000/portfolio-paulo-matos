# Portfólio Pessoal - Paulo Matos

<img width="1908" height="938" alt="image" src="https://github.com/user-attachments/assets/61bd209b-76a6-4051-9a7c-7bd3bb1481be" />


## 🚀 Sobre o Projeto

Este é o repositório do meu portfólio pessoal, desenvolvido para ser uma representação criativa e funcional das minhas habilidades como desenvolvedor. A interface foi projetada para simular a experiência de um editor de código, especificamente o **Visual Studio Code**, com o objetivo de apresentar minhas informações profissionais, projetos e competências de uma forma familiar ao universo do desenvolvimento.

O projeto foi construído do zero, aplicando conceitos modernos de desenvolvimento web, componentização e responsividade.

## 🛠️ Tecnologias Utilizadas

A base do projeto foi construída com tecnologias de ponta do ecossistema JavaScript e React:

* **[Next.js](https://nextjs.org/)**: Framework React para produção, utilizado por sua arquitetura de App Router, otimizações de performance (SSR/SSG) e roteamento baseado em arquivos.
* **[React](https://react.dev/)**: Biblioteca para a construção da interface de usuário componentizada.
* **[TypeScript](https://www.typescriptlang.org/)**: Para adicionar segurança de tipos ao JavaScript, garantindo um código mais robusto e manutenível.
* **[CSS Modules](https://github.com/css-modules/css-modules)**: Para estilização local e escopada, evitando conflitos de classes CSS.
* **[Biome](https://biomejs.dev/)**: Ferramenta moderna e de alta performance para formatação e linting do código.
* **[Vercel](https://vercel.com/)**: Plataforma de deploy, otimizada para projetos Next.js.

## ✨ Funcionalidades Implementadas

* **Interface Inspirada no VS Code**: Simula a experiência de um editor de código com `Activity Bar`, `Sidebar` (Explorer) e abas de conteúdo.
* **Design Responsivo**: O layout se adapta a diferentes tamanhos de tela, com um menu "hamburger" para navegação em dispositivos móveis.
* **Navegação Dinâmica**:
    * As abas e os *breadcrumbs* são gerados dinamicamente com base na URL atual.
    * O `Sidebar` destaca o link ativo e expande as pastas automaticamente para revelar a página atual.
* **Componentização**: A UI foi dividida em componentes reutilizáveis e bem definidos (`ImageCarousel`, `SkillBar`, `ThemeToggle`, etc.).
* **Troca de Tema**: Funcionalidade de alternar entre tema claro (Light) e escuro (Dark), com persistência no `localStorage`.
* **Estrutura de Dados Centralizada**: O conteúdo das páginas (como a árvore de navegação e as competências) é gerenciado em arquivos de dados separados, facilitando a manutenção.

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto na sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/pmatos2000/portfolio-paulo-matos.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd portfolio-paulo-matos
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Abra o navegador:**
    Acesse [`http://localhost:3000`](http://localhost:3000) para ver o projeto em execução.
