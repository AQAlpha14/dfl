import React from "react";

interface RadioOption {
  label: string;
  value: string | number;
  icon?: string;
}

interface RadioSelectionButtonProps {
  label?: string;
  icon?: string;
  error?: string;
  helperText?: string;
  tooltip?: string;
  disabled?: boolean;
  options?: RadioOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  id?: string;
  [key: string]: any;
}

export default function RadioSelectionButton({
  label,
  // icon, // Unused
  error,
  helperText,
  // tooltip, // Unused
  disabled,
  options = [],
  value,
  onChange,
  id,
  ...props
}: RadioSelectionButtonProps) {
  const generatedId = React.useId();
  const inputId = id || `radio-${generatedId}`;

  const handleChange = (selectedValue: string | number) => {
    if (!disabled && onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div>
      <div className="w-full relative group">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm mb-2 ${
              error ? "text-red-500" : "text-gray-dark"
            }`}>
            {label}
          </label>
        )}

        {/* Radio Buttons Container */}
        <div className="flex flex-wrap gap-6">
          {options.map((option) => (
            <div
              key={option.value}
              className={`relative inline-flex items-center justify-center px-4 py-2 border-b cursor-pointer transition-all ${
                value === option.value
                  ? "border-primary text-primary"
                  : "border-b-0 text-grayDark"
              } ${
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-primary hover:text-primary"
              }`}
              onClick={() => handleChange(option.value)}>
              {/* Icon */}
              {/* {option.icon && (
                <Icon
                  icon={option.icon}
                  className={`mr-2 h-4 w-4 ${
                    value === option.value ? "text-primary" : "text-gray-light"
                  }`}
                />
              )} */}

              {/* Option Label */}
              <span className="text-sm md:!text-[15px] font-semibold">
                {option.label}
              </span>

              {/* Hidden Radio Input */}
              <input
                type="radio"
                id={`${inputId}-${option.value}`}
                checked={value === option.value}
                onChange={() => handleChange(option.value)}
                className="absolute opacity-0 w-0 h-0"
                disabled={disabled}
                {...props}
              />
            </div>
          ))}
        </div>

        {/* Icon and Tooltip */}
        <div className="flex items-center mt-1">
          {/* Helper Text */}
          {helperText && !error && (
            <span className="text-xs text-gray-500">{helperText}</span>
          )}

          {/* Error Message */}
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
}
