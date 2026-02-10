import FeaturedCards from "@/components/cards/FeaturedCards";
import SearchBar from "@/components/FormFields/SearchBar";
import Typography from "@/components/Typography";

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
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <div className="col-span-2">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div key={index} className="bg-gray-300 w-96 h-16"></div>
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
