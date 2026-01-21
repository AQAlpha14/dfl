"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "../Image";
import { useRouter } from "next/navigation";
import InquiryForm from "@/sections/Forms/InquiryForm";

export default function InquiryFormModal({ open, onClose, initialData = {} }) {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();
  // keep form project synced when modal opens with new initialData
  useEffect(() => {
    if (open) {
      setSuccess(false);
      setServerError("");
      // focus first input after a tick
      setTimeout(() => {
        try {
          setFocus("name");
        } catch {
          firstInputRef.current?.focus();
        }
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialData.projectName]);

  if (!open) return null;

  return (
    <>
      <div className="">
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-labelledby="inquiry-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            ref={modalRef}
            className="relative max-w-2xl w-full mx-4 bg-white rounded-xl shadow-xl max-h-[90vh] lg:p-14 sm:p-8 p-4 z-10 overflow-hidden"
          >
            <div className={`absolute right-0 bottom-0 -z-10`}>
              <Image
                src={`/assets/icons/wm_26.svg`}
                alt={`Image`}
                width={228}
                height={420}
                className={`object-cover`}
              />
            </div>
            <button
              aria-label="Close modal"
              className="text-black hover:cursor-pointer font-bold hover:text-gray-800 absolute top-4 right-6"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
            <InquiryForm />
          </div>
        </div>
      </div>
    </>
  );
}
