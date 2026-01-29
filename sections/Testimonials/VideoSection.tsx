import { PlaySVG } from "@/public/icons/SVGIcons";

interface VideoSectionProps {
  videoUrl?: string;
  thumbnail?: string;
  openModal: (videoUrl: string) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoUrl,
  thumbnail,
  openModal,
}) => {
  if (!videoUrl || !thumbnail) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Play Button */}
      <button
        onClick={() => openModal(videoUrl)}
        className="absolute inset-0 z-10 flex items-center justify-center hover:cursor-pointer"
        aria-label="Play video"
      >
        <PlaySVG />
      </button>
      {/* Poster */}
      <video
        className="w-full aspect-411/418 object-cover"
        poster={thumbnail}
        preload="none"
      >
        <source src={videoUrl} type="video/quicktime" />
      </video>
    </div>
  );
};

export default VideoSection;
