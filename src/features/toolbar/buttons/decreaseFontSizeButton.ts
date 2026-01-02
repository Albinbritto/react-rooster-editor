import { changeFontSize } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const decreaseFontSizeButton: ToolBarButton<'buttonNameDecreaseFontSize'> = {
  key: 'buttonNameDecreaseFontSize',
  iconName: 'FaTextHeight',
  onClick: (editor) => {
    changeFontSize(editor, 'decrease');
  },
};
