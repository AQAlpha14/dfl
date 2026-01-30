"use client";
import React, { useEffect, useState } from "react";
import InterestedCategoriesSection from "./InterestedCategoriesSection";
import Heading4 from "./Typography/Heading4";
import ContactForm from "./ContactForm";
import SubscribeSection from "./SubscribeSection";

const BlogStickyBar = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 0;
      if (offset > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    setLoading(false);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="lg:h-full">
      <div
        className={`lg:pt-0 pt-16 ${isSticky ? "lg:sticky top-20 z-10" : ""}`}
      >
        <div className="pt-4">
          <div className="space-y-4">
            <div className="">
              <Heading4
                blackHeading={`Inquire the best deals`}
                className={`pb-4`}
              />
              <ContactForm
                txtLeft={true}
                className={`display3 !w-full`}
                gridCol={`!grid-cols-1`}
                padding={`py-3 !mx-0 !px-0`}
              />
            </div>
            <SubscribeSection />
            <div>
              <InterestedCategoriesSection isStickyBar={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogStickyBar;
