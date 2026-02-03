import Typography from "../Typography";
import SearchBarBlog from "./SearchBar/SearchBarBlog";

interface BlogsHeroProps {
  heading?: string;
  paragraph?: string[];
}

const BlogsHero: React.FC<BlogsHeroProps> = ({ heading, paragraph }) => {
  return (
    <section className={`bg-[#fafafa] secPadding`}>
      <div className="container">
        <div
          className={`max-w-md mx-auto grid grid-cols-1 place-items-center gap-4`}
        >
          <div className="flex flex-col justify-center items-center">
            <Typography as="h2" size="xl" weight="medium">
              {heading}
            </Typography>
            <div className={`grid lg:grid-cols-1 grid-cols-1`}>
              <div className="flex flex-col justify-center items-start">
                {paragraph?.map((para, ind) => (
                  <Typography key={ind} as="p" size="sm">
                    {para}
                  </Typography>
                ))}
              </div>
            </div>
          </div>
          <SearchBarBlog />
          <div className="max-w-md mx-auto "></div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHero;
