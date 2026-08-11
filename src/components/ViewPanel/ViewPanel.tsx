import SettingsPanel from "../SettingsPanel/SettingsPanel";
import Sidebar from "../Sidebar/Sidebar";

type ViewPanelProps = {
  activeView: string | null;
  onCloseMenu: () => void;
  lastPostSlug: string | null;
};

const ViewPanel = ({
  activeView,
  onCloseMenu,
  lastPostSlug,
}: ViewPanelProps) => {
  switch (activeView) {
    case "Explorer":
      return <Sidebar onCloseMenu={onCloseMenu} lastPostSlug={lastPostSlug} />;
    case "Manage":
      return <SettingsPanel />;
    default:
      return null;
  }
};

export default ViewPanel;
