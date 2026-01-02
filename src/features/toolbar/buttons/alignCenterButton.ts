import { setAlignment } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const alignCenterButton: ToolBarButton<'buttonNameAlignCenter'> = {
  key: 'buttonNameAlignCenter',
  iconName: 'FaAlignCenter',
  onClick: (editor) => {
    setAlignment(editor, 'center');
  },
};
