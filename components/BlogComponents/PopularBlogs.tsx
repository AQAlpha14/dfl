"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogCardListing from "./BlogCardListing";
import { GetBlogs } from "@/actions/blog-actions";
import {
  SkeletonPopularBlog1,
  SkeletonPopularBlogs1,
} from "./Skeleton";
import { vendorId } from "@/constants/constants";
import Typography from "../Typography";
import NotFound from "../NotFound";

/* =====================
   Types
===================== */

interface Category {
  title: string;
}

interface MongoDate {
  $date: string;
}

interface Blog {
  thumbnail_image: string;
  slug: string;
  categories_data?: Category[];
  title: string;
  createon?: MongoDate;
  description?: string;
}

interface PopularBlogsProps {
  heading: string;
  className?: string;
  bottomTitle?: string;
}

/* =====================
   Featured Blog Card
===================== */

const PopularBlog = ({
  thumbnail_image,
  slug,
  categories_data,
  title,
  createon,
  description,
}: Blog) => {
  const createdDate = createon?.$date
    ? new Date(createon.$date).toDateString()
    : "Unknown Date";

  return (
    <div className="h-full rounded-xl overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        {categories_data?.length ? (
          <div className="absolute z-10 left-4 top-4 text-xs px-2 py-0.5 text-white bg-primary rounded-full">
            {categories_data[0].title}
          </div>
        ) : null}

        <Image
          src={thumbnail_image}
          alt="Blog Image"
          width={1050}
          height={240}
          className="object-cover"
          priority
        />
      </div>

      <div className="px-4 pb-6 flex flex-col h-full">
        <Typography as="p" size="xs" className="mt-3">
          {createdDate}
        </Typography>

        <Link href={`/blog/${slug}`}>
          <Typography as="h2" size="xl" weight="semibold">
            {title}
          </Typography>
        </Link>

        {description && (
          <Typography as="p" size="sm" className="line-clamp-6">
            {description}
          </Typography>
        )}

        <div className="mt-auto pt-4">
          <Link
            href={`/blog/${slug}`}
            className="text-primary text-sm border border-primary px-2 py-1 rounded-full hover:bg-primary hover:text-white"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

/* =====================
   Popular Blogs Section
===================== */

const PopularBlogs = ({
  heading,
  className = "",
  bottomTitle,
}: PopularBlogsProps) => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      const payload = {
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

      const res = await GetBlogs(payload);
      setData(res?.data ?? []);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <section
      className={`secPadding bg-cover bg-top-right bg-no-repeat ${className}`}
    >
      <div className="container">
        <div className="lg:max-w-lg mb-10">
          <Typography
            as="h2"
            size="xl"
            weight="semibold"
            className="lg:text-left text-center"
          >
            {heading}
          </Typography>

          {bottomTitle && (
            <Typography
              as="h4"
              size="sm"
              weight="semibold"
              className="lg:text-left text-center"
            >
              {bottomTitle}
            </Typography>
          )}
        </div>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-12 grid-cols-6 gap-6">
          {loading ? (
            <>
              <div className="lg:col-span-7 col-span-12">
                <SkeletonPopularBlog1 />
              </div>
              <div className="lg:col-span-5 col-span-12 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonPopularBlogs1 key={i} />
                ))}
              </div>
            </>
          ) : data.length ? (
            <>
              <div className="lg:col-span-7 col-span-12">
                <PopularBlog {...data[0]} />
              </div>

              <div className="lg:col-span-5 col-span-12 space-y-4">
                {data.slice(0, 4).map((item) => (
                  <BlogCardListing key={item.slug} {...item} />
                ))}

                <Link
                  href="/blog/posts"
                  className="text-primary text-sm hover:underline hover:underline-offset-2 font-medium inline-block"
                >
                  View All Post
                </Link>
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularBlogs;
