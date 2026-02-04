import { SkeletonBlogDetailPage1, SkeletonPopularBlogsDetail1 } from "@/components/BlogComponents/Skeleton";
const Loading = () => {
  return (
    <div className="container grid grid-cols-12 gap-4 mt-6">
      <div className="lg:col-span-9 col-span-12 lg:pr-6 pr-0">
        <SkeletonPopularBlogsDetail1 />
      </div>
      <div className="lg:col-span-3 col-span-12 lg:mt-26 mt-0">
        <SkeletonBlogDetailPage1 />
      </div>
    </div>
  );
};

export default Loading;
