import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOAction } from "@/actions/seo-action";
import { isIndex } from "@/constants/constants";
import Signin from "@/components/AllForms/UserAuth/Signin";
import Typography from "@/components/Typography";
import Image from "@/components/Image";
import { contactDetail } from "@/mockData/dummyData";
import Link from "next/link";

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
  const listings = [
    {
      title: "Access your property listings",
    },
    {
      title: "Manage tenant communications",
    },
    {
      title: "Track income & expenses",
    },
    {
      title: "View analytics & insights",
    },
  ];

  return (
    <>
      <section className="h-screen bg-primaryLight bg-[url('/icons/wm_03.svg')] bg-no-repeat bg-top-right">
        <div className="flex gap-8 h-full">
          <div className="max-w-md hidden lg:block basis-1/4">
            <div className="bgimg bg-[url('/images/bg_left.webp')] h-full px-6 py-10">
              <div className="">
                <div className="">
                  <Image
                    src="/icons/dfl_logo1.svg"
                    alt="Logo"
                    width={150}
                    height={50}
                    className="pb-8"
                  />
                  <Typography
                    as="h3"
                    size="lg"
                    weight="semibold"
                    color="white"
                    className="pb-2"
                  >
                    {`Welcome back!`}
                  </Typography>
                  <Typography as="p" size="sm" color="white">
                    {`Sign in to access your account and manage your properties`}
                  </Typography>
                </div>
              </div>
              <div className="pt-6">
                {listings.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-4">
                    <div className="py-3 bg-white/5 border border-white/50 rounded-lg px-4 w-full">
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/icons/icon_73.svg"}
                          alt={item.title}
                          width={40}
                          height={40}
                        />
                        <Typography
                          as="h4"
                          size="xs"
                          weight="medium"
                          color="white"
                          className="text-[14px]"
                        >
                          {item.title}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-20">
                <div className="px-4 bg-white/5 border-y border-white/50 rounded-2xl ">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="py-3 w-full">
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/icons/icon_70.svg"}
                          alt={"icon"}
                          width={40}
                          height={40}
                        />
                        <Typography
                          as="h4"
                          size="xs"
                          weight="medium"
                          color="white"
                          className="text-[14px]"
                        >
                          {`Need assistance?`}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="py-3 bg-white/5 border border-white/50 rounded-lg px-4 w-full">
                      <Link href={`mailto:${contactDetail.email}`}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/icons/icon_70.svg"}
                            alt={"icon"}
                            width={40}
                            height={40}
                          />
                          <div>
                            <Typography
                              as="p"
                              size="xs"
                              color="white"
                              className="text-[14px]"
                            >
                              {`Email us`}
                            </Typography>
                            <Typography
                              as="h4"
                              size="xs"
                              weight="medium"
                              color="white"
                              className="text-[14px]"
                            >
                              {contactDetail.email}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="py-3 bg-white/5 border border-white/50 rounded-lg px-4 w-full">
                      <Link href={`tel:${contactDetail.telNo}`}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/icons/icon_70.svg"}
                            alt={"icon"}
                            width={40}
                            height={40}
                          />
                          <div>
                            <Typography
                              as="p"
                              size="xs"
                              color="white"
                              className="text-[14px]"
                            >
                              {`Call us`}
                            </Typography>
                            <Typography
                              as="h4"
                              size="xs"
                              weight="medium"
                              color="white"
                              className="text-[14px]"
                            >
                              {contactDetail.telNo}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
