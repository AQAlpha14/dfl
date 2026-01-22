"use client";
import React, { FC, Suspense, useContext, useEffect, useState } from "react";
import Image from "@/components/Image";
import { usePathname, useRouter } from "next/navigation";
import { navlinks } from "@/mockData/dummyData";
import useVendorStore from "@/stores/vendorStore";
import { useDrawer } from "@/context/drawer-context";
import { textToRouteUrl } from "@/utils/apiHelper";
import useFilterStore from "@/stores/filterStore";
import { Icon } from "@iconify/react";
import { Chevron } from "@/public/icons/SVGIcons";
import { LanguageContext } from "@/context/LanguageContext";
import LanguageAwareLink from "./LanguageAwareLink";

interface NavSubLink {
  name: string;
  link?: string;
}
interface NavSubListMenuProps {
  title?: string;
  link?: string;
  subLinks?: NavSubLink[];
}
interface NavListItem {
  title: string;
  link?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  subLinks?: NavSubLink[];
}

interface NavListMenuProps {
  title: string;
  pageLinks?: NavListItem[];
}

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
const NavSubListMenu: FC<NavSubListMenuProps> = ({
  title,
  link,
  subLinks = [],
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const renderItems = subLinks.map(({ name, link }, key) => (
    <li
      key={key}
      className="flex items-center gap-3 rounded-lg px-0 divide-y divide-gray-200"
    >
      <LanguageAwareLink href={textToRouteUrl(link ?? "")} className="">
        {name}
      </LanguageAwareLink>
    </li>
  ));

  return (
    <>
      {/* ---------------------------- Desktop Menu ---------------------------- */}
      <div
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        className="relative hidden lg:block"
      >
        <div className={`${isMenuOpen ? "bg-primary" : ""} rounded-xl`}>
          <div className="flex items-center justify-between gap-2 py-2 px-4">
            <LanguageAwareLink
              href={textToRouteUrl(link ?? "")}
              className={isMenuOpen ? "text-white" : "text-black"}
            >
              {title}
            </LanguageAwareLink>
            <Chevron
              className={
                isMenuOpen ? "fill-white -rotate-90" : "-rotate-90 fill-primary"
              }
            />
          </div>
        </div>

        {isMenuOpen && (
          <ul className="absolute top-0 left-[101%] bg-white text-black rounded-xl overflow-hidden">
            {renderItems}
          </ul>
        )}
      </div>

      {/* ----------------------------- Mobile Menu ----------------------------- */}
      <div className="block lg:hidden">
        <div
          className="flex justify-between items-center gap-2 py-2 pr-4 text-black"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span>{title}</span>
          <Chevron
            className={
              isMobileMenuOpen ? "fill-primary -rotate-90" : "-rotate-90"
            }
          />
        </div>

        {isMobileMenuOpen && <ul className="p-2">{renderItems}</ul>}
      </div>
    </>
  );
};

const NavListMenu: FC<NavListMenuProps> = ({ title, pageLinks = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const renderItems = pageLinks.map(({ title, link, subLinks }, key) =>
    subLinks ? (
      <NavSubListMenu key={key} title={title} link={link} subLinks={subLinks} />
    ) : (
      <li
        key={key}
        className="flex items-center w-full gap-3 rounded-sm py-0 text-sm"
      >
        <LanguageAwareLink
          href={textToRouteUrl(link ?? "")}
          className={`w-44 py-2 px-4 font-normal text-nowrap hover:bg-primary text-black hover:text-white ${
            !isMobileMenuOpen ? "px-4" : ""
          } `}
        >
          {title}
        </LanguageAwareLink>
      </li>
    ),
  );

  return (
    <>
      {/* ---------------------------- Desktop Menu ---------------------------- */}
      <div
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        className="hidden lg:block"
      >
        <div className="relative">
          <div className="flex items-center gap-2 py-2 px-0 text-white font-normal">
            <span className="text-sm">{title}</span>
            <Chevron
              className={`text-sm ${
                isMenuOpen ? "fill-primary rotate-90" : ""
              }`}
            />
          </div>
        </div>

        {isMenuOpen && (
          <ul className="absolute bg-white shadow-md rounded-xl overflow-hidden divide-y divide-gray-200">
            {renderItems}
          </ul>
        )}
      </div>

      {/* ----------------------------- Mobile Menu ----------------------------- */}
      <div className="block lg:hidden">
        <div
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex items-center justify-between gap-2 py-2 pr-2"
        >
          <span>{title}</span>
          <Chevron
            className={
              isMobileMenuOpen
                ? "fill-primary rotate-90 transition-all duration-300 ease-in-out"
                : ""
            }
          />
        </div>

        {isMobileMenuOpen && (
          <ul className="pl-2 divide-y divide-gray-200">{renderItems}</ul>
        )}
      </div>
    </>
  );
};

export function StickyNavbar() {
  const { setFilter, resetFilters } = useFilterStore();
  const [navbarColor, setNavbarColor] = useState(
    "lg:!backdrop-blur-0 lg:bg-transparent py-3 text-white",
  );

  const [navbarText, setNavbarText] = useState("");
  const [iconStrock, setIconStrock] = useState(`white`);
  const { vendor } = useVendorStore();
  const { showDrawer, hideDrawer } = useDrawer();
  const { locale } = useContext(LanguageContext);

  const pathname = usePathname();
  const lastPath = pathname.split("/")[pathname.split("/").length - 1];
  const path = pathname.split("/")[pathname.split("/").length - 2];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setNavbarColor("bg-black! text-white! py-1 shadow-xl text-white!");
        setNavbarText(`text-white!`);
        setIconStrock(`white`);
      } else {
        setNavbarColor("lg:!backdrop-blur-0 lg:bg-transparent py-3");
        setNavbarText(`text-white!`);
        setIconStrock(`white`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstLetter = vendor?.name ? vendor.name.charAt(0).toUpperCase() : "";

  const translations = {
    en: {
      bookYourCar: "Sign in",
    },
    ar: {
      bookYourCar: "احجز سيارتك",
    },
  };

  return (
    <>
      <div
        className={`
          ${
            path === "verify" ||
            path === "blog" ||
            path === "guides" ||
            path === "listing" ||
            path === "hotel-listing" ||
            lastPath === "billing" ||
            lastPath === "booking" ||
            lastPath === "signin" ||
            lastPath === "signup" ||
            lastPath === "forgotpassword" ||
            lastPath === "passwordresetsuccess" ||
            lastPath === "order" ||
            lastPath === "update-password" ||
            lastPath === "favourities" ||
            lastPath === "career-form" ||
            lastPath === "privacy-policy" ||
            lastPath === "terms-of-service" ||
            lastPath === "form"
              ? "bg-black!"
              : ""
          }
          ${navbarColor} fixed top-0 z-50 w-full transition-all duration-300 `}
      >
        <nav
          className={`container lg:border-none lg:shadow-none h-max rounded-none px-4 lg:px-14`}
        >
          <div className="flex items-center justify-between">
            <div className="">
              <LanguageAwareLink
                href={textToRouteUrl("/")}
                className="mr-auto cursor-pointer"
              >
                <Image
                  src={"/icons/dfl_logo1.svg"}
                  alt="logo"
                  width={120}
                  height={64}
                  className={``}
                />
              </LanguageAwareLink>
            </div>
            <div className="">
              <div className="hidden lg:block">
                <ul className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex lg:items-center lg:justify-center lg:p-1 xl:gap-4 lg:gap-2 lg:divide-y-0 divide-y">
                  {navlinks[locale]?.map(({ name, link, pageLinks }, index) => {
                    const currentPath = pathname.replace(/^\/(en|ar)/, "");
                    const isActive =
                      link === "/"
                        ? pathname === `/${locale}` ||
                          pathname === `/${locale}/` ||
                          pathname === "/"
                        : currentPath === link;

                    return pageLinks ? (
                      <NavListMenu
                        key={index}
                        title={name}
                        pageLinks={pageLinks}
                      />
                    ) : (
                      <li
                        key={index}
                        className={`${navbarText} flex items-center gap-2 lg:p-2 font-normal lg:divide-y-0 divide-y ${
                          isActive
                            ? "font-semibold underline underline-offset-4 text-primary"
                            : "text-white"
                        }`}
                      >
                        <LanguageAwareLink
                          href={link}
                          onClick={() => resetFilters()}
                          className="text-sm"
                        >
                          {name}
                        </LanguageAwareLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className=""
                onClick={() =>
                  showDrawer({
                    title: (
                      <div className="">
                        <div className="flex items-start gap-2">
                          <LanguageAwareLink
                            href={textToRouteUrl("/")}
                            className="mr-auto cursor-pointer"
                            onClick={() => hideDrawer()}
                          >
                            <Image
                              src={`/icons/dfl_logo2.svg`}
                              alt="logo"
                              width={130}
                              height={64}
                              className={``}
                            />
                          </LanguageAwareLink>
                        </div>
                      </div>
                    ),
                    size: "sm",
                    content: (
                      <div className="w-full">
                        <ul className="p-0 flex flex-col gap-2 w-full">
                          <Suspense
                            fallback={<div>Loading language switcher...</div>}
                          >
                            <div className="w-full flex items-center justify-between gap-2 py-4 border-b border-gray-200">
                              {/* <LanguageSwitcher /> */}
                              <LanguageAwareLink
                                href={textToRouteUrl(
                                  vendor?.id ? "/favourities" : "/signin",
                                )}
                                className="text-black text-sm"
                                onClick={() => hideDrawer()}
                              >
                                <Icon
                                  icon="akar-icons:heart"
                                  width="1.4rem"
                                  height="1.4rem"
                                />
                              </LanguageAwareLink>
                              <LanguageAwareLink
                                href={textToRouteUrl(
                                  vendor?.id ? "/profile" : "/signin",
                                )}
                                className="bg-primary text-white rounded-sm py-2 px-4 text-sm"
                                onClick={() => hideDrawer()}
                              >
                                {translations[locale]?.bookYourCar}
                              </LanguageAwareLink>
                            </div>
                          </Suspense>
                          {navlinks[locale]?.map(
                            ({ name, link, pageLinks }, index) => {
                              const currentPath = pathname.replace(
                                /^\/(en|ar)/,
                                "",
                              );
                              const isActive =
                                link === "/"
                                  ? pathname === `/${locale}` ||
                                    pathname === `/${locale}/` ||
                                    pathname === "/"
                                  : currentPath === link;

                              return pageLinks ? (
                                <NavListMenu
                                  key={index}
                                  title={name}
                                  pageLinks={pageLinks}
                                />
                              ) : (
                                <li
                                  key={index}
                                  className={`flex items-center gap-2 py-2 pr-4 text-black font-normal ${
                                    isActive
                                      ? "font-semibold underline underline-offset-4 text-black"
                                      : ""
                                  }`}
                                >
                                  <LanguageAwareLink
                                    href={textToRouteUrl(link || "")}
                                    className="text-sm w-full"
                                    onClick={() => {
                                      resetFilters();
                                      hideDrawer();
                                    }}
                                  >
                                    {name}
                                  </LanguageAwareLink>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    ),
                  })
                }
              >
                <button className="cursor-pointer ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    stroke={iconStrock}
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex items-center gap-4">
                {/* <div className="">
                  <Suspense fallback={<div>Loading language switcher...</div>}>
                    <LanguageSwitcher lcolr={navbarText} />
                  </Suspense>
                </div> */}
                <div className="flex items-center gap-4">
                  <LanguageAwareLink
                    href={textToRouteUrl(
                      vendor?.id ? "/favourities" : "/signin",
                    )}
                    className="text-white text-sm"
                  >
                    <Icon
                      icon="akar-icons:heart"
                      width="1.4rem"
                      height="1.4rem"
                    />
                  </LanguageAwareLink>
                  <div>
                    {vendor?.id ? (
                      <>
                        {vendor?.profile_image === "" ? (
                          <LanguageAwareLink
                            href={textToRouteUrl("/profile")}
                            className="rounded-full h-9 w-9 font-semibold flex items-center justify-center m-0! text-white bg-primary"
                          >
                            {firstLetter}
                          </LanguageAwareLink>
                        ) : (
                          <LanguageAwareLink
                            href={textToRouteUrl("/profile")}
                            className="rounded-full h-9 w-9 overflow-hidden"
                          >
                            <Image
                              src={
                                vendor?.profile_image || "/icons/logo_black.svg"
                              }
                              alt={firstLetter}
                              width={20}
                              height={20}
                              className="w-full h-full object-cover"
                            />
                          </LanguageAwareLink>
                        )}
                      </>
                    ) : (
                      <LanguageAwareLink
                        href={textToRouteUrl(
                          vendor?.id ? "/profile" : "/signin",
                        )}
                        className="rounded-sm bg-primary text-white py-2 px-4 text-sm"
                      >
                        {translations[locale]?.bookYourCar}
                      </LanguageAwareLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
