import Image from "next/image";
import Link from "next/link";
import TruncateText from "./TruncateText";
import Typography from "../Typography";
import { btnText } from "@/mockData/dummyData";

interface Category {
  id?: string | number;
  title?: string;
}

interface BlogCardListingProps {
  thumbnail_image?: string;
  title?: string;
  createon?: { $date?: string };
  description?: string;
  slug?: string;
  categories_data?: Category[];
}

export const BlogCardListing: React.FC<BlogCardListingProps> = ({
  thumbnail_image,
  title,
  createon,
  description,
  slug,
  categories_data,
}) => {
  const createdDate = createon?.$date
    ? new Date(createon.$date).toDateString()
    : "Unknown Date";
  const category = categories_data?.[0];

  return (
    <div className="h-auto shadow-md rounded-xl overflow-hidden flex gap-2">
      {/* Image Section */}
      <div className="relative basis-1/3 min-w-32 sm:min-w-48 pt-[30%] overflow-hidden">
        <Link href={`/blog/${slug}`}>
          <Image
            src={thumbnail_image || "/placeholder.png"}
            alt={title || "Blog Image"}
            fill
            className="absolute object-cover w-full h-full top-0 left-0"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="px-2 pb-6 basis-2/3 flex flex-col">
        {/* Category */}
        {category && (
          <Link
            href={`/blog/category/${category.title
              ?.replace(/\s+/g, "-")
              .toLowerCase()}?category_id=${category.id}`}
          >
            <p className="inline-block text-sm px-3 py-1 text-white bg-primary rounded-full mb-2">
              <TruncateText wordLimit={3}>{category.title}</TruncateText>
            </p>
          </Link>
        )}

        {/* Date */}
        <Typography as="p" size="sm" className="text-xs mb-1">
          {createdDate}
        </Typography>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <Typography as="h2" size="lg" className="line-clamp-1 mb-1">
            {title}
          </Typography>
        </Link>

        {/* Description */}
        {description && (
          <Typography as="p" size="sm" className="line-clamp-1">
            {description}
          </Typography>
        )}

        {/* Read More Button */}
        <div className="mt-auto">
          <Link
            href={`/blog/${slug}`}
            className="text-primary text-sm border border-primary px-2 py-1 rounded-full hover:bg-primary hover:text-white transition"
          >
            {btnText.read_more}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCardListing;
