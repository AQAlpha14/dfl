import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import { SEOAction } from "@/actions/seo-action";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";
import { isIndex, nocache } from "@/constants/constants";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

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
    icons: {
      icon: "/icon.jpg",
    },
  };
}

const ViewAllPost = ({ searchParams }: PageProps) => {
  return (
    <section className="sm:pt-20 pt-10">
      <InterestedCategoriesSection />
      <div className="container">
        <ViewAllPostCards searchParams={searchParams} lGrid={true} />
      </div>
    </section>
  );
};

export default ViewAllPost;
