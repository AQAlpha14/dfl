import { SEOAction } from "@/actions/seo-action";
import { BASE_URL, isIndex, nocache } from "@/constants/constants";
import HeroSection2 from "@/sections/HeroSection/HeroSection2";
import homeData from "@/mockData/homeData.json";
import OurValuesSection from "@/sections/OurValuesSection";
import SocialCommunitySection from "@/sections/SocialCommunitySection";

export async function generateMetadata() {
  const vMetaData = await SEOAction();
  return {
    title:
      vMetaData?.seo_title ||
      "Contact Buzinessify – Get in Touch for Solutions & Support",
    description:
      vMetaData?.seo_description ||
      "Reach out to Buzinessify for inquiries, support, or collaboration. Our team is ready to assist you with solutions tailored to your business needs.",
    alternates: {
      canonical: vMetaData?.canonical_url || `${BASE_URL}/contact-us`,
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
      <HeroSection2
        icon={`/icons/icon_73.svg`}
        lastUpdate={`Trusted by 10,000+ Businesses Worldwide`}
        heading={h1 || "Contact Us"}
        paragraph={[
          "When your business is ready to grow, we make the next step effortless. At Buzinessify, every conversation starts with understanding your challenges and offering the right mix of tools and services to drive real results.",
          "Whether you’re exploring our digital products, need support with marketing, or want end-to-end growth management, our team is here to guide you with clarity and speed.",
        ]}
        inquiryForm
      />
      <OurValuesSection
        heading={`Get in Touch With Us`}
        paragraph={[
          "With DFL, renting a property in the UAE is simple and straightforward. Landlords list their properties, tenants find the right match, agreements are finalized, and both sides win without paying a dime to the agent.",
        ]}
        data={homeData.ourValuesData2}
        headingC
        cardbg
        lgGrid
        sideIcon
      />
      <SocialCommunitySection />
    </>
  );
}
