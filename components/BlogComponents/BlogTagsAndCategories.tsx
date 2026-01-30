"use client";
import { getBlogDetail } from "@/actions/blog-actions";
import Heading2 from "./Typography/Heading2";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SkeletonBlogCategories1, SkeletonBlogTags1 } from "./Skeleton";
import { vendorId } from "@/constants/global";

export const BlogCategories = ({ heading, className }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([true]);
  const params = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await getBlogDetail(0, vendorId, params?.slug);
      setData(res?.data[0]);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      <div>
        <Heading2 className="text-start" blackHeading={heading} />
      </div>
      <ul className="ml-4">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <SkeletonBlogCategories1 />
              </div>
            ))}
          </>
        ) : (
          data?.categories_data?.map((item, index) => (
            <Link
              key={index}
              className={`${className} hover:text-primary hover:underline hover:underline-offset-2`}
              href={`/blog/category/${item?.title
                ?.replace(/\s+/g, "-")
                .toLowerCase()}?category_id=${item?.id}`}>
              <li className={`${className}`}>{item?.title}</li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export const BlogTags = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([true]);
  const params = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await getBlogDetail(0, vendorId, params?.slug);

      setData(res?.data[0]);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="flex sm:flex-row flex-col items-center gap-3 secPadding ">
      <div>
        <Heading2
          heading={`Tags:`}
          className={`text-start rounded-full bg-black text-white !text-base py-1 !px-6 !mb-0`}
        />
      </div>
      <div className="flex flex-wrap gap-y-2 gap-x-2 ">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <SkeletonBlogTags1 />
              </div>
            ))}
          </>
        ) : (
          data?.tags_data?.map((item, index) => (
            <Link
              className="border border-[#A0A0A0] text-xs text-nowrap hover:border-primary py-1 px-3 text-[#A0A0A0] hover:text-primary bg-[#fdfdfd] rounded-full"
              key={index}
              href={`/blog/tag/${item?.title
                ?.replace(/\s+/g, "-")
                .toLowerCase()}?tag_id=${item?.id}`}>
              {item?.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
