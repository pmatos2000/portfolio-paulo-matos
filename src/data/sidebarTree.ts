import { VscFile, VscJson, VscMarkdown, VscTerminal } from "react-icons/vsc";

export type TreeLeaf = {
  id: string;
  type: "leaf";
  title: string;
  icon: React.ComponentType;
  url: string;
};

export type TreeNode = {
  id: string;
  type: "node";
  title: string;
  children: (TreeNode | TreeLeaf)[];
};

export type TreeItem = TreeNode | TreeLeaf;

export const sidebarTree: TreeItem[] = [
  {
    id: "4608d69b-95fe-4e41-a78f-481dbbc29035",
    type: "node",
    title: "pages",
    children: [
      {
        id: "3e24ab59-1bff-479e-bce2-e3ebc2e83974",
        type: "leaf",
        title: "sobre-mim.md",
        icon: VscMarkdown,
        url: "#sobre-mim",
      },
      {
        id: "6cf9a0f7-424b-4134-8e5e-845cf0977337",
        type: "leaf",
        title: "competencias.json",
        icon: VscJson,
        url: "#competencias",
      },
    ],
  },
  {
    id: "5a276ab2-df22-492c-b83c-51db33c77649",
    type: "node",
    title: "experiencia",
    children: [
      {
        id: "f884810a-53f2-46a8-b871-167410cac114",
        type: "leaf",
        title: "2025_neuraptor.tsx",
        icon: VscTerminal,
        url: "#neuraptor",
      },
      {
        id: "a42a61c0-56c5-4729-8f5e-7a4ecf929e7b",
        type: "leaf",
        title: "2024_wegen-coop.tsx",
        icon: VscTerminal,
        url: "#wegen-coop",
      },
      {
        id: "5006508d-6cbf-4245-870a-bc2937747616",
        type: "leaf",
        title: "2020_dti-digital.tsx",
        icon: VscTerminal,
        url: "#dti-digital",
      },
      {
        id: "8d2bab0c-81f7-433b-b233-ba63a6e12cf6",
        type: "leaf",
        title: "2019_outras.md",
        icon: VscFile,
        url: "#outras",
      },
    ],
  },
  {
    id: "6a77236f-bf97-4fb9-b9e6-c0c1eb96db86",
    type: "node",
    title: "formacao",
    children: [
      {
        id: "acc80ca0-4c11-4f02-bfb4-e518dc6dc3da",
        type: "leaf",
        title: "2021_eng-sistemas.ts",
        icon: VscTerminal,
        url: "#eng-sistemas",
      },
      {
        id: "79550ad6-ada7-43be-b604-d5b5482cbb20",
        type: "leaf",
        title: "2016_mat-computacional.ts",
        icon: VscTerminal,
        url: "#mat-computacional",
      },
      {
        id: "f4e1e6bf-5ccc-4de7-ac8c-9de0a71de625",
        type: "leaf",
        title: "2011_tecnico.ts",
        icon: VscTerminal,
        url: "#tecnico",
      },
    ],
  },
  {
    id: "1a2ff0bd-f99d-4d5a-8854-6adc118c2e52",
    type: "node",
    title: "projetos-e-premios",
    children: [
      {
        id: "311401dd-838e-4176-871e-e8a79ce61073",
        type: "leaf",
        title: "OBMEP.md",
        icon: VscFile,
        url: "#obmep",
      },
      {
        id: "dbcddfcb-0b90-4f75-808f-a580bfe866da",
        type: "leaf",
        title: "Destaques-Academicos.md",
        icon: VscFile,
        url: "#destaques",
      },
      {
        id: "f3b79003-68bf-4093-b8ee-d3e259acc11f",
        type: "leaf",
        title: "Squad-de-Verdade.md",
        icon: VscFile,
        url: "#squad",
      },
    ],
  },
  {
    id: "96837c60-441f-4071-ab7c-e5bbe9260163",
    type: "leaf",
    title: "contato.ts",
    icon: VscTerminal,
    url: "#contato",
  },
];
