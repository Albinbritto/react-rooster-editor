import React from "react";

export interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onClick: (color: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export interface ColorSectionProps {
  title: string;
  colors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
  showAddIcon?: boolean;
  onAddClick?: () => void;
}

export interface ColorListViewProps {
  systemColors: string[];
  customColors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
  onAddCustomColorClick: () => void;
}

export interface AddColorViewProps {
  onBack: () => void;
  onSave: (color: string) => void;
}

export interface ColorPaletteProps {
  systemColors?: string[];
  customColors?: string[];
  selectedColor?: string;
  onChange?: (color: string) => void;
  onCustomColorAdd?: (color: string) => void;
}

export type ViewMode = "list" | "add";
