import type { ContentModelFormatState, EditorPlugin, IEditor } from 'roosterjs-content-model-types';
import { ToolBarButton } from '../../toolbar/types/ToolBarButton.type';

export interface BubbleMenuPosition {
  /**
   * Virtual reference element for Floating UI
   * Contains getBoundingClientRect to position the bubble menu
   */
  getBoundingClientRect: () => DOMRect;
}

export interface BubbleMenuPlugin extends EditorPlugin {
  /**register a callback which will automatically be called when the format state changes */
  registerFormatChangedCallback: (
    callback: (formatState: ContentModelFormatState) => void
  ) => () => void;

  /**register a callback which will be called when selection changes to show/hide bubble menu */
  registerSelectionChangedCallback: (
    callback: (position: BubbleMenuPosition | null) => void
  ) => () => void;

  /**handle button click event on bubble menu*/
  onButtonClick: <T extends string>(button: ToolBarButton<T>, key: T) => void;

  /**get the editor instance*/
  getEditor: () => IEditor | null;
}
