"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogStickyBar from "@/components/BlogComponents/BlogStickyBar";
import BlogsDetail from "@/components/BlogComponents/BlogsDetail";
import RelatedPosts from "./RelatedPosts";
import InsightsSection from "@/sections/InsightsSection";
import { SkeletonPopularBlogsDetail1 } from "./Skeleton";
import { getBlogDetail } from "@/actions/blog-actions";

interface BlogData {
  id?: number;
  title?: string;
  slug?: string;
  // extend as needed
}

const BlogDetailSection = () => {
  const [data, setData] = useState<BlogData[]>([]);
  const [nextPrev, setNextPrev] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const slug =
    typeof params?.slug === "string" ? params.slug : params?.slug?.[0];

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlogDetail(0, slug);
        setData(res?.data || []);
        setNextPrev(res?.others_blogs || []);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  return (
    <section>
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-9 col-span-12 lg:pr-6">
          {loading ? (
            <div className="mt-4">
              <SkeletonPopularBlogsDetail1 />
            </div>
          ) : (
            <>
              <BlogsDetail
                data={data}
                nextPrev={nextPrev}
              />
              <RelatedPosts heading="Related Posts" />
            </>
          )}
        </div>

        <div className="lg:col-span-3 col-span-12 my-6">
          <BlogStickyBar data={data} />
        </div>
      </div>

      <InsightsSection />
    </section>
  );
};

export default BlogDetailSection;
