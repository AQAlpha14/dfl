import React from "react";
import Image from "@/components/Image";
import Typography from "@/components/Typography/Typography";
import { isIndex, nocache } from "@/constants/global";
export async function generateMetadata() {
  return {
    robots: {
      index: isIndex,
      nocache: nocache,
    },
  };
}

const page = () => {
  return (
    <>
      <section className="h-full bg-[url('/assets/images/pw-thankyou-bg.webp')] bg-cover bg-right-top bg-no-repeat">
        <div className="container">
          <div className="grid grid-cols-1 mx-auto text-center">
            <div className="lg:w-6/12 py-40 mx-auto sm:space-y-6 space-y-4">
              <Image
                src="/assets/icons/thankyou_check.svg"
                alt="Check Icon"
                width={150}
                height={151}
                className="mx-auto w-40 bg-primary rounded-full"
              />
              <Typography
                as="h1"
                size="xl"
                weight="medium"
                className=""
              >
                {`THANK YOU`}
              </Typography>
              <Typography
                as="h2"
                size="lg"
                weight="medium"
                className=""
              >
                {`Thank you for filling out the form.`}
              </Typography>
              <Typography
                as="p"
                size="sm"
              >
                {`later label about monkey aid business jar teeth carry examine diagram funny round made mail club failed sunlight stand remember acres hair sun real`}
              </Typography>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
