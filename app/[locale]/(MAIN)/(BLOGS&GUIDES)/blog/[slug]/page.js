import React, { Suspense } from "react";
import Loading from "./loading";
import { getBlogDetail } from "@/actions/blog-actions";
import BlogDetailSection from "@/components/BlogComponents/BlogDetailSection";
import { BASE_URL, isIndex, nocache, siteName, vendorId } from "@/constants/global";
import NotFound from "@/app/not-found";

export async function generateMetadata({ params }) {
  const {slug} = await params;
  const vMetaData = await getBlogDetail(0, vendorId, slug);
 // If no data, return default metadata or throw 404
  if (!vMetaData?.data?.length) {
    return <NotFound />
  }

  return {
    title: vMetaData.data[0]?.seo_title || "",
    description: vMetaData.data[0]?.seo_description || "",
    keywords: vMetaData.data[0]?.seo_keywords || "",
    alternates: {
      canonical: vMetaData.data[0]?.seo_canonical || "",
    },
    openGraph: {
      title: vMetaData.data[0]?.seo_title || "",
      site: siteName,
      url: vMetaData.data[0]?.seo_url || "",
      description: vMetaData.data[0]?.seo_description || "",
      type: "website",
      image: vMetaData.data[0]?.seo_url || "",
    },
    twitter: {
      card: " summary_large_image",
      site: " @directfromlanloard",
      title: vMetaData.data[0]?.title || "",
      description: vMetaData.data[0]?.seo_description || "",
      images: [`${BASE_URL}/assets/images/logo.png`],
    },
    robots: {
      index: isIndex,
      nocache: nocache,
    },
    icons: {
      icon: "/icon.jpg",
    },
  };
}

const page = async ({ params }) => {
  const {slug} = await params;
  const res = await getBlogDetail(0, vendorId, slug);
  if (!res?.data?.length) {
    return <NotFound />
  }
  return (
    <Suspense fallback={<Loading />}>
      <section className="sm:pt-24 pt-18">
        <div className="container">
          <BlogDetailSection
            slug={slug}
            data={res?.data}
            nextPrev={res?.others_blogs}
          />
        </div>
      </section>
    </Suspense>
  );
};

export default page;
