"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo } from "react";
import { useForm, FormProvider as Form } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/Button/Button";
import { toast } from "sonner";
import { endpoints } from "@/utils/endpoints";
import { POST } from "@/actions/actions";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import RHFSelect from "@/components/FormFields/RHFSelect";
import RHFTextField from "../FormFields/RHFTextField";

export default function BookingForm({ gridCol }) {
  const { locale } = useContext(LanguageContext);

  const t = {
    en: {
      submit: "Submit",
      validations: {
        packageRequired: "Please select a package",
        adultsRequired: "Adults count is required",
        pickupRequired: "Pickup location is required",
        messageRequired: "Special request is required",
      },
    },
    ar: {
      submit: "إرسال",
      validations: {
        packageRequired: "يرجى اختيار الباقة",
        adultsRequired: "عدد البالغين مطلوب",
        pickupRequired: "موقع الالتقاط مطلوب",
        messageRequired: "الرسالة مطلوبة",
      },
    },
  }[locale];

  /* ---------------- ZOD SCHEMA ---------------- */
  const validateSchema = z.object({
    packages: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: t.validations.packageRequired,
      }),

    adults: z.coerce
      .number()
      .min(1, { message: "At least 1 adult is required" })
      .max(20, { message: "Maximum 10 adults allowed" }),

    childrens: z.coerce
      .number()
      .min(0, { message: "Children cannot be negative" })
      .max(10, { message: "Maximum 10 children allowed" }),

    pickup_location: z
      .string()
      .min(1, { message: t.validations.pickupRequired }),

    description: z
      .string()
      .min(1, { message: t.validations.messageRequired }),
  });

  /* ---------------- DEFAULT VALUES ---------------- */
  const defaultValues = useMemo(
    () => ({
      packages: null,
      adults: 1,
      childrens: 0,
      pickup_location: "",
      description: "",
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(validateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        package: data.packages.value,
      };

      const res = await POST(endpoints.AUTH.CONTACT_US, payload);

      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.message);
        reset();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  /* ---------------- PACKAGES ---------------- */
  const packages = [
    {
      label: "Full Day City Tour with Burj Khalifa & Underwater Zoo Ticket",
      value: "full-day-city-tour-burj-zoo",
    },
    {
      label: "Half Day Dubai City Tour",
      value: "half-day-dubai-city-tour",
    },
    {
      label: "Desert Safari with BBQ Dinner",
      value: "desert-safari-bbq",
    },
    {
      label: "Dhow Cruise Dinner – Marina",
      value: "dhow-cruise-marina",
    },
    {
      label: "Abu Dhabi City Tour with Grand Mosque",
      value: "abu-dhabi-city-tour",
    },
    {
      label: "IMG Worlds of Adventure Ticket",
      value: "img-worlds-ticket",
    },
  ];

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`grid sm:grid-cols-2 grid-cols-1 gap-2 space-y-3 ${gridCol}`}
        >
          <RHFSelect
            title="Select Tour Package"
            name="packages"
            placeholder="Select Packages"
            options={packages}
            className="sm:col-span-2"
          />
          <RHFTextField
            title="Adults"
            name="adults"
            type="number"
            placeholder="1"
          />
          <RHFTextField
            title="Childrens"
            name="childrens"
            type="number"
            placeholder="0"
          />
          <RHFTextField
            title="Pickup Location"
            name="pickup_location"
            type="text"
            placeholder="Enter pickup location"
            className="sm:col-span-2"
          />
          <RHFTextField
            title="Special Requests"
            name="description"
            placeholder="Write something here"
            className="sm:col-span-2"
            textArea
          />
        </div>
        <div className="flex justify-center">
          <Button
            loading={isSubmitting}
            variant="primary"
            className="mt-5! w-[120px]"
            text={t.submit}
          />
        </div>
      </form>
    </Form>
  );
}
