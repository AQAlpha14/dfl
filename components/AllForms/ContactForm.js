"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormProvider as Form } from "react-hook-form";
import Button from "@/components/Button/Button";
import TextInput from "@/components/FormFields/TextInput";
import NumberInput from "../../components/AllForms/NumberInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import MultilineInput from "@/components/FormFields/MultilineInput";
import { toast } from "sonner";
import { endpoints } from "@/utils/endpoints";
import { POST } from "@/actions/actions";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import RHFSelect from "@/components/FormFields/RHFSelect";

const ContactForm = ({ gridCol }) => {
  const { locale } = useContext(LanguageContext);

  const t = {
    en: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      message: "Type your message...",
      accept: "I accept the Terms",
      submit: "Submit",
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
    id: z.number(),
    first_name: z
      .string()
      .min(1, { message: t.validations.requiredFirstName })
      .regex(/^[a-zA-Z\s]+$/, {
        message: t.validations.onlyAlphabets,
      }),
    last_name: z
      .string()
      .min(1, { message: t.validations.requiredLastName })
      .regex(/^[a-zA-Z\s]+$/, {
        message: t.validations.onlyAlphabets,
      }),
    email: z
      .string()
      .email(t.validations.invalidEmail)
      .min(1, { message: t.validations.requiredEmail }),
    phone_number: z.string().min(1, { message: t.validations.requiredPhone }),
    message: z.string().min(1, { message: t.validations.requiredMessage }),
    agreed: z.boolean().refine((value) => value === true, {
      message: t.validations.acceptTerms,
    }),
  });

  const defaultValues = useMemo(
    () => ({
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
      termsOfService: false,
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
  const carModal = [
    { label: "Flight Booking", value: "Abu Dhabi" },
    { label: "Hotel Reservations", value: "Dubai" },
    { label: "Visa Assistance", value: "Sharjah" },
    { label: "Transfers", value: "Ajman" },
    { label: "Travel Management", value: "Ajman" },
  ];
  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div
          className={`grid sm:grid-cols-2 grid-cols-1 gap-2 space-y-3 ${gridCol}`}
        >
          <TextInput
            label={t.firstName}
            type="first_name"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <TextInput
            label={t.lastName}
            type="last_name"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
          <TextInput
            label={t.email}
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <NumberInput
            label={t.phone}
            error={errors.phone_number?.message}
            autoComplete="off"
            {...register("phone_number")}
          />
          <RHFSelect
            name="modal_id"
            type="text"
            placeholder="Choose A Topic"
            className="border-b! sm:col-span-2"
            options={carModal}
          />
        </div>
        <div className="space-y-3 pt-8">
          <MultilineInput
            label={t.message}
            error={errors.message?.message}
            {...register("message")}
            rows={5}
          />
          <CheckboxInput
            title={t.accept}
            error={errors.agreed?.message}
            checked={isChecked}
            {...register("agreed")}
          />
        </div>
        <Button
          loading={isSubmitting}
          variant={`primary`}
          className={`mt-5! w-[120px]`}
          text={t.submit}
        />
      </form>
    </Form>
  );
};

export default ContactForm;
