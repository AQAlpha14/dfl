"use client";
import { useState, useMemo } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Typography from "@/components/Typography";
import Image from "@/components/Image";
import homeData from "@/mockData/homeData.json";
import { CommercialSVG, ResidentialSVG } from "@/public/icons/SVGIcons";

// interface PropertyCategoryData {
//   name: "residential" | "commercial";
//   label: string;
//   count: string;
//   description: string;
// }

interface TopLocationsSectionProps {
  icons?: string;
  heading?: string;
  description?: string;
}

const TopLocationsSection = ({
  heading,
  description,
}: TopLocationsSectionProps = {}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "residential" | "commercial"
  >("residential");
  const [selectedType, setSelectedType] = useState<string>("");

  // Get category data from homeData
  const categoryData = homeData.topLocationsData;

  const categoryTabs = categoryData.map((category) => ({
    name: category.name as "residential" | "commercial",
    label: category.label,
    icon:
      category.name === "residential" ? <ResidentialSVG /> : <CommercialSVG />,
    count: category.count,
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
    <section className="secPadding bg-primaryDark">
      <div className="container">
        {/* Header */}
        <div className="">
          <Typography
            as="h2"
            size="xl"
            weight="bold"
            className="pb-2 text-white"
          >
            {heading}
          </Typography>
          {/* Description */}
          <Typography as="p" size="sm" className="max-w-3xl pb-4 text-white">
            {description}
          </Typography>
          {/* Category Tabs */}
          <div className="inline-flex flex-wrap gap-4 pt-6 pb-12 shadow-xl">
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
                    selectedCategory === tab.name ? "text-white" : "text-white"
                  }`}
                >
                  {tab.label}
                </Typography>

                <span
                  className={`bg-white/20 rounded-full px-3 py-1 text-xs font-semibold
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
        </div>

        {/* Property Types Carousel */}
        <div key={selectedCategory}>
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              gap: "1.5rem",
              pagination: false,
              arrows: true,
              autoplay: false,
              drag: true,
              breakpoints: {
                1024: { perPage: 2, gap: "1rem" },
                768: { perPage: 1, gap: "1rem", arrows: false },
              },
            }}
            className="splide-custom"
          >
            {currentPropertyTypes.map((type, idx: number) => (
              <SplideSlide key={type.name}>
                <div className="relative rounded-2xl overflow-hidden group">
                  {/* Background Image */}
                  <div className="aspect-410/486 w-full h-full">
                    <Image
                      src={type.image}
                      alt={type.label}
                      fill
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col h-full justify-end">
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
                    <Typography
                      as="p"
                      size="sm"
                      color="white"
                      className="mb-6 line-clamp-2"
                    >
                      {type.content}
                    </Typography>
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

export default TopLocationsSection;
