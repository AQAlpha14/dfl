"use client";
import { useContext, useMemo } from "react";
import { SIGN_IN } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { toast } from "sonner";
import { FormProvider as Form } from "react-hook-form";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import { textToRouteUrl } from "@/utils/apiHelper";
import useVendorStore from "@/stores/vendorStore";
import { LanguageContext } from "@/context/LanguageContext";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import RHFField from "@/components/FormFields/RHFField";

/* ----------------------------- Types ----------------------------- */

type Locale = "en" | "ar";

type TranslationSchema = {
  title: string;
  desciption: string;
  email: string;
  password: string;
  placeholder: {
    email: string;
    password: string;
  };
  rememberMe: string;
  forgotPassword: string;
  signin: string;
  dontHaveAccount: string;
  signUp: string;
  orContinueWith: string;
  errors: {
    email: string;
    password: string;
  };
};

/* ----------------------------- Translations ----------------------------- */

const translations: Record<Locale, TranslationSchema> = {
  en: {
    title: "Sign in to your account",
    desciption: "Enter your credentials to continue",
    email: "Email Address",
    password: "Password",
    forgotPassword: "Forgot Password?",
    rememberMe: "Remember Me",
    signin: "Sign in",
    signUp: "Sign Up",
    dontHaveAccount: "Don't have an Account?",
    orContinueWith: "Or continue with",
    errors: {
      email: "Email is required and must be a valid email address.",
      password: "Password must be at least 8 characters long.",
    },
    placeholder: {
      email: "Enter your email",
      password: "Enter your password",
    },
  },
  ar: {
    title: "تسجيل الدخول للوصول إلى حسابك",
    desciption: "Enter your credentials to continue",
    email: "عنوان البريد الإلكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "هل نسيت كلمة المرور؟",
    signin: "تسجيل الدخول",
    placeholder: {
      email: "you@example.com",
      password: "أدخل كلمة المرور",
    },
    dontHaveAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    orContinueWith: "أو تابع باستخدام",
    errors: {
      email: "البريد الإلكتروني مطلوب ويجب أن يكون صالحًا.",
      password: "يجب أن تكون كلمة المرور 8 أحرف على الأقل.",
    },
  },
};

/* ----------------------------- Component ----------------------------- */

const Signin: React.FC = () => {
  const { setVendor } = useVendorStore();
  const router = useRouter();
  const { locale } = useContext(LanguageContext);
  const currentTranslations = translations[locale as Locale] || translations.en;
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
      rememberMe: false,
    }),
    [],
  );
  const formSchema = z.object({
    email: z.string().email({
      message: currentTranslations.errors.email,
    }),
    password: z.string().min(8, {
      message: currentTranslations.errors.password,
    }),
    rememberMe: z.boolean().optional(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await SIGN_IN(data);
      if (res?.status === 200) {
        setVendor(res?.data ?? null);
        toast.success(res?.message);
        router.push(`/${locale}`);
      } else if (res?.status === 403) {
        toast.info(res?.message);
        router.push(`/${locale}/verify/${data?.email}`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };
  const isChecked = watch("rememberMe");
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <Form {...methods}>
        <Typography as="h2" size="xl" weight="bold">
          {currentTranslations?.title}
        </Typography>
        <Typography as="p" size="sm">
          {currentTranslations?.desciption}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full mt-6"}>
          <div className="space-y-6 mb-6">
            <div className="space-y-6">
              <RHFField
                name="email"
                label={currentTranslations?.email}
                placeholder={currentTranslations?.placeholder?.email}
                type="email"
                required
                inputIcon={`/icons/icon_59.svg`}
              />
              <RHFField
                name="password"
                label={currentTranslations?.password}
                placeholder={currentTranslations?.placeholder?.password}
                type="password"
                required
                inputIcon={`/icons/icon_60.svg`}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CheckboxInput
                  title={currentTranslations?.rememberMe}
                  error={errors.rememberMe?.message}
                  checked={isChecked}
                  {...register("rememberMe")}
                />
              </div>
              <LanguageAwareLink
                href={textToRouteUrl("/forgotpassword")}
                className="displayPara cursor-pointer"
              >
                {currentTranslations?.forgotPassword}
              </LanguageAwareLink>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="primary"
              className="w-full"
            >
              {currentTranslations?.signin}
            </Button>
          </div>
          <div className="py-8">
            <div className="flex items-center gap-2 w-full">
              <div className="grow h-px bg-gray-300" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Typography as="p" size="sm" align="center">
                  {`or`}
                </Typography>
              </div>
              <div className="grow h-px bg-gray-300" />
            </div>
            <div className="flex gap-2 items-center justify-center py-4">
              <Typography as="p" size="sm" align="center">
                {currentTranslations?.dontHaveAccount}
              </Typography>
              <LanguageAwareLink
                href={textToRouteUrl("/signup")}
                className="font-medium displayPara cursor-pointer text-primary"
              >
                {currentTranslations?.signUp}
              </LanguageAwareLink>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signin;
