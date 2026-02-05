"use client";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import Image from "@/components/Image";

interface AssetSectionProps {
  topTitle?: string;
  heading?: string;
  bottomTitle?: string;
  paragraph?: string[];
  listTitle?: string;
  list?: string[];
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  reverse?: boolean;
  imageAlignEnd?: boolean;
  tags?: string[];
  bgblue?: boolean;
  btntag?: string;
  link?: string;
  linkLext?: string;
  data?: any;
  video?: string;
  tagicon?: string;
  hicon?: string;
}

const AssetSection = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
  list,
  listTitle,
  imageUrl,
  imageWidth,
  imageHeight,
  reverse,
  imageAlignEnd,
  tags,
  bgblue,
  btntag,
  link,
  linkLext,
  video,
  tagicon,
  hicon,
}: AssetSectionProps) => {
  return (
    <section
      className={` ${bgblue ? "bg-primaryLight" : ""}
    ${imageAlignEnd ? "secPaddingImageEnd" : "secPadding"} 
    `}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10">
          <div
            className={`flex flex-col justify-center ${
              imageAlignEnd ? "lg:pb-14" : ""
            }`}
          >
            {btntag && (
              <div className="">
                <div className="inline-flex items-center justify-center bg-primary/5 px-4 py-2 border border-primary text-primary rounded-full">
                  {tagicon && (
                    <Image
                      src={tagicon}
                      alt="icon"
                      width={25}
                      height={25}
                      className={`mr-2`}
                    />
                  )}
                  {btntag}
                </div>
              </div>
            )}

            <div className="max-w-xl mx-auto space-y-2">
              {topTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {topTitle}
                </Typography>
              )}
              <div className="flex gap-2">
                {hicon && (
                  <Image
                    src={hicon}
                    alt="icon"
                    width={40}
                    height={40}
                    className={`mr-2`}
                  />
                )}
                <Typography as="h2" size="xl" weight="semibold">
                  {heading}
                </Typography>
              </div>
              {bottomTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {bottomTitle}
                </Typography>
              )}
              {paragraph?.map((para, ind) => (
                <Typography key={ind} as="p" size="sm">
                  {para}
                </Typography>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              {listTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {listTitle}
                </Typography>
              )}
              {list && (
                <ul className="list-disc pl-6 space-y-2">
                  {list?.map((item, ind) => (
                    <li className="displayPara" key={ind}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {tags && (
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 mt-2">
                {tags?.map((content, ind) => (
                  <>
                    <div
                      key={ind}
                      className=" border border-black rounded-lg text-sm py-2 px-1 text-center h-full w-full grid place-items-center"
                    >
                      {content}
                    </div>
                  </>
                ))}
              </div>
            )}
            <div className="pt-4">
              {link && (
                <Link href={link} className="" variant="primary" icon2>
                  {linkLext}
                </Link>
              )}
            </div>
          </div>
          <div
            className={`flex justify-center items-center ${reverse ? "lg:order-first order-last" : ""}`}
          >
            {/* VIDEO BLOCK */}
            {video && (
              <video
                src={video}
                controls
                autoPlay={false}
                muted={false}
                playsInline
                className="rounded-xl w-full h-auto object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
            {/* IMAGE BLOCK */}
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={heading}
                width={imageWidth}
                height={imageHeight}
                className="rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssetSection;
