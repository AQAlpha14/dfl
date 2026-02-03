"use client";
import React, { useEffect, useState } from "react";
import SplideSlider from "../SplideSlider/SplideSlider";
import { BlogCard2 } from "./BlogCard";
import { GetBlogs } from "@/actions/blog-actions";
import { SkeletonBlogCard1 } from "./Skeleton";
import { vendorId } from "@/constants/global";
import Typography from "../Typography/Typography";

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
    // 1024: { perPage: 3 },
  },
};

const RelatedPosts = ({ heading, className, data }) => {
  const [relatedPosts, setRelatedPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const body = {
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
        tags_id: data?.tags_id,
        categories_ids: data?.categories_ids,
      };

      const res = await GetBlogs(body);
      setRelatedPosts(res?.data);
      setLoading(false);
    };
    fetch();
  }, [data]);

  return (
    <>
      <section
        className={`secPadding bg-cover bg-right-top bg-no-repeat ${className}`}
      >
        <div className="max-w-lg lg:mb-10">
          <Typography
              as="h5"
              size="lg"
              weight="bold"
            >
              {heading}
            </Typography>
        </div>
        <div className="">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(3)].map((_, index) => (
                <SkeletonBlogCard1 key={index} />
              ))}
            </div>
          ) : (
            // Show actual content after data is loaded
            <SplideSlider options={options} data={relatedPosts}>
              <BlogCard2 socialIcons={true} />
            </SplideSlider>
          )}
        </div>
      </section>
    </>
  );
};

export default RelatedPosts;
