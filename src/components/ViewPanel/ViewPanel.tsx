import type { BlogYear } from "@/data/blogTree";
import BlogPanel from "../BlogPanel/BlogPanel";
import SearchPanel from "../SearchPanel/SearchPanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import Sidebar from "../Sidebar/Sidebar";

type ViewPanelProps = {
  activeView: string | null;
  onCloseMenu: () => void;
  lastPostSlug: string | null;
  blogYears: BlogYear[];
};

const ViewPanel = ({
  activeView,
  onCloseMenu,
  lastPostSlug,
  blogYears,
}: ViewPanelProps) => {
  switch (activeView) {
    case "Explorer":
      return (
        <Sidebar
          onCloseMenu={onCloseMenu}
          lastPostSlug={lastPostSlug}
          blogYears={blogYears}
        />
      );
    case "Search":
      return <SearchPanel onCloseMenu={onCloseMenu} />;
    case "Blog":
      return <BlogPanel years={blogYears} onCloseMenu={onCloseMenu} />;
    case "Manage":
      return <SettingsPanel />;
    default:
      return null;
  }
};

export default ViewPanel;
