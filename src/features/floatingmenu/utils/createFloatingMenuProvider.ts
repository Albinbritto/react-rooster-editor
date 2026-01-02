import type { ContextMenuProvider, EditorPlugin, IEditor } from 'roosterjs-content-model-types';
import { UIUtilities } from '../../../shared/types/UIUtilities.type';
import { ReactEditorPlugin } from '../../../shared/types/ReactEditorPlugin.type';
import { FloatingMenuItemType } from '../types/FloatingMenu.type';
import {
  ContextMenuItemType,
  ContextMenuItem,
} from '../../../shared/components/contextmenu/ContextMenu.type';

class FloatingMenuProviderImpl
  implements ContextMenuProvider<ContextMenuItemType>, ReactEditorPlugin
{
  private editor: IEditor | null = null;
  private targetNode: Node | null = null;
  private uiUtilities: UIUtilities | null = null;

  constructor(
    private menuName: string,
    private items: FloatingMenuItemType[],
    private shouldAddMenuItems?: (editor: IEditor, node: Node) => boolean
  ) {}

  getName() {
    return this.menuName;
  }

  initialize(editor: IEditor) {
    this.editor = editor;
  }

  dispose() {
    this.editor = null;
  }

  getContextMenuItems(node: Node): ContextMenuItemType[] {
    const editor = this.editor;

    this.targetNode = node;

    return editor && this.shouldAddMenuItems?.(editor, node)
      ? this.convertToMenuItems(this.items)
      : [];
  }

  convertToMenuItems(items: FloatingMenuItemType[]): ContextMenuItemType[] {
    return items.map((item) => {
      if (item.type === 'item' || item.type === undefined) {
        return {
          ...item,
          data: item,
          onClick: (item) => this.onClick(item),
          onRender: item.renderItem
            ? (itemEl) => item.renderItem?.(itemEl, (itemEl) => this.onClick(itemEl))
            : undefined,
        };
      }

      if (item.type === 'submenu') {
        return {
          ...item,
          items: item.items ? this.convertToMenuItems(item.items) : [],
        };
      }

      if (item.type === 'modal') {
        return {
          ...item,
          type: item.type,
          data: item,
          renderModalContent: (onOk, onCancel) => {
            if (this.editor) {
              return item.renderModalContent(this.editor, onOk, onCancel);
            }
          },
          onOk: item.onOk && this.editor ? () => item.onOk?.(this.editor!) : undefined,
          onCancel: item.onCancel && this.editor ? () => item.onCancel?.(this.editor!) : undefined,
        };
      }

      return item as ContextMenuItemType;
    });
  }

  private onClick(item: ContextMenuItem) {
    if (this.editor && this.targetNode && this.uiUtilities) {
      const { data } = item;
      data.onClick(item.key, this.editor, this.targetNode, this.uiUtilities);
    }
  }

  setUIUtilities(uiUtilities: UIUtilities) {
    this.uiUtilities = uiUtilities;
  }
}

export function createFloatingMenuProvider(
  menuName: string,
  items: FloatingMenuItemType[],
  shouldAddMenuItems?: (editor: IEditor, node: Node) => boolean
): EditorPlugin {
  return new FloatingMenuProviderImpl(menuName, items, shouldAddMenuItems);
}
