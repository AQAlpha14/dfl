"use client";
import React, { useEffect, useState, useMemo } from "react";
import { GetBlogs } from "@/actions/blog-actions";
import { SkeletonBlogCard1 } from "./Skeleton";
import Typography from "../Typography";
import { vendorId } from "@/constants/constants";
import SplideSlider from "@/sections/SplideSlider";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  heading: string;
  className?: string;
  data?: {
    tags_id?: number[];
    categories_ids?: number[];
  };
}

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  [key: string]: any; // extend with additional properties as needed
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ heading, className, data }) => {
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderOptions = useMemo(() => ({
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
    autoScroll: { speed: 1 },
    breakpoints: { 640: { perPage: 2 } },
  }), []);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setLoading(true);
      try {
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
        setRelatedPosts(res);
      } catch (err) {
        console.error("Failed to fetch related posts:", err);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (data) fetchRelatedPosts();
  }, [data]);

  if (!data) return null;

  return (
    <section className={`secPadding bg-cover bg-top-right bg-no-repeat ${className}`}>
      <div className="max-w-lg lg:mb-10">
        <Typography as="h5" size="lg" weight="bold">
          {heading}
        </Typography>
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonBlogCard1 key={index} />
            ))}
          </div>
        ) : relatedPosts.length === 0 ? (
          <Typography as="p" size="md">
            No related posts found.
          </Typography>
        ) : (
          <SplideSlider options={sliderOptions} data={relatedPosts}>
            <BlogCard />
          </SplideSlider>
        )}
      </div>
    </section>
  );
};

export default RelatedPosts;
