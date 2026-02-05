"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import {
  contactLinks,
  footerSections,
  socialLinks,
} from "@/mockData/dummyData";
import Typography from "./Typography";
import Button from "./Button";
import NewsLetterForm from "./AllForms/NewsLetterForm";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <>
      <footer className="secPadding bgimg bg-[url('/images/footer_bg.webp')]">
        <div className="container text-white">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 border-b border-gray-500 pb-8">
            <div className="">
              <Link href="/" className="cursor-pointer inline-block">
                <Image
                  src={"/icons/dfl_logo1.svg"}
                  alt="logo"
                  width={150}
                  height={64}
                  className=""
                />
              </Link>
              <div className="pt-2 ">
                {/* <Typography as="h6" size="md" weight="bold" color="white">
                {"Run Your Entire Business from One Powerful Platform"}
              </Typography> */}
                <Typography as="p" size="sm" color="white">
                  {
                    "DFL empowers landlords and tenants through smart, commission-free services, providing one-to-one communication, vetted listings, and hassle-free rental journeys tailored for the UAE market."
                  }
                </Typography>
              </div>
            </div>
            <div className="flex md:justify-end justify-center items-center">
              <div className="max-w-[470px] w-full">
                <NewsLetterForm />
              </div>
            </div>
          </div>
          <div className="lg:py-8 py-6">
            <div className="grid xl:grid-cols-7 md:grid-cols-4 grid-cols-1 gap-2 xl:gap-6">
              {footerSections.map((item, index) => (
                <FooterSection key={index} {...item} />
              ))}
              <div className="xl:col-span-2">
                <div className="mb-2">
                  <Typography
                    as="h3"
                    size="md"
                    weight="medium"
                    color="white"
                    className=""
                  >
                    {`Contact Us`}
                  </Typography>
                </div>
                <ul className="space-y-3 text-sm">
                  {contactLinks?.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        className="flex items-start xl:gap-3 gap-1"
                      >
                        <div className="">{item.icon}</div>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <div className="mb-2">
                  <Typography
                    as="h3"
                    size="md"
                    weight="medium"
                    color="white"
                    className=""
                  >
                    {`Follow Us:`}
                  </Typography>
                </div>
                <div className="flex items-center gap-2 pb-4">
                  {socialLinks.map((item, i) => (
                    <Link key={i} href={item.href} target="_blank">
                      {item.icon}
                    </Link>
                  ))}
                </div>
                <Image
                  src={"/icons/frame2147224521.svg"}
                  alt="logo"
                  width={80}
                  height={64}
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="py-4 border-t">
            <div className="flex flex-wrap items-center justify-center">
              <Typography as="p" size="sm" color="white">
                {`© ${currentYear} directfromlandloard. All Rights Reserved`}
              </Typography>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
interface FooterLink {
  name: string;
  link: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLimit = 6;
  const collapsedHeight = 200; // height in px when collapsed
  const [maxHeight, setMaxHeight] = useState(collapsedHeight);

  const toggleShow = () => setShowAll((prev) => !prev);

  useEffect(() => {
    if (!containerRef.current) return;

    if (showAll) {
      // expand to full content
      setMaxHeight(containerRef.current.scrollHeight);
    } else {
      // collapse to fixed height
      setMaxHeight(collapsedHeight);
    }
  }, [showAll, links]);

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <Typography as="h3" size="md" weight="semibold" color="white">
          {title}
        </Typography>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {links.map(({ name, link }, index) => (
          <Link
            key={index}
            href={link}
            className="hover:text-primary w-full my-1 relative inline-block group sm:text-sm text-xs"
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="">
        {links.length > initialLimit && (
          <Button
            onClick={toggleShow}
            icon1
            variant="txt"
            className={`text-primary! border-none`}
          >
            {showAll ? "View Less" : "View More"}
          </Button>
        )}
      </div>
    </div>
  );
};
export default Footer;
