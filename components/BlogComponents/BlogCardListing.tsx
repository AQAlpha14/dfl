import React from "react";
import Image from "next/image";
import Link from "next/link";
import TruncateText from "./TruncateText";
import Paragraph from "./Typography/Paragraph";
import Heading2 from "./Typography/Heading2";

export const BlogCardListing = ({
  front_image,
  thumbnail_image,
  title,
  createon,
  description,
  slug,
  categories_data,
}) => {
  const createdDate =
    createon && createon["$date"]
      ? new Date(createon["$date"]).toDateString()
      : "Unknown Date";

  return (
    <div className={``}>
      <div className={`h-auto shadow-md rounded-xl overflow-hidden flex gap-2`}>
        <div
          className={`relative overflow-hidden !basis-1/3 sm:!min-w-[200px] !min-w-[130px] w-full h-auto sm:!pt-[30%] pt-[20%]`}
        >
          <Link href={`/blog/${slug}`}>
            <Image
              src={thumbnail_image}
              alt={"Blog Image"}
              width={200}
              height={200}
              className="absolute object-contain w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </Link>
        </div>
        <div className={`px-2 pb-6 !basis-2/3 sm:!py-4 !py-6 !justify-center`}>
          <Link
            href={`/blog/category/${categories_data[0]?.title
              ?.replace(/\s+/g, "-")
              .toLowerCase()}?category_id=${categories_data[0]?.id}`}
          >
            <p
              className={`inline-block text-sm px-3 py-1 text-white bg-primary rounded-full mb-2`}
            >
              <TruncateText wordLimit={3}>
                {categories_data[0]?.title || "Untitled Category"}
              </TruncateText>
            </p>
          </Link>

          <div className="flex flex-col ">
            <div className={`flex !mt-0`}>
              <Paragraph
                className={`!text-xs !text-left !my-0`}
                blackText1={createdDate}
              />
            </div>
            <Link
              href={`/blog/${slug}`}
            >
              <Heading2
              blackHeading={title}
              className={`!text-left !font-[400] line-clamp-1 text-ellipsis md:!text-base !text-base !mb-0`}
            />
            </Link>
            
            <Paragraph
              blackText1={description}
              className={`!text-sm !line-clamp-1 !text-left`}
            />
            <div className="mt-auto ">
              <Link
                href={`/blog/${slug}`}
                className={`!text-primary text-sm border border-primary px-2 py-1 rounded-full hover:bg-primary hover:!text-white `}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardListing;
