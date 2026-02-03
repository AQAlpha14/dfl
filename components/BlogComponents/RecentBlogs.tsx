"use client";
import BlogCards from "./BlogCard";
import Typography from "../Typography";
import SplideSlider from "@/sections/SplideSlider";

interface BlogData {
  title: string;
  createon?: { $date: string };
  front_image?: string;
  front_image_alt?: string;
  categories_data?: { id: number }[];
  value?: string;
}

interface RecentBlogsProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
  className?: string;
  blogData: BlogData[];
}

const options = {
  type: "loop",
  rewind: true,
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
  breakpoints: {
    360: { perPage: 2 },
    640: { perPage: 3 },
    768: { perPage: 4 },
  },
};

const RecentBlogs: React.FC<RecentBlogsProps> = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
  className,
  blogData,
}) => {
  return (
    <section
      className={`secPadding bg-cover bg-top-right bg-no-repeat ${className}`}
    >
      <div className="container">
        <div className="max-w-xl mx-auto space-y-2">
          {topTitle && (
            <Typography as="h3" size="md" weight="medium">
              {topTitle}
            </Typography>
          )}
          {heading && (
            <Typography as="h2" size="xl" weight="semibold">
              {heading}
            </Typography>
          )}
          {bottomTitle && (
            <Typography as="h3" size="md" weight="medium">
              {bottomTitle}
            </Typography>
          )}
          {paragraph?.map((para, ind) => (
            <Typography key={ind} as="p" size="sm">
              {para}
            </Typography>
          ))}
        </div>
      </div>

      <div className="container mt-6">
        <SplideSlider options={options} data={blogData}>
          <BlogCards />
        </SplideSlider>
      </div>
    </section>
  );
};

export default RecentBlogs;
