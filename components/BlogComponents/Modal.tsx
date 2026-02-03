"use client";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="w-11/12 max-w-lg p-0 m-auto rounded-3xl shadow-lg border-none"
    >
      <div className="relative bg-white text-gray-900 rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
