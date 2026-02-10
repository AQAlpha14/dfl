"use client";

import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import MultilineInput from "@/components/FormFields/MultilineInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import Button from "@/components/Button";
import RHFField from "../FormFields/RHFField";

import { POST } from "@/actions/actions";
import endPoints from "@/constants/endPionts";
import { btnText } from "@/mockData/dummyData";

interface ContactFormProps {
  gridCol?: boolean;
  className?: string;
  padding?: string;
  txtLeft?: boolean;
}

interface ContactFormData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  agreed: boolean;
}

type Locale = "en" | "ar";

type TranslationSchema = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: string;
  requiredFirstName: string;
  requiredLastName: string;
  requiredEmail: string;
  requiredPhone: string;
  requiredMessage: string;
  placeholder: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

const translations: Record<Locale, TranslationSchema> = {
  en: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    message: "Message",
    acceptTerms: "I agree to the terms and conditions",
    requiredFirstName: "First name is required.",
    requiredLastName: "Last name is required.",
    requiredEmail: "Valid email is required.",
    requiredPhone: "Phone number is required.",
    requiredMessage: "Message is required.",
    placeholder: {
      firstName: "Abdul",
      lastName: "Ahmed",
      email: "Enter your email",
      phone: "Enter your phone number",
    },
  },
  ar: {
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    message: "رسالة",
    acceptTerms: "أوافق على الشروط والأحكام",
    requiredFirstName: "الاسم الأول مطلوب.",
    requiredLastName: "اسم العائلة مطلوب.",
    requiredEmail: "البريد الإلكتروني مطلوب.",
    requiredPhone: "رقم الهاتف مطلوب.",
    requiredMessage: "الرسالة مطلوبة.",
    placeholder: {
      firstName: "Abdul",
      lastName: "Ahmed",
      email: "أدخل بريدك الإلكتروني",
      phone: "أدخل رقم هاتفك",
    },
  },
};

const ContactForm: React.FC<ContactFormProps> = ({ gridCol }) => {
  const locale: Locale = "en";
  const t = translations[locale];

  const validateSchema = useMemo(
    () =>
      z.object({
        id: z.number(),
        first_name: z.string().min(1, t.requiredFirstName),
        last_name: z.string().min(1, t.requiredLastName),
        email: z.string().min(1, t.requiredEmail).email(t.requiredEmail),
        phone_number: z.string().min(1, t.requiredPhone),
        message: z.string().min(1, t.requiredMessage),
        agreed: z.boolean().refine((v) => v === true, {
          message: "You must accept the terms.",
        }),
      }),
    [t],
  );

  const defaultValues = useMemo<ContactFormData>(
    () => ({
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
      agreed: false,
    }),
    [],
  );

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(validateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await POST(endPoints.CONTACT_US, data);

      if (res?.status === 200 || res?.status === 201) {
        reset();
        toast.success(res?.message || "Message sent successfully!");
      } else {
        toast.error(res?.message || "Failed to send message.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`grid gap-4 ${
            gridCol ? "!sm:grid-cols-1" : "sm:grid-cols-2 grid-cols-1"
          }`}
        >
          <RHFField
            name="first_name"
            label={t.firstName}
            placeholder={t.placeholder.firstName}
            type="text"
            required
            inputIcon="/icons/icon_36.svg"
          />

          <RHFField
            name="last_name"
            label={t.lastName}
            placeholder={t.placeholder.lastName}
            type="text"
            required
            inputIcon="/icons/icon_36.svg"
          />

          <RHFField
            name="email"
            label={t.email}
            placeholder={t.placeholder.email}
            type="email"
            required
            inputIcon="/icons/icon_36.svg"
          />

          <RHFField
            name="phone_number"
            label={t.phone}
            placeholder={t.placeholder.phone}
            type="tel"
            required
            inputIcon="/icons/icon_36.svg"
          />
        </div>

        <div className="space-y-3 pt-6">
          <RHFField
            name="message"
            label={t.message}
            placeholder={t.message}
            type="textarea"
            required
            rows={5}
          />
        </div>

        <Button
          loading={isSubmitting}
          variant="primary"
          className="mt-5 w-30"
        >
          {btnText.submit}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
