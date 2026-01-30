"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";
import CommonModal from "../Modal/CommonModal";

interface GetInTouchProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const GetInTouch = ({ isModalOpen, toggleModal }: GetInTouchProps) => {
  return (
    <CommonModal open={isModalOpen}>
      <div className="lg:grid lg:grid-cols-2">
        {/* Left image */}
        <div className="hidden lg:flex lg:items-center">
          <Image
            src="/assets/images/message-popup.webp"
            alt="A girl looking at cell phone"
            width={596}
            height={739}
            className="object-cover"
            priority
          />
        </div>

        {/* Right content */}
        <div className="p-4 lg:py-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Heading2
                blackHeading="Let’s Connect"
                className="text-start mb-0"
              />
              <Paragraph
                blackText1="Request A Call At Your Convenience"
                className="text-start"
              />
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={toggleModal}
              aria-label="Close modal"
              className="cursor-pointer focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="m14 14l20 20m-20 0l20-20"
                />
              </svg>
            </button>
          </div>

          <ContactForm />
        </div>
      </div>
    </CommonModal>
  );
};

export default GetInTouch;
