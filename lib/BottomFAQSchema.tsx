"use client";
import React from "react";

interface BottomFAQSchemaProps {
  data: {
    question: string;
    answer: string;
  }[];
}

const BottomFAQSchema: React.FC<BottomFAQSchemaProps> = ({ data }) => {
  const mainEntity = data?.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mainEntity,
  };

  return (
    <script
      async
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
    />
  );
};

export default BottomFAQSchema;
