import Image from "next/image";
import Typography from "../Typography";
import SearchBar from "./SearchBar/SearchBar";

interface BlogHeroProps {
  subTitle?: string;
  bottomTitle?: string;
  heading?: string;
  paragraph?: string[];
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlign?: string;
  imageAlt?: string;
  dealsTitle?: string;
  dealsTitleColored?: string;
  list?: string[];
  hideSearch?: boolean;
  className?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({
  subTitle,
  bottomTitle,
  heading,
  paragraph,
  imageUrl,
  imageWidth,
  imageHeight,
  imageAlign,
  imageAlt,
  dealsTitle,
  dealsTitleColored,
  list,
  hideSearch,
  className,
}) => {
  return (
    <section className={`lg:pt-28 pt-14 pb-20 ${className} `}>
      <div className="container">
        <div className={`max-w-md mx-auto grid grid-cols-1 gap-4`}>
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mx-auto space-y-2">
              {subTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {subTitle}
                </Typography>
              )}
              <div className="flex gap-2">
                <Typography as="h2" size="xl" weight="semibold">
                  {heading}
                </Typography>
              </div>
              {bottomTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {bottomTitle}
                </Typography>
              )}
            </div>

            <div className={`grid lg:grid-cols-1 grid-cols-1`}>
              <div className="flex flex-col justify-center items-start">
                {paragraph?.map((para, ind) => (
                  <Typography key={ind} as="p" size="sm">
                    {para}
                  </Typography>
                ))}
                {(dealsTitle || dealsTitleColored) && (
                  <Typography as="h3" size="md" weight="medium">
                    {dealsTitle}
                  </Typography>
                )}
                {list && (
                  <ul>
                    {list?.map((item, ind) => (
                      <li className="displayPara text-white" key={ind}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {!hideSearch && <SearchBar />}
            {/* <div className="flex gap-4 mt-4 mx-auto lg:mx-0">
              <ButtonTheme
                text={contactDetail.telNo}
                href={`tel:${contactDetail.telNo}`}
                widthClass="w-auto"
              />
              <ButtonTheme
                text={"Call Request"}
                widthClass="w-auto mx-auto sm:mx-0"
                callReqBtn
              />
            </div> */}
          </div>
          {imageUrl && (
            <div
              className={`flex ${
                imageAlign ? imageAlign : "items-center"
              } justify-center`}
            >
              <Image
                src={imageUrl}
                alt={imageAlt ? imageAlt : ""}
                width={imageWidth}
                height={imageHeight}
                className="w-1/2 md:w-auto"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
