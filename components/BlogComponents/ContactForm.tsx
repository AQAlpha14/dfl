"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormProvider as Form } from "react-hook-form";
import Button from "@/components/Button";
import TextInput from "@/components/FormFields/TextInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import MultilineInput from "@/components/FormFields/MultilineInput";
import { toast } from "sonner";
import { POST } from "@/actions/actions";
import NumberInput from "../FormFields/NumberInput";
import endPoints from "@/constants/endPionts";

const ContactForm = ({ gridCol }) => {
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
      const res = await POST(endPoints.AUTH.CONTACT_US, data);
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

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div
          className={`grid gap-2 space-y-4 ${
            gridCol ? "!sm:grid-cols-1" : "sm:grid-cols-2 grid-cols-1"
          }`}
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
        </div>
        <div className="space-y-3 pt-6">
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
          className={`!mt-5 w-[120px]`}
        >
          {t.submit}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
