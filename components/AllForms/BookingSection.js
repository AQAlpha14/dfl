"use client";
import React from "react";
import Heading2 from "../Typography/Heading2";
import BookingForm from "./BookingForm";

export default function BookingSection() {
  return (
    <>
      <section className={`sm:py-40 py-32 sm:bg-[url(/assets/icons/bg_1.svg)] bgimg`}>
        <div className="container ">
          <div className="max-w-md mx-auto pr-6">
            <div className="">
              <Heading2
                blackHeading={`Travel Details`}
                className={`text-center`}
              />
            </div>
            <div className="pt-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
