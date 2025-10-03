import SettingsPanel from "../SettingsPanel/SettingsPanel";
import Sidebar from "../Sidebar/Sidebar";

type ViewPanelProps = {
  activeView: string | null; // Pode ser nulo para quando o painel estiver fechado
};

const ViewPanel = ({ activeView }: ViewPanelProps) => {
  // Usamos um switch para decidir qual componente renderizar
  switch (activeView) {
    case "Explorer":
      return <Sidebar />;
    case "Manage":
      return <SettingsPanel />;
    default:
      // Se activeView for nulo ou qualquer outro valor, não renderiza nada.
      return null;
  }
};

export default ViewPanel;
