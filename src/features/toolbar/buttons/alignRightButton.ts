import { setAlignment } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const alignRightButton: ToolBarButton<'buttonNameAlignRight'> = {
  key: 'buttonNameAlignRight',
  iconName: 'FaAlignRight',
  onClick: (editor) => {
    setAlignment(editor, 'right');
  },
};
