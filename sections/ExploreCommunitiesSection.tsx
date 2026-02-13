"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/Button";
import ExploreCommunitiesCard from "@/components/cards/ExploreCommunitiesCard";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import Image from "@/components/Image";
import { btnText } from "@/mockData/dummyData";
import NotFound from "@/components/NotFound";

/* ===================== TYPES ===================== */

interface SubTab {
  label: string;
  value: string;
  icon: string;
}

interface CommunityItem {
  id: number;
  title: string;
  image: string;
  rating?: number;
  properties: number;
  category: string[];
  description: string;
  price: string;
}

interface ExploreCommunitiesSectionProps {
  data: {
    heading: string;
    description: string;
    cities: string[];
    subTabs: SubTab[];
    communities: Record<string, CommunityItem[]>;
  };
}

/* ===================== ANIMATION VARIANTS ===================== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

/* ===================== COMPONENT ===================== */

const ExploreCommunitiesSection = ({
  data,
}: ExploreCommunitiesSectionProps) => {
  const { heading, description, cities, subTabs, communities } = data;

  const [activeCity, setActiveCity] = useState(cities[0]);
  const [activeSubTab, setActiveSubTab] = useState("");

  /* ===================== DEFAULT SUB TAB ===================== */
  useEffect(() => {
    const firstValidSubTab =
      subTabs.find((tab) =>
        communities?.[activeCity]?.some((item) =>
          item.category.includes(tab.value),
        ),
      )?.value || "";

    setActiveSubTab(firstValidSubTab);
  }, [activeCity, subTabs, communities]);

  /* ===================== CITY BASED SUB TABS ===================== */
  const citySubTabs = useMemo(() => {
    const cityData = communities?.[activeCity] || [];
    const categories = new Set<string>();

    cityData.forEach((item) =>
      item.category.forEach((cat) => categories.add(cat)),
    );

    return subTabs.filter((tab) => categories.has(tab.value));
  }, [activeCity, communities, subTabs]);

  /* ===================== FILTERED DATA ===================== */
  const filteredCommunities = useMemo(() => {
    if (!activeSubTab) return [];
    return (
      communities?.[activeCity]?.filter((item) =>
        item.category.includes(activeSubTab),
      ) || []
    );
  }, [activeCity, activeSubTab, communities]);

  /* ===================== RENDER ===================== */

  return (
    <section className="secPadding bg-white">
      <div className="container">
        {/* ===================== HEADER ===================== */}
        <div className="max-w-xl mx-auto text-center space-y-4">
          <Typography as="h2" size="xl" weight="semibold">
            {heading}
          </Typography>

          {/* ===================== CITY TABS ===================== */}
          <div className="inline-flex flex-wrap justify-center gap-3 bg-white shadow-lg rounded-md p-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={activeCity === city ? "primary" : "outline"}
                onClick={() => setActiveCity(city)}
              >
                {city}
              </Button>
            ))}
          </div>

          <Typography as="p" size="sm" className="pt-4">
            {description}
          </Typography>

          {/* ===================== SUB TABS ===================== */}
          <div className="flex justify-center flex-wrap gap-2 pt-4 pb-6">
            {citySubTabs.map((tab) => {
              const isActive = activeSubTab === tab.value;
              return (
                <Button
                  key={tab.value}
                  onClick={() => setActiveSubTab(tab.value)}
                  variant="outline"
                  className="relative sm:px-6! xs:px-4! px-2! rounded-full! bg-white! text-secondary border-gray-200! shadow-sm"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSubTab"
                      className="absolute inset-0 rounded-full bg-primary text-white!"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 flex items-center md:text-base xs:text-sm text-xs gap-2 ${isActive ? "text-white!" : ""}`}
                  >
                    <Image src={tab.icon} alt={tab.label} width={20} height={20} />
                    {/* {tab.icon} */}
                    {tab.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* ===================== CARDS ===================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCity}-${activeSubTab}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-wrap justify-center gap-4"
            // className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-10"
          >
            {filteredCommunities.length ? (
              filteredCommunities.map((item) => (
                <motion.div key={item.id} variants={cardVariants} exit="exit" className="lg:basis-[23.5%] basis-full ">
                  <ExploreCommunitiesCard
                  className=""
                    data={{
                      title: item.title,
                      paragraph: item.description,
                      priceRange: item.price,
                      rating: item.rating ?? 0,
                      totalProperties: item.properties,
                      imageUrl: item.image,
                    }}
                  />
                </motion.div>
              ))
            ) : (
              // <Typography align="center" className="col-span-full">
              //   No communities found
              // </Typography>
              <NotFound />
            )}
          </motion.div>
        </AnimatePresence>

        {/* ===================== CTA ===================== */}
        <div className="mt-12 flex justify-center">
          <Link href="/listing" icon2>
            {btnText.view_all_communities_in_dubai}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCommunitiesSection;
