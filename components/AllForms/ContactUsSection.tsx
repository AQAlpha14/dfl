"use client";
import React, { useContext } from "react";
import ContactForm from "./ContactForm";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import Heading2 from "@/components/Typography/Heading2";
import Paragraph from "@/components/Typography/Paragraph";
import Image from "@/components/Image/Image";
import HeroSection from "@/sections/HeroSection/HeroSection";


const ContactUsSection = () => {
  const { locale } = useContext(LanguageContext);
  const isArabic = locale === "ar";

  const contactDataEn = {
    title: "We’re Here to Help You Travel Better",
  };

  const contactDataAr = {
    title: "اتصل بنا",
  };
  const contactDataEn1 = {
    title: "Get in Touch — Your Next Adventure Awaits",
    paragraph:
      "Whether you're planning the trip of a lifetime or simply exploring ideas, Voyage Arabia is here to guide you. With expert support and seamless planning, we make every journey easy, inspiring, and completely stress-free.",
  };

  const contactDataAr1 = {
    title: "اتصل بنا",
    paragraph:
      "هل لديك أسئلة أو تحتاج إلى مساعدة؟ فريقنا جاهز لإرشادك بشأن الحجوزات، وخيارات السيارات، والمزيد. دعنا نبدأ رحلتك!",
  };

  const content = isArabic ? contactDataAr : contactDataEn;
  const content1 = isArabic ? contactDataAr1 : contactDataEn1;

  return (
    <>
      <HeroSection
        className={`md:bg-[url(/images/bg_8.webp)] bg-[url(/images/bg_8.webp)] bgimg`}
        heading={content.title}
        cAlign
      />
      <section className={`secPadding`}>
        <div className="container ">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex items-center">
            <div className="max-w-xl pr-6">
              <Heading2 blackHeading={content1.title} />
              <Paragraph blackText1={content1.paragraph} className={`mb-0!`} />
              <div className="pt-8">
                <ContactForm />
              </div>
            </div>
            </div>

            <div className={``}>
              <Image
              src={`/images/image_62.webp`}
              width={500}
              height={500}
              alt={``}
              className={`w-full`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsSection;
