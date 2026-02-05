"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const VideoModal = ({ isOpen, videoUrl, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80"
            onClick={() => onClose()}
          />
          {/* Close Button */}
          <div className="relativ z-10">
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
              aria-label="Close video modal">
              {/* <X className="w-5 h-5" /> */}
            </button>

            {/* Video Player */}
            <div className="w-full h-full flex items-center justify-center">
              <video
                src={videoUrl}
                controls
                autoPlay = {false}
                className="object-contain"
                playsInline
                muted={false}
              />
            </div>
          </div>
          {/* </motion.div> */}
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
