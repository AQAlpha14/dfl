import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOAction } from "@/actions/seo-action";
import { isIndex } from "@/constants/constants";
import Signin from "@/components/AllForms/UserAuth/Signin";
import AuthLayout from "@/components/AllForms/UserAuth/AuthLayout";

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata(): Promise<Metadata> {
  const vMetaData = await SEOAction();

  return {
    title: vMetaData?.seo_title ?? "",
    description: vMetaData?.seo_description ?? "",
    alternates: {
      canonical: vMetaData?.canonical_url ?? "",
    },
    openGraph: vMetaData?.opengraph_data,
    twitter: vMetaData?.twitter_tag,
    robots: {
      index: isIndex,
      follow: true,
    },
    icons: {
      icon: "/icon.jpg",
    },
  };
}

/* =========================
   PAGE
========================= */
const Page: React.FC = async () => {
  return (
    <>
      <AuthLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Signin />
        </Suspense>
      </AuthLayout>
    </>
  );
};

export default Page;
