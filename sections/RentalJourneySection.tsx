"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { btnText } from "@/mockData/dummyData";

/* =========================
   TYPES
========================= */

type TopTab = "For Tenants" | "For Landlords";

interface VerticalTabItem {
  id: number;
  icon: string;
  title: string;
  content: string;
  image: string;
}

interface JourneySectionData {
  topTitle: string;
  heading: string;
  paragraph: string[];
  tabs: VerticalTabItem[];
}

type RentalJourneyData = Record<TopTab, JourneySectionData>;

/* =========================
   DATA
========================= */

const RENTAL_JOURNEY_DATA: RentalJourneyData = {
  "For Tenants": {
    topTitle: "Why Choose DirectFromLandlord?",
    heading: "Simple & Stress-free Rental Journey",
    paragraph: [
      "Experience a rental journey focused on trust, comfort, and complete peace of mind.",
    ],
    tabs: [
      {
        id: 1,
        icon: "shield",
        title: "",
        content:
          "Keep more money in your pocket with commission-free rentals and transparent pricing, helping you budget smarter.",
        image: "/images/image_4.webp",
      },
      {
        id: 2,
        icon: "user",
        title: "",
        content:
          "Browse with confidence through verified listings and landlord badges, refreshed hourly for reliable options only.",
        image: "/images/image_5.webp",
      },
      {
        id: 3,
        icon: "search",
        title: "",
        content:
          "Find your perfect match faster using advanced filters, a smart matching algorithm, flexible payment plans, and a rental affordability calculator.",
        image: "/images/image_6.webp",
      },
      {
        id: 4,
        icon: "calendar",
        title: "",
        content:
          "Save time with convenience tools like instant viewing schedulers, virtual tours, and video walkthroughs before committing.",
        image: "/images/image_7.webp",
      },
      {
        id: 5,
        icon: "chat",
        title: "",
        content:
          "Communicate with ease through secure in-app chat/calls, and direct conversations with landlords.",
        image: "/images/image_8.webp",
      },
    ],
  },

  "For Landlords": {
    topTitle: "Why Choose DirectFromLandlord?",
    heading: "Simplify Property Management for Maximum Time & Cost Efficiency",
    paragraph: [
      "DFL centralizes listings, tenant management, and payments on a single platform, reducing vacancies and boosting rental ROI.",
    ],
    tabs: [
      {
        id: 1,
        icon: "shield",
        title: "",
        content:
          "Maximize profitability by eliminating agent commissions and paying only when a tenant signs, thanks to the success fee model.",
        image: "/images/image_9.webp",
      },
      {
        id: 2,
        icon: "user",
        title: "",
        content:
          "Boost occupancy rates with multi-platform syndication, tenant reviews that build trust, and pre-filtered serious renters.",
        image: "/images/image_10.webp",
      },
      {
        id: 3,
        icon: "search",
        title: "",
        content:
          "Manage smarter, not harder using a single dashboard to control listings, digital contracts, and e-signature integration.",
        image: "/images/image_11.webp",
      },
      {
        id: 4,
        icon: "calendar",
        title: "",
        content:
          "Stay in control with secure, direct landlord-to-tenant communication built into the platform.",
        image: "/images/image_12.webp",
      },
      {
        id: 5,
        icon: "chat",
        title: "",
        content:
          "Reduce vacancy risks through smart tenant-matching tools, efficient rental management, and time-saving automation.",
        image: "/images/image_13.webp",
      },
    ],
  },
};

/* =========================
   COMPONENT
========================= */

export default function RentalJourneySection() {
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("For Tenants");

  const [activeVerticalTab, setActiveVerticalTab] = useState<number>(
    RENTAL_JOURNEY_DATA["For Tenants"].tabs[0].id,
  );

  const section = RENTAL_JOURNEY_DATA[activeTopTab];
  const activeTab = section.tabs.find((tab) => tab.id === activeVerticalTab)!;

  return (
    <section className="secPadding bg-linear-to-br from-slate-900 to-slate-800 text-white">
      <div className="container">
        {/* HEADER */}
        <div className="max-w-lg mb-10 space-y-2">
          {section.topTitle && (
            <Typography as="h3" size="md" weight="medium" color="white">
              {section.topTitle}
            </Typography>
          )}
          <Typography as="h2" size="xl" weight="semibold" color="white">
            {section.heading}
          </Typography>
          {section.paragraph?.map((para, ind) => (
            <Typography key={ind} as="p" size="sm" color="white">
              {para}
            </Typography>
          ))}
        </div>

        {/* TOP TABS */}
        <div className="flex gap-4 mb-10">
          {(Object.keys(RENTAL_JOURNEY_DATA) as TopTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTopTab(tab);
                setActiveVerticalTab(RENTAL_JOURNEY_DATA[tab].tabs[0].id);
              }}
              className={`px-5 py-2 hover:cursor-pointer rounded-md text-sm transition-all ${
                tab === activeTopTab
                  ? "bg-blue-500 shadow-lg"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          {/* VERTICAL TABS */}
          <div className="space-y-3">
            {section.tabs.map((tab) => {
              const isActive = tab.id === activeVerticalTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveVerticalTab(tab.id)}
                  className={`relative hover:cursor-pointer w-full p-5 rounded-xl text-left transition ${
                    isActive ? "bg-white/5 hover:bg-white/10" : ""
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 h-full w-0.5 bg-white rounded-full"
                    />
                  )}

                  {tab.title && (
                    <Typography
                      as="h5"
                      size="md"
                      weight="semibold"
                      color="white"
                    >
                      {tab.title}
                    </Typography>
                  )}
                  {tab.content && (
                    <Typography as="p" size="sm" color="white">
                      {tab.content}
                    </Typography>
                  )}
                </button>
              );
            })}
            <div className="pt-4">
              <Button icon2 variant="primary">
                {btnText.find_a_room}
              </Button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="aspect-620/545 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.image}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeTab.image}
                  alt={activeTab.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
