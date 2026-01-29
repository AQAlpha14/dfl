import CalculatorForm from "@/components/AllForms/CalculatorForm";
import Typography from "@/components/Typography";

interface CalculatorSectionProps {
  heading: string;
  paragraph: string[];
  topTitle?: string;
  bottomTitle?: string;
}
const CalculatorSection = ({
  topTitle,
  heading,
  bottomTitle,
  paragraph,
}: CalculatorSectionProps) => {
  return (
    <section className="secPadding">
      <div className="container">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="max-w-xl mx-auto space-y-2">
            {topTitle && (
              <Typography as="h3" size="md" weight="medium">
                {topTitle}
              </Typography>
            )}
            <Typography as="h2" size="xl" weight="semibold">
              {heading}
            </Typography>
            {bottomTitle && (
              <Typography as="h3" size="md" weight="medium">
                {bottomTitle}
              </Typography>
            )}
            {paragraph?.map((para, ind) => (
              <Typography key={ind} as="p" size="sm">
                {para}
              </Typography>
            ))}
          </div>
          <div className="">
            <CalculatorForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
