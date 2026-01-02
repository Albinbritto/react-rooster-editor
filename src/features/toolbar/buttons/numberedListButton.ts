import { toggleNumbering } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const numberedListButton: ToolBarButton<'buttonNameNumberedList'> = {
  key: 'buttonNameNumberedList',
  iconName: 'FaListOl',
  isChecked: (formatState) => !!formatState.isNumbering,
  onClick: (editor) => {
    toggleNumbering(editor);
  },
};
