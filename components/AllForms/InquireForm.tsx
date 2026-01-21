"use client";
import React, { useContext, useMemo, useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";
import { toast } from "sonner";
import Button from "@/components/Button";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import { RHFTextField } from "../FormFields/RHFTextField";
import FormProvider from "../FormFields/FormProvider";
import { POST } from "@/actions/actions";
import endPoints from "@/constants/endPionts";
import { LanguageContext } from "@/context/LanguageContext";

/* -------------------------------------------------------------------------- */
/* Types                                    */
/* -------------------------------------------------------------------------- */

interface InquireFormData {
  id?: number;
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  data?: string;
  agreed: boolean;
}

interface InquireFormProps {
  gridCol?: string;
  open?: boolean;
  onClose?: () => void;
}

/* -------------------------------------------------------------------------- */
/* Component                                  */
/* -------------------------------------------------------------------------- */

export default function InquireForm({
  gridCol = "",
  open = false,
  onClose,
}: InquireFormProps) {
  const { locale } = useContext(LanguageContext);
  const [show, setShow] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = useMemo(() => {
    const content = {
      en: {
        firstName: "First Name",
        email: "Email",
        phone: "Phone Number",
        message: "Type your message...",
        accept: "I accept the Terms",
        submit: "Submit",
        validations: {
          requiredFullName: "First Name is required",
          onlyAlphabets: "Only alphabets are allowed",
          requiredEmail: "Email is required",
          invalidEmail: "Invalid email format",
          requiredPhone: "Contact Number is required",
          requiredMessage: "Message is required",
          acceptTerms: "You must agree to the privacy policy",
          onlyNumbers: "Only numbers are allowed",
          phoneTooLong: "Phone number too long",
        },
      },
      ar: {
        firstName: "الاسم الأول",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        message: "اكتب رسالتك...",
        accept: "أوافق على الشروط",
        submit: "إرسال",
        validations: {
          requiredFullName: "الاسم الأول مطلوب",
          onlyAlphabets: "يُسمح فقط بالأحرف",
          requiredEmail: "البريد الإلكتروني مطلوب",
          invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
          requiredPhone: "رقم الهاتف مطلوب",
          requiredMessage: "الرسالة مطلوبة",
          acceptTerms: "يرجى الموافقة على سياسة الخصوصية",
          onlyNumbers: "يسمح بالأرقام فقط",
          phoneTooLong: "رقم الهاتف طويل جداً",
        },
      },
    };
    return content[locale as keyof typeof content] || content.en;
  }, [locale]);

  /* ------------------------------- Validation ------------------------------ */

  const validateSchema = useMemo(() =>
    z.object({
      id: z.number().optional(),
      full_name: z
        .string()
        .min(1, { message: t.validations.requiredFullName })
        .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, { message: t.validations.onlyAlphabets }),
      email: z
        .string()
        .min(1, { message: t.validations.requiredEmail })
        .email(t.validations.invalidEmail),
      phone_number: z
        .string()
        .min(1, { message: t.validations.requiredPhone })
        .regex(/^[0-9]+$/, { message: t.validations.onlyNumbers })
        .max(15, { message: t.validations.phoneTooLong }),
      message: z.string().min(1, { message: t.validations.requiredMessage }),
      agreed: z.boolean().refine((v) => v === true, {
        message: t.validations.acceptTerms,
      }),
      data: z.string().optional(),
    }), [t]);

  /* ------------------------------ Form Config ---------------------------- */

  const defaultValues: InquireFormData = {
    full_name: "",
    email: "",
    phone_number: "",
    message: "",
    agreed: false,
  };

  const methods = useForm<InquireFormData>({
    resolver: zodResolver(validateSchema),
    defaultValues,
  });

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const isChecked = watch("agreed");

  /* -------------------------------- Submit -------------------------------- */

  const onSubmit: SubmitHandler<InquireFormData> = async (data) => {
    try {
      const res = await POST(endPoints.CONTACT_US, data);

      if (res?.status === 200 || res?.status === 201) {
        reset(defaultValues);
        toast.success(res?.message || "Submitted successfully");
        onClose?.();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  /* ---------------------------- Modal Animations -------------------------- */

  useEffect(() => {
    if (open) {
      setShow(true);
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" }
      ).fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: -50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
        "<"
      );
    } else if (show) {
      const tl = gsap.timeline({ onComplete: () => setShow(false) });
      tl.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power3.in",
      }).to(
        overlayRef.current,
        { opacity: 0, duration: 0.4, ease: "power3.in" },
        "<"
      );
    }
  }, [open, show]);

  // Handle Esc Key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose?.();
    }
  };

  if (!open && !show) return null;

  /* --------------------------------- JSX ---------------------------------- */

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg px-6 py-10 w-full max-w-md relative shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className={`grid grid-cols-1 gap-4 ${gridCol}`}>
            <RHFTextField
              name="full_name"
              title={t.firstName}
              placeholder={t.firstName}
              type="text"
            />
            <RHFTextField
              name="email"
              title={t.email}
              placeholder={t.email}
              type="email"
            />
            <RHFTextField
              name="phone_number"
              title={t.phone}
              placeholder={t.phone}
              type="number"
            />
          </div>
          <div className="space-y-4 pt-6">
            <RHFTextField
              name="message"
              title={t.message}
              placeholder={t.message}
              type="text"
              textArea
            />
            <CheckboxInput
              title={t.accept}
              error={errors.agreed?.message}
              checked={isChecked}
              {...register("agreed")}
            />
          </div>
          <Button
            type="submit"
            loading={isSubmitting}
            variant="primary"
            className="mt-6"
          >
            {t.submit}
          </Button>
        </FormProvider>
      </div>
    </div>
  );
}