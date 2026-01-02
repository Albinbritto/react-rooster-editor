import { BubbleMenu } from '../../bubblemenu/components/BubbleMenu';
import { boldButton } from '../../toolbar/buttons/boldButton';
import { italicButton } from '../../toolbar/buttons/italicButton';
import { underlineButton } from '../../toolbar/buttons/underlineButton';
import { strikethroughButton } from '../../toolbar/buttons/strikethroughButton';
import { textColorButton } from '../../toolbar/buttons/textColorButton';
import { backgroundColorButton } from '../../toolbar/buttons/backgroundColorButton';
import { ViveBubbleMenuProps } from '../types/ViveEditor.type';
import { useViveEditorContext } from './ViveEditor';
import { alignCenterButton } from '../../toolbar/buttons/alignCenterButton';
import { alignJustifyButton } from '../../toolbar/buttons/alignJustifyButton';
import { alignLeftButton } from '../../toolbar/buttons/alignLeftButton';
import { alignRightButton } from '../../toolbar/buttons/alignRightButton';
import { blockQuoteButton } from '../../toolbar/buttons/blockQuoteButton';
import { bulletedListButton } from '../../toolbar/buttons/bulletedListButton';
import { clearFormatButton } from '../../toolbar/buttons/clearFormatButton';
import { codeButton } from '../../toolbar/buttons/codeButton';
import { decreaseIndentButton } from '../../toolbar/buttons/decreaseIndentButton';
import { fontFamilyButton } from '../../toolbar/buttons/fontFamilyButton';
import { fontSizeButton } from '../../toolbar/buttons/fontSizeButton';
import { headingLevelButton } from '../../toolbar/buttons/headingLevelButton';
import { increaseIndentButton } from '../../toolbar/buttons/increaseIndentButton';
import { insertButton } from '../../toolbar/buttons/InsertButton';
import { numberedListButton } from '../../toolbar/buttons/numberedListButton';
import { redoButton } from '../../toolbar/buttons/redoButton';
import { spacingButton } from '../../toolbar/buttons/spacingButton';
import { subscriptButton } from '../../toolbar/buttons/subscriptButton';
import { superscriptButton } from '../../toolbar/buttons/superscriptButton';
import { undoButton } from '../../toolbar/buttons/undoButton';

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
];

export const ViveBubbleMenu: React.FC<ViveBubbleMenuProps> = ({ buttons = [] }) => {
  const { bubbleMenuPlugin } = useViveEditorContext();
  return <BubbleMenu plugin={bubbleMenuPlugin} buttons={[...defaultButtons, ...buttons]} />;
};
