import { ContentModelTableCellFormat, IEditor } from 'roosterjs-content-model-types';
import { getFirstSelectedTable, getSelectedCells } from 'roosterjs-content-model-dom';

export function getAllSelectedCellFormats(editor: IEditor): ContentModelTableCellFormat[] {
  const formats: ContentModelTableCellFormat[] = [];

  editor.formatContentModel((model) => {
    const [table] = getFirstSelectedTable(model);

    if (!table) return false;

    const sel = getSelectedCells(table);

    if (!sel) return false;

    for (let row = sel.firstRow; row <= sel.lastRow; row++) {
      for (let col = sel.firstColumn; col <= sel.lastColumn; col++) {
        const cell = table.rows[row]?.cells[col];
        if (cell?.format) {
          formats.push({ ...cell.format });
        }
      }
    }

    return false;
  });

  return formats;
}

export function getMergedCellFormat(
  formats: ContentModelTableCellFormat[]
): ContentModelTableCellFormat | null {
  if (formats.length === 0) return null;
  if (formats.length === 1) return formats[0];

  const merged: ContentModelTableCellFormat = {} as ContentModelTableCellFormat;
  const firstFormat = formats[0];

  (Object.keys(firstFormat) as Array<keyof ContentModelTableCellFormat>).forEach((key) => {
    const allSame = formats.every((f) => f[key] === firstFormat[key]);
    if (allSame) {
      (merged[key] as (typeof firstFormat)[typeof key]) = firstFormat[key];
    }
  });

  return merged;
}

export function parseBorder(
  borderTop?: string,
  borderRight?: string,
  borderBottom?: string,
  borderLeft?: string
) {
  const defaultBorder = {
    width: '1px',
    style: 'solid',
    color: 'hsl(0, 0%, 70%)',
  };

  if (!borderTop || !borderRight || !borderBottom || !borderLeft) {
    return defaultBorder;
  }

  if (borderTop !== borderRight || borderTop !== borderBottom || borderTop !== borderLeft) {
    return defaultBorder;
  }

  const parts = borderTop
    .trim()
    .split(/(\S+\(.*?\)|\S+)/g)
    .filter((str) => str.trim().length > 0);

  if (parts.length < 3) {
    return defaultBorder;
  }

  return {
    width: parts[0] || '1px',
    style: parts[1] || 'solid',
    color: parts[2] || 'hsl(0, 0%, 70%)',
  };
}

export function getEditingTable(editor: IEditor, node: Node) {
  const domHelper = editor.getDOMHelper();
  const td = domHelper.findClosestElementAncestor(node, 'TD,TH');
  const table = td && domHelper.findClosestElementAncestor(td, 'table');

  return table?.isContentEditable ? { table, td } : null;
}
