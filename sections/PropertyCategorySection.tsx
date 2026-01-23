"use client";
import { useState, useMemo } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Typography from "@/components/Typography";
import Image from "@/components/Image";
import homeData from "@/mockData/homeData.json";
import { CommercialSVG, ResidentialSVG } from "@/public/icons/SVGIcons";

interface PropertyCategoryData {
  name: "residential" | "commercial";
  label: string;
  count: string;
  description: string;
}

interface PropertyCategorySectionProps {
  icons?: string;
  heading?: string;
  description?: string;
}

const PropertyCategorySection = ({
  heading = "Find Your Perfect Home With DirectFromLandlords",
  description = "Explore a range of verified listings, featuring transparent pricing, flexible rental terms, and a hassle-free approach.",
}: PropertyCategorySectionProps = {}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "residential" | "commercial"
  >("residential");
  const [selectedType, setSelectedType] = useState<string>("");

  // Get category data from homeData
  const categoryData = homeData.propertyCategoryData;

  const categoryTabs = categoryData.map((category) => ({
    name: category.name as "residential" | "commercial",
    label: category.label,
    icon:
      category.name === "residential" ? <ResidentialSVG /> : <CommercialSVG />,
    count: category.count,
    description: category.description,
  }));

  // Get property types based on selected category
  const currentPropertyTypes = useMemo(() => {
    const selected = categoryData.find((cat) => cat.name === selectedCategory);
    return selected?.propertyTypes || [];
  }, [selectedCategory]);

  // Set default selected type
  const defaultType = currentPropertyTypes[0]?.name || "";
  if (!selectedType && defaultType) {
    setSelectedType(defaultType);
  }

  return (
    <section className="secPadding bg-white">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <Typography as="h2" size="xl" weight="bold" className="mb-8">
            {heading}
          </Typography>

          {/* Category Tabs */}
          <div className="inline-flex gap-4 mb-8 bg-white p-3 shadow-xl">
            {categoryTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setSelectedCategory(tab.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:cursor-pointer ${
                  selectedCategory === tab.name
                    ? "bg-primary text-white shadow-lg shadow-primary/50"
                    : "bg-transparent text-gray-300 hover:bg-primary hover:text-white"
                }`}
              >
                {tab.icon}
                <Typography
                  as="span"
                  size="sm"
                  weight="medium"
                  className={`${
                    selectedCategory === tab.name ? "text-white" : ""
                  }`}
                >
                  {tab.label}
                </Typography>
                <span
                  className={`bg-white/20 bg-opacity-50 rounded px-2 py-1 text-xs font-semibold
                    ${
                      selectedCategory === tab.name
                        ? ""
                        : "text-black bg-gray-100!"
                    }
                    `}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Description */}
          <Typography as="p" size="sm" className="text-gray-300 max-w-3xl">
            {description}
          </Typography>
        </div>

        {/* Property Types Carousel */}
        <div key={selectedCategory}>
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              gap: "1.5rem",
              pagination: false,
              arrows: false,
              autoplay: false,
              drag: true,
              breakpoints: {
                1024: { perPage: 2, gap: "1rem" },
                768: { perPage: 1, gap: "1rem" },
              },
            }}
            className="splide-custom"
          >
            {currentPropertyTypes.map((type, idx: number) => (
              <SplideSlide key={type.name}>
                <div className="relative h-96 rounded-2xl overflow-hidden group">
                  {/* Background Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={type.image}
                      alt={type.label}
                      fill
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col h-full justify-end">
                    {/* Property Count Badge */}
                    <div className="flex items-center gap-4">
                      <Image
                        src={type.icons}
                        alt={`icon`}
                        width={24}
                        height={24}
                        className=""
                      />
                      <div className="bg-primaryL text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        {`${type.count} Properties`}
                      </div>
                    </div>
                    {/* Title */}
                    <Typography
                      as="h3"
                      size="lg"
                      weight="bold"
                      color="white"
                      className="my-3"
                    >
                      {type.label}
                    </Typography>

                    {/* Description */}
                    <Typography
                      as="p"
                      size="sm"
                      color="white"
                      className="mb-6 line-clamp-2"
                    >
                      {type.description}
                    </Typography>

                    {/* Explore Button */}
                    <button className="self-start hover:cursor-pointer bg-zinc-600 bg-opacity-60 hover:bg-opacity-80 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 group/btn">
                      <span>
                        {(type as any).buttonText || `Explore ${type.label}`}
                      </span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default PropertyCategorySection;
