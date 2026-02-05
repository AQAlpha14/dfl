"use client";

import { Suspense, useContext } from "react";
// import AuthSliderImage from "@/components/AuthSliderImage";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import { LanguageContext } from "@/context/LanguageContext";
import { CheckedSVG } from "@/public/icons/SVGIcons";
import { textToRouteUrl } from "@/utils/apiHelper";

const ResetSuccess: React.FC = () => {
  const { locale } = useContext(LanguageContext) as { locale: "en" | "ar" };

  return (
    <section className="md:pt-32 pt-20 md:pb-20 pb-6">
      <div className="container">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {/* <div className="md:block hidden">
            <AuthSliderImage />
          </div> */}
          <div className="flex justify-center items-center h-full md:px-4 px-0 py-6">
            <div className="w-full max-w-lg">
              <div className="w-full max-w-lg">
                <Suspense>
                  <div className="space-y-4 shadow-lg p-4 border rounded-md lg:border-0 lg:p-0 lg:shadow-none">
                    <div className="flex justify-center">
                      <CheckedSVG />
                    </div>
                    <Typography as="h2" size="xl" align="center">
                      {locale === "ar"
                        ? "تم إعادة تعيين كلمة المرور بنجاح"
                        : "Password Reset Successfully"}
                    </Typography>

                    <div className="w-60 mx-auto">
                      <LanguageAwareLink
                        href={textToRouteUrl("/signin")}
                        className="flex justify-center bg-primary text-white p-3 rounded-full"
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
};

export default ResetSuccess;
