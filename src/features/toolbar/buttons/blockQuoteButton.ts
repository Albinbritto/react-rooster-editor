import { toggleBlockQuote } from 'roosterjs-content-model-api';
import { ToolBarButton } from '../types/ToolBarButton.type';

export const blockQuoteButton: ToolBarButton<'buttonNameQuote'> = {
  key: 'buttonNameQuote',
  iconName: 'FaQuoteRight',
  isChecked: (formatState) => !!formatState.isBlockQuote,
  onClick: (editor) => {
    toggleBlockQuote(editor);
  },
};
