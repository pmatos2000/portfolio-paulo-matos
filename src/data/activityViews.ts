import type { IconType } from "react-icons";
import { VscBook, VscFiles, VscSearch, VscSettingsGear } from "react-icons/vsc";

export type ActivityView = "Explorer" | "Search" | "Blog" | "Manage";

export type ActivityViewDef = {
  id: ActivityView;
  /** Título e rótulo acessível na barra lateral. */
  label: string;
  /** Rótulo curto do rodapé no celular. */
  short: string;
  Icon: IconType;
};

export const TOP_VIEWS: ActivityViewDef[] = [
  {
    id: "Explorer",
    label: "Explorador de arquivos",
    short: "Arquivos",
    Icon: VscFiles,
  },
  { id: "Search", label: "Buscar no site", short: "Buscar", Icon: VscSearch },
  { id: "Blog", label: "Posts do blog", short: "Blog", Icon: VscBook },
];

export const BOTTOM_VIEWS: ActivityViewDef[] = [
  {
    id: "Manage",
    label: "Configurações",
    short: "Ajustes",
    Icon: VscSettingsGear,
  },
];

export const ALL_VIEWS: ActivityViewDef[] = [...TOP_VIEWS, ...BOTTOM_VIEWS];
