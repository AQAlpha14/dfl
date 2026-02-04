"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SEOAction } from "@/actions/seo-action";
import BottomFAQSchema from "@/lib/BottomFAQSchema";
import { contactDetail } from "@/mockData/dummyData";
import InterestedCategoriesSection from "./InterestedCategoriesSection";
import { BlogTags } from "./BlogTagsAndCategories";
import { LoadFaqs } from "./Skeleton";
import GetInTouch from "./GetInTouch";
import Typography from "../Typography";
import { isIndex, nocache } from "@/constants/constants";
import FaqsSection from "@/sections/Faq/FaqsSection";

interface BlogDetailProps {
  data?: string[] | any;
  nextPrev?: any;
  className?: string;
  faq?: string;
}

interface CTA1Props {
  data?: string | any;
  item?: any;
}

interface CTA2Props {
  data?: string | any;
  item?: any;
}

interface CTA3Props {
  data?: string | any;
}

interface ParagraphSectionProps {
  data?: string | any;
}

interface CallSectionProps {
  data?: string | any;
}

interface QuoteSectionProps {
  data?: string | any;
}

interface AuthorSectionProps {
  data?: string | any;
}

interface ImageSectionProps {
  item?: any;
}

interface rendDataDetialProps {
  data?: string | any;
}

// SEO

export async function generateMetadata() {
  const vMetaData = await SEOAction();
  return {
    title: vMetaData?.seo_title || "",
    description: vMetaData?.seo_description || "",
    alternates: {
      canonical: vMetaData?.canonical_url || "",
    },
    openGraph: vMetaData?.opengraph_data,
    twitter: vMetaData?.twitter_tag,
    robots: {
      index: isIndex,
      nocache: nocache,
    },
    faq: vMetaData?.faq?.mainEntity || null,
    icons: {
      icon: "/icon.jpg",
    },
  };
}

