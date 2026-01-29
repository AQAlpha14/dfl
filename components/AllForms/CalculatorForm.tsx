"use client";

import React, { useContext, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import Button from "@/components/Button";
import { RHFTextField } from "../FormFields/RHFTextField";
import RHFSelect from "../FormFields/RHFSelect";
import FormProvider from "../FormFields/FormProvider";

import { POST } from "@/actions/actions";
import endPoints from "@/constants/endPionts";
import { LanguageContext } from "@/context/LanguageContext";
import { btnText } from "@/mockData/dummyData";
import Image from "../Image";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface InquireFormData {
  id?: number;
  commission: number;
  property_value: number;
  youare: string;
}

interface InquireFormProps {
  gridCol?: string;
  open?: boolean;
  onClose?: () => void;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function CalculatorForm({
  gridCol = "",
  open = false,
  onClose,
}: InquireFormProps) {
  const { locale } = useContext(LanguageContext);

  /* ----------------------------- Translations ----------------------------- */

  const t = useMemo(() => {
    const content = {
      en: {
        commission: "Commission",
        youare: "You are?",
        property_value: "Property Value / Rental Value",
        validations: {
          required: "This field is required",
          positive: "Must be greater than 0",
        },
      },
      ar: {
        commission: "العمولة",
        youare: "أنت؟",
        property_value: "قيمة العقار / قيمة الإيجار",
        validations: {
          required: "هذا الحقل مطلوب",
          positive: "يجب أن يكون أكبر من 0",
        },
      },
    };
    return content[locale as keyof typeof content] || content.en;
  }, [locale]);

  /* ------------------------------- Validation ------------------------------ */

  const validateSchema = useMemo(
    () =>
      z.object({
        id: z.number().optional(),
        youare: z.string().min(1, t.validations.required),
        property_value: z
          .number({ required_error: t.validations.required })
          .refine((val) => val > 0, {
            message: t.validations.positive,
          }),
        commission: z
          .number({ required_error: t.validations.required })
          .refine((val) => val > 0, {
            message: t.validations.positive,
          }),
      }),
    [t],
  );

  /* ------------------------------ Form Setup ------------------------------ */

  const defaultValues: InquireFormData = {
    youare: "",
    property_value: 0,
    commission: 0,
  };

  const methods = useForm<InquireFormData>({
    resolver: zodResolver(validateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

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
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  /* -------------------------------- Options -------------------------------- */

  const carModal = [
    { label: "Seller", value: "Seller" },
    { label: "Buyer", value: "Buyer" },
    { label: "Agent", value: "Agent" },
  ];

  /* ---------------------------------- JSX ---------------------------------- */

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <RHFSelect
          name="youare"
          placeholder={t.youare}
          className=""
          options={carModal}
        />
        <div className="flex overflow-hidden rounded-md border border-gray-400">
          <div className="bg-primary basis-12 flex items-center justify-center ">
            <Image
              src={`/icons/icon_49.svg`}
              alt="icon"
              width={20}
              height={20}
            />
          </div>
          <RHFTextField
            name="property_value"
            //   title={t.property_value}
            placeholder={t.property_value}
            type="number"
            className="w-full"
            inputClass="border-none! outline-none!"
          />
        </div>

        <div className="flex overflow-hidden rounded-md border border-gray-400">
          <RHFTextField
            name="commission"
            //   title={t.commission}
            placeholder={t.commission}
            type="number"
            className="w-full"
            inputClass="border-none! outline-none!"
          />
          <div className="bg-primary basis-12 flex items-center justify-center ">
            <Image
              src={`/icons/icon_50.svg`}
              alt="icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={isSubmitting}
          variant="primary"
          icon1
          className="mt-6"
        >
          {btnText.calculate}
        </Button>
      </div>
    </FormProvider>
  );
}
