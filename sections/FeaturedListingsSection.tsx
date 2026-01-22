"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FeaturedCards, { Property } from "@/components/cards/FeaturedCards";
import Typography from "@/components/Typography";
import homeData from "@/mockData/homeData.json";
import Image from "@/components/Image";

interface FeaturedListingsSectionProps {
  topTitle?: string;
  heading?: string;
  tabicon?: string;
  bottomTitle?: string;
  paragraph?: string[];
}

const FeaturedListingsSection = ({
  topTitle,
  heading = "Featured Listings",
  bottomTitle,
  paragraph = [],
}: FeaturedListingsSectionProps = {}) => {
  const [selectedType, setSelectedType] = useState<string>("all");

  // Extract unique property types with counts
  const propertyTypes = useMemo(() => {
    const allData = homeData.featuredCardsData || [];

    // Hardcoded property types with icons
    const predefinedTypes = [
      { name: "all", label: "All", icons: "/icons/icon_15.svg" },
      {
        name: "office-space",
        label: "Office Space",
        icons: "/icons/icon_19.svg",
      },
      { name: "apartment", label: "Apartment", icons: "/icons/icon_10.svg" },
      { name: "villa", label: "Villa", icons: "/icons/icon_11.svg" },
      { name: "studio", label: "Studios", icons: "/icons/icon_12.svg" },
    ];

    return predefinedTypes.map((type) => ({
      ...type,
      count:
        type.name === "all"
          ? allData.length
          : allData.filter((p: Property) => p.type === type.name).length,
    }));
  }, []);

  // Filter properties based on selected type
  const filteredProperties = useMemo(() => {
    if (selectedType === "all") return homeData.featuredCardsData || [];
    return (
      homeData.featuredCardsData?.filter(
        (p: Property) => p.type === selectedType,
      ) || []
    );
  }, [selectedType]);

  return (
    <section className="secPadding">
      <div className="container">
        <div className="">
          <div className="text-white">
            <div className="max-w-xl mx-auto space-y-2 pb-4">
              {topTitle && (
                <Typography as="h3" size="md" weight="medium">
                  {topTitle}
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
              {paragraph?.map((para, ind) => (
                <Typography key={ind} as="p" size="sm">
                  {para}
                </Typography>
              ))}
            </div>

            {/* Property Type Tabs */}
            <div className="flex justify-start gap-3 pb-6 overflow-x-auto">
              {propertyTypes.map((typeObj) => (
                <button
                  key={typeObj.name}
                  onClick={() => setSelectedType(typeObj.name)}
                  className={`flex items-center min-w-max hover:cursor-pointer gap-4 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                    selectedType === typeObj.name
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "border border-gray-400 text-gray-400 hover:border-white"
                  }`}
                >
                  <Image
                    src={typeObj.icons}
                    alt={typeObj.label}
                    width={20}
                    height={20}
                  />
                  <Typography
                    as="span"
                    size="sm"
                    weight="medium"
                    className={`${
                      selectedType === typeObj.name ? "text-white" : ""
                    }`}
                  >
                    {typeObj.label}
                  </Typography>
                  <span className="bg-gray-200/25 rounded-md px-2 py-0.5 text-xs font-semibold">
                    {typeObj.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {filteredProperties && filteredProperties.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={selectedType}
            >
              {filteredProperties.map((property: Property, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <FeaturedCards data={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography as="p" size="lg" className="text-gray-400">
                No properties found for this category.
              </Typography>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
