"use client";
import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewsletterSubmit } from "@/actions/blog-actions";
import Button from "@/components/Button";
import Typography from "../Typography";
import useVendorStore from "@/stores/vendorStore";
import FormProvider from "../FormFields/FormProvider";
import { RHFTextField } from "../FormFields/RHFTextField";

/* ----------------------------- Types ----------------------------- */

type SubscribeFormValues = {
  email: string;
};

type NewsletterBody = SubscribeFormValues & {
  vendor_website_id: number;
  sort_by: number;
  id: number;
  active: number;
};

const SubscribeSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ModalOpen, setModalOpen] = useState<boolean>(false);

  const validateSchema = z.object({
    email: z
      .string()
      .email("Invalid email format")
      .min(1, { message: "Email is required" }),
  });

  const { vendor } = useVendorStore();
  const defaultValues = useMemo<SubscribeFormValues>(
    () => ({
      email: "",
    }),
    [],
  );

  const methods = useForm<SubscribeFormValues>({
    resolver: zodResolver(validateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<SubscribeFormValues> = async (data) => {
    const body: NewsletterBody = {
      ...data,
      vendor_website_id: vendor?.vendor_website_id,
      sort_by: 0,
      id: 0,
      active: 1,
    };

    try {
      const res = await NewsletterSubmit(body);
      setModalOpen(true);
      if (res?.status === 302) {
        setError("email", {
          type: "manual",
          message: res?.message,
        });
      }

      if (res?.status === 200) {
        setIsModalOpen(true);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = (): void => {
    setModalOpen(false);
    setIsModalOpen(false);
  };
  return (
    <section className="py-8 bg-primaryLight rounded-xl">
      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Typography as="h4" size="md" weight="semibold">
              {`Subscribe to our newsletter`}
            </Typography>
            <Typography as="p" size="sm">
              {`Subscribe to our newsletter to get our newest articles instantly!`}
            </Typography>
          </div>
          <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <div className="py-4">
                <RHFTextField
                  aria-invalid={!!errors.email}
                  aria-describedby="email_error"
                  inputClass="shadow-none bg-white/20 rounded-sm !mb-0"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <Button
                loading={isSubmitting}
                className="w-full!"
                variant="primary"
              >
                Subscribe
              </Button>
            </FormProvider>
          </div>

          <Typography as="p" size="sm">
            {` By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.`}
          </Typography>
        </div>
      </div>

      {ModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="container">
            <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">
                {` Welcome To The Luxotora Innovation Hub!`}
              </h2>
              <Typography as="p" size="xs">
                {`Thank you for joining our family. You will receive exclusive
                insights, industry updates, and valuable resources to stay
                informed about the latest or upcoming trends in
                Telecommunication, Internet, Home Phone, Home Security and
                beyond.`}
              </Typography>
              <span
                className="mt-4 px-4 py-2 bg-primary text-white rounded-full"
                onClick={closeModal}
              >
                Close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubscribeSection;
