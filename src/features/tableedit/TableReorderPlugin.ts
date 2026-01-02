import { IEditor, EditorPlugin, PluginEvent } from 'roosterjs-content-model-types';
import { isNodeOfType, normalizeRect } from 'roosterjs-content-model-dom';
import { TableReorderHandler } from './TableReorderHandler';

const TABLE_DETECT_OFFSET = 30;

/**
 * TableReorder plugin - provides the ability to reorder table rows and columns via drag-and-drop
 */
export class TableReorderPlugin implements EditorPlugin {
  private editor: IEditor | null = null;
  private onMouseMoveDisposer: (() => void) | null = null;
  private reorderHandler: TableReorderHandler | null = null;
  private currentTable: HTMLTableElement | null = null;

  /**
   * Construct a new instance of TableReorder plugin
   * @param anchorContainerSelector An optional selector string to specify the container to host the plugin
   * @param options Plugin options
   */
  constructor(
    private anchorContainerSelector?: string,
    private options?: {
      enableRowReorder?: boolean;
      enableColumnReorder?: boolean;
    }
  ) {
    this.options = {
      enableRowReorder: true,
      enableColumnReorder: true,
      ...options,
    };
  }

  /**
   * Get a friendly name of this plugin
   */
  getName() {
    return 'TableReorder';
  }

  /**
   * Initialize this plugin
   * @param editor Editor instance
   */
  initialize(editor: IEditor) {
    this.editor = editor;
    this.onMouseMoveDisposer = this.editor.attachDomEvent({
      mousemove: { beforeDispatch: this.onMouseMove },
    });
    const scrollContainer = this.editor.getScrollContainer();
    scrollContainer.addEventListener('mouseout', this.onMouseOut);
  }

  /**
   * Dispose this plugin
   */
  dispose() {
    const scrollContainer = this.editor?.getScrollContainer();
    scrollContainer?.removeEventListener('mouseout', this.onMouseOut);
    this.onMouseMoveDisposer?.();
    this.disposeReorderHandler();
    this.editor = null;
    this.onMouseMoveDisposer = null;
  }

  /**
   * Handle events triggered from editor
   * @param event PluginEvent object
   */
  onPluginEvent(e: PluginEvent) {
    switch (e.eventType) {
      case 'input':
      case 'contentChanged':
      case 'scroll':
      case 'zoomChanged':
        this.disposeReorderHandler();
        this.currentTable = null;
        break;
    }
  }

  private onMouseMove = (event: Event) => {
    const e = event as MouseEvent;

    if (e.buttons > 0 || !this.editor) {
      return;
    }

    const editorWindow = this.editor.getDocument().defaultView || window;
    const x = e.pageX - editorWindow.scrollX;
    const y = e.pageY - editorWindow.scrollY;

    // Find table under mouse
    const table = this.findTableUnderMouse(x, y);

    if (table !== this.currentTable) {
      this.disposeReorderHandler();
      this.currentTable = table;

      if (table && this.editor) {
        const container = this.anchorContainerSelector
          ? this.editor.getDocument().querySelector(this.anchorContainerSelector)
          : undefined;

        this.reorderHandler = new TableReorderHandler(
          this.editor,
          table,
          isNodeOfType(container, 'ELEMENT_NODE') ? container : undefined,
          this.options
        );
      }
    }

    this.reorderHandler?.onMouseMove(x, y);
  };

  private onMouseOut = ({ relatedTarget, currentTarget }: MouseEvent) => {
    const relatedTargetNode = relatedTarget as Node;
    const currentTargetNode = currentTarget as Node;
    if (
      isNodeOfType(relatedTargetNode, 'ELEMENT_NODE') &&
      isNodeOfType(currentTargetNode, 'ELEMENT_NODE') &&
      this.reorderHandler &&
      !this.reorderHandler.isOwnedElement(relatedTargetNode) &&
      !currentTargetNode.contains(relatedTargetNode)
    ) {
      this.disposeReorderHandler();
      this.currentTable = null;
    }
  };

  private findTableUnderMouse(x: number, y: number): HTMLTableElement | null {
    if (!this.editor) {
      return null;
    }

    const tables = this.editor
      .getDOMHelper()
      .queryElements('table')
      .filter((table) => table.isContentEditable);

    for (let i = tables.length - 1; i >= 0; i--) {
      const table = tables[i];
      const rect = normalizeRect(table.getBoundingClientRect());

      if (
        rect &&
        x >= rect.left - TABLE_DETECT_OFFSET &&
        x <= rect.right + TABLE_DETECT_OFFSET &&
        y >= rect.top - TABLE_DETECT_OFFSET &&
        y <= rect.bottom + TABLE_DETECT_OFFSET
      ) {
        return table;
      }
    }

    return null;
  }

  private disposeReorderHandler() {
    this.reorderHandler?.dispose();
    this.reorderHandler = null;
  }
}
