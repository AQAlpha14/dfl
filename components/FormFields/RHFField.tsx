"use client";

import { FC, ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import { icons } from "@/mockData/dummyData";
import Image from "../Image";

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "email"
  | "tel"
  | "url"
  | "search"
  | "date";

interface RHFFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: InputType;
  className?: string;
  inputClass?: string;
  hiddenLabel?: boolean;
  icon?: ReactNode;
  inputIcon?: string;
  showPercentIcon?: boolean;
  rows?: number;
  required?: boolean | string; // ✅ New required prop
  [key: string]: any;
}

const RHFField: FC<RHFFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  className = "",
  inputClass = "",
  hiddenLabel = false,
  icon,
  inputIcon,
  showPercentIcon = false,
  rows = 6,
  required = false,
  ...other
}) => {
  const { control } = useFormContext();
  const [showPass, setShowPass] = useState(false);

  const normalizeValue = (v: any) =>
    typeof v === "number" && v === 0 ? "" : (v ?? "");

  // RHF validation rules
  const rules = required
    ? {
        required:
          typeof required === "string" ? required : "This field is required",
      }
    : {};

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules} // ✅ Apply required validation
      render={({ field, fieldState: { error } }) => (
        <div className={`flex flex-col ${className}`}>
          {label && (
            <label
              className={`mb-2 text-sm font-normal ${
                hiddenLabel ? "hidden sm:block" : ""
              }`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {type === "textarea" ? (
            <textarea
              {...field}
              rows={rows}
              placeholder={placeholder}
              value={normalizeValue(field.value)}
              autoComplete="off"
              className={`w-full rounded-md border border-[#D1D5DC] bg-[#F3F3F5] px-3 py-2 focus:outline-none
                ${error ? "border-red-500" : "border-gray-300"}
                ${inputClass}`}
              {...other}
            />
          ) : (
            <div className="relative w-full px-3 flex items-center rounded-md border border-[#D1D5DC] bg-[#F3F3F5]">
              {inputIcon && (
                <Image src={inputIcon} width={20} height={20} alt="" />
              )}
              <input
                {...field}
                type={
                  type === "password" ? (showPass ? "text" : "password") : type
                }
                placeholder={placeholder}
                value={normalizeValue(field.value)}
                autoComplete="off"
                className={`w-full focus:outline-none
                  ${error ? "border-red-500" : "border-[#D1D5DC]"}
                  ${inputClass} ${showPercentIcon ? "pr-8" : "px-3 py-2"}`}
                {...other}
              />
              {/* Password toggle */}
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 text-gray-500"
                >
                  <Icon
                    icon={
                      showPass ? "simple-line-icons:eye" : "ion:eye-off-outline"
                    }
                    width="1.3rem"
                    height="1.3rem"
                  />
                </button>
              )}
              {/* Optional icon (percent etc) */}
              {showPercentIcon && (
                <div className="absolute right-2 flex items-center text-primary">
                  <Icon icon={icons.percent} width="1.1rem" height="1.1rem" />
                </div>
              )}
              {icon && (
                <div className="absolute left-2 flex items-center">{icon}</div>
              )}
            </div>
          )}
          {error?.message && (
            <p className="mt-1 text-xs text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default RHFField;
