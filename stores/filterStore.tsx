"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ----------------------------- Types ----------------------------- */

export type Filters = {
  brand_id: number;
  model_id: number;
  category_id: number;
  body_type_id: number;
  color_id: number;
  price_min: number;
  price_max: number;
  keywords: string;
  year: string;
};

type FilterKey = keyof Filters;

type FilterStore = {
  filters: Filters;
  setFilter: <K extends FilterKey>(key: K, value: Filters[K]) => void;
  setMultipleFilters: (payload: Partial<Filters>) => void;
  resetFilters: () => void;
};

/* --------------------------- Initial State --------------------------- */

const initialFilters: Filters = {
  brand_id: 0,
  model_id: 0,
  category_id: 0,
  body_type_id: 0,
  color_id: 0,
  price_min: 0,
  price_max: 0,
  keywords: "",
  year: "",
};

/* ----------------------------- Store ----------------------------- */

const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: initialFilters,

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),

      setMultipleFilters: (payload) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...payload,
          },
        })),

      resetFilters: () => ({
        filters: initialFilters,
      }),
    }),
    {
      name: "filter-store",
    }
  )
);

export default useFilterStore;
