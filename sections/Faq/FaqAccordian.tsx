"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Typography from "@/components/Typography";
import { icons } from "@/mockData/dummyData";

/* ===================== TYPES ===================== */
interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
}

interface FaqTab {
  id: string;
  title: string;
  faqs: FaqItem[];
}

interface FaqAccordianProps {
  data?: FaqTab[];
}

interface AccordionItemProps {
  id: number | string;
  title: string;
  content: string;
  isOpen: boolean;
  onClick: (id: number | string) => void;
}

/* ===================== COMPONENT ===================== */
export function FaqAccordian({ data = [] }: FaqAccordianProps) {
  const [activeTab, setActiveTab] = useState<string>(data[0]?.id);
  const [openItemId, setOpenItemId] = useState<number | string | null>(null);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setOpenItemId(null); // reset accordion
  };

  const handleItemClick = (id: number | string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  const activeFaqs =
    data.find((tab) => tab.id === activeTab)?.faqs || [];

  return (
    <div>
      {/* ===================== TABS ===================== */}
      <div className="flex gap-4 mb-6 border-b">
        {data.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.title}
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
          className="w-full flex justify-between items-start gap-4 text-left"
        >
          <Typography as="p" size="sm" weight="medium">
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
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen pt-2 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Typography as="p" size="sm">
            {content}
          </Typography>
        </div>
      </div>
    </div>
  );
};
