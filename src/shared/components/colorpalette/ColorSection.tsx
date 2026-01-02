import React from "react";
import { ColorSwatch } from "./ColorSwatch";
import { ColorSectionProps } from "./colorpalette.type";
import { Icon } from "../icon/Icon";
import { areColorsEqual } from "./colorpalette.utils";

export const ColorSection: React.FC<ColorSectionProps> = ({
  title,
  colors,
  selectedColor,
  onColorSelect,
  showAddIcon = false,
  onAddClick,
}) => {
  return (
    <div className="mb-3 px-1">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 max-w-[200px]">
        {colors.map((color, index) => (
          <ColorSwatch
            key={`${color}-${index}`}
            color={color}
            isSelected={areColorsEqual(selectedColor, color)}
            onClick={onColorSelect}
          />
        ))}
        {showAddIcon && onAddClick && (
          <button
            onClick={onAddClick}
            className="w-4 h-4 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Add custom color"
          >
            <Icon name="FaCirclePlus" size={14} color="gray" />
          </button>
        )}
      </div>
    </div>
  );
};
