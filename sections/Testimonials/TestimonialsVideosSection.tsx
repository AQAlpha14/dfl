"use client";

import Typography from "@/components/Typography";
import React, { useState } from "react";
import SplideSlider from "../SplideSlider";
import VideoSection from "./VideoSection";
import VideoModal from "./VideoModal";

/* ===================== DATA ===================== */

interface VideoItem {
  thumbnail: string;
  videoUrl: string;
}

const videosData: VideoItem[] = [
  {
    thumbnail: "/images/video_1.webp",
    videoUrl: "/images/video_1.mov",
  },
  {
    thumbnail: "/images/video_2.webp",
    videoUrl: "/images/video_1.mov",
  },
  {
    thumbnail: "/images/video_3.webp",
    videoUrl: "/images/video_1.mov",
  },
];

/* ===================== PROPS ===================== */

interface TestimonialsVideosSectionProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
}

/* ===================== COMPONENT ===================== */

const TestimonialsVideosSection: React.FC<TestimonialsVideosSectionProps> = ({
  topTitle,
  heading = "Hear From Our Trusted Customers",
  bottomTitle,
  paragraph = [
    "Hear the genuine experiences of people across the UAE who chose DirectFromLandlord for a risk-free, commission-free, and smart rental journey.",
  ],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const openModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentVideo(null);
  };

  return (
    <section className="secPadding">
      <div className="container">
        {/* ================= HEADING ================= */}
        <div className="max-w-xl mx-auto space-y-2 text-center">
          {topTitle && (
            <Typography as="h3" size="md" weight="medium">
              {topTitle}
            </Typography>
          )}

          <Typography as="h2" size="xl" weight="semibold">
            {heading}
          </Typography>

          {bottomTitle && (
            <Typography as="h3" size="md" weight="medium">
              {bottomTitle}
            </Typography>
          )}

          {paragraph.map((para, index) => (
            <Typography key={index} as="p" size="sm">
              {para}
            </Typography>
          ))}
        </div>

        {/* ================= SLIDER ================= */}
        <div className="mt-8">
          <SplideSlider<VideoItem>
            data={videosData}
            options={{
              type: "loop",
              focus: "center",
              perPage: 3,
              gap: "15px",
              arrows: false,
              pagination: false,
              autoplay: true,
              autoScroll: { speed: 0.5 },
              breakpoints: {
                480: { perPage: 2 },
                768: { perPage: 3 },
              },
            }}
          >
            <VideoSection openModal={openModal} />
          </SplideSlider>
        </div>

        {/* ================= MODAL ================= */}
        {showModal && currentVideo && (
          <VideoModal videoUrl={currentVideo} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default TestimonialsVideosSection;
