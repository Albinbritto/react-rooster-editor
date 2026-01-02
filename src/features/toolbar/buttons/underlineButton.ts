import { toggleUnderline } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const underlineButton: ToolBarButton<'buttonNameUnderline'> = {
  key: 'buttonNameUnderline',
  iconName: 'FaUnderline',
  isChecked: (formatState) => !!formatState.isUnderline,
  onClick: (editor) => {
    toggleUnderline(editor);
  },
};
