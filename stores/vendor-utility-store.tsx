import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/* ----------------------------- Types ----------------------------- */

export type UtilityItem = {
    id: string | number;
    title: string;
};

export type UtilityData = {
    propert_purpose?: UtilityItem[];
    propert_type?: UtilityItem[];
};

type VendorUtilityStore = {
    vendorUtility: UtilityData[];
    loading: boolean;
    setVendorUtility: (data: UtilityData[]) => void;
    setLoading: (loading: boolean) => void;
};

/* ----------------------------- Store ----------------------------- */

const useVendorUtilityStore = create<VendorUtilityStore>()(
    persist(
        (set) => ({
            vendorUtility: [],
            loading: false,
            setVendorUtility: (vendorUtility) => set({ vendorUtility }),
            setLoading: (loading) => set({ loading }),
        }),
        {
            name: "vendor-utility-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useVendorUtilityStore;
