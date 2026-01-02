import React from "react";
import { ColorSwatchProps } from "./colorpalette.type";

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  isSelected,
  onClick,
  onKeyDown,
}) => {
  const handleClick = () => {
    onClick(color);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(color);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <button
      type="button"
      className={`
        w-[18px] h-[18px] rounded-full cursor-pointer 
        transition-all duration-150 
        focus:outline-none focus:ring-1 focus:ring-blue-400
        ${
          isSelected
            ? "ring-2 ring-blue-500 scale-110 shadow-sm"
            : "hover:scale-110 hover:shadow-md"
        }
      `}
      style={{ backgroundColor: color }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Select color ${color}`}
      aria-pressed={isSelected}
      tabIndex={0}
    />
  );
};
