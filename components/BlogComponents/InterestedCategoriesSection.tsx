"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogCategories } from "@/actions/blog-actions";
import { vendorId } from "@/constants/constants";
import SplideSlider from "@/sections/SplideSlider";
import Typography from "../Typography";
import type { Options } from "@splidejs/splide";
import {
  SkeletonInterestedCategoriesbtn,
  SkeletonInterestedCategoriessticky,
} from "./Skeleton";
import InterestedCategoriesBtn from "./InterestedCategoriesbtn";
import NotFound from "../NotFound";

/* ===================== TYPES ===================== */

interface Category {
  id: number;
  title: string;
}

interface InterestedCategoriesSectionProps {
  id?: number;
  title?: string;
  heading?: string;
  paragraph?: string[];
  btnText?: string;
  btnLink?: string;
  btnLinkText?: string;
  className?: string;
  isSingleIndex?: boolean;
  isStickyBar?: boolean;
  catId?: number;
}

/* ===================== SPLIDE OPTIONS ===================== */

const options: Options = {
  type: "loop",
  rewind: true,
  perPage: 8,
  padding: "0.8rem",
  perMove: 1,
  pagination: false,
  gap: "15px",
  arrows: false,
  autoplay: true,
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
    480: { perPage: 2 },
    768: { perPage: 3 },
    1024: { perPage: 5 },
    1280: { perPage: 6 },
  },
};
/* ===================== COMPONENT ===================== */
const InterestedCategoriesSection = ({
  className = "",
  isSingleIndex = false,
  isStickyBar = false,
  catId,
}: InterestedCategoriesSectionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Category[]>([]);
  const [singleCat, setSingleCat] = useState<Category | null>(null);

  /* ===================== FETCH CATEGORIES ===================== */

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const body = {
        vendor_website_id: vendorId,
        isActive: 1,
        isDeleted: 0,
        ShowAll: true,
      };
      const res = await getBlogCategories(body);
      setData(res);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  /* ===================== SINGLE CATEGORY ===================== */

  useEffect(() => {
    if (!catId) return;
    const found = data?.find((item) => Number(item.id) === Number(catId));
    setSingleCat(found ?? null);
  }, [data, catId]);

  /* ===================== RENDER ===================== */

  if (isSingleIndex) {
    return singleCat ? (
      <Link
        href={`/blog/category/${singleCat.title
          .replace(/\s+/g, "-")
          .toLowerCase()}?category_id=${singleCat.id}`}
      >
        <span className="bg-primary py-1 px-2 rounded-md text-white text-xs inline-flex">
          {singleCat.title}
        </span>
      </Link>
    ) : null;
  }

  if (isStickyBar) {
    return (
      <div className="mb-5 border p-4">
        <div className="">
          <Typography as="h3" size="lg" weight="medium" className="pb-2">
            {`Categories`}
          </Typography>
        </div>

        <ul className="list-disc ml-6">
          {loading
            ? [...Array(8)].map((_, index) => (
                <li key={index}>
                  <SkeletonInterestedCategoriessticky />
                </li>
              ))
            : data?.map((item) => (
                <li key={item.id} className="mb-2">
                  <Link
                    className="text-[#555555] font-medium hover:text-theme-primary hover:underline hover:underline-offset-2"
                    href={`/blog/category/${item.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}?category_id=${item.id}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      className={`py-10 bg-cover bg-top-right bg-no-repeat ${className}`}
    >
      <div className="container">
        <div className="max-w-5xl mx-auto mb-5">
          <Typography
            as="h2"
            size="xl"
            weight="medium"
            className="pb-2"
            align="center"
          >
            {`Categories`}
          </Typography>
        </div>

        {loading ? (
          <div className="flex justify-between">
            {[...Array(8)].map((_, index) => (
              <SkeletonInterestedCategoriesbtn key={index} />
            ))}
          </div>
        ) : data?.length ? (
          <SplideSlider options={options} data={data}>
            <InterestedCategoriesBtn />
          </SplideSlider>
        ) : (
          <NotFound />
        )}
      </div>
    </section>
  );
};

export default InterestedCategoriesSection;
