import { undo } from "roosterjs-content-model-core";
import { ToolBarButton } from "../types/ToolBarButton.type";

/**
 * "Undo" button on the format ribbon
 */
export const undoButton: ToolBarButton<"buttonNameUndo"> = {
  key: "buttonNameUndo",
  iconName: "FaUndo",
  isDisabled: (formatState) => !formatState.canUndo,
  onClick: (editor) => {
    undo(editor);
  },
};
