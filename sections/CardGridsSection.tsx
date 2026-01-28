import React from "react";
import Image from "@/components/Image";
import Typography from "@/components/Typography";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface OurValueItem {
  num?: string | number;
  icon?: string;
  title: string;
  description: string;
}

interface CardGridsSectionProps {
  heading?: string;
  titleClr?: boolean;
  cardbg?: boolean;
  titleC?: boolean;
  sideIcon?: boolean;
  data: OurValueItem[];
  paragraph: string[];
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const CardGridsSection: React.FC<CardGridsSectionProps> = ({
  heading,
  titleClr,
  cardbg,
  titleC,
  sideIcon,
  paragraph,
  data,
}) => {
  return (
    <section className="secPadding">
      <div className="container">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="max-w-lg mx-auto ">
            {heading && (
              <Typography as="h2" size="xl" weight="bold">
                {heading}
              </Typography>
            )}
            {paragraph.map((para, index) => (
              <Typography key={index} as="p" size="sm">
                {para}
              </Typography>
            ))}
          </div>
          <div className={`grid sm:grid-cols-2 grid-cols-1 gap-4`}>
            {data.map((item, i) => (
              <div
                key={i}
                className={`relative shadow-md rounded-xl overflow-hidden ${
                  cardbg && i % 2
                    ? "bg-linear-to-b from-[#3C8FCA] to-[#2B7AB2]"
                    : "bg-linear-to-b from-primaryDark to-[#003A67]"
                }`}
              >
                {/* Background icon */}
                <Image
                  src="/icons/wm_01.svg"
                  alt="icons"
                  width={400}
                  height={400}
                  className="absolute right-0 h-full w-auto"
                />

                {/* Icon */}
                <div className={`p-6`}>
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
                        className={`${titleC ? "mx-auto" : ""}
                        ${sideIcon ? "" : "pb-4"}
                        `}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardGridsSection;
