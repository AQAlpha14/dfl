"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { POSTSIMPLE } from "@/actions/actions";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export default function ScheduleMeetingModal({ open, onClose }) {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "",
      message: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset();
      setSuccess(false);
      setServerError("");
      setTimeout(() => {
        try {
          setFocus("name");
        } catch {
          firstInputRef.current?.focus();
        }
      }, 0);
    }
  }, [open, reset, setFocus]);

  async function onSubmit(data) {
    setServerError("");
    setLoading(true);

    try {
      const res = await POSTSIMPLE(endpoints.SCHEDULE_MEETING,JSON.stringify(data));

      
      if (res?.status != 201) {
        // const payload = await res.json().catch(() => ({}));
        setServerError(res?.message || res?.detail || "Server error, please try again later.");
        setLoading(false);
        return;
      }
      
      toast.success("Meeting scheduled. Thank you!");
      setSuccess(true);
      setLoading(false);
      reset();

      // close modal after success
      setTimeout(onClose, 1500);
    } catch (err) {
      
      setServerError("Network error. Try again.");
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="meeting-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative max-w-lg w-full mx-4 bg-white rounded-xl shadow-xl overflow-auto max-h-[90vh] p-6 z-10"
      >
        <div className="flex items-start justify-between">
          <h2 id="meeting-title" className="text-xl font-semibold">
            Schedule a Meeting
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input
              {...register("name")}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                {...register("date")}
                type="date"
                className={`mt-1 block w-full rounded-md border p-2 ${
                  errors.date ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input
                {...register("time")}
                type="time"
                className={`mt-1 block w-full rounded-md border p-2 ${
                  errors.time ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              {...register("message")}
              rows={4}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.message ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Scheduling…" : "Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
