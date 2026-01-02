import { setAlignment } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const alignLeftButton: ToolBarButton<'buttonNameAlignLeft'> = {
  key: 'buttonNameAlignLeft',
  iconName: 'FaAlignLeft',
  onClick: (editor) => {
    setAlignment(editor, 'left');
  },
};
