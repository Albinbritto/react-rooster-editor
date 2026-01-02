import React, { useState, useEffect } from "react";
import { AddColorViewProps } from "./colorpalette.type";
import { Icon } from "../icon/Icon";
import { Input } from "../input";
import { Button } from "../button";

export const AddColorView: React.FC<AddColorViewProps> = ({
  onBack,
  onSave,
}) => {
  const [colorInput, setColorInput] = useState<string>("#000000");
  const [previewColor, setPreviewColor] = useState<string>("#000000");
  const [isValidColor, setIsValidColor] = useState<boolean>(true);

  useEffect(() => {
    const validateColor = (color: string): boolean => {
      const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
      if (hexRegex.test(color)) {
        setPreviewColor(color);
        return true;
      }

      const rgbRegex =
        /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*[\d.]+)?\)$/;
      if (rgbRegex.test(color.replace(/\s/g, ""))) {
        setPreviewColor(color);
        return true;
      }

      const namedColorRegex = /^[a-z]+$/i;
      if (namedColorRegex.test(color)) {
        const testDiv = document.createElement("div");
        testDiv.style.color = color;
        if (testDiv.style.color !== "") {
          setPreviewColor(color);
          return true;
        }
      }

      return false;
    };

    const isValid = validateColor(colorInput);
    setIsValidColor(isValid);
  }, [colorInput]);

  const handleSave = () => {
    if (isValidColor && colorInput.trim()) {
      onSave(previewColor);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValidColor) {
      handleSave();
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    setColorInput(hexColor);
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg text-gray-700 dark:text-gray-200 flex items-center gap-2 m-0 mb-2 font-bold">
        <Icon name="FaArrowLeft" onClick={onBack} />
        <span>Add Custom Color</span>
      </h3>

      <div className="space-y-2">
        <label
          htmlFor="color-picker"
          className="block text-sm text-gray-600 dark:text-gray-400"
        >
          Choose color
        </label>
        <input
          id="color-picker"
          type="color"
          value={
            isValidColor && previewColor.startsWith("#")
              ? previewColor
              : "#000000"
          }
          onChange={handleColorPickerChange}
          className="w-full h-12 rounded-md border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
          tabIndex={0}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="color-input"
          className="block text-sm text-gray-600 dark:text-gray-400"
        >
          Or enter manually (hex, rgb, or name)
        </label>
        <Input
          id="color-input"
          type="text"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="#FF5733"
          status={!isValidColor ? "error" : undefined}
          fullWidth
        />
        {!isValidColor && (
          <p className="text-xs text-red-500">
            Please enter a valid color value
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-600 dark:text-gray-400">
          Preview
        </label>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm"
            style={{ backgroundColor: isValidColor ? previewColor : "#ffffff" }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isValidColor ? previewColor : "—"}
          </span>
        </div>
      </div>

      <Button
        htmlType="button"
        type="primary"
        onClick={handleSave}
        disabled={!isValidColor}
        block
      >
        Save Color
      </Button>
    </div>
  );
};
