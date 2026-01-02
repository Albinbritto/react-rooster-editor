import { toggleStrikethrough } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const strikethroughButton: ToolBarButton<'buttonNameStrikethrough'> = {
  key: 'buttonNameStrikethrough',
  iconName: 'FaStrikethrough',
  isChecked: (formatState) => !!formatState.isStrikeThrough,
  onClick: (editor) => {
    toggleStrikethrough(editor);
  },
};
