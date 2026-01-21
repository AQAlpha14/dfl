"use client";

import { useParams } from "next/navigation";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

/* ------------------------- Types ------------------------- */

type Locale = "en" | "ar";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

/* ------------------------ Context ------------------------ */

export const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {}, // noop
});

/* ------------------------ Provider ----------------------- */

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const params = useParams<{ locale?: Locale }>();
  const [locale, setLocale] = useState<Locale>(params?.locale ?? "en");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* -------------------------- Hook ------------------------ */

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
