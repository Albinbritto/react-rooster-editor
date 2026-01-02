import { IEditor } from 'roosterjs-content-model-types';
import { normalizeRect } from 'roosterjs-content-model-dom';

const DRAG_ICON_SIZE = 18;
const DRAG_INDICATOR_THICKNESS = 3;
const DRAG_INDICATOR_COLOR = '#0078D4';
const DRAG_ICON_COLOR = '#666666';
const DRAG_OVERLAY_COLOR = 'rgba(0, 120, 212, 0.15)';
const DRAG_OVERLAY_BORDER = '2px dashed #0078D4';

export class ColumnReorder {
  private dragTrigger: HTMLDivElement;
  private dragIndicator: HTMLDivElement | null = null;
  private dragOverlay: HTMLDivElement | null = null;
  private dragIconContainer: HTMLDivElement | null = null;
  private _isDragging = false;
  private sourceColumnIndex = -1;
  private targetColumnIndex = -1;

  constructor(
    private editor: IEditor,
    private table: HTMLTableElement,
    private cell: HTMLTableCellElement,
    private anchorContainer?: HTMLElement
  ) {
    this.dragTrigger = this.createDragTrigger();
    this.attachEventListeners();
  }

  getCell(): HTMLTableCellElement {
    return this.cell;
  }

  isDragging(): boolean {
    return this._isDragging;
  }

  isOwnedElement(node: Node): boolean {
    return (
      this.dragTrigger === node ||
      this.dragTrigger.contains(node) ||
      (this.dragIndicator !== null &&
        (this.dragIndicator === node || this.dragIndicator.contains(node)))
    );
  }

  dispose() {
    this.removeEventListeners();
    this.dragTrigger.remove();
    this.dragIndicator?.remove();
    this.dragOverlay?.remove();
    this.dragIconContainer?.remove();
  }

  private createDragTrigger(): HTMLDivElement {
    const cellRect = normalizeRect(this.cell.getBoundingClientRect());
    const tableRect = normalizeRect(this.table.getBoundingClientRect());

    if (!cellRect || !tableRect) {
      throw new Error('Unable to get cell or table rect');
    }

    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.width = `${DRAG_ICON_SIZE}px`;
    div.style.height = `${DRAG_ICON_SIZE}px`;
    div.style.left = `${cellRect.left + (cellRect.right - cellRect.left - DRAG_ICON_SIZE) / 2}px`;
    div.style.top = `${tableRect.top - DRAG_ICON_SIZE - 2}px`;
    div.style.cursor = 'grab';
    div.style.zIndex = '1000';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.backgroundColor = 'white';
    div.style.border = '1px solid #ccc';
    div.style.borderRadius = '3px';
    div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    div.innerHTML = this.getDragIcon();

    (this.anchorContainer || document.body).appendChild(div);

    return div;
  }

