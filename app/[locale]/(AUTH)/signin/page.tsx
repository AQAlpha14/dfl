import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOAction } from "@/actions/seo-action";
import { isIndex } from "@/constants/constants";
import Signin from "@/components/AllForms/UserAuth/Signin";
import LeftSideBar from "@/components/LeftSideBar";

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
      <section className="h-screen bg-primaryLight bg-[url('/icons/wm_03.svg')] bg-no-repeat bg-top-right">
        <div className="flex gap-8 h-full">
          <LeftSideBar />
          <div className="flex justify-center items-center w-full sm:px-6 px-4">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
              <Suspense fallback={<div>Loading...</div>}>
                <Signin />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
