import type { IconType } from "react-icons";
import { BsHash } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { GiSlippers } from "react-icons/gi";
import { MdOutlineStar } from "react-icons/md";
import { PiCompassRoseDuotone } from "react-icons/pi";
import { SiHtml5, SiRust, SiTypescript } from "react-icons/si";
import { VscHistory, VscMarkdown } from "react-icons/vsc";
import { sectionId } from "@/data/sectionId";
import { skillsData } from "@/data/skills";

const BLOG_NODE_ID = "b8e1f4c3-7d29-4a56-9e08-1c3f5b7a2d64";

/** Uma seção da página, para o painel OUTLINE. O hash tem que casar com o
    id do <section> ou do <h2> correspondente na página. */
export type OutlineEntry = {
  title: string;
  hash: string;
};

export type TreeLeaf = {
  id: string;
  type: "leaf";
  title: string;
  icon: IconType;
  url: string;
  transient?: boolean;
  /** Outline declarado à mão, para páginas cujas seções não são folhas. */
  outline?: OutlineEntry[];
  /** Navegável pela árvore, mas fora do sitemap. Ver src/app/sitemap.ts. */
  noindex?: boolean;
};

export type TreeNode = {
  id: string;
  type: "node";
  title: string;
  /** Quando definido, o título da pasta vira link em vez de botão de expandir. */
  url?: string;
  /** Sobrescreve o ícone de pasta: um post com outline é arquivo, não pasta. */
  icon?: IconType;
  /** Pastas nascem abertas; use false para começar fechada. */
  defaultExpanded?: boolean;
  /** Outline declarado à mão, para páginas cujas seções não são folhas. */
  outline?: OutlineEntry[];
  /** Navegável pela árvore, mas fora do sitemap. Ver src/app/sitemap.ts. */
  noindex?: boolean;
  children: (TreeNode | TreeLeaf)[];
};

export type TreeItem = TreeNode | TreeLeaf;

