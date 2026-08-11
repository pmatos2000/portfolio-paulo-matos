import { isValidElement, type ReactNode } from "react";
import Code from "./Code";

type InnerProps = { className?: string; children?: ReactNode };

const CodeBlock = ({ children }: { children?: ReactNode }) => {
  if (!isValidElement<InnerProps>(children)) {
    return <pre>{children}</pre>;
  }

  const source = String(children.props.children ?? "").replace(/\n$/, "");
  const lang = children.props.className?.replace(/^language-/, "") ?? "";

  return <Code lang={lang}>{source}</Code>;
};

export default CodeBlock;
