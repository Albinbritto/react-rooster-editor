import { toggleBullet } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const bulletedListButton: ToolBarButton<'buttonNameBulletedList'> = {
  key: 'buttonNameBulletedList',
  iconName: 'FaListUl',
  isChecked: (formatState) => !!formatState.isBullet,
  onClick: (editor) => {
    toggleBullet(editor);
  },
};
