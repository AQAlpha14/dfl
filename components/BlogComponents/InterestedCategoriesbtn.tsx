import Link from "next/link";

interface InterestedCategoriesBtnProps {
  id?: number | string;
  title?: string;
  maxChars?: number;
}

const InterestedCategoriesBtn = ({
  id,
  title,
  maxChars = 20,
}: InterestedCategoriesBtnProps) => {
  const slug = title?.replace(/\s+/g, "-").toLowerCase() || "";

  const truncatedTitle =
    title && title.length > maxChars ? `${title.slice(0, maxChars)}...` : title;

  return (
    <Link
      href={`/blog/category/${slug}?category_id=${id}`}
      className="flex justify-center items-center text-nowrap text-center px-3 py-2 bg-primaryLight rounded-full"
    >
      {truncatedTitle}
    </Link>
  );
};

export default InterestedCategoriesBtn;
