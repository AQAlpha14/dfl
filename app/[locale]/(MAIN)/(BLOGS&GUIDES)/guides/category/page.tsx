import ViewAllPostCards from "@/components/BlogComponents/ViewAllPostCards";
import InterestedCategoriesSection from "@/components/BlogComponents/InterestedCategoriesSection";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const page = ({ searchParams }: PageProps) => {
  return (
    <div>
      <section className="sm:pt-20 pt-10">
        <InterestedCategoriesSection />
        <div className="container">
          <div className="mb-6">
            <ViewAllPostCards searchParams={searchParams} lGrid={true} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
