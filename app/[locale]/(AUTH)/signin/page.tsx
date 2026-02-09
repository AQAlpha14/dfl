import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOAction } from "@/actions/seo-action";
import { isIndex } from "@/constants/constants";
import Signin from "@/components/AllForms/UserAuth/Signin";
import Typography from "@/components/Typography";

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

      <section className="h-screen bg-primaryLight ">
        <div className="flex gap-8 h-full">
          <div className="max-w-md hidden lg:block basis-1/4">
            <div className="bgimg bg-[url('/images/bg_left.webp')] h-full">
              <Typography as="h3" size="lg" weight="semibold" className="pb-2">
                Tell Us About Yourself
              </Typography>
              <Typography as="p" size="sm">
                This helps us personalize your experience
              </Typography>
            </div>
          </div>
          <div className="flex justify-center items-center w-full sm:px-6 px-0">
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
