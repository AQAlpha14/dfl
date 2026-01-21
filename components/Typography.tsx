"use client";
import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  ElementType,
} from "react";

/* -------------------------------- Types -------------------------------- */

type Size = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
type Weight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
type Align = "left" | "center" | "right" | "justify";
type FontFamily = "default" | "baseNeueR";
type Color = "default" | "primary" | "secondary" | "white";

interface TypographyProps<T extends ElementType> {
  as?: T;
  size?: Size;
  fontFamily?: FontFamily;
  weight?: Weight;
  align?: Align;
  color?: Color;
  italic?: boolean;
  underline?: boolean;
  truncate?: boolean;
  className?: string;
  children: ReactNode;
}

/* ------------------------------- Classes ------------------------------- */

const sizeClasses: Record<Size, string> = {
  '2xl': "font-baseNeueR text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-snug",
  xl: "font-baseNeueR text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-snug",
  lg: "font-baseNeueR text-xl sm:text-2xl leading-snug",
  md: "text-base sm:text-lg leading-tight",
  sm: "text-sm sm:text-base",
  xs: "text-xs",
};

const weightClasses: Record<Weight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const alignClasses: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const fontFamilyClasses: Record<FontFamily, string> = {
  default: "font-creato",
  baseNeueR: "font-baseNeueR",
};

const colorClasses: Record<Color, string> = {
  default: "text-secondary",
  secondary: "text-secondary",
  primary: "text-primary",
  white: "text-white",
};

/* ------------------------------ Component ------------------------------ */

const Typography = <T extends ElementType = "p">({
  as,
  size = "sm",
  fontFamily = "default",
  weight = "normal",
  align,
  color = "default",
  italic = false,
  underline = false,
  truncate = false,
  className = "",
  children,
  ...props
}: TypographyProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = as || "p";
  const textRef = useRef<HTMLElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (truncate && textRef.current) {
      const el = textRef.current;
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [children, truncate]);

  const finalClassName = [
    sizeClasses[size],
    fontFamilyClasses[fontFamily],
    weightClasses[weight],
    align ? alignClasses[align] : "",
    colorClasses[color],
    italic ? "italic" : "",
    underline ? "underline" : "",
    truncate ? "truncate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* ------------------ ^highlight^ and ~bold~ parser ------------------ */

  const renderTextWithStyles = (text: string): ReactNode => {
    const highlightProcessed = text.split("^").map((part, i) =>
      i % 2 !== 0 ? (
        <span key={`h-${i}`} className="text-primary font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );

    return highlightProcessed.map((segment, i) => {
      if (typeof segment !== "string") return segment;

      return segment.split("~").map((bp, j) =>
        j % 2 !== 0 ? (
          <span key={`b-${i}-${j}`} className="font-bold">
            {bp}
          </span>
        ) : (
          <React.Fragment key={`t-${i}-${j}`}>{bp}</React.Fragment>
        )
      );
    });
  };

  return (
    <Component
      ref={truncate ? (textRef as any) : null}
      className={finalClassName}
      title={
        truncate && isTruncated && typeof children === "string"
          ? children
          : undefined
      }
      {...props}
    >
      {typeof children === "string"
        ? renderTextWithStyles(children)
        : children}
    </Component>
  );
};

export default Typography;
