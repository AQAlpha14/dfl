import { SEOAction } from "@/actions/seo-action";
import ResetSuccess from "@/components/AllForms/UserAuth/ResetSuccess";
import { isIndex, nocache } from "@/constants/constants";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
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
    icons: {
      icon: "/icon.jpg",
    },
  } as Metadata;
}

const Page: React.FC = async () => {
  return (
    <div>
      <ResetSuccess />
    </div>
  );
};

export default Page;
