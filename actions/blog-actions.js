"use server";

import { endpoints } from "@/utils/endpoints";

export const GetBlogs = async (body) => {
  "use server";
  try {
    const data = await fetch(endpoints.BLOGS.getBlogs, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogDetail = async (id, vendorId, slug) => {
  "use server";
  try {
    const data = await fetch(endpoints.BLOGS.getBlogDetail(id, vendorId, slug));
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogCategories = async (body) => {
  "use server";
  try {
    const data = await fetch(endpoints.BLOGS.getBlogCategories, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const NewsletterSubmit = async (formData) => {
  try {
    var body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }
    const response = await axios.post(endpoints.FORM.newsletter, body);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};