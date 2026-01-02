import { setFontSize } from "roosterjs-content-model-api";
import { ToolBarButton } from "../types/ToolBarButton.type";

const FONT_SIZES = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
];

export const fontSizeButton: ToolBarButton<"buttonNameFontSize"> = {
  key: "buttonNameFontSize",
  text: "Font Size",
  dropDownMenu: {
    items: FONT_SIZES.map((size) => ({
      key: size + "pt",
      label: size.toString(),
      type: "item",
    })),
    getSelectedItemKey: (formatState) => formatState.fontSize ?? "",
    contentHeight: 450,
  },
  onClick: (editor, size) => {
    setFontSize(editor, size);
  },
};
