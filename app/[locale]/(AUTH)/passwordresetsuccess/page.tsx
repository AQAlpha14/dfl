import { SEOAction } from "@/actions/seo-action";
import { isIndex, nocache } from "@/constants/constants";
import type { Metadata } from "next";
import ResetSuccess from "@/components/AllForms/UserAuth/ResetSuccess";
import AuthLayout from "@/components/AllForms/UserAuth/AuthLayout";
import { Suspense } from "react";

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

interface PageProps {
  params: Promise<{ email: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { email } = await params;
  return (
    <>
      <div className="">
        <AuthLayout>
          <Suspense>
            <ResetSuccess />
          </Suspense>
        </AuthLayout>
      </div>
    </>
  );
};

export default Page;
