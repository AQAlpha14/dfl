import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import { useFormContext, Controller } from "react-hook-form";
import { icons } from "@/mockData/dummyData";

interface RHFTextFieldProps {
  name: string;
  title?: string;
  placeholder?: string;
  className?: string;
  textArea?: boolean;
  variant?: string;
  type?: string;
  inputClass?: string;
  isHidden?: boolean;
  iconHide?: boolean;
  colorHide?: boolean;
}

export const RHFTextField: FC<RHFTextFieldProps> = ({
  name,
  title,
  placeholder,
  className,
  textArea = false,
  variant,
  type = "text",
  inputClass,
  isHidden = false,
  iconHide = false,
  colorHide = false,
  ...other
}) => {
  const [togglePass, setTogglePass] = useState<string>(type);
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className={`${className} flex flex-col`}>
          {textArea ? (
            <>
              {title && (
                <div className={`mb-2`}>
                  <label className="font-normal text-sm">{title}</label>
                </div>
              )}
              <textarea
                {...field}
                placeholder={placeholder}
                value={
                  typeof field.value === "number" && field.value === 0
                    ? ""
                    : field.value
                }
                rows={7}
                {...other}
                className={`w-full py-2 px-2 bg-transparent mb-0! rounded-md border border-gray-400
                    ${inputClass}`}
                autoComplete="off"
              />
            </>
          ) : (
            <>
              {title && (
                <div className={`mb-2 ${isHidden && "hidden sm:block"}`}>
                  <label className="font-normal text-sm">{title}</label>
                </div>
              )}

              {type === "password" ? (
                <div
                  className={`border overflow-hidden
                      ${inputClass}
                      ${error ? "border-red-500" : "border-[#f1f1f1]"}`}
                >
                  <input
                    {...field}
                    placeholder={placeholder}
                    type={togglePass}
                    value={
                      typeof field.value === "number" && field.value === 0
                        ? ""
                        : field.value
                    }
                    {...other}
                    className={`w-full rounded-md focus:outline-none px-4 py-2 ${inputClass}`}
                    autoComplete="off"
                  />
                  <Icon
                    onClick={() =>
                      togglePass === "password"
                        ? setTogglePass("text")
                        : setTogglePass("password")
                    }
                    className="shrink-0 mr-3"
                    icon={`${
                      togglePass === "password"
                        ? "ion:eye-off-outline"
                        : "simple-line-icons:eye"
                    }`}
                    width="1.3rem"
                    height="1.3rem"
                  />
                </div>
              ) : (
                <div className="relative w-full">
                  {iconHide && (
                    <div className="absolute z-20 text-primary inset-y-2 pr-2 mt-1 right-0">
                      <Icon
                        icon={icons.percent}
                        width={"1.1rem"}
                        height={"1.1rem"}
                      />
                    </div>
                  )}
                  <input
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    value={
                      typeof field.value === "number" && field.value === 0
                        ? ""
                        : field.value
                    }
                    {...other}
                    className={`rounded-md border border-gray-400 ${inputClass} ${error ? "border-red-500" : "border-[#f1f1f1]"} focus:outline-none ${colorHide ? "h-10.5" : "px-4 py-2"} w-full`}
                    autoComplete="off"
                  />
                </div>
              )}
            </>
          )}
          {error?.message && (
            <p className=" text-xs text-red-500 mt-1">{error?.message}</p>
          )}
        </div>
      )}
    />
  );
};

interface RHFSubscribeTextFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  inputClass?: string;
}

export const RHFSubscribeTextField: FC<RHFSubscribeTextFieldProps> = ({
  name,
  placeholder,
  className,
  inputClass,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className={`relative ${className}`}>
          <input
            {...field}
            placeholder={placeholder}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            {...other}
            className={`px-6 py-2! outline-none bg-transparent border w-full rounded-md shadow-lg placeholder:text-sm ${inputClass}`}
            autoComplete="off"
          />
          {error?.message && (
            <p className="absolute left-0 text-xs font-normal text-red-500">
              {error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
