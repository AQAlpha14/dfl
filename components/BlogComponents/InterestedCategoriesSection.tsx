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
  id?: number;
  label: string;
}

interface InterestedCategoriesSectionProps {
  id?: number;
  isSingleIndex?: boolean;
  isStickyBar?: boolean;
  catId?: number;
  className?: string;
  heading?: string;
}

/* ===================== SPLIDE OPTIONS ===================== */

const options: Options = {
  type: "loop",
  rewind: true,
  perPage: 5,
  padding: "0.8rem",
  perMove: 1,
  pagination: false,
  gap: "15px",
  arrows: true,
  autoplay: true,
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
    480: { perPage: 2 },
    768: { arrows: true, perPage: 3 },
  },
};
/* ===================== COMPONENT ===================== */
const InterestedCategoriesSection = ({
  className = "",
  isSingleIndex = false,
  isStickyBar = false,
  heading = "",
  catId,
}: InterestedCategoriesSectionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Category[]>([]);
  const [singleCat, setSingleCat] = useState<Category | null>(null);

  const interestedCategories: Category[] = [
    { id: 1, label: "Villas" },
    { id: 2, label: "Houses" },
    { id: 3, label: "Apartments" },
    { id: 4, label: "Townhouses" },
    { id: 5, label: "Penthouses" },
    { id: 6, label: "Bunglows" },
    { id: 7, label: "Studio Apartments" },
  ];

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
      setData(interestedCategories);
      // setData(res);
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
        href={`/listing/category/${singleCat.label
          .replace(/\s+/g, "-")
          .toLowerCase()}?category_id=${singleCat.id}`}
      >
        <span className="bg-primary py-1 px-2 rounded-md text-white text-xs inline-flex">
          {singleCat.label}
        </span>
      </Link>
    ) : null;
  }

  if (isStickyBar) {
    return (
      <div className="mb-5 border p-4">
        <div className="">
          {heading && (
            <Typography as="h3" size="lg" weight="medium" className="pb-2">
              {heading}
            </Typography>
          )}
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
                    href={`/blog/category/${item.label
                      .replace(/\s+/g, "-")
                      .toLowerCase()}?category_id=${item.id}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    );
  }

  return (
    <section className={`${className}`}>
      <div className="">
        <div className="max-w-xl mx-auto pb-4">
          {heading && (
            <Typography as="h3" size="lg" weight="medium" className="pb-2">
              {heading}
            </Typography>
          )}
        </div>
        {loading ? (
          <div className="flex justify-between">
            {[...Array(8)].map((_, index) => (
              <SkeletonInterestedCategoriesbtn key={index} />
            ))}
          </div>
        ) : data?.length ? (
          <div className="categories lg:pl-8">
            <SplideSlider options={options} data={interestedCategories}>
              <InterestedCategoriesBtn />
            </SplideSlider>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </section>
  );
};

export default InterestedCategoriesSection;
