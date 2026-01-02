import { ToolBar } from "../../toolbar";
import { alignCenterButton } from "../../toolbar/buttons/alignCenterButton";
import { alignJustifyButton } from "../../toolbar/buttons/alignJustifyButton";
import { alignLeftButton } from "../../toolbar/buttons/alignLeftButton";
import { alignRightButton } from "../../toolbar/buttons/alignRightButton";
import { backgroundColorButton } from "../../toolbar/buttons/backgroundColorButton";
import { blockQuoteButton } from "../../toolbar/buttons/blockQuoteButton";
import { boldButton } from "../../toolbar/buttons/boldButton";
import { bulletedListButton } from "../../toolbar/buttons/bulletedListButton";
import { clearFormatButton } from "../../toolbar/buttons/clearFormatButton";
import { codeButton } from "../../toolbar/buttons/codeButton";
import { decreaseIndentButton } from "../../toolbar/buttons/decreaseIndentButton";
import { downloadButton } from "../../toolbar/buttons/downloadButton";
import { fontFamilyButton } from "../../toolbar/buttons/fontFamilyButton";
import { fontSizeButton } from "../../toolbar/buttons/fontSizeButton";
import { headingLevelButton } from "../../toolbar/buttons/headingLevelButton";
import { increaseIndentButton } from "../../toolbar/buttons/increaseIndentButton";
import { insertButton } from "../../toolbar/buttons/InsertButton";
import { italicButton } from "../../toolbar/buttons/italicButton";
import { numberedListButton } from "../../toolbar/buttons/numberedListButton";
import { spacingButton } from "../../toolbar/buttons/spacingButton";
import { strikethroughButton } from "../../toolbar/buttons/strikethroughButton";
import { subscriptButton } from "../../toolbar/buttons/subscriptButton";
import { superscriptButton } from "../../toolbar/buttons/superscriptButton";
import { textColorButton } from "../../toolbar/buttons/textColorButton";
import { underlineButton } from "../../toolbar/buttons/underlineButton";
import { ViveToolBarProps } from "../types/ViveEditor.type";
import { useViveEditorContext } from "./ViveEditor";
import { redoButton } from "../../toolbar/buttons/redoButton";
import { undoButton } from "../../toolbar/buttons/undoButton";

const defaultButtons = [
  [undoButton, redoButton],
  [headingLevelButton, fontFamilyButton, fontSizeButton],
  [
    boldButton,
    italicButton,
    underlineButton,
    strikethroughButton,
    textColorButton,
    backgroundColorButton,
  ],
  [subscriptButton, superscriptButton],
  [bulletedListButton, numberedListButton],
  [increaseIndentButton, decreaseIndentButton, spacingButton],
  [alignLeftButton, alignCenterButton, alignRightButton, alignJustifyButton],
  [insertButton],
  [blockQuoteButton, codeButton, clearFormatButton],
  [downloadButton],
];

export const ViveToolBar: React.FC<ViveToolBarProps> = ({ buttons = [] }) => {
  const { toolBarPlugin } = useViveEditorContext();
  return (
    <ToolBar plugin={toolBarPlugin} buttons={[...defaultButtons, ...buttons]} />
  );
};
