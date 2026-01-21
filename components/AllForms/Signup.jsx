"use client";

import { POST } from "@/actions/actions";
import Button from "@/components/Button/Button";
import SocialAuthentication from "@/components/SocialSignUp/SocialAuthentication";
import Paragraph from "@/components/Typography/Paragraph";
import { endpoints } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormProvider as Form } from "react-hook-form";
import PasswordInput from "@/components/FormFields/PasswordInput";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import TextInput from "@/components/FormFields/TextInput";
import NumberInput from "./NumberInput";
import LanguageAwareLink from "@/components/LanguageAwareLink/LanguageAwareLink";
import { textToRouteUrl } from "@/utils/apiHelper";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import { useContext } from "react";
import Heading2 from "@/components/Typography/Heading2";
import Image from "next/image";

const translations = {
  en: {
    createAccount: "Create Account",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    agreeTerms:
      "I have read and I agree to the HJK Car Rental’s, Terms of use and Privacy Notice",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an Account?",
    signin: "Sign in",
    orContinueWith: "Or continue with",
    requiredFirstName: "First Name is required.",
    requiredLastName: "Last Name is required.",
    requiredEmail: "Email is required and must be a valid email address.",
    requiredPhone: "Phone Number is required.",
    requiredPassword: "Password must be at least 8 characters long.",
    requiredConfirmPassword:
      "Confirm Password must be at least 8 characters long.",
    passwordMismatch: "Passwords do not match",
    agreeValidation: "You must agree to the terms and conditions",
  },
  ar: {
    createAccount: "إنشاء حساب",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    agreeTerms:
      "لقد قرأت وأوافق على شروط الاستخدام وإشعار الخصوصية لشركة HJK Car Rental",
    signUp: "سجل",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟",
    signin: "تسجيل الدخول",
    orContinueWith: "أو المتابعة باستخدام",
    requiredFirstName: "الاسم الأول مطلوب.",
    requiredLastName: "اسم العائلة مطلوب.",
    requiredEmail:
      "البريد الإلكتروني مطلوب ويجب أن يكون عنوان بريد إلكتروني صالح.",
    requiredPhone: "رقم الهاتف مطلوب.",
    requiredPassword: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    requiredConfirmPassword:
      "يجب أن تتكون كلمة تأكيد كلمة المرور من 8 أحرف على الأقل.",
    passwordMismatch: "كلمات المرور غير متطابقة",
    agreeValidation: "يجب أن توافق على الشروط والأحكام",
  },
};

const Signup = () => {
  const { locale } = useContext(LanguageContext);
  const currentTranslations = translations[locale] || translations.en;

  const router = useRouter();
  const formSchema = z
    .object({
      id: z.number(),
      first_name: z.string().min(1, {
        message: currentTranslations?.requiredFirstName,
      }),
      last_name: z.string().min(1, {
        message: currentTranslations?.requiredLastName,
      }),
      email: z.string().email().min(1, {
        message: currentTranslations?.requiredEmail,
      }),
      phone: z.string().min(1, {
        message: currentTranslations?.requiredPhone,
      }),
      password: z.string().min(8, {
        message: currentTranslations?.requiredPassword,
      }),
      confirmPassword: z.string().min(8, {
        message: currentTranslations?.requiredConfirmPassword,
      }),
      agreed: z.boolean().refine((val) => val === true, {
        message: currentTranslations?.agreeValidation,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: currentTranslations?.passwordMismatch,
      path: ["confirmPassword"],
    });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
    },
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const isChecked = watch("agreed");

  const onSubmit = async (data) => {
    try {
      const res = await POST(endpoints.AUTH.SIGN_UP, data);
      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.message);
        router.push(`/${locale}/verify/${data?.email}`);
      } else if (res?.status === 401) {
        toast.info(res?.message);
        router.push(`/${locale}/verify/${data?.email}`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  return (
    <Form {...methods}>
      <div className="flex items-center justify-center w-full mb-3">
        <LanguageAwareLink
          href={textToRouteUrl("/")}
          className="cursor-pointer">
          <Image
            src={`/assets/car_solution_logo.svg`}
            alt="logo"
            width={70}
            height={64}
            className={`w-auto lg:h-28 h-14`}
          />
        </LanguageAwareLink>
      </div>
      <Heading2 blackHeading={currentTranslations?.createAccount} />
      <form onSubmit={handleSubmit(onSubmit)} className={"w-full mt-8"}>
        <div className="space-y-6 mb-6">
          <div className="space-y-8">
            <TextInput
              label={currentTranslations?.firstName}
              type="first_name"
              error={errors.first_name?.message}
              {...register("first_name")}
            />
            <TextInput
              label={currentTranslations?.lastName}
              type="last_name"
              error={errors.last_name?.message}
              {...register("last_name")}
            />
            <TextInput
              label={currentTranslations?.email}
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <NumberInput
              label={currentTranslations?.phone}
              error={errors.phone?.message}
              autoComplete="off"
              {...register("phone")}
            />
            <PasswordInput
              label={currentTranslations?.password}
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />
            <PasswordInput
              label={currentTranslations?.confirmPassword}
              type="password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>
          <div>
            <CheckboxInput
              title={currentTranslations?.agreeTerms}
              error={errors.agreed?.message}
              checked={isChecked}
              {...register("agreed")}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="w-full"
            variant={`secondary`}
            text={currentTranslations?.signUp}
          />

          <div className="mt-4 w-full">
            <div className="flex gap-2 items-center justify-center">
              <Paragraph blackText1={currentTranslations?.alreadyHaveAccount} />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <LanguageAwareLink
                href={textToRouteUrl("/signin")}
                className="font-bold displayPara underline underline-offset-4 cursor-pointer text-secondary">
                {currentTranslations?.signin}
              </LanguageAwareLink>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="grow h-px bg-gray-300" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Paragraph
                  blackText1={currentTranslations?.orContinueWith}
                  className="text-semibold"
                />
              </div>
              <div className="grow h-px bg-gray-300" />
            </div>
            <SocialAuthentication />
          </div>
        </div>
      </form>
    </Form>
  );
};
export default Signup;
