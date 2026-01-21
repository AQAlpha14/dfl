"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommonModal({
  isOpen,
  onClose,
  size = "md", // sm | md | lg | full
  hasOverlay = true,
  withCloseButton = true,
  header,
  footer,
  className = "",
  children,
  isSubmitting = false,
}) {
  const modalRef = useRef(null);

  const sizeClasses = {
    sm: "w-full md:max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
    full: "w-full h-full",
  };

  // ESC to close
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape" && !isSubmitting) onClose?.();
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [isSubmitting]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        !isSubmitting && onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSubmitting]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          {hasOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black"
            />
          )}

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} mx-4 ${className}`}>
            {/* Header */}
            {(header || withCloseButton) && (
              <div className="flex items-center justify-between p-4 absolute right-0">
                <h2 className="text-lg font-semibold">{header}</h2>
                {withCloseButton && (
                  <button
                    onClick={() => !isSubmitting && onClose?.()}
                    className="text-white cursor-pointer text-2xl leading-none"
                    aria-label="Close modal">
                    &times;
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="pt-10 pb-8 px-6 overflow-y-auto max-h-[80vh]">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
