"use client";

import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormProvider from "@/components/FormFields/FormProvider";
import Button from "@/components/Button";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { POST } from "@/actions/actions";
import { textToRouteUrl } from "@/utils/apiHelper";
import { LanguageContext } from "@/context/LanguageContext";
import endPoints from "@/constants/endPionts";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import OtpInput from "@/components/FormFields/OtpInput";
import { useRouter } from "next/navigation";

type Locale = "en" | "ar";

interface TranslationSet {
  heading: string;
  subText: (email?: string) => string;
  timerLabel: string;
  verify: string;
  resend: string;
  knowPassword: string;
  signin: string;
  otpLengthError: string;
  otpTypeError: string;
}

interface OtpVerificationProps {
  email?: string;
}

interface OtpFormValues {
  code: string;
}

const translations: Record<Locale, TranslationSet> = {
  en: {
    heading: "OTP Sent To Your Email",
    subText: (email) =>
      `Please enter 6 digit verification code sent to ${email}`,
    timerLabel: "Didn’t get the OTP code?",
    verify: "Verify",
    resend: "Resend",
    knowPassword: "Know your password?",
    signin: "Sign In",
    otpLengthError: "OTP must be exactly 6 digits long.",
    otpTypeError: "OTP must contain only numeric characters.",
  },
  ar: {
    heading: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
    subText: (email) =>
      `يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى ${email}`,
    timerLabel: "لم تحصل على رمز التحقق؟",
    verify: "تحقق",
    resend: "إعادة الإرسال",
    knowPassword: "هل تعرف كلمة المرور؟",
    signin: "اشتراك",
    otpLengthError: "يجب أن يكون رمز التحقق مكونًا من 6 أرقام.",
    otpTypeError: "يجب أن يحتوي رمز التحقق على أرقام فقط.",
  },
};

const OtpVerification: React.FC<OtpVerificationProps> = ({ email }) => {
  const upEmail = email?.replace(/%40/g, "@");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(119);
  const { locale } = useContext(LanguageContext) as { locale: Locale };
  const currentTranslations = translations[locale] || translations.en;
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formSchema = z.object({
    code: z
      .string()
      .length(6, { message: currentTranslations.otpLengthError })
      .regex(/^\d+$/, { message: currentTranslations.otpTypeError }),
  });

  const methods = useForm<OtpFormValues>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    try {
      const body = { ...data, email: upEmail };
      const res = await POST(endPoints.AUTH.VERIFY_OTP, body);
      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.message);
        router.push(`/${locale}/signin`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const resendOtpHandler = async () => {
    try {
      setLoading(true);
      const res = await POST(endPoints.AUTH.RESEND_VERIFY_OTP, {
        email: upEmail,
      });
      setLoading(false);
      if (res?.status === 200) toast.success(res?.message);
      else toast.error(res?.message);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-112 w-full mx-auto space-y-4 bg-white rounded-xl shadow-lg p-6">
      <div className="text-center">
        <Typography as="h2" size="xl">
          {currentTranslations.heading}
        </Typography>
        <Typography as="p" size="sm">
          {currentTranslations.subText(upEmail)}
        </Typography>
        <Typography as="h5" size="md">
          {`${currentTranslations.timerLabel} ${formatTime(timer)}`}
        </Typography>
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          <div className="w-full flex items-center justify-center mt-4">
            <div className="max-w-sm">
              <OtpInput name="code" />
              <div className="flex justify-center gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant="primary"
                  className="w-full"
                >
                  {currentTranslations.verify}
                </Button>
                <Button
                  type="button"
                  onClick={resendOtpHandler}
                  disabled={loading || timer > 0}
                  loading={loading}
                  variant="primary"
                  className={`w-full ${timer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {currentTranslations.resend}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="grid place-items-center">
          <Typography as="p" size="sm">
            {currentTranslations.knowPassword}
          </Typography>
          <LanguageAwareLink
            href={textToRouteUrl("/signin")}
            className="font-medium cursor-pointer text-lg text-primary"
          >
            {currentTranslations.signin}
          </LanguageAwareLink>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
