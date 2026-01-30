import { useContext } from "react";
import { LanguageContext } from "@/app/[locale]/(MAIN)/context/LanguageContext";
import Image from "@/components/Image/Image";
import Link from "@/components/Link/Link";
import Heading5 from "./Typography/Heading5";
import Heading2 from "./Typography/Heading2";
import Heading4 from "./Typography/Heading4";
import Heading3 from "./Typography/Heading3";
import Paragraph from "./Typography/Paragraph";

export default function BlogSection({
  paragraph,
  topTitle,
  bottomTitle,
  data,
}) {
  const { locale } = useContext(LanguageContext);

  return (
    <section className="secPadding">
      <div className="container">
        <div className="">
          <div className=" mb-10">
            {topTitle && (
              <Heading5 blackHeading={topTitle} className="text-center" />
            )}
            <div className="pt-8 flex justify-between">
              <Heading2
                blackHeading={
                  locale === "ar" ? "الرؤى والتحديثات" : "Insights & Updates"
                }
                className=""
              />
              <Link variant={`secondary`} href={`/blog`} className="">
                {locale === "ar" ? "عرض جميع المدونات" : "View All Blogs"}
              </Link>
            </div>
            {bottomTitle && (
              <Heading5 blackHeading={bottomTitle} className="text-center" />
            )}
            {paragraph?.map((para, ind) => (
              <Paragraph className="text-center" blackText1={para} key={ind} />
            ))}
          </div>

          {data?.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left - Large Blog */}
              <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={data[0]?.image}
                  alt={data[0]?.title}
                  width={69}
                  height={62}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-2 left-2 bg-primary rounded-lg px-3 py-1">
                  <Heading4
                    className="display3 !mb-0 text-white text-wrap text-center"
                    blackHeading={data[0]?.date}
                  />
                  <Heading4
                    className="!mb-0 text-white text-wrap text-center"
                    blackHeading={data[0]?.month}
                  />
                </div>
                <div className="p-4">
                  <Heading4
                    className="display4 mb-2"
                    blackHeading={data[0]?.title}
                  />
                  <Paragraph blackText1={data[0]?.description} />
                  <div className="text-sm text-gray-500 mt-2">
                    1 Comments |{" "}
                    <span className="ml-1">👤 {data[0]?.author}</span>
                  </div>
                </div>
              </div>

              {/* Right - Small Blogs */}
              <div className="flex flex-col gap-4">
                {data.slice(1).map((post, i) => (
                  <div
                    key={i}
                    className="flex bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative w-1/3">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={69}
                        height={62}
                        className="h-full object-cover w-full"
                      />
                      <div className="absolute top-2 left-2 bg-primary rounded-lg px-3 py-1">
                        <Heading3
                          className="display3 !mb-0 text-white text-wrap text-center"
                          blackHeading={post.date}
                        />
                        <Heading3
                          className="!mb-0 text-white text-wrap text-center"
                          blackHeading={post.month}
                        />
                      </div>
                    </div>
                    <div className="p-4 w-2/3">
                      <Heading4
                        className="display4 mb-2"
                        blackHeading={post.title}
                      />
                      <Paragraph blackText1={post.description} />
                      <div className="text-sm text-gray-500 mt-2">
                        1 Comments |{" "}
                        <span className="ml-1">👤 {post.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
