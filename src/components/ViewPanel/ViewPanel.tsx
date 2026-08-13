import type { BlogYear } from "@/data/blogTree";
import type { Commit } from "@/data/gitLog";
import BlogPanel from "../BlogPanel/BlogPanel";
import GitPanel from "../GitPanel/GitPanel";
import SearchPanel from "../SearchPanel/SearchPanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import Sidebar from "../Sidebar/Sidebar";

type ViewPanelProps = {
  activeView: string | null;
  onCloseMenu: () => void;
  lastPostSlug: string | null;
  blogYears: BlogYear[];
  commits: Commit[];
};

const ViewPanel = ({
  activeView,
  onCloseMenu,
  lastPostSlug,
  blogYears,
  commits,
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
    case "Git":
      return <GitPanel commits={commits} />;
    case "Manage":
      return <SettingsPanel />;
    default:
      return null;
  }
};

export default ViewPanel;
