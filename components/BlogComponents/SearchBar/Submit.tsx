"use client";
import { SearchSVG } from "@/public/icons/SVGIcons";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="searchBarIcon flex justify-center items-center col-span-2 outline-none bg-black! hover:bg-linear-to-b hover:to-80% hover:from-primary hover:to-primary-dark text-white"
      aria-disabled={pending}
    >
      {pending ? (
        <div className="w-8 h-8 rounded-full animate-spin border-x-2 border-dashed border-white border-t-transparent"></div>
      ) : (
        <SearchSVG />
      )}
    </button>
  );
}
