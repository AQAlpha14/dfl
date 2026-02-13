import { SEOAction } from "@/actions/seo-action";
import { BASE_URL, isIndex, nocache } from "@/constants/constants";
import { btnText } from "@/mockData/dummyData";
import AssetSection from "@/sections/AssetSection";
import SocialCommunitySection from "@/sections/SocialCommunitySection";
import ListingDetailPage from "@/view/ListingDetailPage";

export async function generateMetadata() {
  const vMetaData = await SEOAction();
  return {
    title:
      vMetaData?.seo_title ||
      "About DirectFromLandloard – Innovative Business Solutions for Growth",
    description:
      vMetaData?.seo_description ||
      "Learn about DirectFromLandloard’s mission, vision, and team. We provide innovative software solutions to help businesses scale, optimize operations, and grow efficiently.",
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

export default async function Page() {
  const { h1 } = await generateMetadata();
  return (
    <>
     <div className="pt-16">
       <ListingDetailPage />
      <AssetSection
        bgblue={true}
        heading="Expand Your Reach to Attract More Tenants Today!"
        paragraph={[
          "Seize this incredible opportunity to enhance your visibility, receive quicker responses, and cultivate meaningful connections with committed tenants who genuinely appreciate what you bring to the table. This is your chance to create lasting relationships that can significantly benefit your endeavors.",
        ]}
        imageUrl="/images/image_2.webp"
        imageWidth={632}
        imageHeight={447}
        link="/"
        linkLext={btnText.list_your_property}
        reverse
      />
      <SocialCommunitySection />
     </div>
    </>
  );
}
