import { isValidElement, type ReactNode } from "react";
import { getHighlighter } from "./highlighter";

type CodeProps = { className?: string; children?: ReactNode };

const CodeBlock = async ({ children }: { children?: ReactNode }) => {
  if (!isValidElement<CodeProps>(children)) {
    return <pre>{children}</pre>;
  }

  const source = String(children.props.children ?? "").replace(/\n$/, "");
  const lang = children.props.className?.replace(/^language-/, "") ?? "";
  const highlighter = await getHighlighter();

  if (!highlighter.getLoadedLanguages().includes(lang)) {
    return (
      <pre>
        <code>{source}</code>
      </pre>
    );
  }

  const html = highlighter.codeToHtml(source, {
    lang,
    themes: { light: "light-plus", dark: "dark-plus" },
    defaultColor: false,
  });

  // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML gerado pelo shiki em build, sem entrada de usuário
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default CodeBlock;