  private getDragIcon(): string {
    return `
            <svg width="${DRAG_ICON_SIZE - 4}" height="${
      DRAG_ICON_SIZE - 4
    }" viewBox="0 0 16 16" fill="${DRAG_ICON_COLOR}">
                <path d="M3 3v10M8 3v10M13 3v10" stroke="${DRAG_ICON_COLOR}" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
  }

  private createDragIndicator(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.backgroundColor = DRAG_INDICATOR_COLOR;
    div.style.width = `${DRAG_INDICATOR_THICKNESS}px`;
    div.style.zIndex = '10000';
    div.style.pointerEvents = 'none';
    div.style.display = 'none';
    div.style.borderRadius = '2px';

    (this.anchorContainer || document.body).appendChild(div);

    return div;
  }

  private createDragOverlay(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.backgroundColor = DRAG_OVERLAY_COLOR;
    div.style.border = DRAG_OVERLAY_BORDER;
    div.style.zIndex = '9999';
    div.style.pointerEvents = 'none';
    div.style.borderRadius = '4px';

    (this.anchorContainer || document.body).appendChild(div);

    return div;
  }

  private createDragIconContainer(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.width = `${DRAG_ICON_SIZE}px`;
    div.style.height = `${DRAG_ICON_SIZE}px`;
    div.style.backgroundColor = 'white';
    div.style.border = '1px solid #ccc';
    div.style.borderRadius = '3px';
    div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.zIndex = '10001';
    div.style.pointerEvents = 'none';
    div.innerHTML = this.getDragIcon();

    (this.anchorContainer || document.body).appendChild(div);

    return div;
  }

  private updateColumnOverlay(_mouseX: number) {
    if (!this.dragOverlay || this.table.rows.length === 0) {
      return;
    }

    const tableRect = normalizeRect(this.table.getBoundingClientRect());
    if (!tableRect) {
      return;
    }

    // Find column bounds by checking all rows
    let minLeft = Infinity;
    let maxRight = -Infinity;

    for (let i = 0; i < this.table.rows.length; i++) {
      const row = this.table.rows[i];
      if (this.sourceColumnIndex < row.cells.length) {
        const cell = row.cells[this.sourceColumnIndex];
        const cellRect = normalizeRect(cell.getBoundingClientRect());
        if (cellRect) {
          minLeft = Math.min(minLeft, cellRect.left);
          maxRight = Math.max(maxRight, cellRect.right);
        }
      }
    }

    if (minLeft !== Infinity && maxRight !== -Infinity) {
      this.dragOverlay.style.left = `${minLeft}px`;
      this.dragOverlay.style.top = `${tableRect.top}px`;
      this.dragOverlay.style.width = `${maxRight - minLeft}px`;
      this.dragOverlay.style.height = `${tableRect.bottom - tableRect.top}px`;
    }
  }

  private attachEventListeners() {
    this.dragTrigger.addEventListener('mousedown', this.onMouseDown);
  }

  private removeEventListeners() {
    this.dragTrigger.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  private onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    this._isDragging = true;
    this.sourceColumnIndex = this.cell.cellIndex;
    this.dragIndicator = this.createDragIndicator();
    this.dragOverlay = this.createDragOverlay();
    this.dragIconContainer = this.createDragIconContainer();
    this.dragTrigger.style.cursor = 'grabbing';
    this.dragTrigger.style.display = 'none'; // Hide the original trigger

    // Calculate column bounds across all rows
    this.updateColumnOverlay(e.clientX);

    // Position icon outside overlay with gap
    const cellRect = normalizeRect(this.cell.getBoundingClientRect());
    const tableRect = normalizeRect(this.table.getBoundingClientRect());
    if (cellRect && tableRect && this.dragIconContainer) {
      this.dragIconContainer.style.left = `${
        cellRect.left + (cellRect.right - cellRect.left - DRAG_ICON_SIZE) / 2
      }px`;
      this.dragIconContainer.style.top = `${tableRect.top - DRAG_ICON_SIZE - 2}px`;
    }

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    // Take snapshot before starting drag
    this.editor.takeSnapshot();
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this._isDragging || !this.dragIndicator || this.table.rows.length === 0) {
      return;
    }

    const mouseX = e.clientX;

    // Update overlay position to follow mouse
    if (this.dragOverlay) {
      const tableRect = normalizeRect(this.table.getBoundingClientRect());
      if (tableRect) {
        // Find column width by checking all rows
        let minLeft = Infinity;
        let maxRight = -Infinity;

        for (let i = 0; i < this.table.rows.length; i++) {
          const row = this.table.rows[i];
          if (this.sourceColumnIndex < row.cells.length) {
            const cell = row.cells[this.sourceColumnIndex];
            const cellRect = normalizeRect(cell.getBoundingClientRect());
            if (cellRect) {
              minLeft = Math.min(minLeft, cellRect.left);
              maxRight = Math.max(maxRight, cellRect.right);
            }
          }
        }

        if (minLeft !== Infinity && maxRight !== -Infinity) {
          const columnWidth = maxRight - minLeft;
          this.dragOverlay.style.left = `${mouseX - columnWidth / 2}px`;
          this.dragOverlay.style.top = `${tableRect.top}px`;
          this.dragOverlay.style.width = `${columnWidth}px`;
          this.dragOverlay.style.height = `${tableRect.bottom - tableRect.top}px`;

          // Update icon position to stay outside overlay
          if (this.dragIconContainer) {
            this.dragIconContainer.style.left = `${mouseX - DRAG_ICON_SIZE / 2}px`;
            this.dragIconContainer.style.top = `${tableRect.top - DRAG_ICON_SIZE - 2}px`;
          }
        }
      }
    }

    const firstRow = this.table.rows[0];
    let targetColumnIndex = this.sourceColumnIndex;

    // Find target column based on mouse position
    for (let i = 0; i < firstRow.cells.length; i++) {
      const cellRect = normalizeRect(firstRow.cells[i].getBoundingClientRect());
      if (cellRect && mouseX < cellRect.left + (cellRect.right - cellRect.left) / 2) {
        targetColumnIndex = i;
        break;
      }
      if (i === firstRow.cells.length - 1) {
        targetColumnIndex = i + 1;
      }
    }

    this.targetColumnIndex = targetColumnIndex;

    // Update drag indicator position
    const tableRect = normalizeRect(this.table.getBoundingClientRect());
    if (targetColumnIndex < firstRow.cells.length) {
      const targetCell = firstRow.cells[targetColumnIndex];
      const cellRect = normalizeRect(targetCell.getBoundingClientRect());
      if (cellRect && tableRect) {
        this.dragIndicator.style.left = `${cellRect.left - 1}px`;
        this.dragIndicator.style.top = `${tableRect.top}px`;
        this.dragIndicator.style.height = `${tableRect.bottom - tableRect.top}px`;
        this.dragIndicator.style.display = 'block';
      }
    } else {
      const lastCell = firstRow.cells[firstRow.cells.length - 1];
      const cellRect = normalizeRect(lastCell.getBoundingClientRect());
      if (cellRect && tableRect) {
        this.dragIndicator.style.left = `${cellRect.right}px`;
        this.dragIndicator.style.top = `${tableRect.top}px`;
        this.dragIndicator.style.height = `${tableRect.bottom - tableRect.top}px`;
        this.dragIndicator.style.display = 'block';
      }
    }
  };

  private onMouseUp = (_e: MouseEvent) => {
    if (!this._isDragging) {
      return;
    }

    this._isDragging = false;
    this.dragTrigger.style.cursor = 'grab';
    this.dragTrigger.style.display = 'flex'; // Show the original trigger again
    this.dragIndicator?.remove();
    this.dragIndicator = null;
    this.dragOverlay?.remove();
    this.dragOverlay = null;
    this.dragIconContainer?.remove();
    this.dragIconContainer = null;

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    // Perform the reorder if target is different from source
    if (
      this.sourceColumnIndex !== this.targetColumnIndex &&
      this.targetColumnIndex >= 0 &&
      this.sourceColumnIndex >= 0
    ) {
      this.reorderColumn();
    }
  };

  private reorderColumn() {
    // Calculate actual insert position
    const insertIndex =
      this.targetColumnIndex > this.sourceColumnIndex
        ? this.targetColumnIndex - 1
        : this.targetColumnIndex;

    // Reorder cells in each row
    for (let rowIndex = 0; rowIndex < this.table.rows.length; rowIndex++) {
      const row = this.table.rows[rowIndex];

      if (this.sourceColumnIndex < row.cells.length) {
        const sourceCell = row.cells[this.sourceColumnIndex];

        // Store reference to the cell before removing it
        const cellToMove = sourceCell;

        // Remove source cell from its parent
        sourceCell.parentElement?.removeChild(sourceCell);

        // Insert at target position
        if (insertIndex >= row.cells.length) {
          // Append to the end
          row.appendChild(cellToMove);
        } else {
          // Insert before the target cell
          const targetCell = row.cells[insertIndex];
          row.insertBefore(cellToMove, targetCell);
        }
      }
    }

    // Take snapshot after reorder
    this.editor.takeSnapshot();
    this.editor.focus();
  }
}
