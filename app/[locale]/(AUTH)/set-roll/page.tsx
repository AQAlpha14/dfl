import { SEOAction } from "@/actions/seo-action";
import { isIndex, nocache } from "@/constants/constants";
import { Suspense } from "react";
import type { Metadata } from "next";
import RoleSelection from "@/components/AllForms/UserAuth/RoleSelection";
import AuthLayout from "@/components/AllForms/UserAuth/AuthLayout";

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

const Page: React.FC = () => {
  return (
    <>
      <AuthLayout>
        <Suspense>
          <RoleSelection />
        </Suspense>
      </AuthLayout>
    </>
  );
};

export default Page;
