import ExploreCommunitiesCard from "@/components/cards/ExploreCommunitiesCard";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText } from "@/mockData/dummyData";

interface ExploreCommunitiesCardItem {
  title?: string;
  paragraph: string;
  priceRange: string;
  rating: number;
  totalProperties: number;
  imageUrl: string;
}

interface ExploreCommunitiesSectionProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
  data?: ExploreCommunitiesCardItem[];
}

const ExploreCommunitiesSection = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
  data=[],
}: ExploreCommunitiesSectionProps) => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto space-y-2">
          {topTitle && (
            <Typography as="h3" size="md" weight="medium" align="center">
              {topTitle}
            </Typography>
          )}
          <Typography as="h2" size="xl" weight="semibold" align="center">
            {heading}
          </Typography>
          {bottomTitle && (
            <Typography as="h3" size="md" weight="medium" align="center">
              {bottomTitle}
            </Typography>
          )}

          {paragraph?.map((para: string, ind: number) => (
            <Typography key={ind} as="p" size="sm" align="center">
              {para}
            </Typography>
          ))}
        </div>
        {/* Category Cards would go here */}

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pt-4">
          {data?.map((items, i) => (
            <ExploreCommunitiesCard key={i} {...items} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/communities" icon2>
            {btnText.view_all_communities_in_dubai}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCommunitiesSection;
