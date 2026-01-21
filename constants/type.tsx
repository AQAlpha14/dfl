
export interface CounterReviewItem {
  numbers: string | number;
  description?: string;
  icon?: string;
}

export interface HeroSectionProps {
  topTitle?: string;
  heading: string;
  bottomTitle?: string;
  paragraph?: string[];
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlign?: string; // e.g., "items-center", "items-start"
  contentAlignment?: string; // e.g., "lg:justify-center"
  list?: string[];
  listTitle?: string;
  counterReview?: CounterReviewItem[];
  bookFreeDemo?: boolean;
  content?: string;
  className?: string;
}