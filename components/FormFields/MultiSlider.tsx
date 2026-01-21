"use client";


import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Typography from "../ui/Typography";

interface MultiSliderProps {
  value?: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  primaryColor?: string;
  minLabel?: string;
  maxLabel?: string;
  [key: string]: any; // Allow other props for Slider
}

export default function MultiSlider({
  value = [0, 0],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  primaryColor = "#01793b",
  minLabel = "",
  maxLabel = "",
  ...other
}: MultiSliderProps) {
  const [valMin, setValMin] = useState(value[0] ?? min);
  const [valMax, setValMax] = useState(value[1] ?? max);

  // Keep internal state in sync with parent
  useEffect(() => {
    setValMin(value[0]);
    setValMax(value[1]);
  }, [value]);

  const updateValues = (newMin: number, newMax: number) => {
    if (newMin <= newMax) {
      setValMin(newMin);
      setValMax(newMax);
      onChange?.([newMin, newMax]);
    }
  };

  return (
    <div className={className}>
      {/* Range Slider */}
      <div className="px-2">
        <Slider
          range
          value={[valMin, valMax]}
          onChange={(val: number | number[]) => {
             if (Array.isArray(val)) updateValues(val[0], val[1]);
          }}
          min={min}
          max={max}
          step={step}
          trackStyle={[{ backgroundColor: "var(--secondary)", height: 6 }]}
          handleStyle={[
            { backgroundColor: "#fff", borderColor: "var(--secondary)" },
            { backgroundColor: "#fff", borderColor: "var(--secondary)" },
          ]}
          railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
          {...other}
        />
      </div>

      <div className="w-full flex flex-row items-center justify-between gap-2 mt-4">
        {/* Min Input */}
        <div className="">
          {minLabel && minLabel !== "m²" && (
            <Typography
              as="span"
              size="sm"
              color="gray"
              className="group-hover:text-primary">
              {minLabel}
            </Typography>
          )}
          <input
            type="number"
            value={valMin}
            min={min}
            max={valMax}
            step={step}
            onChange={(e) => updateValues(Number(e.target.value), valMax)}
            className="text-sm w-24 border border-none focus:outline-none"
          />
          {minLabel === "m²" && (
            <Typography
              as="span"
              size="sm"
              color="gray"
              className="group-hover:text-primary">
              {minLabel}
            </Typography>
          )}
        </div>

        {/* Max Input */}
        <div className="">
          {maxLabel && maxLabel !== "m²" && (
            <Typography
              as="span"
              size="sm"
              color="gray"
              className="group-hover:text-primary text-right">
              {maxLabel}
            </Typography>
          )}
          <input
            type="number"
            value={valMax}
            min={valMin}
            max={max}
            step={step}
            onChange={(e) => updateValues(valMin, Number(e.target.value))}
            className="text-sm w-24 border border-none focus:outline-none text-right"
          />
          {maxLabel === "m²" && (
            <Typography
              as="span"
              size="sm"
              color="gray"
              className="group-hover:text-primary text-right">
              {maxLabel}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
