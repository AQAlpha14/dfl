import { btnText, faqData } from "@/mockData/dummyData";
import AssetSection from "@/sections/AssetSection";
import FaqsSection from "@/sections/Faq/FaqsSection";
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
      <AssetSection
        heading="Expand Your Reach to Attract More Tenants Today!"
        paragraph={[
          "Seize this incredible opportunity to enhance your visibility, receive quicker responses, and cultivate meaningful connections with committed tenants who genuinely appreciate what you bring to the table. This is your chance to create lasting relationships that can significantly benefit your endeavors.",
        ]}
        imageUrl="/images/image_2.webp"
        imageWidth={632}
        imageHeight={447}
        link="/"
        reverse
        linkLext={btnText.list_your_property}
      />
      <FaqsSection data={faqData} />
    </>
  );
};
export default Page;
