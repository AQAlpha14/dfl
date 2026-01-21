"use server";

import { BASE_URL } from "@/constants/constants";
import { endpoints } from "@/utils/endpoints";
import { headers } from "next/headers";

export async function GetFaqs() {
  "use server";
  let data;

  try {
    const headersInstance = await headers();
    const formData = new FormData();
    if (headersInstance.get("x-url") === "/") {
      formData.append("website_name", BASE_URL);
    } else {
      formData.append("website_name", BASE_URL + headersInstance.get("x-url"));
    }

    const res = await fetch(endpoints.FAQS.GET_FAQS, {
      method: "POST",
      body: formData,
    });
    const response = await res.json();
    data = response;
  } catch (error) {
    console.log("error", error);
  }
  return data;
}

export async function SEOAction() {
  "use server";
  try {
    const headersInstance = await headers();
    const formData = new FormData();
    if (headersInstance.get("x-url") === "/") {
      formData.append("website_name", BASE_URL);
    } else {
      formData.append("website_name", BASE_URL + headersInstance.get("x-url"));
    }

    const res = await fetch(endpoints.getMeta, {
      method: "POST",
      body: formData,
    });
    const response = await res.json();
    if (response?.status === 200) {
      return {
        ...response.data,
        opengraph_data: {
          ...response.data.opengraph_data,
          images: [{ url: response.data.opengraph_data.image }],
        },
        twitter_tag: {
          ...response.data.twitter_tag,
          images: [response.data.twitter_tag.image],
        },
      };
    } else {
      return {
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        url: "",
        canonical_url: "",
        h1: "",
        structuredDataHead: {},
        structuredDataPage: {},
        opengraph_data: {},
        twitter_tag: {},
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function GlobalScriptAction() {
  "use server";
  try {
    const formData = new FormData();
    formData.append("website_name", BASE_URL);
    const res = await fetch(endpoints.getGlobalScript, {
      method: "POST",
      body: formData,
    });
    const response = await res.json();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
