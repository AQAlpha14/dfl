import { Suspense } from "react";
import Loading from "./loading";
import BlogDetailSection from "@/components/BlogComponents/BlogDetailSection";
import NotFound from "@/components/NotFound";
import { BASE_URL, isIndex, nocache } from "@/constants/constants";
import { getBlogDetail } from "@/actions/blog-actions";

type PageProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params }: PageProps) {
  const {slug} =  params;
  const vMetaData = await getBlogDetail(0, slug);
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
      site: 'directfromlandloard.com',
      url: vMetaData.data[0]?.seo_url || "",
      description: vMetaData.data[0]?.seo_description || "",
      type: "website",
      image: vMetaData.data[0]?.seo_url || "",
    },
    twitter: {
      card: " summary_large_image",
      site: " @directfromlandloard",
      title: vMetaData.data[0]?.title || "",
      description: vMetaData.data[0]?.seo_description || "",
      images: [`${BASE_URL}/icons/dfl_logo2.svg`],
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

const page = async ({ params }: PageProps) => {
  const {slug} = await params;
  const res = await getBlogDetail(0, slug);
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
