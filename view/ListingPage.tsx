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
              <div className="bg-gray-100 h-48 rounded-lg"></div>
              <div className="bg-gray-100 h-48 rounded-lg"></div>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListingPage;
