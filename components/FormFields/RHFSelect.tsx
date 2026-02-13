"use client";

import { Controller, useFormContext } from "react-hook-form";
import Select, {
  OnChangeValue,
  Props as SelectProps,
  components,
} from "react-select";
import React from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface SelectOption {
  label: string;
  value: string | number;
}

interface RHFSelectProps extends Partial<SelectProps<SelectOption, boolean>> {
  name: string;
  title?: string;
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
  innerDivClassName?: boolean | string;
  resetField?: string;
  resetValue?: unknown;
  isLoading?: boolean;
  isHidden?: boolean;
  placeholderIcon?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                               Styles                                       */
/* -------------------------------------------------------------------------- */

const classNames = {
  container: () =>
    "flex h-10 w-full rounded-md !border-none bg-transparent text-sm text-nowrap transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  control: () => "h-full! w-full bg-transparent! border-0!",
  valueContainer: () => "bg-transparent",
  singleValue: () => "text-black",
  input: () => "text-sm! text-black!",
  menu: () => "bg-white! border! border-[#DDD] z-[9999]!",
  option: (state: { isSelected: boolean }) =>
    state.isSelected ? "bg-primary! text-white!" : "hover:bg-primary-light!",
  indicatorSeparator: () => "hidden!",
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
  placeholderIcon,
  ...other
}) => {
  const { control, setValue } = useFormContext();

  // Custom Placeholder with Icon
  const Placeholder = (props: any) => (
    <components.Placeholder {...props}>
      <div className="flex items-center gap-2 text-gray-500">
        {placeholderIcon}
        <span>{props.children}</span>
      </div>
    </components.Placeholder>
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isMulti ? [] : null}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className}`}>
          {title && (
            <div className={`mb-2 ${isHidden ? "hidden sm:block" : ""}`}>
              <label className="displayPara font-medium text-gray-500">
                {title}
              </label>
            </div>
          )}
          <div
            className={`${innerDivClassName ? "border-primary! bg-primaryLight! text-primary!" : "border-gray-400! bg-white! text-gray-500"} border! rounded-md`}
          >
            <Select<SelectOption, boolean>
              {...other}
              inputId={name}
              name={field.name}
              ref={field.ref}
              isMulti={isMulti}
              isLoading={isLoading}
              placeholder={placeholder}
              classNames={classNames}
              components={{ Placeholder }}
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
            <p className="text-xs text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default RHFSelect;
