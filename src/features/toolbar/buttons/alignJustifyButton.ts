import { setAlignment } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const alignJustifyButton: ToolBarButton<'buttonNameAlignJustify'> = {
  key: 'buttonNameAlignJustify',
  iconName: 'FaAlignJustify',
  onClick: (editor) => {
    setAlignment(editor, 'justify');
  },
};
