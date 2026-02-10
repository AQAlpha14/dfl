import Link from "next/link";
import Image from "./Image";
import Typography from "./Typography";
import { contactDetail } from "@/mockData/dummyData";

type ListingItem = {
  title: string;
  description?: string;
};

type LeftSideBarProps = {
  title?: string;
  description?: string;
  image?: string;
};

const listings: ListingItem[] = [
  { title: "Access your property listings" },
  { title: "Manage tenant communications" },
  { title: "Track income & expenses" },
  { title: "View analytics & insights" },
];

const LeftSideBar = ({}: LeftSideBarProps) => {
  return (
    <div className="hidden lg:block h-screen">
      <div className="bg-[url('/images/bg_left.webp')] bgimg px-6 py-10 h-full overflow-y-auto">
        {/* Header */}{" "}
        <Link href="/">
          <Image
            src="/icons/dfl_logo1.svg"
            alt="Logo"
            width={150}
            height={50}
            className="pb-8"
          />
        </Link>
        <Typography
          as="h3"
          size="lg"
          weight="semibold"
          color="white"
          className="pb-2"
        >
          {`Welcome back!`}
        </Typography>
        <Typography as="p" size="sm" color="white">
          {` Sign in to access your account and manage your properties`}
        </Typography>
        {/* Features */}
        <div className="pt-6">
          {listings.map((item) => (
            <div key={item.title} className="mb-4">
              <div className="py-3 px-4 w-full rounded-lg bg-white/5 border border-white/50">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/icon_73.svg"
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                  <div>
                    <Typography
                      as="h4"
                      size="xs"
                      weight="medium"
                      color="white"
                      className="text-[14px]"
                    >
                      {item.title}
                    </Typography>

                    {item.description && (
                      <Typography
                        as="p"
                        size="xs"
                        color="white"
                        className="text-[13px]"
                      >
                        {item.description}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Support Section */}
        <div className="pt-20">
          <div className="px-4 rounded-2xl bg-white/5 border-y border-white/50">
            <div className="flex items-center gap-2 py-3">
              <Image
                src="/icons/icon_70.svg"
                alt="icon"
                width={40}
                height={40}
              />
              <Typography
                as="h4"
                size="xs"
                weight="medium"
                color="white"
                className="text-[14px]"
              >
                {`Need assistance?`}
              </Typography>
            </div>

            {/* Email */}
            <div className="mb-4">
              <Link href={`mailto:${contactDetail.email}`}>
                <div className="flex items-center gap-2 py-3 px-4 rounded-lg bg-white/5 border border-white/50">
                  <Image
                    src="/icons/icon_71.svg"
                    alt="icon"
                    width={40}
                    height={40}
                  />
                  <div>
                    <Typography
                      as="p"
                      size="xs"
                      color="white"
                      className="text-[14px]"
                    >
                      {`Email us`}
                    </Typography>
                    <Typography
                      as="h4"
                      size="xs"
                      weight="medium"
                      color="white"
                      className="text-[14px]"
                    >
                      {contactDetail.email}
                    </Typography>
                  </div>
                </div>
              </Link>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <Link href={`tel:${contactDetail.telNo}`}>
                <div className="flex items-center gap-2 py-3 px-4 rounded-lg bg-white/5 border border-white/50">
                  <Image
                    src="/icons/icon_72.svg"
                    alt="icon"
                    width={40}
                    height={40}
                  />
                  <div>
                    <Typography
                      as="p"
                      size="xs"
                      color="white"
                      className="text-[14px]"
                    >
                      {`Call us`}
                    </Typography>
                    <Typography
                      as="h4"
                      size="xs"
                      weight="medium"
                      color="white"
                      className="text-[14px]"
                    >
                      {contactDetail.telNo}
                    </Typography>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
