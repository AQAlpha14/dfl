"use client";
import CalculatorForm from "@/components/AllForms/CalculatorForm";
import Breadcrumb from "@/components/BlogComponents/Breadcrumb";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";
import FeaturedCards, { Property } from "@/components/cards/FeaturedCards";
import ListingCard from "@/components/cards/ListingCard";
import SearchBar from "@/components/FormFields/SearchBar";
import Typography from "@/components/Typography";
import homeData from "@/mockData/homeData.json";
import { Grid2X2, Menu } from "lucide-react";
import { useMemo, useState } from "react";

interface ListingPageProps {
  heading?: string;
}

/* ---------------------------------- */
/* Listing Data */
/* ---------------------------------- */
const recommendedSearches = [
  { label: "Studio Properties for rent in UAE" },
  {
    label: "1 Bedroom Properties for rent in UAE",
  },
  {
    label: "2 Bedroom Properties for rent in UAE",
  },
  {
    label: "3 Bedroom Properties for rent in UAE",
  },
  {
    label: "4 Bedroom Properties for rent in UAE",
  },
  { label: "Apartments for rent in UAE" },
  { label: "Villas for rent in UAE" },
  { label: "Townhouses for rent in UAE" },
  {
    label: "Hotel Apartments for rent in UAE",
  },
  { label: "Penthouses for rent in UAE" },
  { label: "Villa Compounds for rent in UAE" },
  { label: "Residential Buildings for rent in UAE" },
  { label: "Residential Floors for rent in UAE" },
  { label: "Studio Properties for rent in UAE" },
  {
    label: "1 Bedroom Properties for rent in UAE",
  },
  {
    label: "2 Bedroom Properties for rent in UAE",
  },
  {
    label: "3 Bedroom Properties for rent in UAE",
  },
  {
    label: "4 Bedroom Properties for rent in UAE",
  },

  { label: "Apartments for rent in UAE" },
  { label: "Villas for rent in UAE" },
  { label: "Townhouses for rent in UAE" },
  {
    label: "Hotel Apartments for rent in UAE",
  },
  { label: "Penthouses for rent in UAE" },
  { label: "Villa Compounds for rent in UAE" },
  { label: "Residential Buildings for rent in UAE" },
  { label: "Residential Floors for rent in UAE" },
];
const recommendedCitySearches = [
  { label: "Dubai" },
  { label: "Ajman" },
  { label: "Abu Dhabi" },
  { label: "Sharjah" },
  { label: "Al Ain" },
  { label: "Fujairah" },
  { label: "Umm Al Quwain" },
  { label: "Ras Al Khaimah" },
];

const ListingPage = ({ heading }: ListingPageProps) => {
  /* ---------------- View Mode ---------------- */
  const [view, setView] = useState<"grid" | "list">("grid");
  /* ---------------- Sorting ---------------- */
  const [sort, setSort] = useState("default");
  const sortedProperties = useMemo(() => {
    const data = [...homeData.featuredCardsData];
    if (sort === "price_low") {
      data.sort(
        (a: Property, b: Property) =>
          Number(a.price ?? 0) - Number(b.price ?? 0),
      );
    }
    if (sort === "price_high") {
      data.sort(
        (a: Property, b: Property) =>
          Number(b.price ?? 0) - Number(a.price ?? 0),
      );
    }
    return data;
  }, [sort]);

  return (
    <div className="secPadding">
      <Breadcrumb />
      <div className="container">
        <SearchBar />
        <div className="lg:pt-10 pt-2">
          <div className="max-w-md w-full pb-8">
            <InterestedCategoriesSection />
          </div>
        </div>
        {/* Listing + sidebar */}
        <div className="flex justify-between gap-4">
          {/* Cards */}
          <div className="flex-1">
            {/* View Switch */}
            <div className="flex items-center justify-between gap-2 w-full pb-4 mb-4">
              <Typography as="h3" size="xl" weight="medium">
                {heading || "Residential Properties for rent in UAE"}
              </Typography>
              <div className="sm:flex hidden items-center gap-2 cursor-pointer">
                <Menu
                  width={34}
                  height={34}
                  onClick={() => setView("list")}
                  className={`p-1 rounded-sm transition ${
                    view === "list"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                />
                <Grid2X2
                  width={34}
                  height={34}
                  onClick={() => setView("grid")}
                  className={`p-1 rounded-sm transition ${
                    view === "grid"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Grid View */}
            {view === "grid" && (
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {sortedProperties.map((property: Property, idx: number) => (
                  <FeaturedCards data={property} key={idx} />
                ))}
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="space-y-3">
                {sortedProperties.map((property: Property, idx: number) => (
                  <ListingCard data={property} key={idx} />
                ))}
              </div>
            )}
          </div>
          {/* Recommended searches */}
          <div className="lg:block hidden space-y-4 basis-1/4">
            <div className="flex items-center justify-end gap-3 pb-6">
              {/* Sorting */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="default">Sort By</option>
                <option value="price_low">Price: Low → High</option>
                <option value="price_high">Price: High → Low</option>
              </select>
            </div>
            <div className="bg-white shadow-md border border-gray-300 rounded-md p-5">
              <Typography
                as="h3"
                size="md"
                weight="medium"
                className="bg-primary text-white px-4 rounded-md py-2 mb-4"
              >
                Recommended searches
              </Typography>
              <ul className="space-y-2">
                {recommendedSearches.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition"
                  >
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white shadow-md border border-gray-300 rounded-md p-5">
              <Typography
                as="h3"
                size="md"
                weight="medium"
                className="bg-primary text-white px-4 rounded-md py-2 mb-4"
              >
                Browse By City
              </Typography>
              <ul className="space-y-2">
                {recommendedCitySearches.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition"
                  >
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white shadow-md border border-gray-300 rounded-md p-5">
              <Typography
                as="h3"
                size="md"
                weight="medium"
                className="bg-primary text-white px-4 rounded-md py-2 mb-4"
              >
                Savings Calculator
              </Typography>
              <CalculatorForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
