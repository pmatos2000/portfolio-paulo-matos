import { renderCode } from "./highlighter";

type CodeProps = { lang: string; children: string };

const Code = async ({ lang, children }: CodeProps) => {
  const html = await renderCode(children, lang);

  if (!html) {
    return (
      <pre>
        <code>{children}</code>
      </pre>
    );
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML gerado pelo shiki em build, sem entrada de usuário
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Code;
