import type { ContentModelFormatState, EditorPlugin, IEditor } from 'roosterjs-content-model-types';
import { ToolBarButton } from './ToolBarButton.type';

export interface ToolBarPlugin extends EditorPlugin {
  /**register a callback which will automatically be called when the format state changes */
  registerFormatChangedCallback: (
    callback: (formatState: ContentModelFormatState) => void
  ) => () => void;

  /**handle button click event on toolbar*/
  onButtonClick: <T extends string>(button: ToolBarButton<T>, key: T) => void;

  /**get the editor instance*/
  getEditor: () => IEditor | null;
}
