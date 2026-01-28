"use client";

import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Typography from "@/components/Typography";
import NotFound from "@/components/NotFound";
import ExpertAgentsCards from "@/components/cards/ExpertAgentsCards";

/* ============================
   TYPES
============================ */

interface TeamMember {
  imageURL: string;
  userName: string;
  role: string;
}

interface OurTeamSectionProps {
  heading?: string;
  paragraph?: string;
}

/* ============================
   DATA
============================ */

const data: TeamMember[] = [
  {
    imageURL: "/images/image_14.webp",
    userName: "Samantha Hayes",
    role: "Senior Property Consultant",
  },
  {
    imageURL: "/images/image_19.webp",
    userName: "James Harber",
    role: "Senior Property Consultant",
  },
  {
    imageURL: "/images/image_24.webp",
    userName: "Elon Victor",
    role: "Senior Property Consultant",
  },
];

/* ============================
   SPLIDE OPTIONS
============================ */

const options = {
  type: "loop",
  rewind: true,
  perPage: 1,
  perMove: 1,
  gap: "15px",
  padding: "0.8rem",
  pagination: false,
  arrows: false,
  autoplay: true,
  mediaQuery: "min",
  breakpoints: {
    640: { perPage: 2 },
    768: { perPage: 3 },
  },
} as const;

/* ============================
   COMPONENT
============================ */

const OurTeamSection: React.FC<OurTeamSectionProps> = ({
  heading,
  paragraph,
}) => {
  return (
    <section className="secPadding">
      <div className="container">
        <div className="max-w-sm w-full space-y-2">
          <Typography as="h2" size="xl" weight="semibold">
            {heading || "Meet Our Team"}
          </Typography>
          <Typography as="p" size="sm">
            {paragraph ||
              "Our dedicated team works tirelessly to build trust, simplify the renting process, and deliver better results for both landlords and tenants."}
          </Typography>
        </div>

        <Splide options={options} hasTrack={false}>
          <SplideTrack className="pt-8 px-0">
            {data.length ? (
              data.map((item, index) => (
                <SplideSlide key={index}>
                  <ExpertAgentsCards {...item} />
                </SplideSlide>
              ))
            ) : (
              <div className="w-full">
                <NotFound />
              </div>
            )}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
};

export default OurTeamSection;
