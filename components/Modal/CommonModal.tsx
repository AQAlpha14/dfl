"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ModalSize = "sm" | "md" | "lg" | "full";

interface CommonModalProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: ModalSize;
  hasOverlay?: boolean;
  withCloseButton?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
  isSubmitting?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function CommonModal({
  isOpen,
  onClose,
  size = "md",
  hasOverlay = true,
  withCloseButton = true,
  header,
  footer,
  className = "",
  children,
  isSubmitting = false,
}: CommonModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const sizeClasses: Record<ModalSize, string> = {
    sm: "w-full md:max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
    full: "w-full h-full",
  };

  /* ------------------------------ ESC to close ----------------------------- */
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [isSubmitting, onClose]);

  /* -------------------------- Click outside to close ------------------------ */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !isSubmitting
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSubmitting, onClose]);

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
            className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} mx-4 ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 absolute right-0">
              <button
                type="button"
                className="absolute top-4 right-4 cursor-pointer text-gray-500  hover:text-gray-600 transition-colors"
                onClick={() => !isSubmitting && onClose?.()}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="py-6 px-6 overflow-y-auto max-h-[80vh]">
              {header && <h2 className="text-xl font-medium pb-4">{header}</h2>}
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
