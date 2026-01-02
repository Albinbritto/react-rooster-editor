import { toggleSuperscript } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const superscriptButton: ToolBarButton<'buttonNameSuperscript'> = {
  key: 'buttonNameSuperscript',
  iconName: 'FaSuperscript',
  isChecked: (formatState) => !!formatState.isSuperscript,
  onClick: (editor) => {
    toggleSuperscript(editor);
  },
};
