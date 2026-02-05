"use client";

import { POST } from "@/actions/actions";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TextInput from "@/components/FormFields/TextInput";
import { FormProvider as Form } from "react-hook-form";
import { logoutUser, textToRouteUrl } from "@/utils/apiHelper";
import Image from "next/image";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import useVendorStore from "@/stores/vendorStore";
import { LanguageContext } from "@/context/LanguageContext";
import endPoints from "@/constants/endPionts";

type Locale = "en" | "ar";

interface TranslationSet {
  heading: string;
  emailLabel: string;
  sendButton: string;
  rememberText: string;
  signin: string;
  requiredEmail: string;
}

const translations: Record<Locale, TranslationSet> = {
  en: {
    heading: "Forgot Password?",
    emailLabel: "Email address",
    sendButton: "Send",
    rememberText: "Remember Your Password?",
    signin: "Sign in",
    requiredEmail: "Email is required and must be a valid email address.",
  },
  ar: {
    heading: "هل نسيت كلمة المرور؟",
    emailLabel: "عنوان البريد الإلكتروني",
    sendButton: "إرسال",
    rememberText: "هل تتذكر كلمة المرور؟",
    signin: "تسجيل الدخول",
    requiredEmail: "البريد الإلكتروني مطلوب ويجب أن يكون عنوانًا صحيحًا.",
  },
};

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const { vendor, setVendor } = useVendorStore();
  const { locale } = useContext(LanguageContext) as { locale: Locale };
  const currentTranslations = translations[locale] || translations.en;

  const defaultValues = useMemo<ForgotPasswordFormValues>(
    () => ({
      email: "",
    }),
    [],
  );

  const formSchema = z.object({
    email: z.string().email({
      message: currentTranslations.requiredEmail,
    }),
  });

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      const res = await POST(endPoints.AUTH.FORGOT_PASSWORD, data);

      if (res?.detail !== undefined) {
        toast.error(res.detail);
        setVendor({});
        logoutUser();
      } else if (res?.status === 200) {
        toast.success(res?.message);
        router.push(`/${locale}/passwordresetsuccess`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Form {...methods}>
      <div className="flex items-center justify-center w-full mb-3">
        <LanguageAwareLink href={textToRouteUrl("/")} className="cursor-pointer">
          <Image
            src={`/images/car_solution_logo.svg`}
            alt="logo"
            width={70}
            height={64}
            className="w-auto lg:h-28 h-14"
          />
        </LanguageAwareLink>
      </div>

      <Typography as="h2" size="xl">
        {currentTranslations.heading}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8">
        <div className="mb-6">
          <TextInput
            label={currentTranslations.emailLabel}
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="primary"
          className="mb-4 w-full"
        >
          {currentTranslations.sendButton}
        </Button>

        <div className="flex flex-col items-center justify-center">
          <Typography as="p" size="sm">
            {currentTranslations.rememberText}
          </Typography>
          <LanguageAwareLink
            href={textToRouteUrl("/signin")}
            className="font-bold displayPara underline underline-offset-4 cursor-pointer text-secondary"
          >
            {currentTranslations.signin}
          </LanguageAwareLink>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
