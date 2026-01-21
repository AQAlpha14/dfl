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

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SelectOption {
  label: string;
  value: number | string;
}

export interface HeaderSearchFormValues {
  keywords?: string;
  property_purpose?: SelectOption | number | string;
  property_type?: SelectOption | number | string;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

const HeaderSearch: FC = () => {
  const router = useRouter();
  const [isOpenBar, setIsOpenBar] = useState(false);

  const { vendor } = useVendorStore();
  const { propertiesQuery } = usePropertiesQueryStore();
  const { vendorUtility, loading } = useVendorUtilityStore();

  const methods = useForm<HeaderSearchFormValues>({
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

  const onSubmit: SubmitHandler<HeaderSearchFormValues> = async (data) => {
    const body = {
      ...data,
      property_purpose:
        typeof data.property_purpose === "object"
          ? data.property_purpose?.value
          : data.property_purpose ?? propertiesQuery?.property_purpose,
      property_type:
        typeof data.property_type === "object"
          ? data.property_type?.value
          : data.property_type ?? propertiesQuery?.property_type,
      vendor_website_id: vendorId,
    };

    const purposeLabel =
      typeof data.property_purpose === "object"
        ? data.property_purpose?.label?.toLowerCase()
        : "buy";

    const categoryLabel =
      typeof data.property_type === "object"
        ? data.property_type?.label?.toLowerCase()
        : "houses";

    let url = `/${purposeLabel}/${categoryLabel}`;

    const queryParams = new URLSearchParams();

    if (body.property_purpose) {
      queryParams.append("property_purpose", String(body.property_purpose));
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
                placeholder="Search location"
                className="text-primary! border-primary! bg-primaryLight"
                variant="outlined"
                isHidden
              />
            </div>
            <RHFSelect
              name="property_purpose"
              placeholder="Purpose"
              options={purposeOptions}
              className="w-full text-primary!"
              isLoading={loading}
              isHidden
            />
            <RHFSelect
              name="property_type"
              placeholder="Categories"
              options={catOptions}
              className="w-full text-primary!"
              isLoading={loading}
              isHidden
            />
            <RHFSelect
              name="property_type"
              placeholder="Categories"
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
                className="md:!rounded-md flex items-center bg-primary w-full md:w-fit"
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
                <Icon
                  icon="lsicon:right-outline"
                  width="1.2rem"
                  height="1.2rem"
                  className={`mx-auto ${isOpenBar ? "rotate-90" : ""}`}
                />
              </Button>
            </div>
          </div>
          {isOpenBar && (
            <div className="flex">
              <div className="md:basis-4/5 basis-full">
                <div className="md:flex lg:flex-nowrap flex-wrap items-center gap-2 pt-2">
                  <RHFSelect
                    name="property_purpose"
                    placeholder="Purpose"
                    options={purposeOptions}
                    className="w-full text-primary!"
                    isLoading={loading}
                    isHidden
                  />
                  <RHFSelect
                    name="property_type"
                    placeholder="Categories"
                    options={catOptions}
                    className="w-full text-primary!"
                    isLoading={loading}
                    isHidden
                  />
                  <RHFSelect
                    name="property_type"
                    placeholder="Categories"
                    options={catOptions}
                    className="w-full text-primary!"
                    isLoading={loading}
                    isHidden
                  />
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full ml-auto"
                  >
                    {btnText.reset}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </FormProvider>
      </div>
    </div>
  );
};

export default HeaderSearch;
