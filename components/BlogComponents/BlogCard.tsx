import React from "react";
import Image from "next/image";
import { btnText } from "@/mockData/dummyData";
import Link from "../Link";
import Typography from "../Typography";

interface Category {
  id: string | number;
  title: string;
}

interface BlogCardProps {
  thumbnail_image?: string;
  title?: string;
  createon?: {
    $date?: string;
  };
  description?: string;
  slug?: string;
  categories_data?: Category[];
}

export const BlogCard: React.FC<BlogCardProps> = ({
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
    <div className={`my-2`}>
      <div className={`rounded-2xl overflow-hidden`}>
        <div
          className={`relative w-full h-0 pt-[52%] sm:min-w-87.5 sm:pt-[52%] overflow-hidden`}
        >
          <Link href={`/blog/${slug}`} variant="txt">
            <Image
              src={thumbnail_image || "/icons/dummy.svg"}
              alt={"Blog Image"}
              width={350}
              height={240}
              className="absolute object-cover w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </Link>
          <div className="absolute top-4 left-4 z-10">
            <Link
              variant={`button1`}
              className={`inline-flex! px-4! text-xs!`}
              href={`/blog/category/${categories_data?.[0]?.title
                ?.replace(/\s+/g, "-")
                .toLowerCase()}?category_id=${categories_data?.[0]?.id}`}
            >
              {categories_data?.[0]?.title || "sell"}
            </Link>
          </div>
        </div>
        <div className={`p-4`}>
          <div className="flex flex-col">
            <div className={`flex`}>
              <Typography as="p" size="xs" weight="medium">
                {createdDate}
              </Typography>
            </div>
            <Link href={`/blog/${slug}`} variant="smptxt" className="">
              <Typography
                as="h2"
                size="xl"
                weight="medium"
                className={`text-left! mb-2! text-wrap font-medium md:text-lg! text-lg! line-clamp-1`}
              >
                {title}
              </Typography>
            </Link>
            <Typography
              as="p"
              size="sm"
              weight="medium"
              className={`text-left! text-sm! line-clamp-2 mb-0!`}
            >
              {description}
            </Typography>
            <div className="mt-auto pt-2">
              <Link
                variant={`smptxt`}
                href={`/blog/${slug}`}
                className={`text-sm! hover:text-primary`}
                icon1
              >
                {btnText.read_more}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
