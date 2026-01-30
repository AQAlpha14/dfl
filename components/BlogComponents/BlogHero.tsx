import React from "react";
import ButtonTheme from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";
import { contactDetail } from "@/mockData/contact";
import Heading4 from "./Typography/Heading4";
import Heading2 from "./Typography/Heading2";
import Paragraph from "./Typography/Paragraph";

const BlogHero = ({
  subTitle,
  topTitle,
  heading,
  paragraph,
  imageUrl,
  imageWidth,
  imageHeight,
  imageAlign,
  imageAlt,
  dealsTitle,
  dealsTitleColored,
  list,
  hideSearch,
  className,
}) => {
  return (
    <section className={`lg:pt-28 pt-14 pb-20 ${className} `}>
      <div className="container">
        <div className={`max-w-[768px] mx-auto grid grid-cols-1 gap-4`}>
          <div className="flex flex-col justify-center">
            {subTitle && (
              <Heading4 className="text-center" blackHeading={subTitle} />
            )}
            {topTitle && (
              <Heading4 className="text-start" blackHeading={topTitle} />
            )}
            <Heading2 blackHeading={heading} className="text-center" />

            <div className={`grid lg:grid-cols-1 grid-cols-1`}>
              <div className="flex flex-col justify-center items-start">
                {paragraph?.map((para, ind) => (
                  <Paragraph
                    blackText1={para}
                    key={ind}
                    className={`lg:!text-left !text-center`}
                  />
                ))}
                {(dealsTitle || dealsTitleColored) && (
                  <Heading2
                    blackHeading={dealsTitle}
                    className="!text-start"
                  />
                )}
                {list && (
                  <ul>
                    {list?.map((item, ind) => (
                      <li
                        className="displayPara font-[300] text-white"
                        key={ind}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {!hideSearch && <SearchBar />}
            <div className="flex gap-4 mt-4 mx-auto lg:mx-0">
              <ButtonTheme
                text={contactDetail.telNumber}
                href={`tel:${contactDetail.telNumber}`}
                widthClass="w-auto"
              />
              <ButtonTheme
                text={"Call Request"}
                widthClass="w-auto mx-auto sm:mx-0"
                callReqBtn
              />
            </div>
          </div>
          {imageUrl && (
            <div
              className={`flex ${imageAlign ? imageAlign : "items-center"
                } justify-center`}
            >
              <Image
                src={imageUrl}
                alt={imageAlt ? imageAlt : ""}
                width={imageWidth}
                height={imageHeight}
                className="w-1/2 md:w-auto"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
