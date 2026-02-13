"use client";
import Breadcrumb from "@/components/BlogComponents/Breadcrumb";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Typography from "@/components/Typography";
import { btnText, icons, listingDetailData } from "@/mockData/dummyData";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface ListingDetailPageProps {
  data: any;
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = () => {
  const data = listingDetailData;
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Amenities", "Location", "Reviews"];

  return (
    <div className="py-18">
      <div className="container">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="col-span-3">
            <Breadcrumb />
            <div className="flex justify-between">
              <Typography as="h2" size="xl" weight="semibold">
                {data.title}
              </Typography>
              <Button variant="primary" className="flex gap-2 items-center">
                <Icon icon={icons.share} width="14" height="14" />
                {btnText.share}
              </Button>
            </div>
            <div className="space-y-3 pt-4">
              <span className="flex items-center gap-2">
                <Image
                  src={`/icons/icon_1.svg`}
                  alt=""
                  width={25}
                  height={25}
                />
                <Typography as="h4" size="md" weight="semibold" color="primary">
                  {`${data.price} / Year`}
                </Typography>
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src={`/icons/icon_1.svg`}
                  alt=""
                  width={25}
                  height={25}
                />
                <Typography as="h4" size="md" weight="medium">
                  {data.location}
                </Typography>
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src={`/icons/icon_1.svg`}
                  alt=""
                  width={25}
                  height={25}
                />
                <Typography as="h4" size="md" weight="medium">
                  {data.rating}
                </Typography>
              </span>
            </div>
            <div className="flex justify-between pt-10">
              {data.features?.map((item, index) => (
                <div key={index} className="bg-white shadow">
                  <div className="flex items-center gap-2 py-3 px-8 border border-[#F3F4F6] shadow-lg rounded-xl">
                    <Image src={item.icon} alt="" width={25} height={25} />
                    <Typography as="h4" size="md" weight="medium">
                      {item.lable}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full pt-10">
              {/* Tabs */}
              <div className="flex justify-between items-center shadow p-2 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-6 hover:cursor-pointer font-medium transition-colors w-full  ${
                      activeTab === tab
                        ? "text-white bg-primary rounded-lg shadow-xl shadow-primary/30"
                        : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              <div className="pt-10">
                {activeTab === "Overview" && (
                  <div className="space-y-6">
                    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
                      <span className="flex items-center gap-2">
                        <Image
                          src={`/icons/icon_78.svg`}
                          alt=""
                          width={25}
                          height={25}
                        />
                        <Typography as="h4" size="md" weight="semibold">
                          {`About This Property`}
                        </Typography>
                      </span>
                      <div className="pt-4 space-y-2">
                        <Typography as="h4" size="md" weight="semibold">
                          {`Spacious 2BR Apartment in Dubai Marina`}
                        </Typography>
                        <Typography as="p" size="sm">
                          {`Experience luxury living in this stunning 2-bedroom apartment featuring panoramic marina views, premium finishes, and world-class amenities. This fully furnished unit offers the perfect blend of comfort and sophistication in the heart of Dubai Marina.`}
                        </Typography>
                      </div>
                    </div>
                    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
                      <Typography as="p" size="sm" weight="medium">
                        {`Property Details`}
                      </Typography>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 pt-4">
                        {data.propertyDetails.map((item, index) => (
                          <div key={index} className="space-y-2 ">
                            <span className="flex justify-between items-center gap-2 bg-[#F9FAFB] shadow-sm border border-gray-200 rounded-lg p-3">
                              <Typography as="p" size="sm">
                                {item.title}
                              </Typography>
                              <Typography as="p" size="sm" weight="medium">
                                {item.lable}
                              </Typography>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Amenities" && (
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
                    <span className="flex items-center gap-2">
                      <Image
                        src={`/icons/icon_79.svg`}
                        alt=""
                        width={25}
                        height={25}
                      />
                      <Typography as="h4" size="md" weight="semibold">
                        {`Luxury Amenities`}
                      </Typography>
                    </span>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {data.amenities.map((item, index) => (
                        <div key={index} className="space-y-2 ">
                          <span className="flex items-center gap-2 bg-white shadow-sm border border-gray-200 rounded-lg p-3">
                            <Image
                              src={`/icons/icon_80.svg`}
                              alt=""
                              width={25}
                              height={25}
                            />
                            <Typography as="p" size="sm">
                              {item.label}
                            </Typography>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "Location" && (
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 space-y-4">
                    <Typography as="h4" size="md" weight="semibold">
                      {`Nearby Places`}
                    </Typography>
                    {data.nearbyPlaces.map((item, index) => (
                      <div key={index} className="space-y-2 ">
                        <div className="flex items-center justify-between bg-white shadow-sm border border-gray-200 rounded-lg p-3">
                          <span className="flex items-center gap-2 ">
                            <Image
                              src={item.icon}
                              alt=""
                              width={35}
                              height={35}
                            />
                            <div className="space-y-1">
                              <Typography as="p" size="sm">
                                {item.title}
                              </Typography>
                              <Typography as="p" size="sm">
                                {item.lable}
                              </Typography>
                            </div>
                          </span>
                          <Typography
                            as="p"
                            size="xs"
                            weight="medium"
                            className="border border-gray-200 p-1 rounded"
                          >
                            {item.time}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "Reviews" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Tenant Reviews
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          S
                        </div>
                        <div>
                          <p className="font-semibold">
                            Sarah Johnson{" "}
                            <span className="text-sm text-gray-400">
                              Verified
                            </span>
                          </p>
                          <p className="text-yellow-400">★★★★★</p>
                        </div>
                      </div>
                      <p>
                        Amazing apartment with stunning views! Ahmad was very
                        responsive and helpful throughout the process.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
