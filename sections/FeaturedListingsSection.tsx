import FeaturedCards, { Property } from "@/components/cards/FeaturedCards";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText } from "@/mockData/dummyData";
import homeData from "@/mockData/homeData.json";

interface FeaturedListingsSectionProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
}

const FeaturedListingsSection = ({
  topTitle,
  heading = "Featured Listings",
  bottomTitle,
  paragraph = [],
}: FeaturedListingsSectionProps = {}) => {
  return (
    <section className="secPadding">
      <div className="container">
        <div className="">
          <div className="text-white">
            <div className="max-w-xl mx-auto space-y-2 pb-4">
              {topTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {topTitle}
                </Typography>
              )}
              <div className="flex gap-2">
                <Typography as="h2" size="xl" weight="semibold">
                  {heading}
                </Typography>
              </div>
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
            <Link href={`/`} variant="primary" icon="">
              {btnText.add_payment_method}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {homeData.featuredCardsData?.map(
              (property: Property, idx: number) => (
                <FeaturedCards key={idx} data={property} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
