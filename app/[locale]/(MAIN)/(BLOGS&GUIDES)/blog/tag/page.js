import React from "react";
import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";

const page = ({ searchParams }) => {
  return (
    <>
      <section className="sm:pt-20 pt-10">
        <InterestedCategoriesSection />
        <div className="container">
          <div className="mb-6">
            <ViewAllPostCards searchParams={searchParams} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
