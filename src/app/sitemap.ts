import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { type TreeItem, sidebarTree } from "@/data/sidebarTree";

const collectRoutes = (nodes: TreeItem[], acc: Set<string>): Set<string> => {
  for (const node of nodes) {
    if (node.type === "node") {
      collectRoutes(node.children, acc);
      continue;
    }
    const path = node.url.split("#")[0];
    if (path.startsWith("/")) {
      acc.add(path);
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
