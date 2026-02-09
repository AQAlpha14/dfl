"use client";
import { POST } from "@/actions/actions";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormProvider as Form } from "react-hook-form";
import CheckboxInput from "@/components/FormFields/CheckboxInput";
import { textToRouteUrl } from "@/utils/apiHelper";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import endPoints from "@/constants/endPionts";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import RHFField from "@/components/FormFields/RHFField";

/* ----------------------------- Types ----------------------------- */

type Locale = "en" | "ar";

type TranslationSchema = {
  title: string;
  desciption: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: string;
  organization: string;
  signUp: string;
  alreadyHaveAccount: string;
  signin: string;
  orContinueWith: string;
  requiredFirstName: string;
  requiredLastName: string;
  requiredEmail: string;
  requiredPhone: string;
  requiredPassword: string;
  requiredConfirmPassword: string;
  passwordMismatch: string;
  agreeValidation: string;
  placeholder: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organization: string;
  };
};

/* ----------------------------- Translations ----------------------------- */

const translations: Record<Locale, TranslationSchema> = {
  en: {
    title: "Create Your Account",
    desciption: "Let's get started with your basic information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    organization: "Organization (Optional)",
    agreeTerms:
      "I have read and I agree to the HJK Car Rental’s, Terms of use and Privacy Notice",
    alreadyHaveAccount: "Already have an Account?",
    signUp: "Continue",
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
    placeholder: {
      firstName: "Abdul",
      lastName: "Ahmed",
      email: "Enter your email",
      password: "********",
      organization: "e.g. ABC Properties",
    },
  },
  ar: {
    title: "إنشاء حساب",
    desciption: "إنشاء حساب",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    organization: "شركة (اختياري)",
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
    placeholder: {
      firstName: "Abdul",
      lastName: "Ahmed",
      email: "Enter your email",
      password: "********",
      organization: "Abdul",
    },
  },
};

/* ----------------------------- Component ----------------------------- */

const Signup: React.FC = () => {
  const { locale } = useContext(LanguageContext);
  const currentTranslations = translations[locale as Locale] || translations.en;

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
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await POST(endPoints.AUTH.SIGN_UP, data);
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
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl py-6 px-4 max-w-sm">
      <Form {...methods}>
        <Typography as="h2" size="xl" weight="bold">
          {currentTranslations?.title}
        </Typography>
        <Typography as="p" size="sm">
          {currentTranslations?.desciption}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full mt-8"}>
          <div className="">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 ">
              <RHFField
                name="full_name"
                label={currentTranslations?.firstName}
                placeholder={currentTranslations?.placeholder?.firstName}
                type="text"
                required
                inputIcon={`/icons/icon_59.svg`}
              />
              <RHFField
                name="last_name"
                label={currentTranslations?.lastName}
                placeholder={currentTranslations?.placeholder?.lastName}
                type="text"
                required
                inputIcon={`/icons/icon_59.svg`}
              />
              <RHFField
                name="last_name"
                label={currentTranslations?.email}
                placeholder={currentTranslations?.placeholder?.email}
                type="text"
                required
                inputIcon={`/icons/icon_59.svg`}
                className="col-span-2"
              />
              <RHFField
                name="password"
                label={currentTranslations?.password}
                placeholder={currentTranslations?.placeholder?.password}
                type="text"
                required
                inputIcon={`/icons/icon_60.svg`}
              />
              <RHFField
                name="conform_password"
                label={currentTranslations?.password}
                placeholder={currentTranslations?.placeholder?.password}
                type="text"
                required
                inputIcon={`/icons/icon_60.svg`}
              />
              <RHFField
                name="organizatione"
                label={currentTranslations?.organization}
                placeholder={currentTranslations?.placeholder?.organization}
                type="text"
                required
                inputIcon={`/icons/icon_59.svg`}
                className="col-span-2"
              />
            </div>
            <div className="py-4">
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
              className="w-full justify-center"
              icon2
              variant={`primary`}
            >
              {currentTranslations?.signUp}
            </Button>
            <div className="flex gap-2 items-center justify-center py-4">
              <Typography as="p" size="sm" align="center">
                {currentTranslations?.alreadyHaveAccount}
              </Typography>
              <LanguageAwareLink
                href={textToRouteUrl("/signin")}
                className="font-medium displayPara cursor-pointer text-primary"
              >
                {currentTranslations?.signin}
              </LanguageAwareLink>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default Signup;
