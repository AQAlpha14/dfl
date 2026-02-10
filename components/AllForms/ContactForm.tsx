"use client";

import React, { useContext, useMemo } from "react";
import { useForm, FormProvider as Form, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Button from "@/components/Button";
import TextInput from "@/components/FormFields/TextInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import MultilineInput from "@/components/FormFields/MultilineInput";
import RHFSelect from "@/components/FormFields/RHFSelect";
import NumberInput from "@/components/FormFields/NumberInput";

import { POST } from "@/actions/actions";
import { LanguageContext } from "@/context/LanguageContext";
import endPoints from "@/constants/endPionts";

type ContactFormProps = {
  gridCol?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ gridCol }) => {
  const { locale } = useContext(LanguageContext);

  /* -------------------------------- translations -------------------------------- */
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

  /* -------------------------------- schema -------------------------------- */
  const schema = z.object({
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
      .min(1, { message: t.validations.requiredEmail })
      .email(t.validations.invalidEmail),

    phone_number: z.string().min(1, {
      message: t.validations.requiredPhone,
    }),

    modal_id: z.string().optional(),

    message: z.string().min(1, {
      message: t.validations.requiredMessage,
    }),

    agreed: z.literal(true, {
      errorMap: () => ({ message: t.validations.acceptTerms }),
    }),
  });

  type FormValues = z.infer<typeof schema>;

  /* -------------------------------- default values -------------------------------- */
  const defaultValues = useMemo<FormValues>(
    () => ({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      modal_id: "",
      message: "",
      agreed: false,
    }),
    [],
  );

  /* -------------------------------- form -------------------------------- */
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    watch,
    control,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const isChecked = watch("agreed");

  /* -------------------------------- submit -------------------------------- */
  const onSubmit = async (data: FormValues) => {
    try {
      const res = await POST(endPoints.CONTACT_US, data);

      if (res?.status === 200 || res?.status === 201) {
        reset();
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  /* -------------------------------- select options -------------------------------- */
  const carModal = [
    { label: "Flight Booking", value: "flight" },
    { label: "Hotel Reservations", value: "hotel" },
    { label: "Visa Assistance", value: "visa" },
    { label: "Transfers", value: "transfer" },
    { label: "Travel Management", value: "travel" },
  ];

  /* -------------------------------- UI -------------------------------- */
  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${gridCol ?? ""}`}
        >
          <TextInput
            label={t.firstName}
            type="text"
            error={errors.first_name?.message}
            {...register("first_name")}
          />

          <TextInput
            label={t.lastName}
            type="text"
            error={errors.last_name?.message}
            {...register("last_name")}
          />

          <TextInput
            label={t.email}
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <NumberInput
                label={t.phone}
                error={errors.phone_number?.message}
                autoComplete="off"
                {...field}
              />
            )}
          />

          <RHFSelect
            name="modal_id"
            placeholder="Choose A Topic"
            className="sm:col-span-2 border-b!"
            options={carModal}
          />
        </div>

        <div className="pt-8 space-y-4">
          <MultilineInput
            label={t.message}
            rows={5}
            error={errors.message?.message}
            {...register("message")}
          />

          <CheckboxInput
            title={t.accept}
            checked={isChecked}
            error={errors.agreed?.message}
            {...register("agreed")}
          />
        </div>

        <Button
          loading={isSubmitting}
          variant="primary"
          className="mt-5 w-30"
          type="submit"
        >
          {t.submit}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
