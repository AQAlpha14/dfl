"use client";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const PaymentForm = () => {
  const [useShippingAddress, setUseShippingAddress] = useState(true);

  return (
    <div className="max-w-xl p-4">
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between bg-cyan-100 px-4 py-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              defaultChecked
              className="accent-cyan-500"
            />
            <span className="font-medium">Credit card</span>
          </label>
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-white rounded-lg w-16 flex justify-center">
              <Icon
                icon="logos:visa"
                width="2em"
                height="2em"
                className="text-gray"
              />
            </div>
            <div className="px-2 py-1 bg-white rounded-lg w-16 flex justify-center">
              <Icon
                icon="logos:mastercard"
                width="2em"
                height="2em"
                className="text-gray"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-6 bg-white space-y-4">
          <input
            type="text"
            placeholder="Card number"
            className="w-full border-b outline-none py-2 placeholder-gray-400"
          />

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Expiration date (MM / YY)"
              className="w-1/2 border-b outline-none py-2 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Security code"
              className="w-1/2 border-b outline-none py-2 placeholder-gray-400"
            />
          </div>

          <input
            type="text"
            placeholder="Name on card"
            className="w-full border-b outline-none py-2 placeholder-gray-400"
          />

          <label className="flex items-center gap-2 mt-2 text-sm">
            <input
              type="checkbox"
              checked={useShippingAddress}
              onChange={() => setUseShippingAddress(!useShippingAddress)}
              className="accent-primary"
            />
            Use shipping address as billing address
          </label>
        </div>
      </div>

      <Button
        className="mt-4"
        variant={`primary`}
        text={`Add Payment Method`}
      />
    </div>
  );
};

export default PaymentForm;
