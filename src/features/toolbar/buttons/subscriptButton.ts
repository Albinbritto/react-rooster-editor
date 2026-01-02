import { toggleSubscript } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const subscriptButton: ToolBarButton<'buttonNameSubscript'> = {
  key: 'buttonNameSubscript',
  iconName: 'FaSubscript',
  isChecked: (formatState) => !!formatState.isSubscript,
  onClick: (editor) => {
    toggleSubscript(editor);
  },
};
