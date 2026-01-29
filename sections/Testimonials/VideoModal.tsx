interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className=" max-w-3xl w-full rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute hover:cursor-pointer top-3 right-3 z-10 w-9 h-9 rounded-full bg-black text-white text-2xl"
            aria-label="Close"
          >
            ×
          </button>
          <video
            src={videoUrl}
            controls
            autoPlay
            className="max-w-xl mx-auto w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
