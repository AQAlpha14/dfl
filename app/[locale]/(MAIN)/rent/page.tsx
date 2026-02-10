import HeroSection from "@/sections/HeroSection/HeroSection";
import ListingPage from "@/view/ListingPage";

const Page = () => {
  return (
    <>
      <HeroSection
        heading="Find Residential Properties for Rent at ~Direct from Landlords"
        className="bg-[url('/images/bg_1.webp')] bg-img"
      />
      <ListingPage />
    </>
  );
};
export default Page;
