import React from "react";
import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  return (
    <section className="sm:pt-20 pt-10">
      <InterestedCategoriesSection />
      <div className="container mb-6">
        <ViewAllPostCards searchParams={searchParams} lGrid={true} />
      </div>
    </section>
  );
};

export default Page;
