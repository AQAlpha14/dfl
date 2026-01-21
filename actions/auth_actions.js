"use server";

import { endpoints } from "@/utils/endpoints";

// import { setToken } from "@/lib/auth";

export const onSignup = async (formData) => {
  "use server";
  let data;
  try {
    let body = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "value") {
          body.append(key, JSON.stringify(formData[key]));
        } else {
          body.append(key, formData[key]);
        }
      }
    }
    const response = await fetch(endpoints.AUTH.SIGN_UP, {
      method: "POST",
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    data = res;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return data;
};

export const onSignin = async (formData) => {
  "use server";
  let data;
  try {
    let body = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "value") {
          body.append(key, JSON.stringify(formData[key]));
        } else {
          body.append(key, formData[key]);
        }
      }
    }
    const response = await fetch(endpoints.AUTH.SIGN_IN, {
      method: "POST",
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    console.log("res", res);
    data = res;
  } catch (error) {
    console.log("res", error);
    console.error("Error fetching data:", error.message);
  }
  return data;
};

export const onVerification = async (id, otp) => {
  "use server";
  let data;
  try {
    const response = await fetch(endpoints.AUTH.VERIFY_OTP(id, otp), {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    data = res;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return data;
};

export const forgotPassword = async (formData) => {
  "use server";
  let data;
  try {
    let body = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "value") {
          body.append(key, JSON.stringify(formData[key]));
        } else {
          body.append(key, formData[key]);
        }
      }
    }
    const response = await fetch(endpoints.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    data = res;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return data;
};
