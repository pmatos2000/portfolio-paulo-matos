import { createContext } from "react";

type SidebarContextType = {
  activeId: string | null;
  closeMobileMenu: () => void;
  onNavigate: (url: string) => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);
