"use client";
import { POST } from "@/actions/actions";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { useForm, SubmitHandler, FormProvider as Form } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { logoutUser, textToRouteUrl } from "@/utils/apiHelper";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import useVendorStore from "@/stores/vendorStore";
import { LanguageContext } from "@/context/LanguageContext";
import endPoints from "@/constants/endPionts";
import RHFField from "@/components/FormFields/RHFField";

type Locale = "en" | "ar";

interface TranslationSet {
  heading: string;
  emailLabel: string;
  sendButton: string;
  rememberText: string;
  signin: string;
  requiredEmail: string;
  placeholder: {
    email: string;
  };
}

const translations: Record<Locale, TranslationSet> = {
  en: {
    heading: "Forgot Password?",
    emailLabel: "Email address",
    sendButton: "Send",
    rememberText: "Remember Your Password?",
    signin: "Sign in",
    requiredEmail: "Email is required and must be a valid email address.",
    placeholder: {
      email: "you@example.com",
    },
  },
  ar: {
    heading: "هل نسيت كلمة المرور؟",
    emailLabel: "عنوان البريد الإلكتروني",
    sendButton: "إرسال",
    rememberText: "هل تتذكر كلمة المرور؟",
    signin: "تسجيل الدخول",
    requiredEmail: "البريد الإلكتروني مطلوب ويجب أن يكون عنوانًا صحيحًا.",
    placeholder: {
      email: "you@example.com",
    },
  },
};

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const { setVendor } = useVendorStore();
  const { locale } = useContext(LanguageContext) as { locale: Locale };

  const currentTranslations = translations[locale] || translations.en;

  const defaultValues = useMemo<ForgotPasswordFormValues>(
    () => ({
      email: "",
    }),
    [],
  );

  const formSchema = z.object({
    email: z
      .string()
      .min(1, currentTranslations.requiredEmail)
      .email(currentTranslations.requiredEmail),
  });

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      const res = await POST(endPoints.AUTH.FORGOT_PASSWORD, data);

      if (res?.detail) {
        toast.error(res.detail);
        logoutUser();
        setVendor(null);
        return;
      }

      if (res?.status === 200) {
        toast.success(res?.message || "Email sent successfully");
        router.push(`/${locale}/passwordresetsuccess`);
        return;
      }

      toast.error(res?.message || "Something went wrong");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Form {...methods}>
      <Typography as="h2" size="xl">
        {currentTranslations.heading}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8">
        <div className="mb-6">
          <RHFField
            name="email"
            label={currentTranslations?.email}
            placeholder={currentTranslations?.placeholder?.email}
            type="email"
            required
            inputIcon={`/icons/icon_59.svg`}
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
