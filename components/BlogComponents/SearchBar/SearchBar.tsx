"use client";
import React, { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormProvider from "@/components/FormFields/FormProvider";
import { RHFTextField } from "@/components/FormFields/RHFTextField";

interface SearchBarProps {
  value?: string;
}

const SearchBar = ({ value }: SearchBarProps) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const myFormSchema = z.object({
    zip: z.string().min(1, "Please Enter Zip Code"),
  });

  type SearchFormData = z.infer<typeof myFormSchema>;

  const defaultValues = useMemo(
    () => ({
      zip: value || "",
    }),
    [value],
  );

  const methods = useForm<SearchFormData>({
    resolver: zodResolver(myFormSchema),
    defaultValues,
  });

  const {
    getFieldState,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SearchFormData) => {
    try {
      // TODO: Implement API call
      // const res = await fetchStateCity(data);
      const res: any = {}; // Placeholder

      if (res.status === 200) {
        router.push(
          `/${res?.data?.state?.toLowerCase()}/${res?.data?.city?.toLowerCase()}?zip=${
            data?.zip
          }`,
        );
      } else if (res.status === 404) {
        setMessage(res.message);
        resetField("zip");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const zipFieldError = getFieldState("zip")?.error?.message;

  return (
    <div className="flex flex-col">
      <div
        className="my-2 overflow-hidden max-w-lg w-full "
        style={{ boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full space-x-2"
        >
          <RHFTextField
            name="zip"
            type="text"
            placeholder="Job title, key words or company"
            className="basis-4/5 rounded-sm bg-white"
            inputClass={`border-none!`}
          />
          <Button
            className={`border-none! bg-primary text-white rounded-sm`}
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
          >
            {`Search`}
          </Button>
        </FormProvider>
      </div>
      {(zipFieldError || message) && (
        <p className="text-sm mt-1 text-red-700">{zipFieldError || message}</p>
      )}
    </div>
  );
};

export default SearchBar;
