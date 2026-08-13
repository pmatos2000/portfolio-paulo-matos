import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppLayout from "@/components/AppLayout/AppLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { getBlogYears } from "@/data/blogTree";
import { getCommits } from "@/data/gitLog";
import { OG_IMAGE, siteConfig } from "@/data/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [OG_IMAGE.url],
  },
};

/** Aplica o tema antes da primeira pintura, evitando flash de tema errado. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [blogYears, commits] = await Promise.all([
    getBlogYears(),
    getCommits(),
  ]);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script estático, sem entrada de usuário */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <AppLayout blogYears={blogYears} commits={commits}>
            {children}
          </AppLayout>
        </ThemeProvider>
      </body>
      <SpeedInsights />
    </html>
  );
}
