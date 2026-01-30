import React from "react";
import Heading1 from "./Typography/Heading1";
import SearchBarBlog from "./SearchBar/SearchBarBlog";
import Paragraph from "./Typography/Paragraph";

const BlogsHero = ({ heading, paragraph }) => {
  return (
    <section className={`bg-[#fafafa] secPadding`}>
      <div className="container">
        <div
          className={`max-w-[768px] mx-auto grid grid-cols-1 place-items-center gap-4`}
        >
          <div className="flex flex-col justify-center items-center">
            <Heading1 blackHeading={heading} className={`!text-center`} />
            <div className={`grid lg:grid-cols-1 grid-cols-1`}>
              <div className="flex flex-col justify-center items-start">
                {paragraph?.map((para, ind) => (
                  <Paragraph
                    blackText1={para}
                    key={ind}
                    className={`!text-center`}
                  />
                ))}
              </div>
            </div>
          </div>
          <SearchBarBlog />
          <div className="max-w-[768px] mx-auto ">
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHero;
