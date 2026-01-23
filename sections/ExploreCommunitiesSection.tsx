"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import ExploreCommunitiesCard from "@/components/cards/ExploreCommunitiesCard";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText } from "@/mockData/dummyData";
import Image from "@/components/Image";

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
    communities: {
      [city: string]: CommunityItem[];
    };
  };
}

const ExploreCommunitiesSection = ({
  data,
}: ExploreCommunitiesSectionProps) => {
  const { heading, description, cities, subTabs, communities } = data;

  const [activeCity, setActiveCity] = useState(cities[0]);
  const [activeSubTab, setActiveSubTab] = useState(subTabs[0].value);

  /* ===================== FILTERED DATA ===================== */
  const filteredCommunities = useMemo(() => {
    return (
      communities?.[activeCity]?.filter((item) =>
        item.category.includes(activeSubTab),
      ) || []
    );
  }, [activeCity, activeSubTab, communities]);

  return (
    <section className="secPadding bg-white">
      <div className="container">
        {/* ===================== HEADER ===================== */}
        <div className="max-w-xl mx-auto text-center space-y-3">
          <Typography as="h2" size="xl" weight="semibold">
            {heading}
          </Typography>
          {/* ===================== CITY TABS ===================== */}
          <div className="inline-flex items-center justify-center flex-wrap gap-3 mt-6 bg-white shadow-lg rounded-md p-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={activeCity === city ? "primary" : "outline"}
                onClick={() => setActiveCity(city)}
                className={`${activeCity === city ? "" : "border-none! text-secondary/80!"}`}
              >
                {city}
              </Button>
            ))}
          </div>
          <Typography as="p" size="sm" className="py-6">
            {description}
          </Typography>
          {/* ===================== SUB TABS ===================== */}
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {subTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeSubTab === tab.value ? "primary" : "outline"}
                className={`flex items-center gap-2 rounded-full! ${activeSubTab === tab.value ? "" : "border-secondary/80! text-secondary/80!"}`}
                onClick={() => setActiveSubTab(tab.value)}
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.value}`}
                  width={24}
                  height={24}
                />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        {/* ===================== CARDS ===================== */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
          {filteredCommunities.length ? (
            filteredCommunities.map((item) => (
              <ExploreCommunitiesCard
                key={item.id}
                data={{
                  title: item.title,
                  paragraph: item.description,
                  priceRange: item.price,
                  rating: item.rating ?? 0,
                  totalProperties: item.properties,
                  imageUrl: item.image,
                }}
              />
            ))
          ) : (
            <Typography align="center" className="col-span-full">
              No communities found
            </Typography>
          )}
        </div>

        {/* ===================== CTA ===================== */}
        <div className="mt-10 flex justify-center">
          <Link href="/communities" icon2>
            {btnText.view_all_communities_in_dubai}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCommunitiesSection;
