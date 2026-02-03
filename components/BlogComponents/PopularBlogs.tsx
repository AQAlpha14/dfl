"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogCardListing from "./BlogCardListing";
import { GetBlogs } from "@/actions/blog-actions";
import { SkeletonPopularBlog1, SkeletonPopularBlogs1 } from "./Skeleton";
import { vendorId } from "@/constants/constants";
import Typography from "../Typography";

const PopularBlog = ({
  thumbnail_image,
  slug,
  categories_data,
  title,
  createon,
  description,
}) => {
  const createdDate =
    createon && createon["$date"]
      ? new Date(createon["$date"]).toDateString()
      : "Unknown Date";
  return (
    <>
      <div className={`h-full rounded-xl overflow-hidden`}>
        <div
          className={`relative aspect-video flex items-center justify-center overflow-hidden`}
        >
          {categories_data?.length ? (
            <div className="absolute z-10 left-4 top-4 text-xs px-2 py-0.5 text-white bg-primary inline-block rounded-full">
              <p>{categories_data[0].title}</p>
            </div>
          ) : (
            ""
          )}
          <Image
            src={thumbnail_image}
            alt={"Blog Image"}
            width={1050}
            height={240}
            className="object-cover "
            priority={true}
          />
        </div>

        <div className={`px-4 pb-6 flex flex-col`}>
          <div className="flex flex-col">
            <div className={`flex mt-3`}>
              <Typography as="p" size="xs">
                {createdDate}
              </Typography>
            </div>
            <Link href={`/blog/${slug}`}>
              <Typography as="h2" size="xl" weight="semibold">
                {title}
              </Typography>
            </Link>
            <Typography as="p" size="xs" className={`line-clamp-6`}>
              {createdDate}
            </Typography>
            <Typography as="p" size="sm" className={`line-clamp-6`}>
              {description}
            </Typography>
            <div className="mt-auto ">
              <Link
                href={`/blog/${slug}`}
                className={`text-primary! text-sm border border-primary px-2 py-1 rounded-full hover:bg-primary hover:text-white!`}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Popular Blogs Main Page

const PopularBlogs = ({ heading, className, bottomTitle }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = {
        id: 0,
        isActive: 1,
        isDeleted: 0,
        keywords: "",
        nPerPage: 10,
        pageNumber: 1,
        showAll: false,
        sortby: 0,
        author_id: 0,
        vendor_website_id: vendorId,
      };
      const res = await GetBlogs(data);
      setData(res?.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <section
      className={`secPadding bg-cover bg-right-top bg-no-repeat ${className}`}
    >
      <div className="container">
        <div className="lg:max-w-[1024px] mb-10">
          <Heading2
            blackHeading={heading}
            className={`lg:!text-left !text-center`}
          />
          {bottomTitle && (
            <Heading4
              blackHeading={bottomTitle}
              className={`lg:!text-left !text-center`}
            />
          )}
        </div>
      </div>

      <div className="container">
        <div className={`grid lg:grid-cols-12 grid-cols-6 gap-6`}>
          {loading ? (
            <>
              <div className="lg:col-span-7 col-span-12">
                <SkeletonPopularBlog1 />
              </div>
              <div className="lg:col-span-5 col-span-12 space-y-4">
                {[...Array(4)].map((_, index) => (
                  <SkeletonPopularBlogs1 key={index} />
                ))}
              </div>
            </>
          ) : data?.length ? (
            <>
              <div className="lg:col-span-7 col-span-12">
                {data && data.length > 0 && (
                  <PopularBlog {...data[0]} key={0} />
                )}
              </div>
              <div className="lg:col-span-5 col-span-12 space-y-4">
                {data?.slice(0, 4).map((item, i) => (
                  <BlogCardListing {...item} key={i} />
                ))}
                <div className="mt-auto">
                  <Link
                    href={`/blog/posts`}
                    className={`!text-primary text-sm hover:underline hover:underline-offset-2 hover:font-[500]`}
                  >
                    View All Post
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <p className="container">No posts available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularBlogs;
