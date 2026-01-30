"use client";
import React, { useContext, useEffect, useState } from "react";
import { BlogCard2 } from "./BlogCard2";
import SplideSlider from "../SplideSlider/SplideSlider";
import { GetBlogs } from "@/actions/blog-actions";
import Link from "../Link/Link";
import { SkeletonBlogCard1 } from "./Skeleton";
import { vendorId } from "@/constants/global";
import { btnText } from "@/mockData/dummyData";

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
    640: { perPage: 2 },
    1024: { perPage: 3 },
  },
};

const LatestBlogs = ({ heading, paragraph, className }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
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
    <>
        <section
          className={`sm:pt-8 pt-6 bg-cover bg-right-top bg-no-repeat ${className}`}
        >
          <div className="container">
            {/* <div className="lg:mb-10 mb-4">
              <div className="flex items-center justify-between gap-6">
                <div className="max-w-lg w-full">
                  <Typography as="h5" size="lg" weight="bold">
                    {heading}
                  </Typography>
                  {paragraph?.map((para, ind) => (
                    <Typography key={ind} as="p" size="sm">
                      {para}
                    </Typography>
                  ))}
                </div>
                <div className="sm:flex justify-center hidden ">
                  <Link
                    href="/blog"
                    variant={"primary"}
                    className="rounded-full"
                  >
                    {btnText.view_all_insights}
                  </Link>
                </div>
              </div>
            </div> */}

            {data?.length ? (
              <div className="">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, index) => (
                      <SkeletonBlogCard1 key={index} />
                    ))}
                  </div>
                ) : (
                  <SplideSlider options={options} data={data}>
                    <BlogCard2 />
                  </SplideSlider>
                )}
              </div>
            ) : (
              <p>No posts available</p>
            )}
            {/* <div className="flex sm:hidden pt-6">
              <Link href="/blog" variant={"primary"} className="rounded-full">
                {btnText.view_all_insights}
              </Link>
            </div> */}
          </div>
        </section>
    </>
  );
};

export default LatestBlogs;
