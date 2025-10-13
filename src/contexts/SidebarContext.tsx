import { createContext } from "react";

type SidebarContextType = {
  activeUrl: string | null;
  closeMobileMenu: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);
