"use client";
import React, { useContext } from "react";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // don't forget the styles
import { LanguageContext } from "@/context/LanguageContext";

const UniversalSplide = ({ options = {}, children, ...rest }: { options?: any, children: React.ReactNode, [key: string]: any }) => {
  const { locale } = useContext(LanguageContext);

  const combinedOptions = {
    direction: locale === "ar" ? "rtl" : "ltr",
    ...options,
  };

  return (
    <Splide key={locale} options={combinedOptions} {...rest}>
      {children}
    </Splide>
  );
};

export default UniversalSplide;
