import type { MetadataRoute } from "next";
import { sidebarTree, type TreeItem } from "@/data/sidebarTree";
import { siteConfig } from "@/data/site";

const collectRoutes = (nodes: TreeItem[], acc: Set<string>): Set<string> => {
  for (const node of nodes) {
    if (node.url) {
      const path = node.url.split("#")[0];
      if (path.startsWith("/")) {
        acc.add(path);
      }
    }
    if (node.type === "node") {
      collectRoutes(node.children, acc);
    }
  }
  return acc;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = collectRoutes(sidebarTree, new Set<string>());
  return [...routes].sort().map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
