"use client";

import { Controller, useFormContext } from "react-hook-form";
import Select, { OnChangeValue, Props as SelectProps } from "react-select";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface SelectOption {
  label: string;
  value: string | number;
}

interface RHFSelectProps
  extends Partial<
    SelectProps<SelectOption, boolean>
  > {
  name: string;
  title?: string;
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
  innerDivClassName?: string;
  resetField?: string;
  resetValue?: unknown;
  isLoading?: boolean;
  isHidden?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Styles                                       */
/* -------------------------------------------------------------------------- */

const customStyles = {
  container: () =>
    "flex h-10 w-full rounded-md !border border-primary bg-primaryLight text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",

  control: () => "!h-full w-full !bg-transparent !border-0",

  valueContainer: () => "bg-transparent",

  singleValue: () => "text-black",

  input: () => "!text-sm !text-black",

  menu: () => "!bg-white border !border-[#DDD] !z-[9999]",

  option: (state: { isSelected: boolean }) =>
    state.isSelected
      ? "!bg-primary !text-white"
      : "hover:!bg-primary-light",

  indicatorSeparator: () => "!hidden",
};

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

const RHFSelect: React.FC<RHFSelectProps> = ({
  name,
  title,
  placeholder,
  isMulti = false,
  className,
  innerDivClassName,
  resetField,
  resetValue,
  isLoading,
  isHidden,
  ...other
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isMulti ? [] : null}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          <div className={`${innerDivClassName} flex flex-col`}>
            {title && (
              <div className={`mb-2 ${isHidden ? "hidden sm:block" : ""}`}>
                <label className="displayPara font-semibold">
                  {title}
                </label>
              </div>
            )}

            <Select<SelectOption, boolean>
              {...other}
              inputId={name}
              name={field.name}
              ref={field.ref}
              isMulti={isMulti}
              isLoading={isLoading}
              placeholder={placeholder}
              classNames={customStyles}
              value={
                isMulti
                  ? (field.value as SelectOption[])
                  : (field.value as SelectOption | null)
              }
              onBlur={field.onBlur}
              onChange={(value: OnChangeValue<SelectOption, boolean>) => {
                field.onChange(value);
                if (resetField) {
                  setValue(resetField, resetValue);
                }
              }}
            />
          </div>

          {error?.message && (
            <p className="text-xs text-red-500">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFSelect;
