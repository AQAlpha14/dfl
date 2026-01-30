import Image from "@/components/Image";
import NotFound from "@/components/NotFound";
import Typography from "@/components/Typography";
import { useState } from "react";

/* ===================== TYPES ===================== */

interface PopularAreasSectionProps {
  heading: string;
  paragraph: string[];
  topTitle?: string;
  icon?: string;
  bottomTitle?: string;
}

interface Area {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
}

/* ===================== DATA ===================== */

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
    category: "Penthouses",
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

/* ===================== CATEGORIES + ICONS ===================== */

const categories = [
  "Villa",
  "Houses",
  "Apartment",
  "Townhouses",
  "Penthouses",
  "Bungalows",
  "Studio Apartments",
  "Lands",
] as const;

const categoryIcons: Record<string, string> = {
  Villa: "/icons/icon_51.svg",
  Houses: "/icons/icon_52.svg",
  Apartment: "/icons/icon_53.svg",
  Townhouses: "/icons/icon_54.svg",
  Penthouses: "/icons/icon_55.svg",
  Bungalows: "/icons/icon_56.svg",
  "Studio Apartments": "/icons/icon_57.svg",
  Lands: "/icons/icon_58.svg",
};

/* ===================== COMPONENT ===================== */

const PopularAreasSection = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
}: PopularAreasSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("Villa");

  const filteredAreas = areas.filter(
    (area) => area.category === activeCategory
  );

  return (
    <section className="relative overflow-hidden py-16 px-8 bg-[url(/icons/bg_2.svg)] bgimg">
      <div className="container">
        {/* ================= HEADING ================= */}
        <div className="max-w-lg mx-auto space-y-2 text-center">
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
          {paragraph.map((para, ind) => (
            <Typography key={ind} as="p" size="sm" color="white">
              {para}
            </Typography>
          ))}
        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="flex flex-wrap items-center gap-3 py-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                activeCategory === cat
                  ? "bg-primary border-primary text-white"
                  : "border-gray-400 text-white hover:bg-primary"
              }`}
            >
              <Image
                src={categoryIcons[cat]}
                alt={cat}
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="text-sm font-medium">{cat}</span>
            </button>
          ))}
        </div>

        {/* ================= GRID ================= */}
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
          <div className="mt-10 flex justify-center">
            <NotFound />
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularAreasSection;
