"use client";

import Typography from "@/components/Typography";
import Image from "@/components/Image";
import ContactForm from "@/components/BlogComponents/ContactForm";

interface HeroSection2Props {
  heading: string;
  paragraph?: string[];
  imageUrl?: string;
  lastUpdate?: string;
  inquiryForm?: boolean;
  icon?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const HeroSection2: React.FC<HeroSection2Props> = ({
  heading,
  paragraph = [],
  imageUrl,
  lastUpdate,
  inquiryForm = false,
  icon,
  imageWidth = 400,
  imageHeight = 400,
}) => {
  return (
    <section className="sm:py-44 py-30 bg-[url(/images/bg_1.webp)] bg-no-repeat bg-cover">
      <div className="container">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            {lastUpdate && icon && (
              <div className="pb-4">
                <div className="inline-flex items-center gap-4 py-2 px-4 bg-primary rounded-full">
                  <Image src={icon} alt="icon" width={25} height={25} />
                  <Typography
                    as="p"
                    size="sm"
                    weight="medium"
                    color="white"
                    align="center"
                  >
                    {lastUpdate}
                  </Typography>
                </div>
              </div>
            )}

            <Typography as="h2" size="xl" weight="bold" color="white">
              {heading}
            </Typography>

            {paragraph.length > 0 && (
              <div className="space-y-4 mt-4">
                {paragraph.map((para, ind) => (
                  <Typography key={ind} as="p" size="sm" color="white">
                    {para}
                  </Typography>
                ))}
              </div>
            )}
          </div>

          {/* Right content */}
          <div className="flex items-center justify-center relative">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="hero image"
                width={imageWidth}
                height={imageHeight}
              />
            )}

            {inquiryForm && (
              <div className="bg-white lg:py-10 sm:py-8 py-6 sm:px-6 px-2 rounded-xl">
                <ContactForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
