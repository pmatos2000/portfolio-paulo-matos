import type { MetadataRoute } from "next";
import { postLoaders, postSlugs } from "@/data/posts";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = collectRoutes(sidebarTree, new Set<string>());
  const pages = [...routes].sort().map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));

  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { meta } = await postLoaders[slug]();
      return {
        url: new URL(`/blog/${slug}`, siteConfig.url).toString(),
        lastModified: meta.date,
      };
    }),
  );

  return [...pages, ...posts];
}
