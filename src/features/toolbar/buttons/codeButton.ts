import { toggleCode } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const codeButton: ToolBarButton<'buttonNameCode'> = {
  key: 'buttonNameCode',
  iconName: 'FaCode',
  isChecked: (formatState) => !!formatState.isCodeInline,
  onClick: (editor) => {
    toggleCode(editor);
  },
};
