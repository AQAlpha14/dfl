"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { btnText } from "@/mockData/dummyData";
import Typography from "../Typography";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

function NewsLetterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Thank you for subscribing!");
    reset();
  };

  return (
    <div className="w-full">
      <div className="pb-4 space-y-2">
        <Typography
          as="h4"
          size="md"
          weight="medium"
          color="white"
          className=""
        >
          {`Join our newsletter`}
        </Typography>
        <Typography as="p" size="sm" color="white" className="">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
        </Typography>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 bg-white p-1 rounded-sm"
      >
        <input
          type="email"
          placeholder="Subscribe to our newsletter.."
          {...register("email")}
          className={`text-primary border px-4 py-1 flex-1 focus:outline-none ${
            errors.email ? "border-red-500 rounded" : ""
          }`}
        />
        <button
          type="submit"
          className="cursor-pointer bg-primary text-sm text-white p-1 rounded-md px-4 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Icon icon="line-md:loading-alt-loop" width="30" height="30" />
          ) : (
            btnText.subscribe_now
          )}
        </button>
      </form>
      <Typography as="p" size="sm" color="white" className="pt-4">
        {`By subscribing you agree to with our`}
      </Typography>
    </div>
  );
}

export default NewsLetterForm;
