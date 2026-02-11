import CalculatorForm from "@/components/AllForms/CalculatorForm";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";
import FeaturedCards, { Property } from "@/components/cards/FeaturedCards";
import SearchBar from "@/components/FormFields/SearchBar";
import Typography from "@/components/Typography";
import homeData from "@/mockData/homeData.json";
import { Icon } from "@iconify/react";

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
  return (
    <div className="secPadding">
      <div className="container">
        <SearchBar />

        <div className="pt-10">
          <div className="max-w-md w-full pb-8">
            <InterestedCategoriesSection />
          </div>

          {/* Header + view switch */}
          <div className="flex justify-between gap-4">
            <Typography as="h3" size="xl" weight="medium" className="pb-4">
              {heading || "Residential Properties for rent in UAE"}
            </Typography>
            <div className="flex items-center gap-2 cursor-pointer">
              <Icon
                icon="i-fluent:navigation-28-filled"
                width={34}
                height={34}
                className="bg-white text-black p-1 rounded-sm"
              />
              <Icon
                icon="i-radix-icons:grid"
                width={34}
                height={34}
                className="bg-primary text-white p-1 rounded-sm"
              />
            </div>
          </div>
          {/* Listing + sidebar */}
          <div className="flex justify-between gap-4">
            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {homeData.featuredCardsData.map(
                (property: Property, idx: number) => (
                  <FeaturedCards data={property} key={idx} />
                ),
              )}
            </div>
            {/* Recommended searches */}
            <div className="space-y-4 basis-1/4">
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
    </div>
  );
};

export default ListingPage;
