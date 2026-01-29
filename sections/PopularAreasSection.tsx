import Image from "@/components/Image";
import NotFound from "@/components/NotFound";
import Typography from "@/components/Typography";
import { useState } from "react";

interface PopularAreasSectionProps {
  heading: string;
  paragraph: string[];
  topTitle?: string;
  bottomTitle?: string;
}

interface Area {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
}

const areas: Area[] = [
  {
    id: 1,
    name: "Jumeirah Village Circle",
    imageUrl: "/images/image_55.webp",
    category: "Villa",
  },
  {
    id: 2,
    name: "Business Bay",
    imageUrl: "/images/image_56.webp",
    category: "Villa",
  },
  {
    id: 3,
    name: "Downtown Dubai",
    imageUrl: "/images/image_57.webp",
    category: "Villa",
  },
  {
    id: 4,
    name: "Dubai Marina",
    imageUrl: "/images/image_58.webp",
    category: "Villa",
  },
  {
    id: 5,
    name: "Dubai Creek Harbour",
    imageUrl: "/images/image_59.webp",
    category: "Villa",
  },
  {
    id: 6,
    name: "Mohammed Bin Rashid City",
    imageUrl: "/images/image_60.webp",
    category: "Villa",
  },
  {
    id: 7,
    name: "Arjan",
    imageUrl: "/images/image_61.webp",
    category: "Villa",
  },
  {
    id: 8,
    name: "Palm Jumeirah",
    imageUrl: "/images/image_62.webp",
    category: "Villa",
  },
  {
    id: 9,
    name: "Jumeirah Village Circle",
    imageUrl: "/images/image_55.webp",
    category: "Penthouses",
  },
  {
    id: 10,
    name: "Business Bay",
    imageUrl: "/images/image_56.webp",
    category: "Apartment",
  },
  {
    id: 11,
    name: "Downtown Dubai",
    imageUrl: "/images/image_57.webp",
    category: "Apartment",
  },
  {
    id: 12,
    name: "Dubai Marina",
    imageUrl: "/images/image_58.webp",
    category: "Penthouse",
  },
  {
    id: 13,
    name: "Dubai Creek Harbour",
    imageUrl: "/images/image_59.webp",
    category: "Lands",
  },
  {
    id: 14,
    name: "Mohammed Bin Rashid City",
    imageUrl: "/images/image_60.webp",
    category: "Townhouses",
  },
  {
    id: 15,
    name: "Arjan",
    imageUrl: "/images/image_61.webp",
    category: "Studio Apartments",
  },
  {
    id: 16,
    name: "Palm Jumeirah",
    imageUrl: "/images/image_62.webp",
    category: "Bungalows",
  },
];

const categories = [
  "Villa",
  "Houses",
  "Apartment",
  "Townhouses",
  "Penthouses",
  "Bungalows",
  "Studio Apartments",
  "Lands",
];

const PopularAreasSection = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
}: PopularAreasSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("Villa");

  // Filter areas by selected category
  const filteredAreas = areas.filter(
    (area) => area.category === activeCategory,
  );

  return (
    <section className="relative overflow-hidden py-16 px-8 bg-[url(/icons/bg_2.svg)] bgimg">
      <div className="container">
        {/* Heading Section */}
        <div className="max-w-lg mx-auto space-y-2 flex flex-col justify-center text-center">
          {topTitle && (
            <Typography as="h3" size="md" weight="medium" color="white">
              {topTitle}
            </Typography>
          )}
          <Typography as="h2" size="xl" weight="semibold" color="white">
            {heading}
          </Typography>
          {bottomTitle && (
            <Typography as="h3" size="md" weight="medium" color="white">
              {bottomTitle}
            </Typography>
          )}
          {paragraph?.map((para, ind) => (
            <Typography key={ind} as="p" size="sm" color="white">
              {para}
            </Typography>
          ))}
        </div>
        {/* Categories */}
        <div className="flex flex-wrap itcems-center gap-3 py-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`hover:cursor-pointer px-4 py-2 rounded-lg border text-white hover:text-primary transition-colors ${
                activeCategory === cat
                  ? "bg-primary border-primary"
                  : "border-gray-400 bg-transparent hover:bg-primaryLight"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Areas Grid */}
        {filteredAreas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAreas.map((area) => (
              <div
                key={area.id}
                className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <Image
                  src={area.imageUrl}
                  alt={area.name}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-lg">
                  {area.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // NotFound outside the grid
          <div className="mt-10 flex justify-center">
            <NotFound />
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularAreasSection;
