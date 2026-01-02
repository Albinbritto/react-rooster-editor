import { setIndentation } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const increaseIndentButton: ToolBarButton<'buttonNameIncreaseIndent'> = {
  key: 'buttonNameIncreaseIndent',
  iconName: 'FaIndent',
  onClick: (editor) => {
    setIndentation(editor, 'indent');
  },
};
