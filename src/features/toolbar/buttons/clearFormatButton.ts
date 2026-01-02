import { clearFormat } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const clearFormatButton: ToolBarButton<'buttonNameClearFormat'> = {
  key: 'buttonNameClearFormat',
  iconName: 'FaRemoveFormat',
  onClick: (editor) => {
    clearFormat(editor);
  },
};
