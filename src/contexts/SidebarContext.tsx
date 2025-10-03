import { createContext } from "react";

type SidebarContextType = {
  activeUrl: string | null;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);
