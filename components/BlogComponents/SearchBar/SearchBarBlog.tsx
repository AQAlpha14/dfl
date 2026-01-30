"use client";
import React, { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormProvider from "@/components/FormFields/FormProvider";
import { RHFTextField } from "@/components/FormFields/RHFTextField";
import { SearchSVG } from "@/public/icons/SVGIcons";

const SearchBarBlog = () => {
  const router = useRouter();
  const myFormSchema = z.object({
    keywords: z.string().min(1, "Please enter blog title"),
  });

  type SearchBlogFormData = z.infer<typeof myFormSchema>;

  const defaultValues = useMemo(
    () => ({
      keywords: "",
    }),
    []
  );

  const methods = useForm<SearchBlogFormData>({
    resolver: zodResolver(myFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: SearchBlogFormData) => {
    router.push(`/blog/posts?keywords=${data?.keywords}`);
  };

  return (
    <div className="w-full">
      <div
        className={`my-2 rounded-xl overflow-hidden `}
        style={{ boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between w-full"
        >
          <RHFTextField
            name="keywords"
            type="text"
            placeholder="Search Any Topic..."
            className="w-full bg-white"
          />
          <button
            className="searchBarIcon flex justify-center items-center sm:basis-[12%] basis-[15%] outline-none bg-black! hover:bg-linear-to-b hover:to-80% hover:from-primary hover:to-primary-dark text-white"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="md:w-8 md:h-8 w-6 h-6 rounded-full animate-spin border-x-2 border-dashed border-white border-t-transparent"></div>
            ) : (
              <SearchSVG />
            )}
          </button>
        </FormProvider>
      </div>
    </div>
  );
};

export default SearchBarBlog;
