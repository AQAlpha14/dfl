"use client";
import { LanguageContext } from "@/context/LanguageContext";
import { Icon } from "@iconify/react";
import { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  helperText?: string;
  tooltip?: string;
  is_required?: boolean;
  is_Modal?: boolean;
  name: string;
}

export default function TextInput({
  label,
  icon,
  error,
  helperText,
  tooltip,
  disabled,
  placeholder = " ",
  maxLength,
  id,
  is_required,
  is_Modal = false, // default false
  ...props
}: TextInputProps) {
  const inputId = id || `input-${Math.random().toString(36)}`;
  const { getValues, watch } = useFormContext();
  const [charCount, setCharCount] = useState(
    getValues(props?.name)?.length || 0
  );

  const value = watch(props?.name);
  const { locale } = useContext(LanguageContext);
  const isRTL = locale === "ar";

  useEffect(() => {
    setCharCount(getValues(props?.name)?.length || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues(props?.name)]);

  // ✅ Color logic: is_Modal true → everything white
  const borderColor = is_Modal
    ? "border-white"
    : error
    ? "border-red-500"
    : "border-gray-dark";
  const textColor = is_Modal
    ? "text-white"
    : error
    ? "text-red-500"
    : "text-grayDark";
  const labelColor = is_Modal
    ? "text-white peer-focus:text-white"
    : error
    ? "text-red-500"
    : "peer-focus:text-primary text-grayDark";
  const focusBorder = is_Modal
    ? "focus-within:border-white"
    : "focus-within:border-primary";
  const asteriskClass = is_Modal ? "text-white" : "text-red-500";

  return (
    <div className="w-full relative group">
      {/* Input Container */}
      <div
        className={`relative border-b ${borderColor} ${focusBorder} transition-all`}>
        {/* Icon (left) */}
        {icon && (
          <div
            className={`absolute inset-y-0 mb-1 ${
              isRTL ? "right-0 pr-2" : "left-0 pl-2"
            } flex items-center pointer-events-none`}>
            <Icon icon={icon} className={`h-5 w-5 ${textColor}`} />
          </div>
        )}

        {/* Input */}
        <input
          id={inputId}
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full py-1 text-sm bg-transparent focus:outline-none peer
            ${icon ? (isRTL ? "pr-10" : "pl-10") : "px-2"}
            ${disabled ? "cursor-not-allowed opacity-50" : ""}
            ${textColor}
          `}
        />

        {/* Label */}
        <label
          htmlFor={inputId}
          className={`text-sm absolute cursor-text truncate max-w-[calc(100%-18px)] float-labels ${labelColor}
            ${
              icon
                ? value
                  ? isRTL
                    ? "right-0"
                    : "left-0"
                  : isRTL
                  ? "right-10 peer-focus:right-0"
                  : "left-10 peer-focus:left-0"
                : isRTL
                ? "right-0"
                : "left-0"
            }
            peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:text-xs peer-focus:-top-5 -top-5 text-xs
          `}>
          {label} {is_required && <span className={asteriskClass}>*</span>}
        </label>
      </div>

      {/* Helper/Error Text */}
      <div className="flex items-center justify-between">
        {error && (
          <div
            className={`text-[10px] mt-1 ${
              is_Modal ? "text-white" : "text-red-500"
            }`}>
            {error}
          </div>
        )}
        {!error && helperText && (
          <div
            className={`text-[10px] mt-1 ${
              is_Modal ? "text-white/80" : "text-gray-500"
            }`}>
            {helperText}
          </div>
        )}
      </div>
    </div>
  );
}
