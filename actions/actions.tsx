"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import endPoints from "@/constants/endPionts";
import { revalidateTag } from "next/cache";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ApiResponse<T = undefined> = {
  status?: number;
  message?: string;
  detail?: string;
  token?: string;
  data?: T;
};

type FormPayload = Record<string, any>;

const toFormData = (data: FormPayload): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, value instanceof Blob ? value : String(value));
  });
  return formData;
};

/* -------------------------------------------------------------------------- */
/*                               Cookie Helpers                               */
/* -------------------------------------------------------------------------- */

export async function createCookie(data: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", data, { secure: true });
}

export const fetchToken = async (): Promise<string | undefined> => {
  const token = (await cookies()).get("session")?.value;
  return token;
};

/* -------------------------------------------------------------------------- */
/*                                  GET                                       */
/* -------------------------------------------------------------------------- */

export const GET = async (
  endPoints: string,
  tags?: string[]
): Promise<ApiResponse> => {
  try {
    const token = await fetchToken();

    const response = await fetch(endPoints, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
      },
      next: tags ? { tags } : undefined,
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: (error as Error).message };
  }
};

/* -------------------------------------------------------------------------- */
/*                                  POST (FormData)                           */
/* -------------------------------------------------------------------------- */

export const POST = async (
  endPoints: string,
  formData: FormPayload,
  tags?: string[]
): Promise<ApiResponse> => {
  let data: ApiResponse | undefined;

  try {
    const token = await fetchToken();
    const body = toFormData(formData);

    const response = await fetch(endPoints, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  if ((data?.status === 200 || data?.status === 201) && tags?.length) {
    tags.forEach((tag) => {
      revalidateTag(tag, "default");
    });
  }

  return data ?? {};
};

/* -------------------------------------------------------------------------- */
/*                                  POST JSON                                 */
/* -------------------------------------------------------------------------- */

export const POST_JSON = async (
  endPoints: string,
  body: Record<string, unknown>,
  tags?: string[]
): Promise<ApiResponse> => {
  try {
    const token = await fetchToken();

    const response = await fetch(endPoints, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      next: tags ? { tags } : undefined,
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: (error as Error).message };
  }
};

/* -------------------------------------------------------------------------- */
/*                           POST WITH FORMDATA                               */
/* -------------------------------------------------------------------------- */

export const POST_WITH_FORMDATA = async (
  endPoints: string,
  body: FormData
): Promise<ApiResponse> => {
  try {
    const token = await fetchToken();

    const response = await fetch(endPoints, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: (error as Error).message };
  }
};

/* -------------------------------------------------------------------------- */
/*                                  AUTH                                      */
/* -------------------------------------------------------------------------- */

export const SIGN_IN = async (
  formData: FormPayload
): Promise<ApiResponse> => {
  try {
    const body = toFormData(formData);

    const response = await fetch(endPoints.AUTH.SIGN_IN, {
      method: "POST",
      body,
    });

    const res: ApiResponse = await response.json();

    if (res.status === 200 && res.token) {
      await createCookie(res.token);
    }

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: (error as Error).message };
  }
};

export async function LOG_OUT(): Promise<never> {
  (await cookies()).delete("session");
  redirect("/");
}

/* -------------------------------------------------------------------------- */
/*                               CONTACT FORM                                 */
/* -------------------------------------------------------------------------- */

export const ContactSubmit = async (
  formData: FormPayload
): Promise<ApiResponse | undefined> => {
  try {
    const body = toFormData(formData);

    const data = await fetch(endPoints.INQUIRIES, {
      method: "POST",
      body,
    });

    return await data.json();
  } catch (error) {
    console.error(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               INQUIRY FORM                                 */
/* -------------------------------------------------------------------------- */

export const InquirySubmit = async (
  formData: FormPayload
): Promise<void> => {
  let responseData: ApiResponse | undefined;

  try {
    const body = toFormData(formData);

    const data = await fetch(endPoints.INQUIRIES, {
      method: "POST",
      body,
    });

    responseData = await data.json();
  } catch (error) {
    console.error(error);
  }

  if (responseData?.status === 200) {
    redirect("/thankyou");
  }
};

/* -------------------------------------------------------------------------- */
/*                              NEWSLETTER                                    */
/* -------------------------------------------------------------------------- */

export const NewsletterSubmit = async (
  formData: FormPayload
): Promise<undefined> => {
  try {
    const body = toFormData(formData);

    const response = await axios.post(endPoints.NEWSLETTER, body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
