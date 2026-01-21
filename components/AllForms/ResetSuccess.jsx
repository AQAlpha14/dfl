"use client";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import AuthSliderImage from "@/components/AuthSliderImage";
import LanguageAwareLink from "@/components/LanguageAwareLink/LanguageAwareLink";
import Heading2 from "@/components/Typography/Heading2";
import { CheckedSVG } from "@/public/assets/images/SVGIcons";
import { textToRouteUrl } from "@/utils/apiHelper";
import React, { Suspense, useContext } from "react";

export default function ResetSuccess() {
  const { locale } = useContext(LanguageContext);

  return (
    <section className="md:pt-32 pt-20 md:pb-20 pb-6">
      <div className="container">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
           <div className="md:block hidden">
              <AuthSliderImage />
            </div>
          <div className="flex justify-center items-center h-full md:px-4 px-0 py-6">
            <div className="w-full max-w-lg">
              <div className="w-full max-w-lg">
                  <Suspense>
                    <div className="space-y-4 shadow-lg p-4 border rounded-md lg:border-0 lg:p-0 lg:shadow-none">
                      <div className="flex justify-center">
                        <CheckedSVG />
                      </div>
                      <Heading2
                        className="text-center!"
                        blackHeading={
                          locale === "ar"
                            ? `تم إعادة تعيين كلمة المرور بنجاح`
                            : `Password Reset Successfully`
                        }
                      />
                      <div className="w-60 mx-auto">
                        <LanguageAwareLink
                          href={textToRouteUrl("/signin")}
                          className={`flex justify-center bg-primary text-white p-3 rounded-full`}
                        >
                          {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
                        </LanguageAwareLink>
                      </div>
                    </div>
                  </Suspense>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
