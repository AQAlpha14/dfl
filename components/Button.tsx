"use client";

import { Icon } from "@iconify/react";
import React, { FC, ButtonHTMLAttributes } from "react";

/* ---------------------------- Props Interface ---------------------------- */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "simpleLink" | "txt" | "white" | "outline";
  iconClr?: string;
  className?: string;
  icon1?: boolean;
  icon2?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  loading = false,
  variant = "primary",
  iconClr = "text-white",
  className = "",
  icon1 = false,
  icon2 = false,
  type = "button",
  ...other
}) => {
  // Variant styles centralized
  const variantClasses: Record<string, string> = {
    primary: "btnBorder bg-primary text-white",
    simpleLink: "!p-0 !rounded-none !text-left",
    txt: "border-b border-primary !p-0 !rounded-none font-medium text-primary",
    white: "border border-white bg-white/25 font-medium text-white",
    outline: "border border-primary bg-white font-medium text-primary",
  };

  return (
    <button
      type={type}
      className={`displayPara rounded-lg text-nowrap sm:text-base text-xs sm:px-6 px-4 py-2 text-center transition-all duration-500 hover:cursor-pointer
        ${icon1 || icon2 ? "inline-flex items-center" : ""}
        ${variantClasses[variant] || ""} 
        ${className}`}
      {...other}
    >
      {loading ? (
        <Icon
          icon="eos-icons:bubble-loading"
          width="1.5rem"
          height="1.5rem"
          className="mx-auto"
        />
      ) : (
        <>
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
        </>
      )}
    </button>
  );
};

export default Button;
