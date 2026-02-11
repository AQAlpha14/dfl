"use client";
import React, { useState, useEffect } from "react";
import SplideSlider from "@/sections/SplideSlider";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { SkeletonBlogCard1 } from "@/components/BlogComponents/Skeleton";
import NotFound from "@/components/NotFound";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface PropertyType {
  label: string;
  value: string;
}
interface PropertyTypeBtnSectionProps {
  heading?: string;
  onChange?: (value: string) => void;
  activeType?: string;
  propertyTypes?: PropertyType[];
}

/* -------------------------------------------------------------------------- */
/*                           Main Section Component                           */
/* -------------------------------------------------------------------------- */

const PropertyTypeBtnSection: React.FC<PropertyTypeBtnSectionProps> = ({
  heading,
  onChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("villas");

  const propertyTypes: PropertyType[] = [
    { label: "Villas", value: "villas" },
    { label: "Houses", value: "houses" },
    { label: "Apartments", value: "apartments" },
    { label: "Townhouses", value: "townhouses" },
    { label: "Penthouses", value: "penthouses" },
    { label: "Bungalows", value: "bungalows" },
    { label: "Studio Apartments", value: "studioapartments" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (value: string) => {
    setActiveType(value);
    onChange?.(value);
  };

  const options = {
    type: "loop",
    rewind: true,
    perPage: 6,
    padding: "0.8rem",
    perMove: 1,
    pagination: false,
    gap: "15px",
    arrows: false,
    breakpoints: {
      360: { perPage: 2 },
      640: { perPage: 3 },
      768: { perPage: 4 },
      1024: { perPage: 5 },
    },
  } as const;

  return (
    <section className="secPadding">
      <div className="container">
        {heading && (
          <div className="pb-4">
            <Typography as="h2" size="lg" weight="semibold" align="center">
              {heading}
            </Typography>
          </div>
        )}

        {propertyTypes.length ? (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <SkeletonBlogCard1 key={index} />
              ))}
            </div>
          ) : (
            <SplideSlider options={options}>
              <>
                {propertyTypes.map((type) => (
                  <div key={type.value} className="px-1">
                    <PropertyTypeBtn
                      label={type.label}
                      value={type.value}
                      active={activeType === type.value}
                      onClick={handleSelect}
                    />
                  </div>
                ))}
              </>
            </SplideSlider>
          )
        ) : (
          <NotFound />
        )}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Button Component                              */
/* -------------------------------------------------------------------------- */

interface PropertyTypeBtnProps {
  label: string;
  value: string;
  active?: boolean;
  onClick: (value: string) => void;
}

const PropertyTypeBtn: React.FC<PropertyTypeBtnProps> = ({
  label,
  value,
  active,
  onClick,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onClick(value)}
      className={`w-full transition-all ${
        active
          ? "bg-primary text-white border-primary"
          : "border-gray-300 hover:border-primary"
      }`}
    >
      {label}
    </Button>
  );
};

export default PropertyTypeBtnSection;
