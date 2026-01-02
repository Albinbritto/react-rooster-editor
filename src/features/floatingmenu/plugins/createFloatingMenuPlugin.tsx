import type { IEditor, PluginEvent } from 'roosterjs-content-model-types';
import { ContextMenuItemType } from '../../../shared/components/contextmenu/ContextMenu.type';
import { FloatingMenuPlugin } from '../types/FloatingMenuPlugin.type';

class FloatingMenuPluginImpl implements FloatingMenuPlugin {
  private editor: IEditor | null = null;
  private onContextMenuOpen: ((items: ContextMenuItemType[]) => void) | null = null;

  getName() {
    return 'FloatingMenu';
  }

  initialize(editor: IEditor) {
    this.editor = editor;
  }

  dispose() {
    this.editor = null;
  }

  getEditor(): IEditor | null {
    return this.editor;
  }

  onPluginEvent(event: PluginEvent) {
    switch (event.eventType) {
      case 'contextMenu':
        if (event.items.length === 0) {
          event.rawEvent.stopPropagation();
          return;
        }
        this.onContextMenuOpen?.(event.items);
        break;
      case 'scroll':
        this.editor?.focus();
        break;
      default:
        break;
    }
  }

  registerFloatingMenuOpenCallback(callback: (items: ContextMenuItemType[]) => void) {
    this.onContextMenuOpen = callback;

    return () => {
      this.onContextMenuOpen = null;
    };
  }
}

export function createFloatingMenuPlugin(): FloatingMenuPlugin {
  return new FloatingMenuPluginImpl();
}
