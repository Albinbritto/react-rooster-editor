import type { EditorPlugin } from 'roosterjs-content-model-types';
import type { UIUtilities } from './UIUtilities.type';

export interface ReactEditorPlugin extends EditorPlugin {
  setUIUtilities(uiUtilities: UIUtilities): void;
}
