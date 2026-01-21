"use client";
import React, { useContext } from "react";
import Heading4 from "@/components/Typography/Heading4";
import Button from "@/components/Button/Button";
import FormProvider from "@/components/FormFields/FormProvider";
import RHFSelect from "@/components/FormFields/RHFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "@/components/FormFields/TextInput";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import { useRouter } from "next/navigation";
import NumberInput from "./NumberInput";
import Heading6 from "@/components/Typography/Heading6";
import RadioInput from "@/components/FormFields/RadioInput";
import RHFileUpload from "@/components/FormFields/RHFileUpload";

const translations = {
  en: {
    createAccount: "Create Account",
    firstName: "First Name",
    lastName: "Last Name",
    askingprice: "Asking Price (£)",
    email: "Email",
    city: "City",
    motexpiry: "MOT Expiry Date",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    yes: "Yes",
    no: "no",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an Account?",
    signin: "Sign in",
    orContinueWith: "Or continue with",
    requiredFirstName: "First Name is required.",
    requiredLastName: "Last Name is required.",
    requiredcity: "city",
    requiredEmail: "Email is required and must be a valid email address.",
    requiredPhone: "Phone Number is required.",
    requiredPassword: "Password must be at least 8 characters long.",
    requiredConfirmPassword:
      "Confirm Password must be at least 8 characters long.",
    passwordMismatch: "Passwords do not match",
    agreeValidation: "You must agree to the terms and conditions"
  },
  ar: {
    createAccount: "إنشاء حساب",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    askingprice: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    city: "رقم الهاتف",
    motexpiry: "رقم الهاتف",
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
    requiredcity: "اسم العائلة مطلوب.",
    requiredEmail:
      "البريد الإلكتروني مطلوب ويجب أن يكون عنوان بريد إلكتروني صالح.",
    requiredPhone: "رقم الهاتف مطلوب.",
    requiredPassword: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    requiredConfirmPassword:
      "يجب أن تتكون كلمة تأكيد كلمة المرور من 8 أحرف على الأقل.",
    passwordMismatch: "كلمات المرور غير متطابقة",
    agreeValidation: "يجب أن توافق على الشروط والأحكام"
  }
};

