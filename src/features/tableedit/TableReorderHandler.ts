import { IEditor } from 'roosterjs-content-model-types';
import { normalizeRect } from 'roosterjs-content-model-dom';
import { RowReorder } from './features/RowReorder';
import { ColumnReorder } from './features/ColumnReorder';

const REORDER_TRIGGER_OFFSET = 25;

export class TableReorderHandler {
  private rowReorderFeature: RowReorder | null = null;
  private columnReorderFeature: ColumnReorder | null = null;
  private isRTL: boolean;

  constructor(
    private editor: IEditor,
    private table: HTMLTableElement,
    private anchorContainer?: HTMLElement,
    private options?: {
      enableRowReorder?: boolean;
      enableColumnReorder?: boolean;
    }
  ) {
    this.isRTL = editor.getDocument().defaultView?.getComputedStyle(table).direction === 'rtl';
  }

  dispose() {
    this.disposeRowReorder();
    this.disposeColumnReorder();
  }

  isOwnedElement(node: Node): boolean {
    return (
      this.rowReorderFeature?.isOwnedElement(node) ||
      this.columnReorderFeature?.isOwnedElement(node) ||
      false
    );
  }

  onMouseMove(x: number, y: number) {
    const tableRect = normalizeRect(this.table.getBoundingClientRect());

    if (!tableRect) {
      return;
    }

    // Expand detection zone to include where icons are placed (30px buffer)
    const iconBuffer = 30;

    // Check if we're near the left edge (for row reorder) - include icon zone
    const isNearLeftEdge = this.isRTL
      ? x >= tableRect.right - REORDER_TRIGGER_OFFSET && x <= tableRect.right + iconBuffer
      : x >= tableRect.left - iconBuffer && x <= tableRect.left + REORDER_TRIGGER_OFFSET;

    // Check if we're near the top edge (for column reorder) - include icon zone
    const isNearTopEdge =
      y >= tableRect.top - iconBuffer && y <= tableRect.top + REORDER_TRIGGER_OFFSET;

    // Determine which row/column we're hovering over
    let targetRow: HTMLTableRowElement | null = null;
    let targetCell: HTMLTableCellElement | null = null;

    if (isNearLeftEdge || isNearTopEdge) {
      for (let i = 0; i < this.table.rows.length; i++) {
        const row = this.table.rows[i];
        const rowRect = normalizeRect(row.getBoundingClientRect());

        if (rowRect && y >= rowRect.top && y <= rowRect.bottom) {
          targetRow = row;

          // Find the cell in this row
          for (let j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];
            const cellRect = normalizeRect(cell.getBoundingClientRect());

            if (cellRect && x >= cellRect.left && x <= cellRect.right) {
              targetCell = cell;
              break;
            }
          }
          break;
        }
      }

      // If we're in the top buffer zone but didn't find a row (mouse is above table),
      // use the first row to determine the column
      if (isNearTopEdge && !targetCell && this.table.rows.length > 0) {
        const firstRow = this.table.rows[0];
        targetRow = firstRow;

        for (let j = 0; j < firstRow.cells.length; j++) {
          const cell = firstRow.cells[j];
          const cellRect = normalizeRect(cell.getBoundingClientRect());

          if (cellRect && x >= cellRect.left && x <= cellRect.right) {
            targetCell = cell;
            break;
          }
        }
      }
    }

    // Create or update row reorder feature
    if (this.options?.enableRowReorder !== false && isNearLeftEdge && targetRow) {
      if (!this.rowReorderFeature || this.rowReorderFeature.getRow() !== targetRow) {
        this.disposeRowReorder();
        this.rowReorderFeature = new RowReorder(
          this.editor,
          this.table,
          targetRow,
          this.isRTL,
          this.anchorContainer
        );
      }
    } else if (!this.rowReorderFeature?.isDragging()) {
      // Only dispose if not currently dragging
      this.disposeRowReorder();
    }

    // Create or update column reorder feature
    if (this.options?.enableColumnReorder !== false && isNearTopEdge && targetCell && targetRow) {
      if (!this.columnReorderFeature || this.columnReorderFeature.getCell() !== targetCell) {
        this.disposeColumnReorder();
        this.columnReorderFeature = new ColumnReorder(
          this.editor,
          this.table,
          targetCell,
          this.anchorContainer
        );
      }
    } else if (!this.columnReorderFeature?.isDragging()) {
      // Only dispose if not currently dragging
      this.disposeColumnReorder();
    }
  }

  private disposeRowReorder() {
    this.rowReorderFeature?.dispose();
    this.rowReorderFeature = null;
  }

  private disposeColumnReorder() {
    this.columnReorderFeature?.dispose();
    this.columnReorderFeature = null;
  }
}
