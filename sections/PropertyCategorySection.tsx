"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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

interface PropertyTypeData {
  name: string;
  label: string;
  description: string;
  count: string;
  image: string;
  buttonText: string;
}

interface PropertyCategorySectionProps {
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

  // Categorize properties from homeData
  const residentialTypes = ["apartment", "villa", "studio", "townhouse"];
  const commercialTypes = [
    "office-space",
    "retail-space",
    "warehouse",
    "showroom",
  ];

  // Generate property types with counts and descriptions
  const generatePropertyTypes = (types: string[]) => {
    return types.map((type) => {
      const properties = homeData.featuredCardsData.filter(
        (p) => p.type === type,
      );
      const count = properties.length;
      const firstImage = properties[0]?.imageUrl || "/image_1.webp";

      const descriptions: Record<string, string> = {
        apartment:
          "From sleek 1-bedroom to luxury 3-bedroom apartments, find furnished and non-furnished units across the UAE",
        villa:
          "Fit for a king, these spacious villas offer exceptional privacy, modern amenities, and ultimate comfort.",
        studio:
          "Perfect compact spaces with modern facilities, ideal for professionals and students.",
        townhouse:
          "Modern townhouses combining privacy with community living, perfect for families.",
        "office-space":
          "Professional commercial spaces designed for your business success with premium amenities.",
        "retail-space":
          "Prime retail locations perfect for your business with high foot traffic and modern facilities.",
        warehouse:
          "Large storage and logistics spaces with excellent accessibility and infrastructure.",
        showroom:
          "Spacious showrooms ideal for displaying products with high visibility and customer accessibility.",
      };

      const labels: Record<string, string> = {
        apartment: "Apartments",
        villa: "Villas",
        studio: "Studios",
        townhouse: "Townhouses",
        "office-space": "Office Spaces",
        "retail-space": "Retail Spaces",
        warehouse: "Warehouses",
        showroom: "Showrooms",
      };

      const buttonTexts: Record<string, string> = {
        apartment: "Explore Apartments",
        villa: "Explore Villas",
        studio: "Explore Studios",
        townhouse: "Explore Townhouses",
        "office-space": "Explore Offices",
        "retail-space": "Explore Retail",
        warehouse: "Explore Warehouses",
        showroom: "Explore Showrooms",
      };

      return {
        name: type,
        label: labels[type] || type,
        description: descriptions[type] || `Explore our ${type} properties.`,
        count: `${count}+`,
        image: firstImage,
        buttonText: buttonTexts[type] || `Explore ${type}`,
      };
    });
  };

  // Generate category data with counts
  const residentialCount = homeData.featuredCardsData.filter((p) =>
    residentialTypes.includes(p.type),
  ).length;
  const commercialCount = homeData.featuredCardsData.filter((p) =>
    commercialTypes.includes(p.type),
  ).length;
  const totalCount = homeData.featuredCardsData.length;

  const categoryTabs = [
    {
      name: "residential" as const,
      label: "Residential Properties",
      icon: <ResidentialSVG />,
      count: `${residentialCount}+`,
      description:
        "Explore a range of verified residential listings, featuring transparent pricing, flexible rental terms, and a hassle-free approach.",
    },
    {
      name: "commercial" as const,
      label: "Commercial Properties",
      icon: <CommercialSVG />,
      count: `${commercialCount}+`,
      description:
        "Discover prime commercial spaces perfect for your business with professional amenities and strategic locations.",
    },
  ];

  // Get property types based on selected category
  const currentPropertyTypes = useMemo(() => {
    const types =
      selectedCategory === "residential" ? residentialTypes : commercialTypes;
    const generated = generatePropertyTypes(types);
    return generated;
  }, [selectedCategory]);

  // Set default selected type
  const defaultType = currentPropertyTypes[0]?.name || "";
  if (!selectedType) {
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
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              gap: "1.5rem",
              pagination: true,
              arrows: true,
              autoplay: false,
              breakpoints: {
                1024: { perPage: 2, gap: "1rem" },
                768: { perPage: 1, gap: "1rem" },
              },
            }}
            className="splide-custom"
          >
            {currentPropertyTypes.map((type: PropertyTypeData, idx: number) => (
              <SplideSlide key={type.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="relative h-96 rounded-2xl overflow-hidden group"
                >
                  {/* Background Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={type.image}
                      alt={type.label}
                      fill
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                  {/* Property Count Badge */}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    {type.count}
                  </div>

                  {/* Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col h-full justify-end">
                    {/* Title */}
                    <Typography
                      as="h3"
                      size="2xl"
                      weight="bold"
                      className="mb-3"
                    >
                      {type.label}
                    </Typography>

                    {/* Description */}
                    <Typography
                      as="p"
                      size="sm"
                      className="text-gray-200 mb-6 line-clamp-3"
                    >
                      {type.description}
                    </Typography>

                    {/* Explore Button */}
                    <button className="self-start bg-gray-800 bg-opacity-60 hover:bg-opacity-80 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 group/btn">
                      <span>{type.buttonText}</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                </motion.div>
              </SplideSlide>
            ))}
          </Splide>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyCategorySection;
