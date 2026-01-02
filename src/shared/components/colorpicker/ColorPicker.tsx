import React from "react";
import { Popover } from "../popover";
import { ColorPalette } from "../colorpalette/ColorPalette";
import { ColorPickerProps } from "./ColorPicker.types";

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  systemColors = [],
  customColors = [],
  onCustomColorAdd,
  label,
  showColorText = true,
  placeholder = "Select color",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
          {label}
        </label>
      )}
      <Popover
        trigger={
          <button
            className={`h-8 inline-flex items-center gap-2 px-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors text-gray-900 dark:text-gray-100 ${
              fullWidth ? "w-full" : "min-w-[180px]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={disabled}
          >
            <div
              className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 flex-shrink-0"
              style={{ backgroundColor: value }}
            />
            {showColorText && (
              <span className="flex-1 text-left text-sm truncate">
                {value || placeholder}
              </span>
            )}
          </button>
        }
        triggerAsChild
        sideOffset={5}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50"
      >
        <ColorPalette
          systemColors={systemColors}
          customColors={customColors}
          selectedColor={value}
          onChange={onChange}
          onCustomColorAdd={onCustomColorAdd}
        />
      </Popover>
    </div>
  );
};
