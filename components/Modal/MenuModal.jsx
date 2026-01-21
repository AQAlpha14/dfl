"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

function MenuModal({
  isOpen,
  onClose,
  hasOverlay = true,
  disableOutsideClick = false,
  disableEscClose = false,
  trapFocus = true,
  className = "",
  children,
  isSubmitting = false
}) {
  const drawerRef = useRef(null);
  const previouslyFocused = useRef(null);

  // ESC close
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape" && !disableEscClose && !isSubmitting) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [disableEscClose, isSubmitting]);

  // Focus trap
  useEffect(() => {
    if (trapFocus && isOpen) {
      previouslyFocused.current = document.activeElement;
      const focusable = drawerRef.current?.querySelector(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      focusable?.focus();
    }

    return () => {
      if (trapFocus && previouslyFocused.current && isOpen === false) {
        previouslyFocused.current.focus?.();
      }
    };
  }, [isOpen]);

  const drawerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-30 flex items-end">
          {/* Overlay */}
          {hasOverlay && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              // 👇 hover bahar karne pe close
              onMouseEnter={() => {
                if (!isSubmitting) onClose?.();
              }}
            />
          )}

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-11 bg-white overflow-hidden h-auto w-full ${className}`}
            role="dialog"
            aria-modal="true"
            // 👇 hover andar karte hi cancel
            onMouseEnter={(e) => e.stopPropagation()}
          >
            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MenuModal;