const VehicleInformationForm = () => {
  const { locale } = useContext(LanguageContext);
  const currentTranslations = translations[locale] || translations.en;

  const router = useRouter();
  const formSchema = z
    .object({
      id: z.number(),
      first_name: z.string().min(1, {
        message: currentTranslations?.requiredFirstName
      }),
      last_name: z.string().min(1, {
        message: currentTranslations?.requiredLastName
      }),
      asking_price: z.string().min(1, {
        message: currentTranslations?.requiredLastName
      }),
      city: z.string().min(1, {
        message: currentTranslations?.requiredcity
      }),
      email: z.string().email().min(1, {
        message: currentTranslations?.requiredEmail
      }),
      phone: z.string().min(1, {
        message: currentTranslations?.requiredPhone
      }),
      password: z.string().min(8, {
        message: currentTranslations?.requiredPassword
      }),
      confirmPassword: z.string().min(8, {
        message: currentTranslations?.requiredConfirmPassword
      }),
      agreed: z.boolean().refine((val) => val === true, {
        message: currentTranslations?.agreeValidation
      })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: currentTranslations?.passwordMismatch,
      path: ["confirmPassword"]
    });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      role_id: 2,
      terms_condition: 1
    }
  });
  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
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

  const carModal = [
    { label: "Abu Dhabi", value: "Abu Dhabi" },
    { label: "Dubai", value: "Dubai" },
    { label: "Sharjah", value: "Sharjah" },
    { label: "Ajman", value: "Ajman" },
    { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
    { label: "Fujairah", value: "Fujairah" },
    { label: "Umm Al Quwain", value: "Umm Al Quwain" },
    { label: "Al Ain", value: "Al Ain" },
    { label: "Khor Fakkan", value: "Khor Fakkan" },
    { label: "Kalba", value: "Kalba" },
    { label: "Dibba Al-Fujairah", value: "Dibba Al-Fujairah" },
    { label: "Dibba Al-Hisn", value: "Dibba Al-Hisn" },
    { label: "Dhaid (Al Dhaid)", value: "Dhaid (Al Dhaid)" },
    { label: "Madinat Zayed", value: "Madinat Zayed" },
    { label: "Liwa Oasis", value: "Liwa Oasis" }
  ];
  const dubaiCities = [
    { label: "Abu Dhabi", value: "Abu Dhabi" },
    { label: "Dubai", value: "Dubai" },
    { label: "Sharjah", value: "Sharjah" },
    { label: "Ajman", value: "Ajman" },
    { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
    { label: "Fujairah", value: "Fujairah" },
    { label: "Umm Al Quwain", value: "Umm Al Quwain" },
    { label: "Al Ain", value: "Al Ain" },
    { label: "Khor Fakkan", value: "Khor Fakkan" },
    { label: "Kalba", value: "Kalba" },
    { label: "Dibba Al-Fujairah", value: "Dibba Al-Fujairah" },
    { label: "Dibba Al-Hisn", value: "Dibba Al-Hisn" },
    { label: "Dhaid (Al Dhaid)", value: "Dhaid (Al Dhaid)" },
    { label: "Madinat Zayed", value: "Madinat Zayed" },
    { label: "Liwa Oasis", value: "Liwa Oasis" }
  ];

  return (
    <>
      <section className="secPadding">
        <div className="container">
          <div className="">
            <Heading4
              className={`text-primary`}
              blackHeading={`Vehicle Information`}
            />
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit)}
              className={"space-y-4"}
            >
              <div className="space-y-4">
                <RHFSelect
                  name="modal_id"
                  type="text"
                  placeholder="Make"
                  className="border-b! border-gray-500!"
                  options={carModal}
                />
                <RHFSelect
                  name="emirate_id"
                  type="text"
                  placeholder="Model"
                  className="border-b! border-gray-500!"
                  options={dubaiCities}
                />
                <RHFSelect
                  name="emirate_id"
                  type="text"
                  placeholder="Year Of Manufacture"
                  className="border-b! border-gray-500!"
                  options={dubaiCities}
                />
                <RHFSelect
                  name="modal_id"
                  type="text"
                  placeholder="Body Type"
                  className="border-b! border-gray-500!"
                  options={carModal}
                />

                <RHFSelect
                  name="emirate_id"
                  type="text"
                  placeholder="Fuel Type"
                  className="border-b! border-gray-500!"
                  options={dubaiCities}
                />
                <RHFSelect
                  name="emirate_id"
                  type="text"
                  placeholder="Transmission"
                  className="border-b! border-gray-500!"
                  options={dubaiCities}
                />
                <RHFSelect
                  name="modal_id"
                  type="text"
                  placeholder="Mileage"
                  className="border-b! border-gray-500!"
                  options={carModal}
                />

                <RHFSelect
                  name="emirate_id"
                  type="text"
                  placeholder="Number Of Owners"
                  className="border-b! border-gray-500!"
                  options={dubaiCities}
                />
                <RHFSelect
                  name="emirate_id"
                  type="text"
                  placeholder="Vehicle Registration Number"
                  className="border-b! border-gray-500!"
                  options={dubaiCities}
                />
              </div>
              <div className="pt-6">
                <Heading4
                  className={`text-primary`}
                  blackHeading={`Pictures`}
                />
                
                <RHFileUpload 
                
                />
              </div>
              <div className="pt-6">
                <Heading4
                  className={`text-primary`}
                  blackHeading={`Pricing & Sale Details`}
                />
                <div className="space-y-6 pt-2">
                  <TextInput
                    label={currentTranslations?.askingprice}
                    type="asking_price"
                    error={errors.asking_price?.message}
                    {...register("asking_price")}
                  />

                  <div className="space-y-2">
                    <Heading6
                      className={`text-base! font-light!`}
                      blackHeading={`Is the Price Negotiable?`}
                    />
                    <RadioInput
                      title={currentTranslations?.yes}
                      error={errors.yes?.message}
                      checked={isChecked}
                      {...register("yes")}
                    />
                    <RadioInput
                      title={currentTranslations?.no}
                      error={errors.no?.message}
                      checked={isChecked}
                      {...register("no")}
                    />
                  </div>
                  <TextInput
                    label={currentTranslations?.motexpiry}
                    type="mot_expiry"
                    error={errors.mot_expiry?.message}
                    {...register("mot_expiry")}
                  />
                </div>
              </div>
              <div className="pt-6">
                <Heading4
                  className={`text-primary`}
                  blackHeading={`Contact Info`}
                />
                <div className="space-y-6 pt-2">
                  <TextInput
                    label={currentTranslations?.firstName}
                    type="first_name"
                    error={errors.last_name?.message}
                    {...register("first_name")}
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
                  <TextInput
                    label={currentTranslations?.city}
                    type="city"
                    error={errors.city?.message}
                  />
                </div>
              </div>
              <div className="flex items-center justify-start">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className={``}
                  variant={`primary`}
                  text={"Submit"}
                />
              </div>
            </FormProvider>
          </div>
        </div>
      </section>
    </>
  );
};

export default VehicleInformationForm;
