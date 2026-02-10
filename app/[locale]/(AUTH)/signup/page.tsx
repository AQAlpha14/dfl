import { SEOAction } from "@/actions/seo-action";
import { isIndex, nocache } from "@/constants/constants";
import { Suspense } from "react";
import type { Metadata } from "next";
import Signup from "@/components/AllForms/UserAuth/Signup";
import RoleSelection from "@/components/AllForms/UserAuth/RoleSelection";
import LeftSideBar from "@/components/LeftSideBar";

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
      <section className="h-screen bg-primaryLight bg-[url('/icons/wm_03.svg')] bg-no-repeat bg-top-right">
        <div className="flex gap-8">
          <LeftSideBar />
          <div className="flex justify-center items-center w-full sm:px-6 px-4">
            <div className="max-w-sm w-full">
               <Suspense>
                  <Signup />
                  {/* <RoleSelection /> */}
                </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
