import { toggleItalic } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const italicButton: ToolBarButton<'buttonNameItalic'> = {
  key: 'buttonNameItalic',
  iconName: 'FaItalic',
  isChecked: (formatState) => !!formatState.isItalic,
  onClick: (editor) => {
    toggleItalic(editor);
  },
};
