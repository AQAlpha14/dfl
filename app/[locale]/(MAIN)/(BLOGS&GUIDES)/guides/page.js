import React, { Suspense } from "react";
import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import { SEOAction } from "@/actions/seo-action";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";
import { isIndex, nocache } from "@/constants/global";
import HeroSection from "@/sections/HeroSection";

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
        className={`!bg-primaryLight`}
        // bgimage={`md:bg-[url(/assets/images/ctabg_07.webp)] bg-[url(/assets/images/ctabg_07.webp)]`}
        heading={h1}
        video
      />
      <InterestedCategoriesSection />
      {/* <ImageWatermark variant={10} povariant={'topRight'}> */}
        <div className="container pb-8">
          <ViewAllPostCards
            // heading={`All Blogs`}
          />
        </div>
      {/* </ImageWatermark> */}
    </Suspense>
  );
};

export default page;
