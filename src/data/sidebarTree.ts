import type { IconType } from "react-icons";
import { BsHash } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { GiSlippers } from "react-icons/gi";
import { MdOutlineStar } from "react-icons/md";
import { PiCompassRoseDuotone } from "react-icons/pi";
import { SiJavascript, SiTypescript } from "react-icons/si";

export type TreeLeaf = {
  id: string;
  type: "leaf";
  title: string;
  icon: IconType;
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
    title: "Inicio",
    children: [
      {
        id: "3e24ab59-1bff-479e-bce2-e3ebc2e83974",
        type: "leaf",
        title: "sobre-mim.css",
        icon: BsHash,
        url: "/sobre-mim",
      },
      {
        id: "6cf9a0f7-424b-4134-8e5e-845cf0977337",
        type: "leaf",
        title: "competências.css",
        icon: BsHash,
        url: "/competencias",
      },
    ],
  },
  {
    id: "5a276ab2-df22-492c-b83c-51db33c77649",
    type: "node",
    title: "Experiencia",
    children: [
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
    title: "Formacao",
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
        title: "matematica-computacional.ts",
        icon: SiTypescript,
        url: "#matematica-computacional",
      },
      {
        id: "f4e1e6bf-5ccc-4de7-ac8c-9de0a71de625",
        type: "leaf",
        title: "eletrotecnica.ts",
        icon: SiTypescript,
        url: "#eletrotecnica",
      },
    ],
  },
  {
    id: "362f04e5-325c-42ac-adb7-21b98afa0ff8",
    type: "node",
    title: "Projetos",
    children: [
      {
        id: "1e47d46b-1501-4fa5-8448-a6ae26a19ca2",
        type: "node",
        title: "Jogos",
        children: [
          {
            id: "4a18e88c-1030-4144-8573-aebe63051f2c",
            type: "leaf",
            title: "rosa-polar.app",
            icon: PiCompassRoseDuotone,
            url: "/projetos/jogos/rosa-polar",
          },
        ],
      },
      {
        id: "533d77a9-6582-46e5-b82a-465736bb637e",
        type: "node",
        title: "Aplicativos",
        children: [
          {
            id: "9d9380f7-6fe2-410d-8b01-adcbf362c73f",
            type: "leaf",
            title: "ze-chinelao.app",
            icon: GiSlippers,
            url: "/projetos/aplicativos/ze-chinelao",
          },
        ],
      },
    ],
  },
  {
    id: "1a2ff0bd-f99d-4d5a-8854-6adc118c2e52",
    type: "node",
    title: "Prêmios",
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
        title: "cases-ageis.md",
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
  {
    id: "96837c60-441f-4071-ab7c-e5bbe9260163",
    type: "leaf",
    title: "contato.js",
    icon: SiJavascript,
    url: "#contato",
  },
];
