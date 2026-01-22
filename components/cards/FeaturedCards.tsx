// components/PropertyCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Bed, Bath, Eye, DollarSign, MapPin } from "lucide-react";
import { btnText, icons } from "@/mockData/dummyData";
import Typography from "../Typography";
import Button from "../Button";
import { Icon } from "@iconify/react";
import { AreaSVG, BathSVG, BedsSVG } from "@/public/icons/SVGIcons";

// Define the shape of a property
export type Property = {
  imageUrl: string;
  title: string;
  type: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: number; // in sqft
  views: number;
  inquiries: number;
  postedAgo: string;
  featured?: boolean;
  verified?: boolean;
  onViewDetails?: () => void;
};

// Component accepts a single `data` prop of type Property
type PropertyCardProps = {
  data: Property;
};

const FeaturedCards: React.FC<PropertyCardProps> = ({ data }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const {
    imageUrl,
    title,
    type,
    price,
    location,
    beds,
    baths,
    area,
    views,
    inquiries,
    postedAgo,
    featured,
    verified,
    onViewDetails,
  } = data;

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm h-full">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="object-cover w-full h-60"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 left-4 rounded-full hover:bg-white/20 transition"
        >
          <Heart
            className={`transition-colors ${isFavorited ? "fill-red-500 text-red-500" : "text-black"}`}
            size={15}
          />
        </button>
        <div className="absolute top-4 right-2 flex gap-2">
          {featured && (
            <Typography
              as="p"
              size="xs"
              className="bg-purple text-white text-xs font-semibold px-4 py-2 rounded-md"
            >
              Featured
            </Typography>
          )}
          {verified && (
            <Typography
              as="p"
              size="xs"
              className="bg-green text-white text-xs font-semibold px-4 py-2 rounded-md"
            >
              Verified
            </Typography>
          )}
        </div>

        <span className="absolute bottom-4 left-4 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-md">
          {type}
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <span className="text-primary font-bold">{price}</span>
        </div>

        <div className="flex items-start text-gray-500 font-medium mb-3 line-clamp-2">
          <MapPin className="mr-1" size={24} />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-start gap-4 text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <BedsSVG />
            {beds} beds
          </div>
          <div className="flex items-center gap-2">
            <AreaSVG />
            {area} sqft
          </div>
          <div className="flex items-center gap-2">
            <BathSVG /> {baths} baths
          </div>
        </div>

        <div className="flex justify-between bg-[#F9FAFB] text-xs mb-3 py-2 px-4 rounded-lg text-gray-600">
          <div className="flex flex-col items-center">
            <span className="flex items-center mr-4 text-sm">
              <Icon icon={icons.view} width="14" height="14" className="mr-1" />
              views
            </span>
            <Typography as="h3" size="sm" className="">
              {views}
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center mr-4 text-sm">
              <Icon
                icon={icons.doller}
                width="14"
                height="14"
                className="mr-1"
              />
              inquiries
            </span>
            <Typography as="h3" size="sm" className="">
              {inquiries}
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center mr-4 text-sm">
              <Icon
                icon={icons.doller}
                width="14"
                height="14"
                className="mr-1"
              />
              Posted
            </span>
            <Typography as="h3" size="sm" className="">
              {postedAgo}
            </Typography>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-center">
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="border-secondary/20 text-primary inline-flex items-center justify-center w-full"
          >
            <Eye className="mr-1" size={14} />
            {btnText.view_details}
          </Button>
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="border-secondary/20 text-primary py-3"
          >
            <Icon icon={icons.shares} width="14" height="14" className="mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards;
