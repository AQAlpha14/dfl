"use client";

import React, { useContext, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ElementType;
  error?: string;
  helperText?: string;
  tooltip?: string;
}

export default function PasswordInput({
  label,
  icon: IconComp,
  error,
  helperText,
  tooltip,
  disabled,
  placeholder = " ",
  value,
  id,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = React.useId();
  const inputId = id || `input-${generatedId}`;

  const { locale } = useContext(LanguageContext);
  const isRTL = locale === "ar";

  return (
    <div>
      <div className="w-full relative group">
        {/* Input Container */}
        <div
          className={`relative border-b ${
            error ? "border-red-500" : "border-gray-dark"
          } focus-within:border-primary transition-all`}>
          {/* Icon */}
          {IconComp && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <IconComp
                className={`h-5 w-5 ${
                  error ? "text-red-500" : "text-gray-400"
                } group-focus-within:text-primary`}
              />
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            {...props}
            type={showPassword ? "text" : "password"}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={`bg-white w-full py-1 text-sm focus:outline-none peer ${
              isRTL ? "pl-10" : "pl-2"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          />

          {/* Label */}
          <label
            // htmlFor={inputId}
            className={`absolute text-gray-light cursor-text truncate max-w-[calc(100%-18px)] float-labels ${
              IconComp ? "left-10" : "left-0"
            } ${isRTL ? "right-0" : "left-0"} ${
              error ? "text-red-500" : "peer-focus:text-primary"
            } peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-5 -top-5 text-xs`}>
            {label}
          </label>

          {/* Password Toggle */}
          <button
            type="button"
            className={`absolute inset-y-0 ${
              isRTL ? "left-2" : "right-2"
            } flex items-center`}
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}>
            {/* {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            )} */}
          </button>

          {/* Tooltip */}
          {tooltip && (
            <div className="absolute inset-y-0 right-8 flex items-center">
              <div className="relative group/tooltip">
                {/* <Info className="h-4 w-4 text-gray-400 cursor-pointer" /> */}
                <div className="absolute bottom-full right-0 mb-1 w-max rounded-md bg-gray-800 text-white text-xs py-1 px-2 hidden group-hover/tooltip:block">
                  {tooltip}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <div className="text-[10px] text-gray-500 mt-1">{helperText}</div>
        )}

        {/* Error Message */}
        {error && <div className="text-[10px] text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
}
