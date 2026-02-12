"use client";

import { useState, useMemo } from "react";
import Typography from "@/components/Typography";
import homeData from "@/mockData/homeData.json";
import PropertyServiceSolCard from "@/components/cards/PropertyServiceSolCard";

/* ===================== TYPES ===================== */

type CategoryName = "ForTenants" | "ForLandlords";

interface PropertyServiceSolSectionProps {
  heading?: string;
  isGrid?: string;
  paragraph?: string[];
}

/* ===================== COMPONENT ===================== */

const PropertyServiceSolSection = ({
  heading,
  paragraph = [],
}: PropertyServiceSolSectionProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName>("ForTenants");

  const categoryData = homeData.PropertyServiceSolData;

  /* ===================== CATEGORY TABS ===================== */
  const categoryTabs = useMemo(
    () =>
      categoryData.map((category) => ({
        name: category.name as CategoryName,
        tabTitle: category.tabTitle,
        tabLabel: category.tabLabel,
      })),
    [categoryData],
  );

  /* ===================== PROPERTY TYPES ===================== */
  const currentPropertyTypes = useMemo(() => {
    return (
      categoryData.find((cat) => cat.name === selectedCategory)
        ?.propertyTypes || []
    );
  }, [selectedCategory, categoryData]);

  return (
    <section className="secPadding bg-primaryLight">
      <div className="container">
        {/* ===================== HEADER ===================== */}
        <div className="mb-12 max-w-lg mx-auto text-center">
          <div className="pb-6">
            {heading && (
              <Typography as="h2" size="xl" weight="bold">
                {heading}
              </Typography>
            )}
            {paragraph.map((para, index) => (
              <Typography key={index} as="p" size="sm" className="mt-2">
                {para}
              </Typography>
            ))}
          </div>
          {/* ===================== CATEGORY TABS ===================== */}
          <div className="inline-flex flex-wrap gap-4 mb-8 bg-white p-3 shadow-xl rounded-xl">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setSelectedCategory(tab.name)}
                  className={`flex flex-col hover:cursor-pointer items-center px-6 py-3 rounded-lg font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary shadow-lg shadow-primary/40"
                        : "text-gray-400 hover:bg-primary hover:text-white"
                    }`}
                >
                  <Typography
                    as="span"
                    size="sm"
                    weight="medium"
                    className={isActive ? "text-white" : "text-gray-400"}
                  >
                    {tab.tabTitle}
                  </Typography>
                  <Typography
                    as="span"
                    size="sm"
                    weight="medium"
                    className={isActive ? "text-white" : "text-gray-400"}
                  >
                    {tab.tabLabel}
                  </Typography>
                </button>
              );
            })}
          </div>
        </div>
        {/* ===================== GRID ===================== */}
        <div 
          key={selectedCategory}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {currentPropertyTypes.map((item) => (
            <PropertyServiceSolCard key={`${selectedCategory}-${item.cardTitle}`} type={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyServiceSolSection;