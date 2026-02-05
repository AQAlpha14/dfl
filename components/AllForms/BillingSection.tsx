"use client";
import React from "react";
import BillingForm from "./BillingForm";
import Heading2 from "../Typography/Heading2";

export default function BillingSection() {
  return (
    <>
      <section className={`sm:py-40 py-32 sm:bg-[url(/assets/icons/bg_1.svg)] bgimg`}>
        <div className="container ">
          <div className="max-w-md mx-auto pr-6">
            <div className="">
              <Heading2
                blackHeading={`Billing Details`}
                className={`text-center`}
              />
            </div>
            <div className="pt-8">
              <BillingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
