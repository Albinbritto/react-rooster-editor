import React from "react";
import { ColorSection } from "./ColorSection";
import { ColorListViewProps } from "./colorpalette.type";

export const ColorListView: React.FC<ColorListViewProps> = ({
  systemColors,
  customColors,
  selectedColor,
  onColorSelect,
  onAddCustomColorClick,
}) => {
  return (
    <div className="space-y-4">
      {/* System Colors Section */}
      <ColorSection
        title="System Colors"
        colors={systemColors}
        selectedColor={selectedColor}
        onColorSelect={onColorSelect}
      />

      {/* Custom Colors Section */}
      <ColorSection
        title="Custom Colors"
        colors={customColors}
        selectedColor={selectedColor}
        onColorSelect={onColorSelect}
        showAddIcon={true}
        onAddClick={onAddCustomColorClick}
      />
    </div>
  );
};
