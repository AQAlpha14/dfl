"use client";
import React from "react";
export function Modal({ open, onClose, children }) {
  const dialogRef = React.useRef(null);
  React.useEffect(() => {
    const dialog = dialogRef.current;
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
    <>
      <dialog
        ref={dialogRef}
        className="w-11/12 max-w-lg p-0 m-auto rounded-3xl shadow-lg border-none"
      >
        <div className="bg-white text-gray-900">
          <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
          {children}
        </div>
      </dialog>
    </>
  );
}
