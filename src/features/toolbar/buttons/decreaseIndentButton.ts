import { setIndentation } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const decreaseIndentButton: ToolBarButton<'buttonNameDecreaseIndent'> = {
  key: 'buttonNameDecreaseIndent',
  iconName: 'FaOutdent',
  onClick: (editor) => {
    setIndentation(editor, 'outdent');
  },
};
