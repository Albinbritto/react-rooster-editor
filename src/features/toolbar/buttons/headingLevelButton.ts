import { setHeadingLevel } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const headingLevelButton: ToolBarButton<'buttonNameHeading'> = {
  key: 'buttonNameHeading',
  iconName: 'FaHeading',
  dropDownMenu: {
    items: [
      {
        key: '1',
        label: 'Heading 1',
      },
      {
        key: '2',
        label: 'Heading 2',
      },
      {
        key: '3',
        label: 'Heading 3',
      },
      {
        key: '4',
        label: 'Heading 4',
      },
      {
        key: '5',
        label: 'Heading 5',
      },
      {
        key: '6',
        label: 'Heading 6',
      },
      { key: 'divider', type: 'divider' },
      { key: '0', label: 'Reset' },
    ],
    getSelectedItemKey: (formatState) => {
      return (formatState.headingLevel ?? 0).toString();
    },
  },
  onClick: (editor, key) => {
    setHeadingLevel(editor, parseInt(key) as 1 | 2 | 3 | 4 | 5 | 6);
  },
};
