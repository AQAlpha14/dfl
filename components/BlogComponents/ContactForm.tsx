"use client";
import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import TextInput from "@/components/FormFields/TextInput";
import MultilineInput from "@/components/FormFields/MultilineInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import Button from "@/components/Button";
import { POST } from "@/actions/actions";
import endPoints from "@/constants/endPionts";
import NumberInput from "../FormFields/NumberInput";

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

const ContactForm: React.FC<ContactFormProps> = ({ gridCol }) => {
  const t = {
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
  };

  // Zod validation schema
  const validateSchema = z.object({
    id: z.number(),
    first_name: z
      .string()
      .min(1, { message: t.validations.requiredFirstName })
      .regex(/^[a-zA-Z\s]+$/, { message: t.validations.onlyAlphabets }),
    last_name: z
      .string()
      .min(1, { message: t.validations.requiredLastName })
      .regex(/^[a-zA-Z\s]+$/, { message: t.validations.onlyAlphabets }),
    email: z
      .string()
      .min(1, { message: t.validations.requiredEmail })
      .email(t.validations.invalidEmail),
    phone_number: z.string().min(1, { message: t.validations.requiredPhone }),
    message: z.string().min(1, { message: t.validations.requiredMessage }),
    agreed: z.boolean().refine((value) => value === true, {
      message: t.validations.acceptTerms,
    }),
  });

  // Default values for form
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
    []
  );

  const methods = useForm<ContactFormData>({
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

  // Form submission
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
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`grid gap-2 space-y-4 ${
            gridCol ? "!sm:grid-cols-1" : "sm:grid-cols-2 grid-cols-1"
          }`}
        >
          <TextInput
            label={t.firstName}
            type="text"
            error={errors.first_name?.message}
            {...register("first_name")}
            aria-invalid={!!errors.first_name}
            aria-describedby="first_name_error"
          />
          <TextInput
            label={t.lastName}
            type="text"
            error={errors.last_name?.message}
            {...register("last_name")}
            aria-invalid={!!errors.last_name}
            aria-describedby="last_name_error"
          />
          <TextInput
            label={t.email}
            type="email"
            error={errors.email?.message}
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby="email_error"
          />
          <NumberInput
            type="number"
            label={t.phone}
            error={errors.phone_number?.message}
            {...register("phone_number")}
            aria-invalid={!!errors.phone_number}
            aria-describedby="phone_number_error"
          />
        </div>

        <div className="space-y-3 pt-6">
          <MultilineInput
            label={t.message}
            error={errors.message?.message}
            {...register("message")}
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby="message_error"
          />
          <CheckboxInput
            title={t.accept}
            error={errors.agreed?.message}
            checked={isChecked}
            {...register("agreed")}
            aria-invalid={!!errors.agreed}
            aria-describedby="agreed_error"
          />
        </div>

        <Button
          loading={isSubmitting}
          variant="primary"
          className="mt-5! w-30"
        >
          {t.submit}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
