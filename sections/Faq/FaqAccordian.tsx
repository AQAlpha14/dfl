"use client";

import { useState, ReactNode } from "react";
import { Icon } from "@iconify/react";
import Typography from "@/components/Typography";
import { icons } from "@/mockData/dummyData";

/* ===================== TYPES ===================== */
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqTab {
  counter: number;
  id: number;
  title: string;
  tabicon?: string | ReactNode;
  faqs: FaqItem[];
}

interface FaqAccordianProps {
  data?: FaqTab[];
}

interface AccordionItemProps {
  id: number;
  title: string;
  content: string;
  isOpen: boolean;
  onClick: (id: number) => void;
}

/* ===================== COMPONENT ===================== */
export function FaqAccordian({ data = [] }: FaqAccordianProps) {
  const [activeTab, setActiveTab] = useState<number | undefined>(data[0]?.id);
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
    setOpenItemId(null); // reset accordion
  };

  const handleItemClick = (id: number) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  const activeFaqs = data.find((tab) => tab.id === activeTab)?.faqs || [];

  return (
    <div>
      {/* ===================== TABS ===================== */}
      <div className="flex lg:flex-nowrap flex-wrap items-center justify-center xs:gap-4 gap-3 mb-6">
        {data.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center gap-2 hover:cursor-pointer xs:px-4 px-2 py-2 rounded-md xs:text-sm text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "text-white bg-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {typeof tab.tabicon === "string" ? (
              <Icon
                icon={tab.tabicon}
                width="1.3rem"
                height="1.3rem"
                className={`transition-transform duration-300`}
              />
            ) : (
              tab.tabicon
            )}
            {tab.title}
            <span className="rounded-full bg-secondary/10 w-6 h-6 flex items-center justify-center">{tab.counter}</span>
          </button>
        ))}
      </div>

      {/* ===================== ACCORDION ===================== */}
      <div className="overflow-hidden">
        {activeFaqs.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.question}
            content={item.answer}
            isOpen={openItemId === item.id}
            onClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
}

/* ===================== ITEM ===================== */
const AccordionItem = ({
  id,
  title,
  content,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div className="mb-3">
      <div className="border border-gray-200 px-4 py-3 rounded-lg">
        <button
          type="button"
          onClick={() => onClick(id)}
          className="w-full flex justify-between items-start gap-4 text-left hover:cursor-pointer"
        >
          <Typography as="p" size="sm" weight="medium" className={`${
            isOpen ? "pb-2" : ""
          }`}>
            {title}
          </Typography>
          <Icon
            icon={icons.arrowRight}
            width="1.3rem"
            height="1.3rem"
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`bg-primaryLight px-4 rounded-md border-l-3 border-primary overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen py-2 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Typography as="p" size="sm" className="">
            {content}
          </Typography>
        </div>
      </div>
    </div>
  );
};
