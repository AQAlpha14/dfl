"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes, confirm",
  cancelText = "Cancel",
  icon = null,
  danger = false,
  loading = false,
  disableOutsideClick = false,
  disableEscClose = false,
}) {
  const modalRef = useRef(null);

  // ESC key — prevent close during loading
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !disableEscClose && !loading) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [disableEscClose, loading]);

  // Outside click — prevent close during loading
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !disableOutsideClick &&
        !loading &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [disableOutsideClick, loading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            {icon && <div className="mb-4 text-4xl">{icon}</div>}
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{description}</p>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => !loading && onClose?.()}
                disabled={loading}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm">
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded text-white text-sm ${
                  danger
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}>
                {loading ? "Processing..." : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
