import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText, icons } from "@/mockData/dummyData";
import Image from "../Image";
import { Icon } from "@iconify/react";

interface ExploreCommunitiesCardProps {
  data: {
    imageUrl: string;
    title?: string;
    paragraph: string;
    priceRange: string;
    rating: number;
    totalProperties: number;
  };
}

const ExploreCommunitiesCard = ({ data }: ExploreCommunitiesCardProps) => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-80 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        {/* Image */}
        <div className="relative aspect-4/3 w-full">
          <Image
            src={data?.imageUrl}
            alt={data?.title}
            fill
            className="object-cover"
          />
          {/* Rating */}
          {data?.rating && (
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
              <Icon
                icon={icons.starFilled}
                className="text-yellow-500"
                width={20}
                height={20}
              />
              {data?.rating}
            </div>
          )}
          {/* Properties Count */}
          <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow">
            🏠 <span>{data?.totalProperties} properties</span>
          </div>
        </div>
        {/* Content */}
        <div className="p-4 space-y-2">
          <Typography as="h3" size="md" weight="medium">
            {data?.title}
          </Typography>
          <Typography as="p" size="sm" className="line-clamp-2">
            {data?.paragraph}
          </Typography>
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-600">{data?.priceRange}</span>
            <Link
              href="/communities"
              icon2
              className="px-3! text-sm! rounded-full!"
            >
              {btnText.view}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCommunitiesCard;
