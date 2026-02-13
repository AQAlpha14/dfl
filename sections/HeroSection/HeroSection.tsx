"use client";
import { btnText } from "@/mockData/dummyData";
import Typography from "@/components/Typography";
import Image from "@/components/Image";
import { FC } from "react";
import { FormButton1, FormButton2 } from "@/components/FormFields/FormButton";
import HeaderSearch from "@/components/FormFields/HeaderSearch";

/* ---------------------------- Props Interface ---------------------------- */
interface CounterReviewItem {
  numbers: string | number;
  description?: string;
  icon?: string;
}

interface HeroSectionProps {
  topTitle?: string;
  heading: string;
  bottomTitle?: string;
  paragraph?: string[];
  list?: string[];
  FormButton?: boolean;
  listTitle?: string;
  Countertabs?: boolean;
  headerserach?: boolean;
  counterReview?: CounterReviewItem[];
  content?: string;
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
  list,
  FormButton,
  Countertabs,
  headerserach,
  counterReview,
  listTitle,
  content,
  className,
}) => {
  const placeCounter = [
    {
      numbers: "120",
      description: "Apartments",
      icon: "/icons/icon_10.svg",
    },
    {
      numbers: "242",
      description: "Villas",
      icon: "/icons/icon_11.svg",
    },
    {
      numbers: "30",
      description: "Studios",
      icon: "/icons/icon_12.svg",
    },
    {
      numbers: "100",
      description: "Shared Livings",
      icon: "/icons/icon_13.svg",
    },
  ];
  return (
    <section className={`heroPadding ${className}`}>
      <div className="container">
        <div className={`flex flex-col justify-center items-center`}>
          <div className="max-w-md w-full mx-auto space-y-3">
            {topTitle && (
              <Typography as="h3" size="md" weight="medium" color="white">
                {topTitle}
              </Typography>
            )}
            <Typography as="h1" size="2xl" align="center" color="white">
              {heading}
            </Typography>
            {bottomTitle && (
              <Typography as="h3" size="md" weight="medium" color="white">
                {bottomTitle}
              </Typography>
            )}
          </div>

          <div className={`grid grid-cols-1`}>
            <div className="flex flex-col justify-center items-center pt-3">
              <div className="space-y-3">
                {paragraph?.map((para, ind) => (
                  <Typography
                    key={ind}
                    as="p"
                    size="sm"
                    color="white"
                    align="center"
                  >
                    {para}
                  </Typography>
                ))}
              </div>

              {list && (
                <div>
                  {listTitle && (
                    <Typography as="h5" size="sm" color="secondary">
                      {listTitle}
                    </Typography>
                  )}
                  <ul className="list-disc pl-4">
                    {list.map((item, ind) => (
                      <li
                        key={ind}
                        className="displayPara text-theme-black text-sm py-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {content && (
                <Typography
                  as="h6"
                  size="sm"
                  weight="semibold"
                  className="pt-4"
                >
                  {content}
                </Typography>
              )}
              {FormButton && (
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  <FormButton1 btnTxt={btnText.find_your_dream_home_now} />
                  <FormButton2 btnTxt={btnText.try_our_savings_calculator} />
                </div>
              )}
              {counterReview && (
                <div className="overflow-hidden w-full">
                  <div className="pt-6 py-4 flex divide-x overflow-x-auto no-scrollbar">
                    {counterReview.map((item, i) => (
                      <div
                        key={i}
                        className="px-4 flex flex-col items-center justify-start whitespace-nowrap"
                      >
                        <Typography
                          as="h6"
                          size="sm"
                          weight="medium"
                          className="pt-4"
                        >
                          {item.numbers}
                        </Typography>
                        {item.description && (
                          <Typography as="p" size="sm">
                            {item.description}
                          </Typography>
                        )}
                        {item.icon && (
                          <Image
                            src={item.icon}
                            width={18}
                            height={36}
                            className="w-auto h-auto"
                            alt="icon"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {headerserach && (
          <div className="py-4 lg:block hidden">
            <HeaderSearch />
          </div>
        )}
        {Countertabs && (
          <div className="md:flex lg:flex-nowrap flex-wrap hidden gap-2 justify-center pt-4">
            {placeCounter.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center gap-4 rounded-lg px-4 py-2 bg-white/50 border border-white "
              >
                {item.icon && (
                  <Image
                    src={item.icon}
                    width={18}
                    height={36}
                    className="w-auto h-auto"
                    alt="icon"
                  />
                )}
                {item.description && (
                  <Typography as="p" size="sm" className="text-white">
                    {item.description}
                  </Typography>
                )}
                <Typography
                  as="h6"
                  size="sm"
                  className="text-white border border-white px-2 rounded"
                >
                  {item.numbers}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
