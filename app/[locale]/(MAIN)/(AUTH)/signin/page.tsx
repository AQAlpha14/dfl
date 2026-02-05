import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOAction } from "@/actions/seo-action";
import Image from "@/components/Image";
import Signin from "@/components/UserAuth/Signin";
import { isIndex } from "@/constants/constants";

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
const Page = async () => {
  const vMetaData = await SEOAction();

  return (
    <>
      {/* SEO H1 (for crawlers, not UI) */}
      {vMetaData?.h1 && (
        <h1 className="sr-only">{vMetaData.h1}</h1>
      )}

      {/* FAQ Schema */}
      {vMetaData?.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(vMetaData.faq),
          }}
        />
      )}

      <section className="md:pt-32 pt-20 md:pb-20 pb-6">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            
            {/* LEFT IMAGE */}
            <div className="md:block hidden relative">
              <Image
                src="/images/image_19.webp"
                width={845}
                height={1024}
                alt="Authentication image"
                className="object-cover w-full h-full"
              />
              <span className="absolute bottom-8 left-8 display2 text-white max-w-96">
                Please sign in to securely access your account.
              </span>
            </div>

            {/* RIGHT FORM */}
            <div className="flex justify-center items-center h-full md:px-4 px-0 py-6">
              <div className="w-full max-w-lg">
                <Suspense fallback={<div>Loading...</div>}>
                  <Signin />
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
