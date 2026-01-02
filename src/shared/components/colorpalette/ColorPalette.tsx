import React, { useState } from "react";
import { ColorListView } from "./ColorListView";
import { AddColorView } from "./AddColorView";
import { ColorPaletteProps } from "./colorpalette.type";
import { VIEW_MODES, ViewModeValue } from "./colorpalette.constants";

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  systemColors = [],
  customColors = [],
  selectedColor = "",
  onChange,
  onCustomColorAdd,
}) => {
  const [viewMode, setViewMode] = useState<ViewModeValue>(VIEW_MODES.LIST);

  const handleColorSelect = (color: string) => {
    onChange?.(color);
  };

  const handleAddCustomColorClick = () => {
    setViewMode(VIEW_MODES.ADD);
  };

  const handleBack = () => {
    setViewMode(VIEW_MODES.LIST);
  };

  const handleSaveCustomColor = (color: string) => {
    onCustomColorAdd?.(color);
    onChange?.(color);
    setViewMode(VIEW_MODES.LIST);
  };

  return (
    <div>
      {viewMode === VIEW_MODES.LIST ? (
        <ColorListView
          systemColors={systemColors}
          customColors={customColors}
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
          onAddCustomColorClick={handleAddCustomColorClick}
        />
      ) : (
        <AddColorView onBack={handleBack} onSave={handleSaveCustomColor} />
      )}
    </div>
  );
};
