import { setSpacing } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

const SPACING_OPTIONS = ['1.0', '1.15', '1.5', '2.0'];
const NORMAL_SPACING = 1.2;
const spacingButtonKey = 'buttonNameSpacing';

function findClosest(lineHeight?: string) {
  if (!lineHeight || Number.isNaN(+lineHeight)) return null;
  const query = +lineHeight / NORMAL_SPACING;
  return SPACING_OPTIONS.find((opt) => Math.abs(query - +opt) < 0.05) || null;
}

export const spacingButton: ToolBarButton<typeof spacingButtonKey> = {
  key: spacingButtonKey,
  iconName: 'FaTextHeight',
  dropDownMenu: {
    items: SPACING_OPTIONS.map((option) => {
      return {
        key: option,
        label: option,
      };
    }),
    getSelectedItemKey: (formatState) => findClosest(formatState.lineHeight),
    allowLivePreview: true,
  },
  onClick: (editor, size) => {
    setSpacing(editor, +size * NORMAL_SPACING);
  },
};
