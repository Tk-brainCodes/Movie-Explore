import Link from "next/link";
import { ReactNode } from "react";

type AnchorProps = {
  href: string;
  children: ReactNode;
  passHref?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export function Anchor({ href, passHref, target, children }: AnchorProps) {
  return (
    <Link legacyBehavior href={href} passHref={passHref}>
      <a href={href} target={target}>
        {children}
      </a>
    </Link>
  );
}
