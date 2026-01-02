import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { Select } from "../select";
import { Input } from "../input";
import { Button } from "../button";
import { RadioButtonGroup } from "../radio";
import { ColorPicker } from "../colorpicker";
import {
  CellProperty,
  CellPropertyPanelProps,
  BorderStyle,
  BorderSelection,
} from "./CellPropertyPanel.types";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaBorderAll,
  FaBorderNone,
  FaCheck,
} from "react-icons/fa";
import {
  MdVerticalAlignTop,
  MdVerticalAlignCenter,
  MdVerticalAlignBottom,
  MdBorderTop,
  MdBorderBottom,
  MdBorderLeft,
  MdBorderRight,
  MdBorderOuter,
} from "react-icons/md";
import { SYSTEM_COLORS } from "../../constants/MenuItems";

const BORDER_STYLES: BorderStyle[] = [
  { value: "solid", label: "Solid" },
  { value: "dotted", label: "Dotted" },
  { value: "dashed", label: "Dashed" },
];

const BORDER_SELECTIONS: BorderSelection[] = [
  { value: "allBorders", label: "All borders", icon: FaBorderAll },
  { value: "outsideBorders", label: "Outside border", icon: MdBorderOuter },
  { value: "topBorders", label: "Top border", icon: MdBorderTop },
  { value: "bottomBorders", label: "Bottom border", icon: MdBorderBottom },
  { value: "leftBorders", label: "Left border", icon: MdBorderLeft },
  { value: "rightBorders", label: "Right border", icon: MdBorderRight },
  { value: "noBorders", label: "No border", icon: FaBorderNone },
];

export const CellPropertyPanel: React.FC<CellPropertyPanelProps> = ({
  initialProperties = {},
  onSave: onSaveProp,
  onCancel: onCancelProp,
}) => {
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [properties, setProperties] = useState<CellProperty>({
    borderStyle: "solid",
    borderColor: "hsl(0, 0%, 70%)",
    borderWidth: "1px",
    backgroundColor: "#ffffff",
    horizontalAlign: "alignCellLeft",
    verticalAlign: "alignCellTop",
    width: "",
    height: "",
    padding: "",
    borderSelection: "allBorders",
    ...initialProperties,
  });

  const handlePropertyChange = (key: keyof CellProperty, value: any) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomColorAdd = (color: string) => {
    setCustomColors((prev) => [...prev, color]);
  };

  const handleSave = () => {
    if (onSaveProp) {
      onSaveProp(properties);
    }
  };

  const handleCancel = () => {
    if (onCancelProp) {
      onCancelProp();
    }
  };

  return (
    <div>
      {/* Border Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
          Border
        </h3>
        <div className="flex gap-3 mb-3">
          {/* Border Style */}
          <div className="flex-1">
            <Label.Root className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
              Style
            </Label.Root>
            <Select
              value={properties.borderStyle}
              onValueChange={(value) =>
                handlePropertyChange("borderStyle", value)
              }
              options={BORDER_STYLES.map((style) => ({
                value: style.value,
                label: style.label,
              }))}
              placeholder="Select style"
              fullWidth
            />
          </div>

          {/* Border Color */}
          <div className="flex-1">
            <ColorPicker
              label="Color"
              value={properties.borderColor}
              onChange={(color) => handlePropertyChange("borderColor", color)}
              systemColors={SYSTEM_COLORS}
              customColors={customColors}
              onCustomColorAdd={handleCustomColorAdd}
              showColorText={true}
              fullWidth
            />
          </div>

          {/* Border Width */}
          <div className="w-24">
            <Label.Root className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
              Width
            </Label.Root>
            <Input
              type="text"
              value={properties.borderWidth}
              onChange={(e) =>
                handlePropertyChange("borderWidth", e.target.value)
              }
              placeholder="1px"
              fullWidth
            />
          </div>
        </div>

        {/* Border Selection */}
        <div className="mb-3">
          <Label.Root className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
            Apply to
          </Label.Root>
          <div className="flex flex-wrap gap-2">
            {BORDER_SELECTIONS.map((border) => {
              const IconComponent = border.icon;
              const isSelected = properties.borderSelection === border.value;
              return (
                <Button
                  key={border.value}
                  onClick={() =>
                    handlePropertyChange("borderSelection", border.value)
                  }
                  type={isSelected ? "primary" : "default"}
                  size="middle"
                  icon={<IconComponent className="w-4 h-4" />}
                  title={border.label}
                >
                  <span className="hidden sm:inline">{border.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
          Background
        </h3>
        <ColorPicker
          label="Color"
          value={properties.backgroundColor}
          onChange={(color) => handlePropertyChange("backgroundColor", color)}
          systemColors={SYSTEM_COLORS}
          customColors={customColors}
          onCustomColorAdd={handleCustomColorAdd}
          showColorText={true}
          fullWidth
        />
      </div>

      {/* Text Alignment Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
          Text alignment
        </h3>
        <div className="flex gap-3">
          {/* Horizontal Alignment */}
          <div className="flex-1">
            <Label.Root className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
              Horizontal
            </Label.Root>
            <RadioButtonGroup
              value={properties.horizontalAlign}
              onChange={(value) =>
                handlePropertyChange("horizontalAlign", value)
              }
              options={[
                {
                  value: "alignCellLeft",
                  label: <FaAlignLeft className="w-4 h-4 mx-auto" />,
                },
                {
                  value: "alignCellCenter",
                  label: <FaAlignCenter className="w-4 h-4 mx-auto" />,
                },
                {
                  value: "alignCellRight",
                  label: <FaAlignRight className="w-4 h-4 mx-auto" />,
                },
              ]}
              buttonStyle="solid"
              className="h-8"
            />
          </div>

          {/* Vertical Alignment */}
          <div className="flex-1">
            <Label.Root className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
              Vertical
            </Label.Root>
            <RadioButtonGroup
              value={properties.verticalAlign}
              onChange={(value) => handlePropertyChange("verticalAlign", value)}
              options={[
                {
                  value: "alignCellTop",
                  label: <MdVerticalAlignTop className="w-5 h-5 mx-auto" />,
                },
                {
                  value: "alignCellMiddle",
                  label: <MdVerticalAlignCenter className="w-5 h-5 mx-auto" />,
                },
                {
                  value: "alignCellBottom",
                  label: <MdVerticalAlignBottom className="w-5 h-5 mx-auto" />,
                },
              ]}
              buttonStyle="solid"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={handleSave}
          type="primary"
          block
          icon={<FaCheck className="w-4 h-4" />}
          className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 focus:ring-green-500"
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          danger
          block
          icon={<span className="text-lg leading-none">×</span>}
          className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
