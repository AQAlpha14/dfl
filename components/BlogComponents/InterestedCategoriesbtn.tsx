import Link from "next/link";

interface InterestedCategoriesBtnProps {
  id?: number | string;
  label?: string;
  maxChars?: number;
}

const InterestedCategoriesBtn = ({
  id,
  label,
  maxChars = 20,
}: InterestedCategoriesBtnProps) => {
  const slug = label?.replace(/\s+/g, "-").toLowerCase() || "";
  const truncatedTitle =
    label && label.length > maxChars ? `${label.slice(0, maxChars)}...` : label;
  return (
    <Link
      href={`/listing/category/${slug}?category_id=${id}`}
      className="flex justify-center items-center text-nowrap text-center px-3 py-2 bg-white runded-md text-sm border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
    >
      {truncatedTitle}
    </Link>
  );
};

export default InterestedCategoriesBtn;
