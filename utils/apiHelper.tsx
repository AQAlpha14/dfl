"use client";

import { LOG_OUT } from "@/actions/actions";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ErrorResponse = {
  detail?: string;
  message?: string;
};

/* -------------------------------------------------------------------------- */
/*                              Error Handling                                */
/* -------------------------------------------------------------------------- */

export const handleResponse = (res: ErrorResponse | null | undefined): void => {
  if (res?.detail !== undefined) {
    toast.error(res.detail);
    logoutUser();
  } else {
    toast.error(res?.message ?? "An unknown error occurred");
  }
};

export const logoutUser = (): void => {
  LOG_OUT();
  localStorage.removeItem("vendor-storage");
};

/* -------------------------------------------------------------------------- */
/*                             Currency Helper                                 */
/* -------------------------------------------------------------------------- */

export const ConvertToCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
  }).format(value);
};

/* -------------------------------------------------------------------------- */
/*                             URL / Slug Helper                               */
/* -------------------------------------------------------------------------- */

export const textToRouteUrl = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* -------------------------------------------------------------------------- */
/*                          Language Text Resolver                             */
/* -------------------------------------------------------------------------- */

export const titleLangConverter = (
  titleEng: string,
  titleAr: string,
  locale: "en" | "ar"
): string => {
  return locale === "ar" ? titleAr : titleEng;
};

/* -------------------------------------------------------------------------- */
/*                             String Truncate                                 */
/* -------------------------------------------------------------------------- */

export function truncate(str: string, max: number = 30): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}
