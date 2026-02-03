"use client";

import { useEffect, useState } from "react";
import InterestedCategoriesSection from "./InterestedCategoriesSection";
import ContactForm from "./ContactForm";
import SubscribeSection from "./SubscribeSection";
import Typography from "../Typography";
import CommonModal from "../Modal/CommonModal";
import { btnText } from "@/mockData/dummyData";

interface BlogStickyBarProps {
  className?: string;
  blogCategories?: string;
  data?: any;
  faq?: string;

}


const BlogStickyBar: React.FC<BlogStickyBarProps>= () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 100; // sticky triggers after 100px scroll
      setIsSticky(offset > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="lg:h-full">
      {/* Sticky wrapper */}
      <div
        className={`lg:pt-0 pt-16 ${isSticky ? "lg:sticky top-20 z-10" : ""}`}
      >
        <div className="pt-4 space-y-4">
          {/* Contact Form Section */}
          <div>
            <Typography as="p" size="md" className="text-xs mb-1">
              Inquire the best deals
            </Typography>

            <ContactForm
              txtLeft={true}
              className="display3 w-full!"
              padding="py-3 !mx-0 !px-0"
            />

            {/* Optional: trigger modal */}
            <button
              onClick={toggleModal}
              className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              {btnText.submit}
            </button>
          </div>

          {/* Subscribe Section */}
          <SubscribeSection />

          {/* Interested Categories Section */}
          <InterestedCategoriesSection isStickyBar={true} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CommonModal isOpen={isModalOpen} onClose={toggleModal}>
          <ContactForm txtLeft={true} className="w-full" padding="py-3" />
        </CommonModal>
      )}
    </div>
  );
};

export default BlogStickyBar;
