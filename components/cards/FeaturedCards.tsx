// components/PropertyCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Heart, Bed, Bath, Eye, DollarSign, MapPin } from "lucide-react";

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
    featured = false,
    verified = false,
    onViewDetails,
  } = data;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="object-cover w-full h-60"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Heart className="text-red-500" size={20} />
        </button>
        {featured && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
        {verified && (
          <span className="absolute top-2 left-20 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Verified
          </span>
        )}
        <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {type}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-blue-600 font-bold">{price}</span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="mr-1" size={16} />
          <span>{location}</span>
        </div>

        <div className="flex justify-between text-gray-600 text-sm mb-3">
          <div className="flex items-center">
            <Bed className="mr-1" size={16} /> {beds} beds
          </div>
          <div className="flex items-center">
            <Bath className="mr-1" size={16} /> {baths} baths
          </div>
          <div className="flex items-center">{area} sqft</div>
        </div>

        <div className="flex justify-between text-gray-400 text-xs mb-3">
          <div className="flex items-center">
            <Eye className="mr-1" size={14} /> {views} views
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1" size={14} /> {inquiries} inquiries
          </div>
          <span>Posted {postedAgo}</span>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FeaturedCards;
