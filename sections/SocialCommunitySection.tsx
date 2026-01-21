"use client";
import Image from "@/components/Image";
import Link from "@/components/Link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Typography from "@/components/Typography";
import { Icon } from "@iconify/react";
import NotFound from "@/components/NotFound";
import { icons } from "@/mockData/dummyData";

// Define interface for data items
interface SocialItem {
  imageURL: string;
}

const data: SocialItem[] = [
  { imageURL: "/icons/dummy.svg" },
  { imageURL: "/icons/dummy.svg" },
  { imageURL: "/icons/dummy.svg" },
  { imageURL: "/icons/dummy.svg" },
];
const options = {
  type: "loop",
  rewind: true,
  resolve: "left",
  perPage: 1,
  padding: "0.8rem",
  perMove: 1,
  pagination: false,
  gap: "15px",
  arrows: false,
  autoplay: true,
  autoScroll: {
    speed: 1,
  },
  mediaQuery: "min",
  breakpoints: {
    480: { perPage: 2 },
    768: { perPage: 3 },
    1024: { perPage: 4 },
  },
};
const SocialCommunitySection = () => {
  return (
    <section className="secPadding bg-[url(/assets/icons/car_icon.svg)] bg-contain bg-no-repeat bg-bottom">
      <div className="container relative">
        <div className="pb-4 md:flex md:items-end md:justify-between">
          <div className="max-w-[450px]">
            <Typography as="h2" size="xl" weight="medium" color="secondary">
              {`Join Our Community`}
            </Typography>
            <Typography as="p" size="sm">
              {`Connect with like-minded landlords and tenants in a trusted, supportive rental community.`}
            </Typography>
          </div>
          <div className="flex sm:items-center sm:justify-center gap-2 pt-1">
            <div className="flex items-center sm:justify-end justify-center gap-2">
              <Link
                href={"https://www.facebook.com/dfl/"}
                target="_blank"
                variant="simpleLink"
              >
                <Icon
                  icon={icons.facebook}
                  width="34"
                  height="34"
                  className="text-white bg-primary p-1 rounded-sm"
                />
              </Link>
              <Link
                href={"https://www.instagram.com/dfl/"}
                target="_blank"
                variant="simpleLink"
              >
                <Icon
                  icon={icons.instagram}
                  width="34"
                  height="34"
                  className="text-white bg-primary p-1.5 rounded-sm"
                />
              </Link>
              <Link
                href={"https://www.web.whatsapp.com/dfl/"}
                target="_blank"
                variant="simpleLink"
              >
                <Icon
                  icon={icons.whatsapp}
                  width="34"
                  height="34"
                  className="text-white bg-primary p-1.5 rounded-sm"
                />
              </Link>
              <span className="bg-primary text-white px-4 py-2 rounded-sm font-semibold">
                {`@directfromlandlords`}
              </span>
            </div>
          </div>
        </div>
        <div className="dot">
          <Splide options={options} hasTrack={false}>
            <SplideTrack className="py-5 px-0!">
              {data?.length ? (
                data.map((item, i) => (
                  <SplideSlide key={i}>
                    <Image
                      src={item.imageURL}
                      alt={`Luxora Community Image ${i + 1}`}
                      width={320}
                      height={292}
                      className="object-cover"
                    />
                  </SplideSlide>
                ))
              ) : (
                <NotFound />
              )}
            </SplideTrack>
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default SocialCommunitySection;
