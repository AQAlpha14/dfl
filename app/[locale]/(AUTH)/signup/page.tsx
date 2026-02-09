import { SEOAction } from "@/actions/seo-action";
import { isIndex, nocache } from "@/constants/constants";
import { Suspense } from "react";
import type { Metadata } from "next";
import Signup from "@/components/AllForms/UserAuth/Signup";
import RoleSelection from "@/components/AllForms/UserAuth/RoleSelection";

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
      <section className="md:pt-32 pt-20 md:pb-20 pb-6">
        <div className="container">
          <div className="">
            <div className="flex justify-center items-center h-full md:px-4 px-0 py-6">
              <div className="w-full max-w-sm">
                <Suspense fallback={<div>Loading...</div>}>
                  <Signup />
                  <RoleSelection />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
