import React from "react";
import Image from "@/components/Image";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { btnText } from "@/mockData/dummyData";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface OurValueItem {
  num?: string | number;
  conter?: string | number;
  icon?: string;
  title: string;
  description: string;
}

interface OurValuesSectionProps {
  heading?: string;
  titleClr?: boolean;
  btn?: boolean;
  cardbg?: boolean;
  titleC?: boolean;
  headingC?: boolean;
  lgGrid?: boolean;
  sideIcon?: boolean;
  data: OurValueItem[];
  paragraph: string[];
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const OurValuesSection: React.FC<OurValuesSectionProps> = ({
  heading,
  titleClr,
  cardbg,
  titleC,
  headingC,
  lgGrid,
  btn,
  sideIcon,
  paragraph,
  data,
}) => {
  return (
    <section className="secPadding">
      <div className="container">
        <div className="max-w-lg mx-auto">
          {heading && (
            <Typography
              as="h2"
              size="xl"
              weight="bold"
              className={`${headingC ? "text-center" : ""} mt-2`}
            >
              {heading}
            </Typography>
          )}
          {paragraph.map((para, index) => (
            <Typography
              key={index}
              as="p"
              size="sm"
              className={`${headingC ? "text-center" : ""} mt-2`}
            >
              {para}
            </Typography>
          ))}
        </div>

        <div
          className={`grid pt-8 ${
            lgGrid ? "xl:grid-cols-4 lg:grid-cols-3" : "lg:grid-cols-3"
          } sm:grid-cols-2 grid-cols-1 gap-4 md:divide-x divide-x-0 md:divide-y-0 divide-y divide-white/30`}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className={`relative p-6 shadow-md rounded-xl overflow-hidden ${
                cardbg && i % 2
                  ? "bg-linear-to-b from-[#3C8FCA] to-[#2B7AB2]"
                  : "bg-linear-to-b from-primaryDark to-[#003A67]"
              }`}
            >
              {/* Background icon */}
              <Image
                src="/icons/wm_02.svg"
                alt="icons"
                width={400}
                height={400}
                className="absolute inset-0"
              />
              {/* Icon */}
              <div className={`flex flex-col justify-between h-full`}>
                <div className={``}>
                  {item.conter && (
                    <div className="pb-2 inline-block">
                      <Typography
                        as="h3"
                        size="sm"
                        weight="medium"
                        color="white"
                        className={`text-nowrap rounded-md border border-white/30 px-2 py-1`}
                      >
                        {item.conter}
                      </Typography>
                    </div>
                  )}
                  <div
                    className={`${sideIcon ? "flex items-center gap-4" : "mt-0"}`}
                  >
                    {/* Number badge */}
                    {item.num && (
                      <div className="bg-white rounded-md inline-flex w-11 h-10 items-center justify-center">
                        <Typography
                          as="h3"
                          size="md"
                          weight="medium"
                          className={`${
                            cardbg && i % 2 ? "text-grayClr" : "text-primary"
                          }`}
                        >
                          {item.num}
                        </Typography>
                      </div>
                    )}
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={30}
                        height={30}
                        className={`${titleC ? "mx-auto" : ""}`}
                      />
                    )}
                    <Typography
                      as="h3"
                      size="md"
                      weight="medium"
                      className={`${titleC ? "text-center" : ""} ${
                        titleClr ? "text-black" : "text-white"
                      }`}
                    >
                      {item.title}
                    </Typography>
                  </div>
                  <Typography
                    as="h3"
                    size="sm"
                    className={`pt-4
                    ${titleC ? "text-center" : ""}
                     ${titleClr ? "text-black" : "text-white"}
                    `}
                  >
                    {item.description}
                  </Typography>
                </div>

                {btn && (
                  <div className="pt-4">
                    <Button variant="simpleLink" icon1 className="text-white">
                      {btnText.view_listing}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValuesSection;
