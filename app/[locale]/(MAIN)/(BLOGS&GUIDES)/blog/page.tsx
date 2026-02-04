import { Suspense } from "react";
import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import { SEOAction } from "@/actions/seo-action";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";
import { isIndex, nocache } from "@/constants/constants";
import HeroSection from "@/sections/HeroSection/HeroSection";

export async function generateMetadata() {
  const vMetaData = await SEOAction();
  return {
    title: vMetaData?.seo_title || "",
    description: vMetaData?.seo_description || "",
    alternates: {
      canonical: vMetaData?.canonical_url || "",
    },
    openGraph: vMetaData?.opengraph_data,
    twitter: vMetaData?.twitter_tag,
    robots: {
      index: isIndex,
      nocache: nocache,
    },
    h1: vMetaData?.h1,
    icons: {
      icon: "/icon.jpg",
    },
  };
}

const page = async () => {
  const { h1 } = await generateMetadata();
  return (
    <Suspense>
      <HeroSection
        heading={`"Find your Next home ^directly from landlords,^ no commission, no hassle"`}
        paragraph={[
          "Direct From Landlords Connects Reliable Tenants & Verified Landlords Across UAE"
        ]}
        className="bg-[url('/images/bg_1.webp')] bg-img"
      />
      <InterestedCategoriesSection />
      <div className="container pb-8">
        <ViewAllPostCards />
      </div>
    </Suspense>
  );
};

export default page;