export const sidebarTree: TreeItem[] = [
  {
    id: "0f3a9c17-5d21-4b8e-9a6c-2e7f41db83a5",
    type: "node",
    title: "src",
    url: "/",
    defaultExpanded: true,
    children: [
      {
        id: "3e24ab59-1bff-479e-bce2-e3ebc2e83974",
        type: "leaf",
        title: "sobre-mim.css",
        icon: BsHash,
        url: "/sobre-mim",
        outline: [
          {
            title: "Desenvolvedor Full-Stack & Líder Técnico",
            hash: "desenvolvedor-full-stack-lider-tecnico",
          },
          {
            title: "Minha Jornada com a Programação",
            hash: "minha-jornada-com-a-programacao",
          },
          { title: "Além do Código", hash: "alem-do-codigo" },
          { title: "Minha trajetória digital", hash: "trajetoria-digital" },
        ],
      },
      {
        id: "6cf9a0f7-424b-4134-8e5e-845cf0977337",
        type: "leaf",
        title: "competências.css",
        icon: BsHash,
        url: "/competencias",
        outline: skillsData.map((group) => ({
          title: group.category,
          hash: sectionId(group.category),
        })),
      },
      {
        id: "c7d05b18-9a4e-4f31-b6c2-1e8f7a3d5049",
        type: "leaf",
        title: "CHANGELOG.md",
        icon: VscHistory,
        url: "/changelog",
        noindex: true,
      },
      {
        id: BLOG_NODE_ID,
        type: "node",
        title: "Blog",
        url: "/blog",
        children: [
          {
            id: "e5c1a7d4-3b62-4f18-9a05-7d2e8c4b1f39",
            type: "leaf",
            title: "index.html",
            icon: SiHtml5,
            url: "/blog",
          },
        ],
      },
      {
        id: "6b19d10c-ae84-44b6-a59b-50fa7872b2a0",
        type: "node",
        title: "Publicações",
        url: "/publicacoes",
        children: [
          {
            id: "be0d45b9-87fc-4333-a191-a92977608bb4",
            type: "leaf",
            title: "README.md",
            icon: VscMarkdown,
            url: "/publicacoes",
          },
          {
            id: "b132a67b-1db9-43c3-a47a-d26fe02f6481",
            type: "leaf",
            title: "artigos.md",
            icon: VscMarkdown,
            url: "/publicacoes/artigos",
            outline: [
              { title: "Neste site", hash: "neste-site" },
              { title: "Trabalho acadêmico", hash: "trabalho-academico" },
              { title: "Medium", hash: "medium" },
              { title: "GIMP Brasil", hash: "gimp-brasil" },
              { title: "iMisturebas", hash: "imisturebas" },
            ],
          },
          {
            id: "5f98807c-1dd0-4a02-91c5-70672a304573",
            type: "leaf",
            title: "canais.md",
            icon: VscMarkdown,
            url: "/publicacoes/canais",
            outline: [
              { title: "iMisturebas Canal", hash: "imisturebas-canal" },
              { title: "Vídeos selecionados", hash: "videos-selecionados" },
              { title: "Programei", hash: "programei" },
              { title: "O que ficou", hash: "o-que-ficou" },
            ],
          },
        ],
      },
      {
        id: "5a276ab2-df22-492c-b83c-51db33c77649",
        type: "node",
        title: "Experiência",
        url: "/experiencias",
        children: [
          {
            id: "c8b41d92-7a35-4e60-9f18-3ad5e2c71b04",
            type: "leaf",
            title: "lyncas.tsx",
            icon: FaReact,
            url: "/experiencias#lyncas",
          },
          {
            id: "a42a61c0-56c5-4729-8f5e-7a4ecf929e7b",
            type: "leaf",
            title: "wegen-coop.tsx",
            icon: FaReact,
            url: "/experiencias#wegen-coop",
          },
          {
            id: "5006508d-6cbf-4245-870a-bc2937747616",
            type: "leaf",
            title: "dti-digital.tsx",
            icon: FaReact,
            url: "/experiencias#dti-digital",
          },
          {
            id: "9494afb7-4912-4239-8862-caeb999a7e41",
            type: "leaf",
            title: "seidor.tsx",
            icon: FaReact,
            url: "/experiencias#seidor",
          },
          {
            id: "36f87590-80d1-4b37-9ea2-efa8262da9d2",
            type: "leaf",
            title: "professor-particular.tsx",
            icon: FaReact,
            url: "/experiencias#professor-particular",
          },
          {
            id: "8d2bab0c-81f7-433b-b233-ba63a6e12cf6",
            type: "leaf",
            title: "outras.tsx",
            icon: FaReact,
            url: "/experiencias#outras",
          },
        ],
      },
      {
        id: "6a77236f-bf97-4fb9-b9e6-c0c1eb96db86",
        type: "node",
        title: "Formação",
        url: "/formacao",
        children: [
          {
            id: "acc80ca0-4c11-4f02-bfb4-e518dc6dc3da",
            type: "leaf",
            title: "engenharia-sistemas.ts",
            icon: SiTypescript,
            url: "/formacao#engenharia-sistemas",
          },
          {
            id: "79550ad6-ada7-43be-b604-d5b5482cbb20",
            type: "leaf",
            title: "matemática-computacional.ts",
            icon: SiTypescript,
            url: "/formacao#matematica-computacional",
          },
          {
            id: "f4e1e6bf-5ccc-4de7-ac8c-9de0a71de625",
            type: "leaf",
            title: "eletrotécnica.ts",
            icon: SiTypescript,
            url: "/formacao#eletrotecnica",
          },
        ],
      },
      {
        id: "362f04e5-325c-42ac-adb7-21b98afa0ff8",
        type: "node",
        title: "Projetos",
        url: "/projetos",
        children: [
          {
            id: "b2f7c015-9d84-4a3e-8c56-1e0f7a94d3b8",
            type: "leaf",
            title: "portfólio.tsx",
            icon: FaReact,
            url: "/projetos/portfolio",
            outline: [
              {
                title: "A metáfora e o que ela custa",
                hash: "a-metafora-e-o-que-ela-custa",
              },
              {
                title: "Três problemas que só apareceram medindo",
                hash: "tres-problemas-que-so-apareceram-medindo",
              },
              { title: "Resultado", hash: "resultado" },
              { title: "Decisões técnicas", hash: "decisoes-tecnicas" },
              {
                title: "Competências em Destaque",
                hash: "competencias-em-destaque",
              },
              { title: "Código Fonte", hash: "codigo-fonte" },
            ],
          },
          {
            id: "7c3d5b81-2e64-4f19-9a07-b5d8e1f34a26",
            type: "leaf",
            title: "leaf.rs",
            icon: SiRust,
            url: "/projetos/leaf",
            outline: [
              {
                title: "O problema que originou a linguagem",
                hash: "o-problema-que-originou-a-linguagem",
              },
              {
                title: "Por que não usar uma linguagem pronta",
                hash: "por-que-nao-usar-uma-linguagem-pronta",
              },
              { title: "Os cinco requisitos", hash: "os-cinco-requisitos" },
              { title: "Como Leaf se parece", hash: "como-leaf-se-parece" },
              { title: "O estado de um script", hash: "o-estado-de-um-script" },
              { title: "Anotações", hash: "anotacoes" },
              {
                title: "Sem coletor de lixo, e sem vazamento",
                hash: "sem-coletor-de-lixo-e-sem-vazamento",
              },
              {
                title: "A VM não entra em pânico",
                hash: "a-vm-nao-entra-em-panico",
              },
              {
                title: "Por que tipagem estática",
                hash: "por-que-tipagem-estatica",
              },
              { title: "Estado atual", hash: "estado-atual" },
              {
                title: "Por que a linguagem antes do motor",
                hash: "por-que-a-linguagem-antes-do-motor",
              },
              {
                title: "Competências em destaque",
                hash: "competencias-em-destaque",
              },
              {
                title: "Escrevendo sobre o Leaf",
                hash: "escrevendo-sobre-o-leaf",
              },
              { title: "Onde acompanhar", hash: "onde-acompanhar" },
            ],
          },
          {
            id: "e91a4f0d-8b73-4c25-a6de-30f7c982b514",
            type: "leaf",
            title: "rustle.rs",
            icon: SiRust,
            url: "/projetos/rustle",
            outline: [
              {
                title: "A ideia central: a cena é um documento",
                hash: "a-ideia-central-a-cena-e-um-documento",
              },
              { title: "Três princípios", hash: "tres-principios" },
              {
                title: "A regra que protege a arquitetura",
                hash: "a-regra-que-protege-a-arquitetura",
              },
              {
                title: "O que a prova de conceito ensinou",
                hash: "o-que-a-prova-de-conceito-ensinou",
              },
              {
                title: "O que ficou de fora, e virou outro projeto",
                hash: "o-que-ficou-de-fora-e-virou-outro-projeto",
              },
              { title: "Estado atual", hash: "estado-atual" },
              {
                title: "Competências em destaque",
                hash: "competencias-em-destaque",
              },
              { title: "Código fonte", hash: "codigo-fonte" },
            ],
          },
          {
            id: "1e47d46b-1501-4fa5-8448-a6ae26a19ca2",
            type: "node",
            title: "Jogos",
            url: "/projetos/jogos",
            children: [
              {
                id: "4a18e88c-1030-4144-8573-aebe63051f2c",
                type: "leaf",
                title: "rosa-polar.app",
                icon: PiCompassRoseDuotone,
                url: "/projetos/jogos/rosa-polar",
                outline: [
                  { title: "Demonstração", hash: "demonstracao" },
                  {
                    title: "Godot como Ferramenta de Simulação Matemática",
                    hash: "godot-como-ferramenta-de-simulacao-matematica",
                  },
                  {
                    title: "Competências em Destaque",
                    hash: "competencias-em-destaque",
                  },
                  {
                    title: "Download e Interação",
                    hash: "download-e-interacao",
                  },
                ],
              },
            ],
          },
          {
            id: "533d77a9-6582-46e5-b82a-465736bb637e",
            type: "node",
            title: "Aplicativos",
            url: "/projetos/aplicativos",
            outline: [
              { title: "Projetos", hash: "projetos" },
              { title: "O contexto", hash: "o-contexto" },
            ],
            children: [
              {
                id: "9d9380f7-6fe2-410d-8b01-adcbf362c73f",
                type: "leaf",
                title: "zé-chinelão.app",
                icon: GiSlippers,
                url: "/projetos/aplicativos/ze-chinelao",
                outline: [
                  {
                    title: "O Propósito: Do Livro à Prática",
                    hash: "o-proposito-do-livro-a-pratica",
                  },
                  {
                    title: "A Origem do Nome: Uma Homenagem",
                    hash: "a-origem-do-nome-uma-homenagem",
                  },
                  { title: "Galeria", hash: "galeria" },
                  {
                    title: "Competências em Destaque",
                    hash: "competencias-em-destaque",
                  },
                  { title: "Código Fonte", hash: "codigo-fonte" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1a2ff0bd-f99d-4d5a-8854-6adc118c2e52",
        type: "node",
        title: "Prêmios",
        url: "/premios",
        children: [
          {
            id: "311401dd-838e-4176-871e-e8a79ce61073",
            type: "leaf",
            title: "OBMEP.md",
            icon: MdOutlineStar,
            url: "/premios#obmep",
          },
          {
            id: "dbcddfcb-0b90-4f75-808f-a580bfe866da",
            type: "leaf",
            title: "cases-ágeis.md",
            icon: MdOutlineStar,
            url: "/premios#cases-ageis",
          },
          {
            id: "f3b79003-68bf-4093-b8ee-d3e259acc11f",
            type: "leaf",
            title: "squad-de-verdade.md",
            icon: MdOutlineStar,
            url: "/premios#squad-de-verdade",
          },
          {
            id: "537e4b52-e966-40f0-8c69-3ad3ac6f0f04",
            type: "leaf",
            title: "pitch-destaque.md",
            icon: MdOutlineStar,
            url: "/premios#pitch-destaque",
          },
        ],
      },
    ],
  },
];

const POST_PATH = /^\/blog\/([\w-]+)$/;

const injectPost = (nodes: TreeItem[], post: TreeLeaf): TreeItem[] =>
  nodes.map((node) => {
    if (node.type !== "node") {
      return node;
    }
    if (node.id === BLOG_NODE_ID) {
      return { ...node, children: [post] };
    }
    return { ...node, children: injectPost(node.children, post) };
  });

export const findItem = (
  nodes: TreeItem[],
  predicate: (item: TreeItem) => boolean,
): TreeItem | null => {
  for (const node of nodes) {
    if (predicate(node)) {
      return node;
    }
    if (node.type === "node") {
      const found = findItem(node.children, predicate);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const postSlugFromPath = (pathname: string): string | null =>
  POST_PATH.exec(pathname)?.[1] ?? null;

export const buildTree = (
  pathname: string,
  rememberedSlug: string | null = null,
): TreeItem[] => {
  const slug = postSlugFromPath(pathname) ?? rememberedSlug;
  if (!slug) {
    return sidebarTree;
  }
  return injectPost(sidebarTree, {
    id: `${BLOG_NODE_ID}:${slug}`,
    type: "leaf",
    title: `${slug}.mdx`,
    icon: VscMarkdown,
    url: `/blog/${slug}`,
    transient: true,
  });
};
