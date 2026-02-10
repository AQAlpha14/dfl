"use client";

import Image from "next/image";
import Typography from "./Typography";

export interface TOSItem {
  id: any;
  label: string;
  icon: string;
  icon1: string;
  paragraph?: string[];
  content?: string[];
}

interface TermsOfServiceProps {
  heading: string;
  paragraph: string;
  data: TOSItem[];
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  heading,
  paragraph,
  data,
}) => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="sm:py-44 py-7.5 bg-[url(/assets/images/bg_1.webp)] bg-no-repeat bg-cover">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-fit mx-auto">
              <div className="flex items-center justify-center gap-4 py-2 px-4 bg-primary rounded-full">
                <Image
                  src="/icons/termsofservices/Icon.svg"
                  alt="Terms of Service Icon"
                  width={25}
                  height={25}
                  priority
                />
                <Typography
                  as="p"
                  size="sm"
                  weight="medium"
                  color="white"
                  align="center"
                >
                  Last Updated: November 26, 2025
                </Typography>
              </div>
            </div>
            <Typography
              as="h2"
              size="xl"
              weight="bold"
              align="center"
            >
              {heading}
            </Typography>
            <Typography as="p" size="sm" weight="medium" align="center">
              {paragraph}
            </Typography>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <div className="secPadding bg-[#FAFDFF] scroll-smooth">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
            {/* LEFT — TABLE OF CONTENTS */}
            <nav
              className="lg:col-span-1 bg-[#FAFDFF] sticky lg:top-24 top-16 lg:py-0 py-4 self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
              aria-label="Table of Contents"
            >
              <div className="pb-6">
                <Typography as="h4" size="lg" weight="bold" color="primary">
                  Table of Contents
                </Typography>
              </div>
              <div className="flex lg:flex-col flex-row gap-2 overflow-x-auto py-2">
                {data?.map((item) => (
                  <a
                    key={item.id}
                    href={`#section-${item.id}`}
                    className="hover:cursor-pointer flex items-center gap-3 bg-white border border-[#E6F3FF] rounded-lg lg:px-4 px-2 py-3 shadow-sm hover:bg-blue-50 transition shrink-0"
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.label} icon`}
                      width={25}
                      height={25}
                    />
                    <Typography
                      as="p"
                      size="xs"
                      weight="medium"
                      className="lg:text-wrap text-nowrap"
                    >
                      {item.label}
                    </Typography>
                  </a>
                ))}
              </div>
            </nav>

            {/* RIGHT — MAIN CONTENT */}
            <section className="lg:col-span-3 space-y-14">
              {data?.map((item) => (
                <div
                  id={`section-${item.id}`}
                  key={item.id}
                  className="lg:scroll-mt-32 scroll-mt-56"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={item.icon1}
                      alt={`${item.label} icon`}
                      width={35}
                      height={35}
                    />
                    <Typography
                      as="h2"
                      size="lg"
                      weight="medium"
                      color="primary"
                    >
                      {item.label}
                    </Typography>
                  </div>

                  {item.paragraph && (
                    <div className="pb-4 space-y-4">
                      {item.paragraph.map((para, ind) => (
                        <Typography key={ind} as="p" size="sm">
                          {para}
                        </Typography>
                      ))}
                    </div>
                  )}

                  {item.content && (
                    <ul className="list-disc list-inside ml-4 text-gray-600 space-y-2">
                      {item.content.map((listItem, idx) => (
                        <li key={idx}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
