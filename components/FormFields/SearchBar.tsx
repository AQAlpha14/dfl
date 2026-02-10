"use client";
import Button from "@/components/Button";
import FormProvider from "@/components/FormFields/FormProvider";
import usePropertiesQueryStore from "@/stores/properties-query-store";
import useVendorStore from "@/stores/vendorStore";
import useVendorUtilityStore from "@/stores/vendor-utility-store";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RHFTextField } from "./RHFTextField";
import RHFSelect from "./RHFSelect";
import { vendorId } from "@/constants/constants";
import { btnText } from "@/mockData/dummyData";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SelectOption {
  label: string;
  value: number | string;
}

export interface SearchBarFormValues {
  keywords?: string;
  property_type?: SelectOption | number | string;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

const SearchBar: FC = () => {
  const router = useRouter();
  const [isOpenBar, setIsOpenBar] = useState(false);

  const { vendor } = useVendorStore();
  const { propertiesQuery } = usePropertiesQueryStore();
  const { vendorUtility, loading } = useVendorUtilityStore();

  const methods = useForm<SearchBarFormValues>({
    defaultValues: propertiesQuery || undefined,
  });

  const purposeOptions: SelectOption[] =
    vendorUtility?.[0]?.propert_purpose?.map((item: any) => ({
      label: item.title,
      value: item.id,
    })) ?? [];

  const catOptions: SelectOption[] =
    vendorUtility?.[1]?.propert_type?.map((item: any) => ({
      label: item.title,
      value: item.id,
    })) ?? [];

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<SearchBarFormValues> = async (data) => {
    const body = {
      ...data,
      property_type:
        typeof data.property_type === "object"
          ? data.property_type?.value
          : (data.property_type ?? propertiesQuery?.property_type),
      vendor_website_id: vendorId,
    };

    const purposeLabel =
      typeof data.property_type === "object"
        ? data.property_type?.label?.toLowerCase()
        : "buy";

    const categoryLabel =
      typeof data.property_type === "object"
        ? data.property_type?.label?.toLowerCase()
        : "houses";

    let url = `/${purposeLabel}/${categoryLabel}`;

    const queryParams = new URLSearchParams();

    if (body.property_type) {
      queryParams.append("property_type", String(body.property_type));
    }

    if (body.property_type) {
      queryParams.append("property_type", String(body.property_type));
    }

    if (body.keywords) {
      queryParams.append("keywords", body.keywords);
    }

    if (Array.from(queryParams).length > 0) {
      url += `?${queryParams.toString()}`;
    }
    router.push(url);
  };


  return (
    <div className="">
      <div className="rounded-xl shadow-xl bg-white px-4 py-2 ">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex lg:flex-nowrap flex-wrap items-center justify-between space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
            <div className="lg:w-xl w-full">
              <RHFTextField
                name="keywords"
                type="text"
                placeholder="Address, City, Zip, Neighborhood"
                className="text-primary! border-primary! bg-primaryLight"
                variant="outlined"
                isHidden
              />
            </div>
            <RHFSelect
              name="property_type"
              placeholder="Property Type"
              options={purposeOptions}
              className="w-full"
              isLoading={loading}
              isHidden
            />
            <RHFSelect
              name="city"
              placeholder="Select City"
              options={catOptions}
              className="w-full text-primary!"
              isLoading={loading}
              isHidden
            />
            <RHFSelect
              name="price"
              placeholder="Price"
              options={catOptions}
              className="w-full text-primary!"
              isLoading={loading}
              isHidden
            />
            <RHFSelect
              name="area"
              placeholder="Area (Sqft)"
              options={catOptions}
              className="w-full text-primary!"
              isLoading={loading}
              isHidden
            />
            <div className="flex justify-around items-center">
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || loading}
                loading={isSubmitting}
                className="md:rounded-md! flex items-center bg-primary w-full md:w-fit"
              >
                <Icon
                  icon="mdi:search"
                  width="1.2rem"
                  height="1.2rem"
                  className="mx-auto"
                />
                {btnText.search_properties}
              </Button>
            </div>
            <div className="flex justify-around items-center">
              <Button
                variant="txt"
                type="button"
                onClick={() => setIsOpenBar((prev) => !prev)}
                className="flex items-center w-full border-none gap-1"
              >
                <Icon
                  icon="mage:filter"
                  width="1.2rem"
                  height="1.2rem"
                  className="mx-auto"
                />

                {btnText.advance_filter}

                {/* ROTATING ARROW */}
                <motion.div
                  animate={{ rotate: isOpenBar ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mx-auto"
                >
                  <Icon
                    icon="lsicon:right-outline"
                    width="1.2rem"
                    height="1.2rem"
                  />
                </motion.div>
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {isOpenBar && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex">
                  <div className="md:basis-4/5 basis-full">
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="md:flex lg:flex-nowrap flex-wrap items-center gap-2 pt-2"
                    >
                      <RHFSelect
                        name="furnishing_status"
                        placeholder="Furnishing Status"
                        options={purposeOptions}
                        className="w-full text-primary! border-gray-100 bg-white"
                        isLoading={loading}
                      />
                      <RHFSelect
                        name="property_area"
                        placeholder="Property Area"
                        options={catOptions}
                        className="w-full text-primary!"
                        isLoading={loading}
                      />
                      <RHFSelect
                        name="bedrooms"
                        placeholder="Bed & Bath"
                        options={catOptions}
                        className="w-full text-primary!"
                        isLoading={loading}
                      />
                      <RHFSelect
                        name="area"
                        placeholder="Select Area"
                        options={catOptions}
                        className="w-full text-primary!"
                        isLoading={loading}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FormProvider>
      </div>
    </div>
  );
};

export default SearchBar;
