"use client";
import { Icon } from "@iconify/react";
import Typography from "./Typography";

function NotFound() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="flex justify-center items-center">
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-8 w-full text-center">
          <div className="flex justify-center mb-4 text-primary">
            <Icon icon="mdi:alert-circle-outline" width="48" height="48" />
          </div>
          <Typography as="h2" size="lg" weight="medium" color="secondary">
            {"No Results Found"}
          </Typography>
          <Typography as="p" size="sm">
            {"Sorry, we couldn't find any data that matches your request."}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
