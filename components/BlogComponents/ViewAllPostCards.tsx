"use client";
import React, { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import { GetBlogs } from "@/actions/blog-actions";
import { SkeletonBlogCard1 } from "./Skeleton";
import { useSearchParams } from "next/navigation";
import { vendorId } from "@/constants/constants";
import Typography from "../Typography";
import NotFound from "../NotFound";

interface ViewAllPostCardsProps {
  searchParams?: Record<string, string | string[] | undefined>;
  lGrid?: boolean;
  heading?: string;
}

interface BlogData {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  [key: string]: any;
}

const ViewAllPostCards: React.FC<ViewAllPostCardsProps> = ({
  searchParams,
  lGrid,
  heading,
}) => {
  const [data, setData] = useState<BlogData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const urlSearchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      const params = {
        id: 0,
        isActive: 1,
        isDeleted: 0,
        nPerPage: 12,
        showAll: false,
        sortby: 0,
        author_id: 0,
        vendor_website_id: vendorId,
        category_id: urlSearchParams.get("category_id")
          ? [urlSearchParams.get("category_id")]
          : [],
        tag_id: urlSearchParams.get("tag_id")
          ? [urlSearchParams.get("tag_id")]
          : [],
        keywords: urlSearchParams.get("keywords") || "",
      };

      try {
        const res = await GetBlogs(params);
        setData(res?.data);
        setTotalPages(res?.totalPages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setLoading(false);
      }
    };

    fetch();
  }, [searchParams, urlSearchParams]);

  return (
    <div>
      <div className="mb-6">
        <Typography as="h2" size="xl" weight="semibold" align="left">
          {heading}
        </Typography>
      </div>

      {loading ? (
        <div
          className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 ${
            lGrid ? "lg:grid-cols-4! md:grid-cols-2 grid-cols-1" : ""
          }`}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonBlogCard1 key={index} />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid lg:grid-cols-3! sm:grid-cols-2 grid-cols-1 gap-4">
          {data.map((blog, index) => (
            <BlogCard {...blog} key={index} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ViewAllPostCards;
