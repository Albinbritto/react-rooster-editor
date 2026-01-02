import type { IEditor, ReadonlyContentModelTable } from 'roosterjs-content-model-types';
import { getFirstSelectedTable } from 'roosterjs-content-model-dom/lib/modelApi/selection/collectSelections';

export function getCurrentSelectedTable(editor: IEditor): ReadonlyContentModelTable | undefined {
  let currentTable: ReadonlyContentModelTable | undefined;
  editor.formatContentModel((model) => {
    const [table] = getFirstSelectedTable(model);
    currentTable = table;
    return false;
  });

  return currentTable;
}

/**
 * Get the bounding rectangle of the selected table cells
 * @param editor The editor instance
 * @returns DOMRect of selected cells or null if no table is selected
 */
export function getSelectedTableCellsRect(editor: IEditor): DOMRect | null {
  const selection = editor.getDOMSelection();

  if (selection?.type === 'table') {
    const { table, firstRow, firstColumn, lastRow, lastColumn } = selection;

    // Get all selected cells
    const cells: HTMLTableCellElement[] = [];
    for (let i = firstRow; i <= lastRow; i++) {
      const row = table.rows[i];
      if (row) {
        for (let j = firstColumn; j <= lastColumn; j++) {
          const cell = row.cells[j];
          if (cell) {
            cells.push(cell);
          }
        }
      }
    }

    if (cells.length === 0) {
      return null;
    }

    // Calculate combined bounding rect
    let minTop = Infinity;
    let minLeft = Infinity;
    let maxBottom = -Infinity;
    let maxRight = -Infinity;

    cells.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      minTop = Math.min(minTop, rect.top);
      minLeft = Math.min(minLeft, rect.left);
      maxBottom = Math.max(maxBottom, rect.bottom);
      maxRight = Math.max(maxRight, rect.right);
    });

    // Create a DOMRect-like object
    return new DOMRect(minLeft, minTop, maxRight - minLeft, maxBottom - minTop);
  }

  return null;
}
