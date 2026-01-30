"use client";
import React from "react";
import BlogCards from "./BlogCard2";
import SplideSlider from "../SplideSlider/SplideSlider";
import Heading4 from "./Typography/Heading4";
import Heading2 from "./Typography/Heading2";
import Paragraph from "./Typography/Paragraph";

const options = {
  type: "loop",
  rewind: true,
  resolve: "left",
  perPage: 1,
  padding: "0.8rem",
  perMove: 1,
  pagination: false,
  gap: "15px",
  arrows: false,
  autoplay: true,
  autoScroll: {
    speed: 1,
  },
  mediaQuery: "min",
  breakpoints: {
    360: { perPage: 2 },
    640: { perPage: 3 },
    768: { perPage: 4 },
  },
};
const RecentBlogs = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
  className,
}) => {
  return (
    <>
      <section
        className={`secPadding bg-cover bg-right-top bg-no-repeat ${className}`}
      >
        <div className="container">
          <div className="max-w-[1024px] lg:mb-10">
            {topTitle && (
              <Heading4
                blackHeading={topTitle}
                className={`lg:!text-left !text-center !font-[500]`}
              />
            )}
            <Heading2
              heading={heading}
              className={`lg:!text-left !text-center`}
            />
            {bottomTitle && (
              <Heading4
                blackHeading={bottomTitle}
                className={`lg:!text-left !text-center`}
              />
            )}
            {paragraph?.map((para, ind) => (
              <Paragraph textAlign="text-center" blackText1={para} key={ind} />
            ))}
          </div>
        </div>
        <div className="container">
          <SplideSlider options={options} data={blogData}>
            <BlogCards />
          </SplideSlider>
        </div>
      </section>
    </>
  );
};

export default RecentBlogs;
