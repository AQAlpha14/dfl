import { default as NextLink } from "next/link";
import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";
import Image from "./Image";

/* ----------------------------- Types ----------------------------- */

type LinkVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "white"
  | "whiteOutline"
  | "simpleLink"
  | "blackbg"
  | "txtDarkbg"
  | "button1"
  | "smptxt"
  | "txt";

interface LinkProps {
  href: string | Record<string, any>;
  children?: ReactNode;
  variant?: LinkVariant;
  icon?: string;
  icon1?: boolean;
  icon2?: boolean;
  iconClr?: string;
  className?: string;
}

/* --------------------------- Component --------------------------- */

const Link: React.FC<LinkProps & React.ComponentProps<typeof NextLink>> = ({
  href,
  children,
  variant = "primary",
  icon,
  icon1 = false,
  icon2 = false,
  iconClr = "",
  className = "",
  ...other
}) => {
  if (!href) return null;

  const variantClasses: Record<LinkVariant, string> = {
    primary: "btnBorder bg-primary text-white",
    secondary: "",
    outline: "",
    white: "border border-white bg-white/25 font-medium text-white",
    whiteOutline: "",
    simpleLink: "!p-0 !rounded-none !text-left",
    blackbg: "",
    txtDarkbg: "",
    button1: "!bg-primaryLight !rounded-full",
    txt: "border-b border-primary !p-0 !rounded-none font-medium text-primary",
    smptxt: "border-none !p-0 !rounded-none font-medium",
  };

  return (
    <NextLink
      href={href}
      className={`displayPara rounded-lg text-nowrap sm:text-base text-xs sm:px-6 px-4 sm:py-2 py-1.5 text-center transition-all duration-500 
        ${icon || icon1 || icon2 ? "inline-flex items-center" : ""}
        ${variantClasses[variant] || ""}
        ${className}`}
      {...other}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={20}
          height={20}
          className="mr-2"
        />
      )}

      {children}

      {icon1 && (
        <Icon
          icon="iconamoon:arrow-right-2-duotone"
          width="1.5rem"
          height="1.5rem"
          className={iconClr}
        />
      )}

      {icon2 && (
        <Icon
          icon="fluent:arrow-right-48-filled"
          width="1.5rem"
          height="1.5rem"
          className={`${iconClr} pl-2`}
        />
      )}
    </NextLink>
  );
};

export default Link;
