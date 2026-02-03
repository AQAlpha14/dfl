import Typography from "@/components/Typography";
import { FaqAccordian } from "./FaqAccordian";

/* ===================== TYPES ===================== */
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqTab {
  id: number;
  counter: number;
  title: string;
  tabicon?: string | React.ReactNode;
  faqs: FaqItem[];
}

interface FaqsSectionProps {
  data?: FaqTab[];
}

/* ===================== COMPONENT ===================== */
const FaqsSection = ({ data }: FaqsSectionProps) => {
  return (
    <section className="secPadding">
      <div className="container">
        <div>
          {/* Heading */}
          <div className="max-w-md w-full mx-auto text-center">
            <Typography as="h2" size="xl" weight="medium" color="secondary">
              {`Got Questions? We’ve Got the Answers`}
            </Typography>
            <Typography as="p" size="sm" className="pt-4">
              {`Whether you’re a landlord or tenant, our FAQs make things easier
              and clearer for you. And if you still have any questions, we’re
              just a message away.`}
            </Typography>
          </div>
          {/* FAQ Accordion */}
          <div className="xs:pt-8 pt-6 max-w-lg w-full mx-auto ">
            <FaqAccordian data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqsSection;
