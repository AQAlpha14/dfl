import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText } from "@/mockData/dummyData";

interface ExploreCommunitiesSectionProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
}

const ExploreCommunitiesSection = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
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
