"use client";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import AffiliateSection from "@/sections/AffiliateSection";
import FeaturedListingsSection from "@/sections/FeaturedListingsSection";
import HeroSection from "@/sections/HeroSection/HeroSection";
import AssetSection from "@/sections/AssetSection";
import { btnText, faqData } from "@/mockData/dummyData";
import SocialCommunitySection from "@/sections/SocialCommunitySection";
import FaqsSection from "@/sections/Faq/FaqsSection";

const heroData = {
  heading:
    "Find your Next home ^directly from landlords,^ no commission, no hassle",
  paragraph: [
    "Direct From Landlords Connects Reliable Tenants & Verified Landlords Across UAE",
  ],
  imageUrl: "/images/hero-property.webp",
  imageWidth: 600,
  imageHeight: 400,
  imageAlign: "items-center",
  bookFreeDemo: true,
};
export default function HomePage() {
  const { locale } = useContext(LanguageContext);
  return (
    <div className="">
      <HeroSection
        {...heroData}
        headerserach
        className="bg-[url('/images/bg_1.webp')] bg-img"
      />
      <AffiliateSection
        heading={
          locale === "ar"
            ? "خدمة تأجير السيارات الفاخرة الرائدة في دبي"
            : "Trusted By The Best!"
        }
      />
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
      <AssetSection
        bgblue={true}
        heading="List Your Property Now and Reach Out to Tenants All Across the UAE"
        paragraph={[
          "Nearly half of the UAE’s residents rely on rental properties, yet finding the right tenant isn't always easy. But with DFL, landlords are experiencing faster occupancy and higher rental value thanks to:",
        ]}
        list={[
          "Immersive 3D tours that attract serious renters",
          "Optimized, detailed listings that boost visibility ",
          "100% of Rental Income with No Agent Commissions",
          "Easy Rental Management Dashboard",
        ]}
        imageUrl="/images/image_2.webp"
        imageWidth={632}
        imageHeight={447}
        reverse={true}
        link="/"
        linkLext={btnText.list_your_property}
      />
      <FeaturedListingsSection />
      <FaqsSection data={faqData} />
      <SocialCommunitySection />
    </div>
  );
}
