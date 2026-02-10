"use client";
import { Suspense, useContext } from "react";
import LanguageAwareLink from "@/components/LanguageAwareLink";
import Typography from "@/components/Typography";
import { LanguageContext } from "@/context/LanguageContext";
import { CheckedSVG } from "@/public/icons/SVGIcons";
import { textToRouteUrl } from "@/utils/apiHelper";

const ResetSuccess: React.FC = () => {
  const { locale } = useContext(LanguageContext) as { locale: "en" | "ar" };
  return (
    <section className=" bg-white rounded-md shadow-lg px-6 py-8">
      <div className="w-full max-w-sm">
        <Suspense>
          <div className="space-y-4 shadow-lg p-4 border rounded-md lg:border-0 lg:p-0 lg:shadow-none">
            <div className="flex justify-center">
              <CheckedSVG />
            </div>
            <Typography as="h2" size="lg" align="center">
              {locale === "ar"
                ? "تم إعادة تعيين كلمة المرور بنجاح"
                : "Password Reset Successfully"}
            </Typography>
            <div className="w-40 mx-auto">
              <LanguageAwareLink
                href={textToRouteUrl("/signin")}
                className="flex justify-center bg-primary text-white p-3 rounded-md"
              >
                {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
              </LanguageAwareLink>
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default ResetSuccess;
