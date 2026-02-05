import { SEOAction } from "@/actions/seo-action";
import Image from "@/components/Image/Image";
import OtpVerification from "@/components/UserAuth/OtpVerification";
import { isIndex, nocache } from "@/constants/constants";
import React, { Suspense } from "react";

export async function generateMetadata() {
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
    h1: vMetaData?.h1 || "",
    faq: vMetaData?.faq?.mainEntity || null,
    icons: {
      icon: "/icon.jpg",
    },
  };
}

const Page = async ({ params }) => {
  const { email } = await params;
  return (
    <>
      <section className="md:pt-32 pt-20 md:pb-20 pb-6">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="md:block hidden relative">
              <Image
                src={`/images/image_121.webp`}
                width={845}
                height={1024}
                alt={`Auth Image`}
                className="object-cover"
              />
              <span className="absolute bottom-8 left-8 display2 text-white max-w-96">
                Please sign in to securely access your account.
              </span>
            </div>
            <div className="flex justify-center items-center h-full md:px-4 px-0 py-6">
              <div className="w-full max-w-lg">
                <Suspense>
                  <OtpVerification email={email} />
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
