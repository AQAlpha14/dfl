"use client";
import { useContext, useMemo } from "react";
import { SIGN_IN } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { toast } from "sonner";
import TextInput from "@/components/FormFields/TextInput";
import { FormProvider as Form } from "react-hook-form";
import PasswordInput from "@/components/FormFields/PasswordInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import { textToRouteUrl } from "@/utils/apiHelper";
import Image from "next/image";
import useVendorStore from "@/stores/vendorStore";
import { LanguageContext } from "@/context/LanguageContext";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";

const translations = {
  en: {
    signinTitle: "Log In to access your account",
    email: "Email address",
    password: "Password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    signin: "Sign in",
    dontHaveAccount: "Don't have an Account?",
    signUp: "Sign Up",
    orContinueWith: "Or continue with",
    errors: {
      email: "Email is required and must be a valid email address.",
      password: "Password must be at least 8 characters long.",
    },
  },
  ar: {
    signinTitle: "تسجيل الدخول للوصول إلى حسابك",
    email: "عنوان البريد الإلكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "هل نسيت كلمة المرور؟",
    signin: "تسجيل الدخول",
    dontHaveAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    orContinueWith: "أو تابع باستخدام",
    errors: {
      email: "البريد الإلكتروني مطلوب ويجب أن يكون صالحًا.",
      password: "يجب أن تكون كلمة المرور 8 أحرف على الأقل.",
    },
  },
};

const Signin = () => {
  const { setVendor } = useVendorStore();
  const router = useRouter();
  const { locale } = useContext(LanguageContext);
  const currentTranslations = translations[locale] || translations.en;

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

  const isChecked = watch("rememberMe");

  const onSubmit = async (data) => {
    try {
      const res = await SIGN_IN(data);
      if (res?.status === 200) {
        setVendor(res?.data);
        toast.success(res?.message);
        router.push(`/${locale}`);
      } else if (res?.status === 403) {
        toast.info(res?.message);
        router.push(`/${locale}/verify/${data?.email}`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Form {...methods}>
      <div className="flex items-center justify-center w-full mb-3">
        <LanguageAwareLink
          href={textToRouteUrl("/")}
          className="cursor-pointer"
        >
          <Image
            src={`/icons/dfl_logo2.svg`}
            alt="logo"
            width={70}
            height={64}
            className={`w-auto lg:h-28 h-14`}
          />
        </LanguageAwareLink>
      </div>
      <Typography as="h2" size="xl" align="center">
        {currentTranslations?.signinTitle}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={"w-full mt-8"}>
        <div className="space-y-6 mb-6">
          <div className="space-y-8">
            <TextInput
              label={currentTranslations?.email}
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <PasswordInput
              label={currentTranslations?.password}
              type="password"
              error={errors.password?.message}
              {...register("password")}
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
            {currentTranslations?.signIn}
          </Button>
        </div>
        <div className="mt-4">
          <div className="flex gap-2 items-center justify-center">
            <Typography as="p" size="sm" align="center">
              {currentTranslations?.dontHaveAccount}
            </Typography>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <LanguageAwareLink
              href={textToRouteUrl("/signup")}
              className="font-bold displayPara underline underline-offset-4 cursor-pointer text-secondary"
            >
              {currentTranslations?.signUp}
            </LanguageAwareLink>
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="grow h-px bg-gray-300" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Typography as="p" size="sm" align="center">
                {currentTranslations?.orContinueWith}
              </Typography>
            </div>
            <div className="grow h-px bg-gray-300" />
          </div>
          <SocialAuthentication />
        </div>
      </form>
    </Form>
  );
};

export default Signin;
