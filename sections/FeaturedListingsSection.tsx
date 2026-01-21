import FeaturedCards, { Property } from "@/components/cards/FeaturedCards";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import { btnText } from "@/mockData/dummyData";
import homeData from "@/mockData/homeData.json";

const FeaturedListingsSection = () => {
  return (
    <section className="secPadding">
      <div className="container">
        <div className="">
          <div className="">
            <div className="container text-white">
              <Typography as="h2" size="xl" weight="normal">
                {`reprehenderit occaecat consequat ^est. Eiusmod tempor occaecat id^ nostrud consequat`}
              </Typography>
              <div className="space-y-3">
                <Typography as="p" size="sm" weight="normal">
                  {`Qui ullamco reprehenderit qui id consectetur quis aliquip elit reprehenderit minim minim. Id aliqua dolore laborum anim excepteur voluptate eiusmod cillum mollit minim. Eu dolore commodo aliquip Lorem ipsum exercitation laboris. Excepteur amet dolor consequat cupidatat. Esse amet id consectetur exercitation. Pariatur ut id excepteur adipisicing ullamco commodo. Ullamco dolor fugiat aliqua aute aute laboris fugiat cupidatat non duis veniam nostrud. Ex id quis consequat commodo. Elit fugiat minim voluptate Lorem tempor et laboris. Quis sint qui reprehenderit sunt magna nulla minim qui anim. Irure enim consectetur eiusmod ad proident reprehenderit occaecat consequat est.`}
                </Typography>
                <Typography as="p" size="sm" weight="normal">
                  {`Qui ullamco reprehenderit qui id consectetur quis aliquip elit reprehenderit minim minim. Id aliqua dolore laborum anim excepteur voluptate eiusmod cillum mollit minim. Eu dolore commodo aliquip Lorem ipsum exercitation laboris. Excepteur amet dolor consequat cupidatat. Esse amet id consectetur exercitation. Pariatur ut id excepteur adipisicing ullamco commodo. Ullamco dolor fugiat aliqua aute aute laboris fugiat cupidatat non duis veniam nostrud. Ex id quis consequat commodo. Elit fugiat minim voluptate Lorem tempor et laboris. Quis sint qui reprehenderit sunt magna nulla minim qui anim. Irure enim consectetur eiusmod ad proident reprehenderit occaecat consequat est.`}
                </Typography>
                <Link href={`/`} variant="primary" icon="">
                  {btnText.add_payment_method}
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeData.featuredCardsData?.map(
              (property: Property, idx: number) => (
                <FeaturedCards key={idx} data={property} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
