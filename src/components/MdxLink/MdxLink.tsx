import Link from "next/link";
import type { ComponentProps } from "react";

const MdxLink = ({ href, children, ...rest }: ComponentProps<"a">) => {
  if (!href) {
    return <a {...rest}>{children}</a>;
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link {...rest} href={href}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a {...rest} href={href}>
        {children}
      </a>
    );
  }

  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default MdxLink;
