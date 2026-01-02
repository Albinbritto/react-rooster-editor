import { setTextColor } from "roosterjs-content-model-api";
import { ToolBarButton } from "../types/ToolBarButton.type";
import { SYSTEM_COLORS } from "../../../shared/constants/MenuItems";
import { ColorPalette } from "../../../shared/components/colorpalette/ColorPalette";

export const textColorButton: ToolBarButton<"textColorButton"> = {
  key: "textColorButton",
  iconName: "FaA",
  dropDownMenu: {
    items: [
      {
        key: "colorPicker",
        label: "colorPicker",
        renderItem: ({ item, formatState, onClick }) => {
          return (
            <ColorPalette
              systemColors={SYSTEM_COLORS}
              selectedColor={formatState.textColor}
              onChange={(color) => {
                onClick({ ...item, key: color });
              }}
            />
          );
        },
      },
    ],
  },
  onClick: (editor, color) => {
    setTextColor(editor, color);
  },
};
