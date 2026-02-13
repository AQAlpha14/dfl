// "use client";

// import { FC, ReactNode, useContext } from "react";
// import Link, { LinkProps } from "next/link";
// import { LanguageContext } from "@/context/LanguageContext";

// /* -------------------------------------------------------------------------- */
// /*                                   Types                                    */
// /* -------------------------------------------------------------------------- */

// interface LanguageAwareLinkProps extends Omit<LinkProps, "href"> {
//   href: LinkProps["href"];
//   className: string;
//   children?: ReactNode;
// }

// /* -------------------------------------------------------------------------- */
// /*                               Component                                    */
// /* -------------------------------------------------------------------------- */

// const LanguageAwareLink: FC<LanguageAwareLinkProps> = ({
//   href,
//   children,
//   className,
//   ...linkProps
// }) => {
//   const { locale } = useContext(LanguageContext);

//   let localizedHref: LinkProps["href"];

//   if (typeof href === "string") {
//     if (href === "/") {
//       localizedHref = `/${locale}`;
//     } else if (href.startsWith(`/${locale}`)) {
//       localizedHref = href;
//     } else {
//       localizedHref = `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
//     }
//   } else if (typeof href === "object" && "pathname" in href) {
//     const pathname = href.pathname ?? "/";

//     if (pathname === "/") {
//       localizedHref = { ...href, pathname: `/${locale}` };
//     } else if (pathname.startsWith(`/${locale}`)) {
//       localizedHref = href;
//     } else {
//       localizedHref = {
//         ...href,
//         pathname: `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
//       };
//     }
//   } else {
//     console.error("Invalid href passed to LanguageAwareLink:", href);
//     return null;
//   }

//   return (
//     <Link href={localizedHref} {...linkProps} className={className}>
//       {children}
//     </Link>
//   );
// };

// export default LanguageAwareLink;

"use client";
import { ReactNode, useContext } from "react";
import Link, { LinkProps } from "next/link";
import { Icon } from "@iconify/react";
import { LanguageContext } from "@/context/LanguageContext";

interface LanguageAwareLinkProps extends Omit<LinkProps, "href"> {
  href: LinkProps["href"];
  className: string;
  children?: ReactNode;
  variant?: "primary" | "rightIcon";
}

// interface LanguageAwareLinkProps {
//   href: typeof Link.prototype.href;
//   variant?: "primary" | "rightIcon";
//   className?: string;
//   children: React.ReactNode;
// }

export const LanguageAwareLink = ({
  href,
  variant,
  children,
  className,
  ...props
}: LanguageAwareLinkProps) => {
  const { locale } = useContext(LanguageContext);
  const ar = locale === "ar";
  let localizedHref;

  if (typeof href === "string") {
    // Handle home route ("/") separately
    if (href === "/") {
      localizedHref = `/${locale}`;
    } else if (href.startsWith(`/${locale}`)) {
      localizedHref = href;
    } else {
      localizedHref = `/${locale}${href.startsWith("/") ? href : "/" + href}`;
    }
  } else if (typeof href === "object" && href.pathname) {
    if (href.pathname === "/") {
      localizedHref = { ...href, pathname: `/${locale}` };
    } else if (href.pathname.startsWith(`/${locale}`)) {
      localizedHref = href;
    } else {
      localizedHref = {
        ...href,
        pathname: `/${locale}${
          href.pathname.startsWith("/") ? href.pathname : "/" + href.pathname
        }`,
      };
    }
  } else {
    console.error("Invalid href passed to LanguageAwareLink:", href);
    return null;
  }
  return (
    <Link
      href={localizedHref}
      {...props}
      className={`${className} transition-colors ${
        variant === "primary"
          ? "rounded-md font-medium text-white bg-primary hover:bg-primary/80 text-center px-4 py-2"
          : variant === "rightIcon"
            ? "px-0! text-nowrap h-fit w-fit py-1! text-white flex items-center gap-1 text-md font-medium text-base border-b-2"
            : ""
      }`}
    >
      {children}
      {variant === "rightIcon" && (
        <Icon
          icon={ar ? "uil:angle-left" : "uil:angle-right"}
          width="26"
          height="26"
          className={ar ? "-ml-1" : "-mr-1"}
        />
      )}
    </Link>
  );
};

export default LanguageAwareLink;