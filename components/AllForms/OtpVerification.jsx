"use client";
import { useContext, useEffect, useState } from "react";
import FormProvider from "@/components/FormFields/FormProvider";
import { useForm } from "react-hook-form";
import RHFOtpField from "@/components/FormFields/RHFOtpField";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { endpoints } from "@/utils/endpoints";
import { POST } from "@/actions/actions";
import Heading5 from "@/components/Typography/Heading5";
import Paragraph from "@/components/Typography/Paragraph";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import { textToRouteUrl } from "@/utils/apiHelper";
import LanguageAwareLink from "@/components/LanguageAwareLink/LanguageAwareLink";
import Image from "next/image";
import Heading2 from "@/components/Typography/Heading2";

const translations = {
  en: {
    heading: "OTP Sent To Your Email",
    subText: (email) =>
      `Please enter 6 digit verification code sent to ${email}`,
    timerLabel: "Didn’t get the OTP code?",
    enterOtp: "Enter OTP Code",
    verify: "Verify",
    resend: "Resend",
    knowPassword: "Know your password?",
    signUp: "Sign Up",
    otpLengthError: "OTP must be exactly 6 digits long.",
    otpTypeError: "OTP must contain only numeric characters.",
  },
  ar: {
    heading: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
    subText: (email) =>
      `يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى ${email}`,
    timerLabel: "لم تحصل على رمز التحقق؟",
    enterOtp: "أدخل رمز التحقق",
    verify: "تحقق",
    resend: "إعادة الإرسال",
    knowPassword: "هل تعرف كلمة المرور؟",
    signUp: "اشتراك",
    otpLengthError: "يجب أن يكون رمز التحقق مكونًا من 6 أرقام.",
    otpTypeError: "يجب أن يحتوي رمز التحقق على أرقام فقط.",
  },
};

const OtpVerification = ({ email }) => {
  const upEmail = email?.replace(/%40/g, "@");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [timer, setTimer] = useState(119);
  const { locale } = useContext(LanguageContext);
  const currentTranslations = translations[locale] || translations.en;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const myFormSchema = z.object({
    code: z
      .string()
      .length(6, { message: currentTranslations.otpLengthError })
      .regex(/^\d+$/, { message: currentTranslations.otpTypeError }),
  });

  const methods = useForm({
    resolver: zodResolver(myFormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const updatedEmail = email?.replace(/%40/g, "@");
    const body = { ...data, email: updatedEmail };
    try {
      const res = await POST(endpoints.AUTH.VERIFY_OTP, body);
      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.message);
        router.push(`/${locale}/signin`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const resendOtpHandler = async () => {
    const updatedEmail = email?.replace(/%40/g, "@");
    const body = {
      email: updatedEmail,
    };
    try {
      setLoading(true);
      const res = await POST(endpoints.AUTH.RESEND_VERIFY_OTP, body);
      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.message);
      } else {
        setLoading(false);
        toast.error(res?.message);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center justify-center w-full mb-3">
        <LanguageAwareLink
          href={textToRouteUrl("/")}
          className="cursor-pointer">
          <Image
            src={`/icons/dfl_logo2.svg`}
            alt="logo"
            width={70}
            height={64}
            className={`w-auto lg:h-28 h-14`}
          />
        </LanguageAwareLink>
      </div>
      <Heading2 blackHeading={currentTranslations.heading} />
      <Paragraph
        className="flex justify-center"
        blackText1={currentTranslations.subText(upEmail)}
      />
      <Heading5
        className="flex justify-center"
        blackHeading={`${currentTranslations.timerLabel} ${formatTime(timer)}`}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Heading5
          className="text-center text-lg font-semibold"
          blackHeading={currentTranslations.enterOtp}
        />
        <div className="grid grid-cols-1 gap-6">
          <div className="w-full flex items-center justify-center mt-4">
            <div className="max-w-112.5 ">
              <RHFOtpField name="code" />
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full"
              variant={`secondary`}
              text={currentTranslations.verify}
            />
            <Button
              type="submit"
              onClick={resendOtpHandler}
              disabled={loading || timer > 0}
              loading={loading}
              variant={`secondary`}
              text={currentTranslations.resend}
              className={`w-full ${
                timer > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>
      </FormProvider>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="grid place-items-center">
          <Paragraph
            className=""
            blackText1={currentTranslations.knowPassword}
          />
          <LanguageAwareLink
            href={textToRouteUrl("/signup")}
            className="font-bold displayPara underline underline-offset-4 cursor-pointer text-secondary">
            {currentTranslations.signUp}
          </LanguageAwareLink>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
