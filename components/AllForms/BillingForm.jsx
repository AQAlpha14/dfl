"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormProvider as Form } from "react-hook-form";
import Button from "@/components/Button/Button";
import TextInput from "@/components/FormFields/TextInput";
import NumberInput from "../../components/AllForms/NumberInput";
import { toast } from "sonner";
import { endpoints } from "@/utils/endpoints";
import { POST } from "@/actions/actions";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import RHFSelect from "@/components/FormFields/RHFSelect";
import Image from "next/image";
import RHFTextField from "../FormFields/RHFTextField";

export default function BillingForm({ gridCol }) {
  const { locale } = useContext(LanguageContext);

  const t = {
    en: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      message: "Type your message...",
      accept: "I accept the Terms",
      submit: "Pay Now",
      validations: {
        requiredFirstName: "First Name is required",
        requiredLastName: "Last Name is required",
        onlyAlphabets: "Only alphabets are allowed for this field",
        requiredEmail: "Email is required",
        invalidEmail: "Invalid email format",
        requiredPhone: "Contact Number is required",
        requiredMessage: "Message is required",
        acceptTerms: "Please accept.",
      },
    },
    ar: {
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "اكتب رسالتك...",
      accept: "أوافق على الشروط",
      submit: "إرسال",
      validations: {
        requiredFirstName: "الاسم الأول مطلوب",
        requiredLastName: "اسم العائلة مطلوب",
        onlyAlphabets: "يُسمح فقط بالأحرف",
        requiredEmail: "البريد الإلكتروني مطلوب",
        invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
        requiredPhone: "رقم الهاتف مطلوب",
        requiredMessage: "الرسالة مطلوبة",
        acceptTerms: "يرجى القبول.",
      },
    },
  }[locale];

const validateSchema = z.object({
  first_name: z
    .string()
    .min(1, t.validations.requiredFirstName)
    .regex(/^[a-zA-Z\s]+$/, t.validations.onlyAlphabets),

  last_name: z
    .string()
    .min(1, t.validations.requiredLastName)
    .regex(/^[a-zA-Z\s]+$/, t.validations.onlyAlphabets),

  email: z
    .string()
    .min(1, t.validations.requiredEmail)
    .email(t.validations.invalidEmail),

  phone: z
    .string()
    .min(1, t.validations.requiredPhone),

  country: z
    .string()
    .min(1, "Country is required"),

  card: z
    .string()
    .min(16, "Card number must be at least 16 digits"),

  message: z
    .string()
    .optional(),
});

const defaultValues = useMemo(
  () => ({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    card: "",
    message: "",
  }),
  []
);

  const methods = useForm({
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

  const onSubmit = async (data) => {
    try {
      const res = await POST(endpoints.AUTH.CONTACT_US, data);
      if (res?.status === 200 || res?.status === 201) {
        reset();
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };
  const country = [
    { label: "United Arab Emirates", value: "UAE" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
    { label: "Qatar", value: "Qatar" },
    { label: "Kuwait", value: "Kuwait" },
    { label: "Oman", value: "Oman" },
    { label: "Bahrain", value: "Bahrain" },
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
    { label: "Bangladesh", value: "Bangladesh" },
    { label: "Sri Lanka", value: "Sri Lanka" },
    { label: "Nepal", value: "Nepal" },
    { label: "China", value: "China" },
    { label: "Japan", value: "Japan" },
    { label: "South Korea", value: "South Korea" },
    { label: "Malaysia", value: "Malaysia" },
  ];

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div
          className={`grid sm:grid-cols-2 grid-cols-1 gap-2 space-y-3 ${gridCol}`}
        >
          <RHFTextField
            title="First Name *"
            name="first_name"
            type="text"
            placeholder="David"
            className=""
            variant="outlined"
          />
          <RHFTextField
            title="Last Name *"
            name="last_name"
            type="text"
            placeholder="John"
            className=""
            variant="outlined"
          />
          <RHFTextField
            title="Email address *"
            name="email"
            type="text"
            placeholder="hello@relume.io"
            className="sm:col-span-2"
            variant="outlined"
          />
          <RHFTextField
            title="Phone *"
            name="phone"
            type="number"
            placeholder="hello@relume.io"
            className="sm:col-span-2"
            variant="outlined"
          />
          <RHFSelect
            title="Country *"
            name="country"
            type="text"
            className="sm:col-span-2"
            placeholder="United Arab Emirates"
            options={country}
          />
          <div className="col-span-2 pt-2">
            <div className="flex items-end gap-4">
              <div className="md:basis-1/2 basis-full">
                <RHFTextField
                  title="Credit/Debit Card *"
                  name="card"
                  type="number"
                  placeholder="1111 2222 3333 4444"
                  className="sm:col-span-2"
                  variant="outlined"
                />
              </div>
              <div className="md:basis-1/2 basis-full">
                <Image
                  src={`/assets/icons/strip.svg`}
                  alt=""
                  width={500}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            loading={isSubmitting}
            variant={`primary`}
            className={`mt-5! w-[120px]`}
            text={t.submit}
          />
        </div>
      </form>
    </Form>
  );
}
