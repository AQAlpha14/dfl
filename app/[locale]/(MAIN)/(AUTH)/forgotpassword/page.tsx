import { SEOAction } from "@/actions/seo-action";
import ForgotPassword from "@/components/AllForms/UserAuth/ForgotPassword";
import Image from "@/components/Image";
import { isIndex, nocache } from "@/constants/constants";
import { Suspense } from "react";
import type { Metadata } from "next";

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
            <div className="flex justify-center items-center h-full md:px-4 px-1 py-6">
              <div className="w-full max-w-lg">
                <Suspense>
                  <ForgotPassword />
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
