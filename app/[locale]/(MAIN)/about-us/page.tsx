import { SEOAction } from "@/actions/seo-action";
import { BASE_URL, isIndex, nocache } from "@/constants/constants";
import AffiliateSection from "@/sections/AffiliateSection";
import HeroSection from "@/sections/HeroSection/HeroSection";
import AssetSection from "@/sections/AssetSection";
import { btnText } from "@/mockData/dummyData";

export async function generateMetadata() {
  const vMetaData = await SEOAction();
  return {
    title:
      vMetaData?.seo_title ||
      "About Buzinessify – Innovative Business Solutions for Growth",
    description:
      vMetaData?.seo_description ||
      "Learn about Buzinessify’s mission, vision, and team. We provide innovative software solutions to help businesses scale, optimize operations, and grow efficiently.",
    alternates: {
      canonical: vMetaData?.canonical_url || `${BASE_URL}/about-us`,
    },
    openGraph: vMetaData?.opengraph_data,
    twitter: vMetaData?.twitter_tag,
    robots: {
      index: isIndex,
      nocache: nocache,
    },
    h1: vMetaData?.h1 || "",
    faq: vMetaData?.faq?.mainEntity || null,
    icons: {
      icon: "/icon.jpg",
    },
  };
}
const heroData = {
  heading: "Find Residential Properties for Rent at ~Direct from Landlords",
  imageUrl: "/images/hero-property.webp",
  imageWidth: 600,
  imageHeight: 400,
  imageAlign: "items-center",
  bookFreeDemo: true,
};
export default async function Page() {
  const { h1 } = await generateMetadata();
  return (
    <>
      <HeroSection
        {...heroData}
        className="bg-[url('/images/bg_1.webp')] bg-img"
      />
      <AffiliateSection />
      <AssetSection
        bgblue={true}
        heading="Manage Your Rentals with Ease – Let Us Take Care of Everything."
        paragraph={[
          "At DirectFromLandlords, we handle all aspects of property management, so you don’t have to. From tenant screening to maintenance requests, our experienced team ensures your properties are well-managed and your rental income stays consistent.",
          "With our Rental Management service, we take care of everything for you: managing rent collection, handling property viewings, addressing maintenance needs, and securing reliable tenants. We make the process hassle-free, ensuring that you enjoy peace of mind with no unexpected issues.",
        ]}
        listTitle="Sit back and relax while we manage your properties—so you can focus on what matters most."
        list={[
          "No calls, no worries—just steady rental income and a well-maintained property.",
          "We take care of marketing, tenant screening, and all operational tasks.",
        ]}
        imageUrl="/images/image_13.webp"
        tagicon="/icons/icon_14.svg"
        imageWidth={632}
        imageHeight={447}
        btntag="Manage Your Rentals with Ease"
        link="/"
        linkLext={btnText.explore_more}
      />
    </>
  );
}
