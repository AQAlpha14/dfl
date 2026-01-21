import { create } from "zustand";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface PropertiesQuery {
  area_id: number;
  beds: number;
  city_id: number;
  id: number;
  isActive: number;
  isDeleted: number;
  keywords: string;
  max_area: number;
  min_area: number;
  nPerPage: number;
  pageNumber: number;
  price_max: number;
  price_min: number;
  property_purpose: number;
  property_type: number;
  showAll: boolean;
  sortby: number;
}

interface PropertiesQueryStore {
  propertiesQuery: PropertiesQuery | null;
  updatePropertiesQuery: (query: PropertiesQuery) => void;
  clearPropertiesQuery: () => void;
}

/* -------------------------------------------------------------------------- */
/*                               Store                                        */
/* -------------------------------------------------------------------------- */

const usePropertiesQueryStore = create<PropertiesQueryStore>((set) => ({
  propertiesQuery: {
    area_id: 0,
    beds: 0,
    city_id: 0,
    id: 0,
    isActive: 1,
    isDeleted: 0,
    keywords: "",
    max_area: 0,
    min_area: 0,
    nPerPage: 20,
    pageNumber: 0,
    price_max: 0,
    price_min: 0,
    property_purpose: 0,
    property_type: 0,
    showAll: false,
    sortby: 0,
  },

  updatePropertiesQuery: (propertiesQuery) => {
    set({ propertiesQuery });
  },

  clearPropertiesQuery: () => {
    set({ propertiesQuery: null });
  },
}));

export default usePropertiesQueryStore;
