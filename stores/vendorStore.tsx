import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/* ----------------------------- Types ----------------------------- */

// Agar vendor ka structure pata hai to yahan define kar sakte ho
// Example:
export type Vendor = {
  id: string;
  name: string;
  profile_image: string;
  email?: string;
};

type VendorStore = {
  vendor: Vendor | null;
  loading: boolean;
  setVendor: (vendor: Vendor | null) => void;
  setLoading: (loading: boolean) => void;
};

/* ----------------------------- Store ----------------------------- */

const useVendorStore = create<VendorStore>()(
  persist(
    (set) => ({
      vendor: null,
      loading: false,
      setVendor: (vendor) => set({ vendor }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "vendor-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useVendorStore;
