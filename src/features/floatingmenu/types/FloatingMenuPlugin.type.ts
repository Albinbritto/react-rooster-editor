import { EditorPlugin } from 'roosterjs-content-model-types';
import { ContextMenuItemType } from '../../../shared/components/contextmenu/ContextMenu.type';

export interface FloatingMenuPlugin extends EditorPlugin {
  registerFloatingMenuOpenCallback: (
    callback: (items: ContextMenuItemType[]) => void
  ) => () => void;
}
