import React from "react";
import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";

const page = ({ searchParams }) => {
  return (
    <div>
      <section className="sm:pt-20 pt-10">
        <InterestedCategoriesSection />
        <div className="container">
          <div className="mb-6">
            <ViewAllPostCards searchParams={searchParams} lGrid={true} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
