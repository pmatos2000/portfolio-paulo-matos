import SettingsPanel from "../SettingsPanel/SettingsPanel";
import Sidebar from "../Sidebar/Sidebar";

type ViewPanelProps = {
  activeView: string | null;
  onCloseMenu: () => void;
};

const ViewPanel = ({ activeView, onCloseMenu }: ViewPanelProps) => {
  switch (activeView) {
    case "Explorer":
      return <Sidebar onCloseMenu={onCloseMenu} />;
    case "Manage":
      return <SettingsPanel />;
    default:
      return null;
  }
};

export default ViewPanel;
