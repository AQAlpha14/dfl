"use client";
import { Icon } from "@iconify/react";
import Typography from "../Typography";

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
  tooltip?: string;
  is_Modal?: boolean;
}

export default function CheckboxInput({
  title,
  icon,
  error,
  is_Modal,
  ...props
}: CheckboxInputProps) {
  return (
    <div className="group">
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="sr-only peer" {...props} />
          <div
            className={`w-5 h-5 rounded border bg-white transition-all duration-200 flex items-center justify-center border-grayDark ${
              error ? "border-red-500" : ""
            } ${
              props.checked || props.defaultChecked
                ? `${is_Modal ? "border-white" : "border-primary"} bg-primary`
                : ""
            }`}>
            <Icon
              icon="material-symbols:check-rounded"
              className={`h-4 w-4 ${
                is_Modal ? "text-secondary" : "text-primary"
              } transition-opacity duration-200 ${
                props.checked || props.defaultChecked
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div className="relative flex items-center">
          {icon && icon}
          <Typography
            as="span"
            size="sm"
            className={`${is_Modal ? "text-white" : "text-grayDark"}`}>
            {title}
          </Typography>
        </div>
      </label>
      {error && (
        <div
          className={`${
            is_Modal ? "text-white" : "text-red-500"
          } text-[10px] mt-1`}>
          {error}
        </div>
      )}
    </div>
  );
}
