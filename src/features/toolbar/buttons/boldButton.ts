import { toggleBold } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const boldButton: ToolBarButton<'buttonNameBold'> = {
  key: 'buttonNameBold',
  iconName: 'FaBold',
  isChecked: (formatState) => !!formatState.isBold,
  onClick: (editor) => {
    toggleBold(editor);
  },
};
