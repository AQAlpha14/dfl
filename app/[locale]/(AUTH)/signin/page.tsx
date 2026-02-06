import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOAction } from "@/actions/seo-action";
import Image from "@/components/Image";
import { isIndex } from "@/constants/constants";
import Signin from "@/components/AllForms/UserAuth/Signin";

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
  const vMetaData = await SEOAction();

  return (
    <>
      {/* SEO H1 (for crawlers, not UI) */}
      {vMetaData?.h1 && <h1 className="sr-only">{vMetaData.h1}</h1>}

      {/* FAQ Schema */}
      {vMetaData?.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(vMetaData.faq),
          }}
        />
      )}

      <section className="secPadding bgimg">
        <div className="">
          <div className="flex justify-center items-center">
            <div className="max-w-sm w-full">
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
