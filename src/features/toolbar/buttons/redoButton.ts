import { redo } from "roosterjs-content-model-core";
import { ToolBarButton } from "../types/ToolBarButton.type";

/**
 * "Undo" button on the format ribbon
 */
export const redoButton: ToolBarButton<"buttonNameRedo"> = {
  key: "buttonNameRedo",
  iconName: "FaRedo",
  isDisabled: (formatState) => !formatState.canRedo,
  onClick: (editor) => {
    redo(editor);
  },
};
