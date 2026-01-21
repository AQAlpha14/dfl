"use client";

import React from "react";
import SplideSlider from "@/sections/SplideSlider/SplideSlider";
import Typography from "@/components/Typography";
import Image from "@/components/Image";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface AffiliateSectionProps {
  heading: string;
}

interface TelecomCompany {
  alt: string;
  src: string;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

const AffiliateSection: React.FC<AffiliateSectionProps> = ({ heading }) => {
  const telecomCompanies: TelecomCompany[] = [
    { alt: "Facebook", src: "/icons/frame39251.svg" },
    { alt: "Facebook", src: "/icons/frame39252.svg" },
    { alt: "Facebook", src: "/icons/frame39253.svg" },
    { alt: "Facebook", src: "/icons/frame39254.svg" },
    { alt: "Facebook", src: "/icons/frame39255.svg" },
  ];

  const options = {
    type: "loop",
    rewind: true,
    perPage: 1.5,
    padding: "0.8rem",
    perMove: 1,
    pagination: true,
    gap: "15px",
    arrows: false,
    autoplay: true,
    autoScroll: {
      speed: 1,
    },
    mediaQuery: "min",
    breakpoints: {
      360: { perPage: 2 },
      640: { perPage: 3 },
      768: { perPage: 4 },
      1024: { perPage: 5 },
    },
  } as const;

  return (
    <section className="secPadding bg-primaryLight">
      <div className="container">
        <div className="pb-4">
          <Typography as="h2" size="lg" weight="semibold" align="center">
            {heading}
          </Typography>
        </div>

        <div className="">
          <SplideSlider data={telecomCompanies} options={options}>
            <Image src="" width={210} height={100} alt="" />
          </SplideSlider>
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;
