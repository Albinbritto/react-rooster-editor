import { setFontName } from 'roosterjs-content-model-api';
import { FONT_FAMILY } from '../../../shared/constants/MenuItems';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const fontFamilyButton: ToolBarButton<'buttonNameFontFamily'> = {
  key: 'buttonNameFontFamily',
  iconName: 'FaFont',
  dropDownMenu: {
    items: FONT_FAMILY,
    getSelectedItemKey: (formatState) => formatState.fontName ?? '',
    contentHeight: 500,
  },
  onClick: (editor, name) => {
    setFontName(editor, name);
  },
};
