import { SEOAction } from "@/actions/seo-action";
import { BASE_URL, isIndex, nocache } from "@/constants/constants";
import ListingPage from "@/view/ListingDetail";

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
      <ListingPage />
    </>
  );
}
