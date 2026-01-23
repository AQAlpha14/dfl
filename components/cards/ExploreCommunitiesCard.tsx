import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText } from "@/mockData/dummyData";
import Image from "../Image";

interface ExploreCommunitiesCardProps {
  key: number;
  title?: string;
  paragraph: string;
  priceRange: string;
  rating: number;
  totalProperties: number;
  imageUrl: string;
}

const ExploreCommunitiesCard = ({
  title,
  paragraph,
  priceRange,
  rating,
  totalProperties,
  imageUrl,
}: ExploreCommunitiesCardProps) => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-80 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        {/* Image */}
        <div className="relative aspect-4/3 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
          {/* Rating */}
          {rating && (
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow">
              ⭐ {rating}
            </div>
          )}
          {/* Properties Count */}
          <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow">
            🏠 <span>{totalProperties} properties</span>
          </div>
        </div>
        {/* Content */}
        <div className="p-4">
          <Typography as="h3" size="md" weight="medium" align="center">
            {title}
          </Typography>
          <Typography as="p" size="sm" align="center">
            {paragraph}
          </Typography>
          <div className="flex items-center justify-between mt-4">
            <span className="text-blue-600 font-semibold">{priceRange}</span>
            <Link href="/communities" icon2>
              {btnText.view}
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto space-y-2"></div>
        {/* Category Cards would go here */}
        <div className="mt-8 flex justify-center">
          <Link href="/communities" icon2>
            {btnText.view_all_communities_in_dubai}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCommunitiesCard;
