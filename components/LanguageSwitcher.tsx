"use client";

import {
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useDrawer } from "@/context/drawer-context";
import { LanguageContext } from "@/context/LanguageContext";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Language = {
  value: "en" | "ar";
  label: string;
  short: string;
  icon: string;
};

interface LanguageSwitcherProps {
  lcolr?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Constants                                   */
/* -------------------------------------------------------------------------- */

const languages: Language[] = [
  {
    value: "en",
    label: "English",
    short: "EN",
    icon: "/icons/en.svg",
  },
  {
    value: "ar",
    label: "Arabic",
    short: "AR",
    icon: "/icons/ar.svg",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

export default function LanguageSwitcher({
  lcolr,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { locale, setLocale } = useContext(LanguageContext);
  const { hideDrawer } = useDrawer();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* -------------------------- Default Locale -------------------------- */
  useEffect(() => {
    if (!locale) {
      setLocale("en");
    }
  }, [locale, setLocale]);

  /* ----------------------- Change Locale Handler ---------------------- */
  const handleLocaleChange = (newLocale: Language["value"]) => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] === "en" || segments[0] === "ar") {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    let newPath = "/" + segments.join("/");
    const queryString = searchParams.toString();

    if (queryString) {
      newPath += `?${queryString}`;
    }

    router.push(newPath);
    setLocale(newLocale);
    setOpen(false);
    hideDrawer();
  };

  /* ----------------------- Sync Locale from URL ------------------------ */
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "en" || segments[0] === "ar") {
      setLocale(segments[0]);
    }
  }, [pathname, setLocale]);

  /* --------------------- Close on Outside Click ------------------------ */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ------------------------- Selected Language ------------------------- */
  const selectedLang: Language =
    languages.find((lang) => lang.value === locale) ?? languages[0];

  /* -------------------------------------------------------------------------- */

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md max-w-20 cursor-pointer"
      >
        <Image
          src={selectedLang.icon}
          alt={selectedLang.short}
          width={30}
          height={30}
        />
        <span className={`text-sm ${lcolr ?? ""}`}>
          {selectedLang.short}
        </span>
        <Icon icon="mdi:chevron-down" className="w-4 h-4 text-white" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 min-w-32 bg-white rounded-md shadow-lg border border-gray-200">
          {languages.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => handleLocaleChange(lang.value)}
              className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-black"
            >
              <Image
                src={lang.icon}
                alt={lang.short}
                width={20}
                height={20}
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
