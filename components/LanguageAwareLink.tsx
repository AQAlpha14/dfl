"use client";

import { FC, ReactNode, useContext } from "react";
import Link, { LinkProps } from "next/link";
import { LanguageContext } from "@/context/LanguageContext";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface LanguageAwareLinkProps extends Omit<LinkProps, "href"> {
  href: LinkProps["href"];
  className: string;
  children?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

const LanguageAwareLink: FC<LanguageAwareLinkProps> = ({
  href,
  children,
  className,
  ...linkProps
}) => {
  const { locale } = useContext(LanguageContext);

  let localizedHref: LinkProps["href"];

  if (typeof href === "string") {
    if (href === "/") {
      localizedHref = `/${locale}`;
    } else if (href.startsWith(`/${locale}`)) {
      localizedHref = href;
    } else {
      localizedHref = `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
    }
  } else if (typeof href === "object" && "pathname" in href) {
    const pathname = href.pathname ?? "/";

    if (pathname === "/") {
      localizedHref = { ...href, pathname: `/${locale}` };
    } else if (pathname.startsWith(`/${locale}`)) {
      localizedHref = href;
    } else {
      localizedHref = {
        ...href,
        pathname: `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
      };
    }
  } else {
    console.error("Invalid href passed to LanguageAwareLink:", href);
    return null;
  }

  return (
    <Link href={localizedHref} {...linkProps} className={className}>
      {children}
    </Link>
  );
};

export default LanguageAwareLink;
