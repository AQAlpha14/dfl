// /actions/blog-actions.ts
"use server";

import { hostName } from "@/constants/constants";
import endPoints from "@/constants/endPionts";

/* ===================== TYPES ===================== */

interface BlogCategory {
  id: number;
  name: string;
  slug?: string;
}

interface BlogPostAPI {
  id: number;
  title_en: string;
  slug: string;
  thumbnail?: string;
  excerpt_en?: string;
  content_en?: string;
  created_at: string;
  meta_title_en?: string;
  meta_description_en?: string;
  categories_data?: BlogCategory[];
}

interface BlogCard {
  thumbnail_image: string;
  title: string;
  slug: string;
  createon: {
    $date: string;
  };
  description: string;
  categories_data: BlogCategory[];
}

interface BlogDetailResponse {
  data: Array<{
    front_image?: string;
    front_image_alt: string;
    title: string;
    value: string;
    seo_title?: string;
    seo_description?: string;
    categories_data?: BlogCategory[];
  }>;
  others_blogs: BlogCard[];
  identifier: string;
}

interface GetBlogsBody {
  nPerPage?: number;
  pageNumber?: number;
  keywords?: string;
  category_id?: number[];
  tag_id?: number[];
}

interface GetBlogsResult {
  data: BlogCard[];
  totalPages: number;
  total?: number;
}

/* ===================== ADAPTERS ===================== */

const mapPostToBlogCard = (post: BlogPostAPI): BlogCard => ({
  thumbnail_image: post.thumbnail || "/assets/images/placeholder.jpg",
  title: post.title_en,
  slug: post.slug,
  createon: { $date: post.created_at }, // legacy Mongo-style date
  description: post.excerpt_en || "",
  categories_data: post.categories_data || [],
});

const mapPostToDetail = (post: BlogPostAPI): BlogDetailResponse => {
  const valueData = [
    {
      section: "paragraphSection",
      description: post.content_en || "",
    },
  ];

  return {
    data: [
      {
        ...post,
        front_image: post.thumbnail,
        front_image_alt: post.title_en,
        title: post.title_en,
        value: JSON.stringify(valueData),
        seo_title: post.meta_title_en,
        seo_description: post.meta_description_en,
        categories_data: post.categories_data,
      },
    ],
    others_blogs: [],
    identifier: String(post.id),
  };
};

/* ===================== ACTIONS ===================== */

export const GetBlogs = async (body: GetBlogsBody): Promise<GetBlogsResult> => {
  try {
    const {
      nPerPage = 10,
      pageNumber = 1,
      keywords,
      category_id,
      tag_id,
    } = body;

    const params = new URLSearchParams({
      domain: hostName,
      limit: String(nPerPage),
      offset: String((pageNumber - 1) * nPerPage),
      sort: "published_at",
      order: "desc",
    });
    
    if (keywords) params.append("q", keywords);

    if (category_id?.length)
      params.append("category_id", String(category_id[0]));

    if (tag_id?.length) params.append("tag_id", String(tag_id[0]));

    const res = await fetch(
      `${endPoints.BLOGS.GETBLOGS}?${params.toString()}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error(`GetBlogs API Error: ${res.status}`);
      return { data: [], totalPages: 0 };
    }

    const data: { data: BlogPostAPI[]; total: number } = await res.json();
    return {
      data: data.data.map(mapPostToBlogCard),
      totalPages: Math.ceil(data.total / nPerPage),
      total: data.total,
    };
  } catch (error) {
    console.error("GetBlogs Error", error);
    return { data: [], totalPages: 0 };
  }
};

export const getBlogDetail = async (
  vendorId?: number,
  slug?: string,
): Promise<BlogDetailResponse | null> => {
  try {
    const identifier = slug || vendorId;
    if (!identifier) return null;

    const url = `${endPoints.BLOGS.GETBLOGDETAIL(
      String(identifier),
    )}?domain=${hostName}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const post: BlogPostAPI = await res.json();
    return mapPostToDetail(post);
  } catch (error) {
    console.error("getBlogDetail Error", error);
    return null;
  }
};

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const params = new URLSearchParams({
      domain: hostName,
      limit: "100",
    });
    const res = await fetch(
      `${endPoints.BLOGS.GET_BLOGS_CATAGORIES}?${params.toString()}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return (await res.json()) as BlogCategory[];
  } catch (error) {
    console.error("getBlogCategories Error", error);
    return [];
  }
};

export const NewsletterSubmit = async (
  formData: Record<string, string>,
): Promise<unknown> => {
  try {
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));
    const response = await fetch(endPoints.NEWSLETTER, {
      method: "POST",
      body,
    });
    return await response.json();
  } catch (error) {
    console.error("NewsletterSubmit Error", error);
    return null;
  }
};
