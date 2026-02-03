"use client";
import { useEffect, useState } from "react";
import { GetBlogs } from "@/actions/blog-actions";
import { btnText } from "@/mockData/dummyData";
import { vendorId } from "@/constants/constants";
import SplideSlider from "@/sections/SplideSlider";
import type { Options } from "@splidejs/splide";
import Typography from "@/components/Typography";
import Link from "@/components/Link";
import { SkeletonBlogCard1 } from "@/components/BlogComponents/Skeleton";
import BlogCard from "@/components/BlogComponents/BlogCard";
import NotFound from "@/components/NotFound";

interface InsightsSectionProps {
  heading?: string;
  paragraph?: string[];
}
// Adjust this if you already have a Blog type
interface Blog {
  id: number;
  [key: string]: any;
}

/* ===================== COMPONENT ===================== */

const InsightsSection = ({
  heading = "Blogs & Insights: From Rental Tips to Market News — Everything You Need To Stay Informed…",
  paragraph,
}: InsightsSectionProps) => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
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
    fetchBlogs();
  }, []);

  const options: Options = {
    type: "loop",
    rewind: true,
    perPage: 3,
    padding: "0.8rem",
    perMove: 1,
    pagination: false,
    gap: "15px",
    arrows: false,
    autoplay: true,
    breakpoints: {
      640: { perPage: 1 },
    },
  };

  return (
    <section className={`secPadding bg-primaryLight`}>
      <div className="container">
        <div className="lg:mb-10 mb-4">
          <div className="flex items-center justify-between gap-6">
            <div className="max-w-sm w-full">
              {heading && (
                <Typography as="h2" size="xl" weight="semibold">
                  {heading}
                </Typography>
              )}
              {paragraph?.map((para, ind) => (
                <Typography key={ind} as="p" size="sm">
                  {para}
                </Typography>
              ))}
            </div>
            <div className="sm:flex justify-center hidden">
              <Link href="/blog" variant="primary" className="rounded-full">
                {btnText.view_all_insights}
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonBlogCard1 key={index} />
            ))}
          </div>
        ) : data.length ? (
          <SplideSlider options={options} data={data}>
            <BlogCard/>
          </SplideSlider>
        ) : (
          <NotFound />
        )}
      </div>
    </section>
  );
};

export default InsightsSection;
