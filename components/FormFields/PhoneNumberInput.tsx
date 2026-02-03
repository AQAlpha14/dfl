"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

interface PhoneNumberInputProps {
  label?: string;
  icon?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (phone: string) => void;
  clearError?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const PhoneNumberInput = ({
  label,
  icon,
  error,
  disabled = false,
  loading = false,
  placeholder = "Enter phone number",
  value = "",
  onChange,
  clearError,
  ...props
}: PhoneNumberInputProps) => {
  const { locale } = useContext(LanguageContext);
  const ar = locale === "ar";
  const [val, setVal] = useState(value);

  const handleChange = (phone: string) => {
    setVal(phone);
    onChange?.(phone);
    clearError?.();
  };

  return (
    <div className="w-full relative group">
      <div
        className={`relative border-b ${
          error ? "border-red-500" : "border-gray-dark"
        } focus-within:border-primary transition-all min-h-12 flex items-center ${
          disabled || loading ? "opacity-70 cursor-not-allowed" : ""
        }`}>
        {/* Icon (optional) */}
        {icon && (
          <div
            className={`absolute inset-y-0 flex items-center pointer-events-none ${
              ar ? "right-2" : "left-2"
            }`}>
            <Icon
              icon={icon}
              className={`h-5 w-5 ${
                error ? "text-red-500" : "text-gray-400"
              } group-focus-within:text-primary`}
            />
          </div>
        )}

        <div className="flex-1 flex items-center relative">
          <PhoneInput
            value={val}
            onChange={handleChange}
            inputClass={`bg-transparent! border-none! shadow-none! text-sm! w-full! focus:outline-none! ${
              ar ? "pr-7! text-right!" : "pl-8! text-left!"
            }`}
            buttonClass="bg-transparent! border-none! hover:bg-transparent!"
            containerClass="w-full relative"
            disabled={disabled}
            placeholder={placeholder}
            country="ae"
            enableSearch
            {...props}
          />

          {/* Custom Icon */}
          {icon && (
            <div
              className={`absolute inset-y-0 flex items-center pointer-events-none ${
                ar ? "right-8" : "left-8"
              }`}>
              <Icon
                icon={icon}
                className={`h-5 w-5 ${
                  error ? "text-red-500" : "text-gray-400"
                } group-focus-within:text-primary`}
              />
            </div>
          )}
        </div>

        {/* Floating Label */}
        {label && (
          <label
            className={`absolute ${
              ar ? "right-0 pr-2" : "left-0 pl-2"
            } text-gray-light transition-all duration-200 pointer-events-none
            ${error ? "text-red-500" : "group-focus-within:text-primary"}
            ${
              val
                ? "text-xs -top-2"
                : "text-sm top-3 peer-focus:text-xs peer-focus:-top-2"
            }
            `}>
            {label}
          </label>
        )}
      </div>

      {/* Error Text */}
      {error && <div className="text-[10px] text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default PhoneNumberInput;
