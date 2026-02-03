"use client";
import { LanguageContext } from "@/context/LanguageContext";
import { Icon } from "@iconify/react";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";

interface SingleSelectOption {
  label: string;
  value: any;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SingleSelectInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onSelect'> {
  label: string;
  icon?: boolean;
  error?: string;
  loading?: boolean;
  options?: SingleSelectOption[];
  value?: any;
  onChange: (value: any) => void;
  clearError?: () => void;
  hideValueRemoveIcon?: boolean;
  optionEnd?: (option: SingleSelectOption) => React.ReactNode;
  onSelect?: (option: SingleSelectOption | null) => void;
  onCreate?: (val: string) => void;
  is_Modal?: boolean;
}

export default function SingleSelectInput({
  label,
  icon,
  error,
  disabled,
  loading = false,
  placeholder = " ",
  options = [],
  value: val = null,
  onChange,
  clearError,
  hideValueRemoveIcon,
  optionEnd,
  onSelect,
  onCreate,
  is_Modal = false,
  ...props
}: SingleSelectInputProps) {
  const [value, setValue] = useState(val);
  const [displayValue, setDisplayValue] = useState("");
  const [displayIcon, setDisplayIcon] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { locale } = useContext(LanguageContext);
  const ar = locale === "ar";

  // ✅ Memoized normalized options
  const normalizedOptions = useMemo(() => {
    return Array.isArray(options) ? options : [];
  }, [options]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Update display value when value or options change
  useEffect(() => {
    setValue(val);
    const selectedOption = normalizedOptions.find((p) => p.value == val);
    setDisplayValue(selectedOption ? selectedOption.label : "");
    setDisplayIcon(selectedOption?.icon || null);
  }, [val, normalizedOptions]);

  // ✅ Filtered options (memoized)
  const filteredOptions = useMemo(() => {
    return normalizedOptions
      .filter((option) =>
        option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a.disabled && !b.disabled) return 1;
        if (!a.disabled && b.disabled) return -1;
        return 0;
      });
  }, [normalizedOptions, searchTerm]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && dropdownRef.current) {
      const optionElement = dropdownRef.current.children[focusedIndex];
      optionElement?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  // ✅ Clear search on close
  useEffect(() => {
    if (!isOpen) setSearchTerm("");
  }, [isOpen]);

  // ✅ Memoized select handler (added missing deps)
  const handleSelect = useCallback(
    (option: SingleSelectOption) => {
      if (option && !option.disabled && !loading && !disabled) {
        onChange(option.value);
        setDisplayValue(option.label);
        setDisplayIcon(option.icon || null);
        clearError?.();
        setIsOpen(false);
        setFocusedIndex(-1);
        onSelect?.(option);
      }
    },
    [onChange, clearError, onSelect, loading, disabled]
  );

  const handleClear = useCallback(() => {
    if (loading || disabled) return;
    onChange(null);
    setDisplayValue("");
    setDisplayIcon(null);
    setSearchTerm("");
    onSelect?.(null);
  }, [loading, disabled, onChange, onSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || loading) return;

      switch (e.key) {
        case "Enter":
        case " ":
          if (isOpen && focusedIndex >= 0) {
            e.preventDefault();
            handleSelect(filteredOptions[focusedIndex]);
          } else if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex((prev) =>
            Math.min(prev + 1, filteredOptions.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        default:
          break;
      }
    },
    [disabled, loading, isOpen, focusedIndex, filteredOptions, handleSelect]
  );

  return (
    <div>
      <div className="w-full relative group" ref={wrapperRef}>
        <div
          className={`relative border-b ${
            error
              ? `${is_Modal ? "border-white" : "border-red-500"}`
              : `${is_Modal ? "border-white" : "border-gray-dark"}`
          } ${
            is_Modal
              ? "focus-within:border-white"
              : "focus-within:border-primary"
          } transition-all min-h-[28px] py-0.5 flex items-center ${
            disabled || loading ? "opacity-70" : ""
          }`}
          onClick={() => !disabled && !loading && setIsOpen(true)}>
          {/* Input Field */}
          <div
            className={`flex-1 flex items-center gap-2 ${
              icon ? "pl-10" : "pl-2"
            } ${ar ? "pl-14" : "pr-14"}`}>
            {displayIcon && displayIcon}
            <input
              ref={inputRef}
              type="text"
              value={isOpen ? searchTerm : displayValue}
              onChange={(e) => {
                if (loading || disabled) return;
                setSearchTerm(e.target.value);
                setIsOpen(true);
                setFocusedIndex(0);
              }}
              onFocus={() => {
                if (loading || disabled) return;
                setSearchTerm("");
                setIsOpen(true);
                setFocusedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled || loading}
              placeholder={placeholder}
              className={`text-sm ${
                is_Modal && "text-white"
              } focus:outline-none bg-transparent w-full placeholder:text-gray-dark truncate ${
                disabled || loading ? "cursor-not-allowed" : ""
              }`}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              autoComplete="off"
              {...props}
            />
          </div>

          {/* Clear Button */}
          {!loading && value && !disabled && !hideValueRemoveIcon ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className={`${ar ? "left-8" : "right-8"} absolute ${
                is_Modal ? "text-white" : "text-gray-400"
              } hover:text-red-500`}
              disabled={loading}>
              <Icon icon="mdi:close-circle" className="h-4 w-4" />
            </button>
          ) : null}

          {/* Chevron */}
          <div
            className={`${
              ar ? "left-0" : "right-0"
            } absolute inset-y-0 flex items-center pr-2 pointer-events-none`}>
            {loading ? (
              <Icon
                icon="mdi:loading"
                className="h-5 w-5 animate-spin text-gray-400"
              />
            ) : (
              <Icon
                icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                className={`h-5 w-5 ${
                  is_Modal ? "text-white" : "text-gray-400"
                }`}
              />
            )}
          </div>

          {/* Label */}
          <label
            className={`text-sm absolute left-0 ${
              is_Modal && "text-white"
            } cursor-text truncate max-w-[calc(100%-18px)] float-labels ${
              ar ? "right-0" : "left-0"
            } ${
              error
                ? "text-red-500"
                : `${
                    is_Modal
                      ? "peer-focus:text-white!"
                      : "peer-focus:text-primary"
                  }`
            } ${
              value || searchTerm || isOpen
                ? "text-xs -top-5 left-0"
                : "peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-5"
            } ${disabled || loading ? "cursor-not-allowed" : ""}`}>
            {label}
          </label>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && !loading && (
          <div
            ref={dropdownRef}
            className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto"
            role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">
                {loading ? (
                  "Loading options..."
                ) : onCreate ? (
                  <div
                    className="text-primary text-center cursor-pointer"
                    onClick={() => onCreate(searchTerm)}>
                    Create {searchTerm}
                  </div>
                ) : ar ? (
                  "لا توجد خيارات متاحة"
                ) : (
                  "No options available"
                )}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`text-sm flex items-center justify-between gap-2 ${
                    option.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "cursor-pointer hover:bg-primary/10 hover:text-primary"
                  } ${
                    value === option.value ? "bg-primary/10 text-primary" : ""
                  }`}
                  role="option"
                  aria-selected={index === focusedIndex}
                  aria-disabled={option.disabled}>
                  <div
                    className="grow px-3 py-2 flex items-center gap-2"
                    onClick={() => handleSelect(option)}>
                    {option?.icon && option.icon}
                    {option.label}
                  </div>
                  {optionEnd && (
                    <div className="px-3 py-2"> {optionEnd(option)}</div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {error && (
          <div
            className={`text-[10px] ${
              is_Modal ? "text-white" : "text-red-500"
            } mt-1`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
