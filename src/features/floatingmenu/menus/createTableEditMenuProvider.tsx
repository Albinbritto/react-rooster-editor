import { EditorPlugin, IEditor, TableOperation } from 'roosterjs-content-model-types';
import { createFloatingMenuProvider } from '../utils/createFloatingMenuProvider';
import { applyTableBorderFormat, editTable, setTableCellShade } from 'roosterjs-content-model-api';
import { FloatingMenuItemType } from '../types/FloatingMenu.type';
import { CellPropertyPanel } from '../../../shared/components/cellproperty';
import {
  getAllSelectedCellFormats,
  getMergedCellFormat,
  parseBorder,
  getEditingTable,
} from './tableEditUtils';

function onClick(key: string, editor: IEditor) {
  editTable(editor, key as TableOperation);
}

const menuItems: FloatingMenuItemType[] = [
  {
    key: 'insert',
    type: 'submenu',
    label: 'Insert',
    icon: 'FaPlus',
    items: [
      {
        key: 'insertAbove',
        type: 'item',
        label: 'Row Above',
        icon: 'FaArrowUp',
        onClick,
      },
      {
        key: 'insertBelow',
        type: 'item',
        label: 'Row Below',
        icon: 'FaArrowDown',
        onClick,
      },
      {
        key: 'insertLeft',
        type: 'item',
        label: 'Column Left',
        icon: 'FaArrowLeft',
        onClick,
      },
      {
        key: 'insertRight',
        type: 'item',
        label: 'Column Right',
        icon: 'FaArrowRight',
        onClick,
      },
    ],
  },
  {
    key: 'delete',
    type: 'submenu',
    label: 'Delete',
    icon: 'FaTrash',
    items: [
      {
        key: 'deleteRow',
        type: 'item',
        label: 'Delete Row',
        icon: 'FaMinus',
        onClick,
      },
      {
        key: 'deleteColumn',
        type: 'item',
        label: 'Delete Column',
        icon: 'FaMinus',
        onClick,
      },
      {
        key: 'deleteTable',
        type: 'item',
        label: 'Delete Table',
        icon: 'FaTrash',
        onClick,
      },
    ],
  },
  {
    key: 'divider-1',
    type: 'divider',
  },
  {
    key: 'merge',
    type: 'submenu',
    label: 'Merge Cells',
    icon: 'FaObjectGroup',
    items: [
      {
        key: 'mergeAbove',
        type: 'item',
        label: 'Merge Above',
        icon: 'FaArrowUp',
        onClick,
      },
      {
        key: 'mergeBelow',
        type: 'item',
        label: 'Merge Below',
        icon: 'FaArrowDown',
        onClick,
      },
      {
        key: 'mergeLeft',
        type: 'item',
        label: 'Merge Left',
        icon: 'FaArrowLeft',
        onClick,
      },
      {
        key: 'mergeRight',
        type: 'item',
        label: 'Merge Right',
        icon: 'FaArrowRight',
        onClick,
      },
    ],
  },
  {
    key: 'split-cell',
    type: 'submenu',
    label: 'Split Cell',
    icon: 'FaObjectUngroup',
    items: [
      {
        key: 'splitHorizontally',
        type: 'item',
        label: 'Split Horizontally',
        icon: 'FaGripLines',
        onClick,
      },
      {
        key: 'splitVertically',
        type: 'item',
        label: 'Split Vertically',
        icon: 'FaGripLinesVertical',
        onClick,
      },
    ],
  },
  {
    key: 'divider-2',
    type: 'divider',
  },
  {
    key: 'align-table',
    type: 'submenu',
    label: 'Align Table',
    icon: 'FaTable',
    items: [
      {
        key: 'alignLeft',
        type: 'item',
        label: 'Align Left',
        icon: 'FaAlignLeft',
        onClick,
      },
      {
        key: 'alignCenter',
        type: 'item',
        label: 'Align Center',
        icon: 'FaAlignCenter',
        onClick,
      },
      {
        key: 'alignRight',
        type: 'item',
        label: 'Align Right',
        icon: 'FaAlignRight',
        onClick,
      },
    ],
  },
  {
    key: 'divider-3',
    type: 'divider',
  },
  {
    key: 'cell-property',
    label: 'Cell Properties',
    type: 'modal',
    icon: 'FaSlidersH',
    modalTitle: 'Cell Properties',
    renderModalContent: (editor, onOk, onCancel) => (
      <CellProperty editor={editor} onOk={onOk} onCancel={onCancel} />
    ),
  },
];

function CellProperty({
  editor,
  onOk,
  onCancel,
}: {
  editor: IEditor;
  onOk: () => void;
  onCancel: () => void;
}) {
  const allFormats = getAllSelectedCellFormats(editor);
  const currentFormat = getMergedCellFormat(allFormats);

  const border = parseBorder(
    currentFormat?.borderTop,
    currentFormat?.borderRight,
    currentFormat?.borderBottom,
    currentFormat?.borderLeft
  );
  const initialProperties = currentFormat
    ? {
        backgroundColor: currentFormat.backgroundColor || '#ffffff',
        borderColor: border.color,
        borderWidth: border.width,
        borderStyle: border.style as 'solid' | 'dotted' | 'dashed',
      }
    : undefined;

  return (
    <CellPropertyPanel
      initialProperties={initialProperties}
      onSave={(property) => {
        const { borderStyle, borderSelection } = property;
        const handlers: Record<string, (value: any) => void> = {
          horizontalAlign: (val) => editTable(editor, val as TableOperation),
          verticalAlign: (val) => editTable(editor, val as TableOperation),
          backgroundColor: (val) => setTableCellShade(editor, val),
          borderColor: (val) =>
            applyTableBorderFormat(editor, { color: val, style: borderStyle }, borderSelection),
        };

        Object.entries(property).forEach(([key, value]) => {
          if (value !== undefined && key in handlers) {
            handlers[key](value);
          }
        });

        onOk();
      }}
      onCancel={onCancel}
    />
  );
}

export function createTableEditMenuProvider(): EditorPlugin {
  return createFloatingMenuProvider(
    'tableEdit',
    menuItems,
    (editor, node) => !!getEditingTable(editor, node)
  );
}
