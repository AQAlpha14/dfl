"use client";

import { getBlogDetail } from "@/actions/blog-actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SkeletonBlogCategories1,
  SkeletonBlogTags1,
} from "./Skeleton";
import Typography from "../Typography";

/* =======================
   Types
======================= */

interface Category {
  id: number;
  title: string;
}

interface Tag {
  id: number;
  title: string;
}

interface BlogDetail {
  categories_data?: Category[];
  tags_data?: Tag[];
}

interface BlogCategoriesProps {
  heading: string;
  className?: string;
}

/* =======================
   Blog Categories
======================= */

export const BlogCategories: React.FC<BlogCategoriesProps> = ({
  heading,
  className = "",
}) => {
  const [data, setData] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const res = await getBlogDetail(0, params?.slug);
        setData(res?.data?.[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch blog categories", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      fetchBlogDetail();
    }
  }, [params?.slug]);

  return (
    <div>
      <Typography as="h2" size="xl" weight="semibold">
        {heading}
      </Typography>

      <ul className="ml-4">
        {loading ? (
          [...Array(5)].map((_, index) => (
            <SkeletonBlogCategories1 key={index} />
          ))
        ) : (
          data?.categories_data?.map((item) => (
            <Link
              key={item.id}
              href={`/blog/category/${item.title
                .replace(/\s+/g, "-")
                .toLowerCase()}?category_id=${item.id}`}
              className={`${className} hover:text-primary hover:underline hover:underline-offset-2`}
            >
              <li className={className}>{item.title}</li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

/* =======================
   Blog Tags
======================= */

export const BlogTags: React.FC = () => {
  const [data, setData] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const res = await getBlogDetail(0, params?.slug);
        setData(res?.data?.[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch blog tags", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      fetchBlogDetail();
    }
  }, [params?.slug]);

  return (
    <div className="flex sm:flex-row flex-col items-center gap-3 secPadding">
      <Typography
        as="h4"
        size="md"
        weight="semibold"
        className="text-start rounded-full bg-black text-white text-base! py-1 px-6! mb-0!"
      >
        Tags:
      </Typography>

      <div className="flex flex-wrap gap-2">
        {loading ? (
          [...Array(5)].map((_, index) => (
            <SkeletonBlogTags1 key={index} />
          ))
        ) : (
          data?.tags_data?.map((item) => (
            <Link
              key={item.id}
              href={`/blog/tag/${item.title
                .replace(/\s+/g, "-")
                .toLowerCase()}?tag_id=${item.id}`}
              className="border border-[#A0A0A0] text-xs text-nowrap hover:border-primary py-1 px-3 text-[#A0A0A0] hover:text-primary bg-[#fdfdfd] rounded-full"
            >
              {item.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
