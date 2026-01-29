"use client";

import Typography from "@/components/Typography";
import React, { useState } from "react";
import { PlaySVG } from "@/public/icons/SVGIcons";
import SplideSlider from "./SplideSlider";

const videosData = [
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

const options = {
  type: "loop",
  rewind: true,
  focus: "center",
  omitEnd: true,
  perPage: 1,
  padding: "0.8rem",
  perMove: 1,
  pagination: false,
  gap: "15px",
  autoplay: true,
  arrows: false,
  autoScroll: { speed: 0.5 },
  mediaQuery: "min",
  breakpoints: {
    480: { perPage: 2 },
    768: { perPage: 3 },
  },
};

interface TestimonialsVideosSectionProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
}

const TestimonialsVideosSection: React.FC<TestimonialsVideosSectionProps> = ({
  topTitle,
  heading = "Hear From Our Trusted Customers ",
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
        {/* Section Heading */}
        <div className="max-w-xl mx-auto space-y-2 flex flex-col justify-center text-center">
          {topTitle && (
            <Typography as="h3" size="md" weight="medium">
              {topTitle}
            </Typography>
          )}
          {heading && (
            <Typography as="h2" size="xl" weight="semibold">
              {heading}
            </Typography>
          )}
          {bottomTitle && (
            <Typography as="h3" size="md" weight="medium">
              {bottomTitle}
            </Typography>
          )}
          {paragraph?.map((para, ind) => (
            <Typography key={ind} as="p" size="sm">
              {para}
            </Typography>
          ))}
        </div>

        {/* Video Slider */}
        <div className="mt-8">
          <SplideSlider options={options}>
            {/* Wrap map in Fragment to make it a single ReactNode */}
            <>
              {videosData.map((video, index) => (
                <VideoSection
                  key={index}
                  videoUrl={video.videoUrl}
                  thumbnail={video.thumbnail}
                  openModal={openModal}
                />
              ))}
            </>
          </SplideSlider>
        </div>

        {/* Modal */}
        {showModal && currentVideo && (
          <VideoModal videoUrl={currentVideo} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

interface VideoSectionProps {
  videoUrl: string;
  thumbnail: string;
  openModal: (videoUrl: string) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoUrl,
  thumbnail,
  openModal,
}) => {
  return (
    <div className="relative">
      {/* Play Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
        onClick={() => openModal(videoUrl)}
      >
        <PlaySVG />
      </div>

      {/* Video Poster */}
      <video
        className="aspect-381/282 w-full h-auto object-cover rounded-2xl"
        preload="none"
        poster={thumbnail}
        aria-label="Play testimonial video"
      >
        <source src={videoUrl} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden relative max-w-3xl w-full">
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 text-white bg-black rounded-full w-9 h-9 text-3xl z-10 hover:cursor-pointer"
        >
          ×
        </button>
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-auto"
          aria-label="Testimonial video"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default TestimonialsVideosSection;
