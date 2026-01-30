import { API_DOMAIN, CMSAPI, DEVAPI, REAL_STATE_API_DOMAIN } from "./constants";

interface AuthEndpoints {
  SIGN_IN: string;
  SIGN_UP: string;
  SIGN_OUT: string;
  GET_USER: string;
  FORGOT_PASSWORD: string;
  RESET_PASSWORD: string;
  VERIFY_EMAIL: string;
  VERIFY_TOKEN: string;
  VERIFY_USER: string;
  UPDATE_PASSWORD: string;
  UPDATE_EMAIL: string;
  UPDATE_USER: string;
}

interface BlogEndpoints {
  GETBLOGS: string;
  GETBLOGDETAIL: (slug: string) => string;
  GET_BLOGS_CATAGORIES: string;
}
interface CommentEndpoints {
  GET_BY_PROJECT_ID: (id: string) => string;
  ADD: string;
}

interface TestimonialEndpoints {
  GET: string;
  POST: string;
}

export interface EndPoints {
  AUTH: AuthEndpoints;
  BLOGS: BlogEndpoints;
  NEWSLETTER: string;
  CONTACT_US: string;
  GETMETA: string;
  GETGLOBALSCRIPT: string;
  GET_FAQS: string;
  INQUIRY: string;
  HIRE: string;
  COMMENTS: CommentEndpoints;
  TESTIMONIALS: TestimonialEndpoints;
}

const endPoints: EndPoints = {
  NEWSLETTER: `${REAL_STATE_API_DOMAIN}/blogapi/add_subscription`,
  CONTACT_US: `${DEVAPI}/api/senddirectfromlanloard_ContactFormEmail`,
  INQUIRY: `${DEVAPI}/api/senddirectfromlanloard_InquiryFormEmail`,
  GETMETA: API_DOMAIN + "/seoapi/get-schema",
  GETGLOBALSCRIPT: API_DOMAIN + "/seoapi/get-customcode-bywebsite",
  GET_FAQS: API_DOMAIN + "/seoapi/get-customcode-bywebsite",
  HIRE: `${API_DOMAIN}/hire`,
  AUTH: {
    SIGN_IN: `${API_DOMAIN}/signin`,
    SIGN_UP: `${API_DOMAIN}/signup`,
    SIGN_OUT: `${API_DOMAIN}/signout`,
    GET_USER: `${API_DOMAIN}/user`,
    FORGOT_PASSWORD: `${API_DOMAIN}/forgot-password`,
    RESET_PASSWORD: `${API_DOMAIN}/reset-password`,
    VERIFY_EMAIL: `${API_DOMAIN}/verify-email`,
    VERIFY_TOKEN: `${API_DOMAIN}/verify-token`,
    VERIFY_USER: `${API_DOMAIN}/verify-user`,
    UPDATE_PASSWORD: `${API_DOMAIN}/update-password`,
    UPDATE_EMAIL: `${API_DOMAIN}/update-email`,
    UPDATE_USER: `${API_DOMAIN}/update-user`,
  },
  TESTIMONIALS: {
    GET: `${API_DOMAIN}/Alltestimonials`,
    POST: `${API_DOMAIN}/Alltestimonials`,
  },
  COMMENTS: {
    GET_BY_PROJECT_ID: (id) => `${API_DOMAIN}/comments?project_id=${id}`,
    ADD: `${API_DOMAIN}/add/comments`,
  },
  BLOGS: {
    GETBLOGS: `${CMSAPI}/api/client/posts`,
    GETBLOGDETAIL: (slug) => `${CMSAPI}/api/client/posts/${slug}`,
    GET_BLOGS_CATAGORIES: `${CMSAPI}/api/client/categories`,
  },
};

export default endPoints;
