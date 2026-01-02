import { changeFontSize } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const increaseFontSizeButton: ToolBarButton<'buttonNameIncreaseFontSize'> = {
  key: 'buttonNameIncreaseFontSize',
  iconName: 'FaTextHeight',
  onClick: (editor) => {
    changeFontSize(editor, 'increase');
  },
};
