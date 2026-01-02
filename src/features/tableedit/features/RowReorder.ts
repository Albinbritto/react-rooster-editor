import { IEditor } from 'roosterjs-content-model-types';
import { normalizeRect } from 'roosterjs-content-model-dom';

const DRAG_ICON_SIZE = 18;
const DRAG_INDICATOR_THICKNESS = 3;
const DRAG_INDICATOR_COLOR = '#0078D4';
const DRAG_ICON_COLOR = '#666666';
const DRAG_OVERLAY_COLOR = 'rgba(0, 120, 212, 0.15)';
const DRAG_OVERLAY_BORDER = '2px dashed #0078D4';

export class RowReorder {
  private dragTrigger: HTMLDivElement;
  private dragIndicator: HTMLDivElement | null = null;
  private dragOverlay: HTMLDivElement | null = null;
  private dragIconContainer: HTMLDivElement | null = null;
  private _isDragging = false;
  private sourceRowIndex = -1;
  private targetRowIndex = -1;

  constructor(
    private editor: IEditor,
    private table: HTMLTableElement,
    private row: HTMLTableRowElement,
    private isRTL: boolean,
    private anchorContainer?: HTMLElement
  ) {
    this.dragTrigger = this.createDragTrigger();
    this.attachEventListeners();
  }

  getRow(): HTMLTableRowElement {
    return this.row;
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
    const rowRect = normalizeRect(this.row.getBoundingClientRect());
    const tableRect = normalizeRect(this.table.getBoundingClientRect());

    if (!rowRect || !tableRect) {
      throw new Error('Unable to get row or table rect');
    }

    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.width = `${DRAG_ICON_SIZE}px`;
    div.style.height = `${DRAG_ICON_SIZE}px`;
    div.style.left = `${this.isRTL ? tableRect.right + 2 : tableRect.left - DRAG_ICON_SIZE - 2}px`;
    div.style.top = `${rowRect.top + (rowRect.bottom - rowRect.top - DRAG_ICON_SIZE) / 2}px`;
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
                <path d="M3 3h10M3 8h10M3 13h10" stroke="${DRAG_ICON_COLOR}" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
  }

  private createDragIndicator(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.backgroundColor = DRAG_INDICATOR_COLOR;
    div.style.height = `${DRAG_INDICATOR_THICKNESS}px`;
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
    this.sourceRowIndex = this.row.rowIndex;
    this.dragIndicator = this.createDragIndicator();
    this.dragOverlay = this.createDragOverlay();
    this.dragIconContainer = this.createDragIconContainer();
    this.dragTrigger.style.cursor = 'grabbing';
    this.dragTrigger.style.display = 'none'; // Hide the original trigger

    // Position the overlay on the source row
    const rowRect = normalizeRect(this.row.getBoundingClientRect());
    const tableRect = normalizeRect(this.table.getBoundingClientRect());
    if (rowRect && this.dragOverlay && tableRect && this.dragIconContainer) {
      this.dragOverlay.style.left = `${rowRect.left}px`;
      this.dragOverlay.style.top = `${rowRect.top}px`;
      this.dragOverlay.style.width = `${rowRect.right - rowRect.left}px`;
      this.dragOverlay.style.height = `${rowRect.bottom - rowRect.top}px`;

      // Position icon outside overlay with gap
      const iconLeft = this.isRTL ? tableRect.right + 2 : tableRect.left - DRAG_ICON_SIZE - 2;
      this.dragIconContainer.style.left = `${iconLeft}px`;
      this.dragIconContainer.style.top = `${
        rowRect.top + (rowRect.bottom - rowRect.top - DRAG_ICON_SIZE) / 2
      }px`;
    }

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    // Take snapshot before starting drag
    this.editor.takeSnapshot();
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this._isDragging || !this.dragIndicator) {
      return;
    }

    const mouseY = e.clientY;

    // Update overlay position to follow mouse
    const tableRect = normalizeRect(this.table.getBoundingClientRect());
    if (this.dragOverlay && tableRect) {
      const rowRect = normalizeRect(this.row.getBoundingClientRect());
      if (rowRect) {
        const rowHeight = rowRect.bottom - rowRect.top;
        this.dragOverlay.style.left = `${rowRect.left}px`;
        this.dragOverlay.style.top = `${mouseY - rowHeight / 2}px`;
        this.dragOverlay.style.width = `${rowRect.right - rowRect.left}px`;
        this.dragOverlay.style.height = `${rowHeight}px`;

        // Update icon position to stay outside overlay
        if (this.dragIconContainer) {
          const iconLeft = this.isRTL ? tableRect.right + 2 : tableRect.left - DRAG_ICON_SIZE - 2;
          this.dragIconContainer.style.left = `${iconLeft}px`;
          this.dragIconContainer.style.top = `${mouseY - DRAG_ICON_SIZE / 2}px`;
        }
      }
    }

    let targetRowIndex = this.sourceRowIndex;

    // Find target row based on mouse position
    for (let i = 0; i < this.table.rows.length; i++) {
      const rowRect = normalizeRect(this.table.rows[i].getBoundingClientRect());
      if (rowRect && mouseY < rowRect.top + (rowRect.bottom - rowRect.top) / 2) {
        targetRowIndex = i;
        break;
      }
      if (i === this.table.rows.length - 1) {
        targetRowIndex = i + 1;
      }
    }

    this.targetRowIndex = targetRowIndex;

    // Update drag indicator position
    if (targetRowIndex < this.table.rows.length) {
      const targetRow = this.table.rows[targetRowIndex];
      const rowRect = normalizeRect(targetRow.getBoundingClientRect());
      if (rowRect) {
        this.dragIndicator.style.top = `${rowRect.top - 1}px`;
        this.dragIndicator.style.left = `${rowRect.left}px`;
        this.dragIndicator.style.width = `${rowRect.right - rowRect.left}px`;
        this.dragIndicator.style.display = 'block';
      }
    } else {
      const lastRow = this.table.rows[this.table.rows.length - 1];
      const rowRect = normalizeRect(lastRow.getBoundingClientRect());
      if (rowRect) {
        this.dragIndicator.style.top = `${rowRect.bottom}px`;
        this.dragIndicator.style.left = `${rowRect.left}px`;
        this.dragIndicator.style.width = `${rowRect.right - rowRect.left}px`;
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
      this.sourceRowIndex !== this.targetRowIndex &&
      this.targetRowIndex >= 0 &&
      this.sourceRowIndex >= 0
    ) {
      this.reorderRow();
    }
  };

  private reorderRow() {
    const sourceRow = this.table.rows[this.sourceRowIndex];

    if (!sourceRow) {
      return;
    }

    // Get the parent element (tbody, thead, or table)
    const parentElement = sourceRow.parentElement || this.table;

    // Calculate actual insert position
    const insertIndex =
      this.targetRowIndex > this.sourceRowIndex ? this.targetRowIndex - 1 : this.targetRowIndex;

    // Remove the row from its current position
    parentElement.removeChild(sourceRow);

    // Insert row at target position
    if (insertIndex >= this.table.rows.length) {
      // Append to the end
      parentElement.appendChild(sourceRow);
    } else {
      // Insert before the target row
      const targetRow = this.table.rows[insertIndex];
      parentElement.insertBefore(sourceRow, targetRow);
    }

    // Take snapshot after reorder
    this.editor.takeSnapshot();
    this.editor.focus();
  }
}