const BlogsDetail: React.FC<BlogDetailProps> = ({
  data,
  nextPrev,
  className,
  faq,
}) => {
  const blogDataLocal = [
    {
      component: (data) => <ParagraphSection data={data} />,
      section: "paragraphSection",
    },
    {
      component: (data, item) => <CTA1 data={data} item={item} />,
      section: "ctaSection1",
    },
    {
      component: (data, item) => <CTA2 data={data} item={item} />,
      section: "ctaSection2",
    },
    {
      component: (data) => <CTA3 data={data} />,
      section: "ctaSection3",
    },
    {
      component: (data) => <CallSection data={data} />,
      section: "callSection",
    },
    {
      component: (data) => <QuoteSection data={data} />,
      section: "quoteSection",
    },
    {
      component: (data) => <AuthorSection data={data} />,
      section: "authorSection",
    },
    {
      component: (_, item) => <ImageSection item={item} />,
      section: "imageSection",
    },
  ];

  const rendDataDetial = () => {
    return (
      <>
        <div className="mt-4">
          <div className="mb-2">
            <InterestedCategoriesSection
              isSingleIndex={true}
              catId={data?.[0]?.categories_data?.[0]?.id}
            />
          </div>
          <Typography as="h2" size="xl" weight="medium">
            {data[0]?.title}
          </Typography>
          <p className="text-xs text-gray-500">
            {data[0]?.createon
              ? new Date(data[0]?.createon["$date"]).toDateString()
              : ""}
          </p>
        </div>
        <div className={`mt-4`}>
          <div className="relative w-full overflow-hidden my-4 aspect-video rounded-xl">
            {data[0]?.front_image && (
              <Image
                src={data[0]?.front_image}
                alt={data[0]?.front_image_alt || "Product image"}
                fill
                className="object-cover"
                priority={true}
              />
            )}
          </div>
          {data?.length
            ? JSON.parse(data[0]?.value)?.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {blogDataLocal?.map((val, j) => {
                      return (
                        val.section == item.section && (
                          <React.Fragment key={val.section}>
                            {val.component(item?.description, item)}
                          </React.Fragment>
                        )
                      );
                    })}
                  </React.Fragment>
                );
              })
            : ""}
        </div>
      </>
    );
  };
  const Paginations = () => {
    const handleScrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smooth animation
      });
    };
    return (
      <div className="bg-primary px-3 py-4 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-start">
          {nextPrev && nextPrev[0] && (
            <Link
              href={`/blog/${nextPrev[0]?.slug}?id=${nextPrev[0]?.id}`}
              className="w-96"
              onClick={handleScrollTop}
            >
              <div className="flex items-center gap-4">
                <div className="w-16! h-16! overflow-hidden sm:block hidden">
                  <Image
                    src={nextPrev[0]?.front_image}
                    width={50}
                    height={50}
                    alt={nextPrev[0]?.front_image_alt}
                    className={`w-full h-full object-cover`}
                  />
                </div>
                <div className="text-left">
                  <p className=" font-semibold text-white hover:text-primaryLight hover:underline hover:underline-offset-4">
                    Previous Post
                  </p>
                  <p className="text-xs text-white hover:text-primaryLight line-clamp-1 sm:block hidden">
                    {nextPrev[0]?.title}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="flex items-center justify-end">
          {nextPrev && nextPrev[1] && (
            <Link
              href={`/blog/${nextPrev[1]?.slug}?id=${nextPrev[1]?.id}`}
              className="w-96"
              onClick={handleScrollTop}
            >
              <div className="flex flex-row-reverse items-center gap-4">
                <div className="w-16! h-16! overflow-hidden sm:block hidden">
                  <Image
                    src={nextPrev[1]?.front_image}
                    width={50}
                    height={50}
                    alt={nextPrev[1]?.front_image_alt}
                    className={`w-full h-full object-cover`}
                  />
                </div>
                <div className="text-right">
                  <p className=" font-semibold text-white hover:text-primaryLight hover:underline hover:underline-offset-4">
                    Next Post
                  </p>
                  <p className="text-xs text-white hover:text-primaryLight line-clamp-1 sm:block hidden">
                    {nextPrev[1]?.title}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <section className={`${className}`}>
        {data && rendDataDetial()}
        <BlogTags />
        <Suspense fallback={<LoadFaqs />}>
          {faq && <FaqsSection data={JSON.parse(faq)} />}
        </Suspense>
        {faq && <BottomFAQSchema data={JSON.parse(faq)} />}
        {nextPrev?.length !== 0 && (
          <div className="pb-6">
            <Paginations />
          </div>
        )}
      </section>
    </>
  );
};
export default BlogsDetail;

const ParagraphSection: React.FC<ParagraphSectionProps> = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};

const CTA1: React.FC<CTA1Props> = ({ data, item }) => {
  return (
    <div className="bg-primary grid grid-cols-3 p-4 my-6 items-center rounded-xl">
      <div className="md:col-span-2 col-span-3 grid gap-4">
        <div
          className="text-white max-w-110 md:text-base text-sm md:text-left text-center"
          dangerouslySetInnerHTML={{ __html: data }}
        />
        <Link
          href={item?.cta1_button_url || "#"}
          target="_blank"
          className="w-max rounded-full bg-white hover:bg-black! text-primary! hover:text-white! "
        >
          {item?.cta1_button_text || "Get Started"}
        </Link>
      </div>
      <div className="md:col-span-1 col-span-3 flex justify-center items-center">
        <Image
          src={item.cta1_image ? item.cta1_image : ""}
          alt="blog image"
          layout="intrinsic"
          width={200}
          height={200}
          className="object-cover w-50 h-50"
        />
      </div>
    </div>
  );
};

const CTA2: React.FC<CTA2Props> = ({ data, item }) => {
  return (
    <div className="py-6 md:py-10 flex md:flex-row flex-col justify-between px-4 my-6 items-center rounded-xl">
      <div
        className="text-white max-w-110 md:text-base text-sm md:text-left text-center"
        dangerouslySetInnerHTML={{ __html: data }}
      />
      <div className="">
        <Link
          href={item?.cta2_button_url || "#"}
          target="_blank"
          className="w-max rounded-lg bg-white hover:bg-black text-primary! hover:text-white!"
        >
          {item?.cta2_button_text || "Get Started"}
        </Link>
      </div>
    </div>
  );
};

const CTA3: React.FC<CTA3Props> = ({ data }) => {
  return (
    <div className="py-6 md:py-10 flex md:flex-row flex-col px-4 items-center rounded-xl bg-primary">
      <div
        className="text-white max-w-110 md:text-base text-sm md:text-left text-center"
        dangerouslySetInnerHTML={{ __html: data }}
      />
      <div className="">
        <Link
          href={contactDetail.telNo}
          className="w-max rounded-lg bg-white hover:bg-black text-primary! hover:text-white!"
        >
          {contactDetail.telNo}
        </Link>
      </div>
    </div>
  );
};

const CallSection: React.FC<CallSectionProps> = ({ data }) => {
  return (
    <>
      <div className="bg-primary p-4 rounded-md  flex flex-col justify-center items-center">
        <div
          className="text-white flex flex-col justify-center items-center text-center"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
        <div className="pt-4">
          <Link
            href={contactDetail.telNo}
            className="w-max rounded-lg bg-white hover:bg-black text-primary! hover:text-white!"
          >
            {contactDetail.telNo}
          </Link>
        </div>
      </div>
    </>
  );
};

const QuoteSection: React.FC<QuoteSectionProps> = ({ data }) => {
  return (
    <>
      <div className="bg-[#FDF2EB] py-6 flex flex-col rounded-lg my-6">
        <div className="w-3/4 m-auto">
          <Image
            src={"/assets/images/blogs/quote.svg"}
            alt={`quote img`}
            width={50}
            height={50}
          />
          <div
            className="text-black md:text-base text-sm md:text-left text-center"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
      </div>
    </>
  );
};

const AuthorSection: React.FC<AuthorSectionProps> = ({ data }) => {
  return (
    <>
      <div
        className="bg-[#ECECEC] sm:px-8 px-4 sm:py-4 py-3 mt-2 text-black md:text-base text-sm md:text-left rounded-lg text-center"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </>
  );
};

const ImageSection: React.FC<ImageSectionProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="py-6 md:py-10">
      {item?.image_url ? (
        <Link href={item?.image_url} legacyBehavior target="_blank">
          <Image
            src={item?.image}
            height={500}
            width={500}
            className="h-full w-full"
            alt=""
          />
        </Link>
      ) : (
        <div onClick={toggleModal}>
          <Image
            src={item?.image}
            height={500}
            width={500}
            className="h-full w-full"
            alt=""
          />
          <GetInTouch isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};
