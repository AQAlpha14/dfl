import FeaturedCards, { Property } from "@/components/cards/FeaturedCards";
import SearchBar from "@/components/FormFields/SearchBar";
import Typography from "@/components/Typography";
import homeData from "@/mockData/homeData.json";
import PropertyTypeBtnSection from "@/sections/PropertyTypeBtnSection";

const ListingPage = () => {
  return (
    <>
      <div className="secPadding">
        <div className="container">
          <SearchBar />
          <div className="pt-10">
            <div className="pb-8">
              <Typography as="h2" size="lg" weight="semibold">
                Residential Properties for rent in UAE
              </Typography>
              <div className="pt-4">
                <PropertyTypeBtnSection />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="grid grid-cols-2 gap-4">
                {homeData.featuredCardsData.map(
                  (property: Property, idx: number) => (
                    <FeaturedCards data={property} key={idx} />
                  ),
                )}
              </div>
              <div className="">
                <div className="">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div key={index} className="bg-gray-500 w-96 h-16"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListingPage;
