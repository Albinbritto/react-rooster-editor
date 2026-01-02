import { insertImage, insertLink, insertTable } from 'roosterjs-content-model-api';
import { InsertLinkModal } from '../../../shared/components/insertlink/InsertLinkModal';
import { InsertTablePane } from '../../../shared/components/tablepane/InsertTablePane';
import { ToolBarButton } from '../types/ToolBarButton.type';

interface TableCellCoordinate {
  row: number;
  col: number;
}

function parseKey(key: string): TableCellCoordinate {
  const [row, col] = key.split(',');
  return {
    row: parseInt(row),
    col: parseInt(col),
  };
}

function createInput(doc: Document): HTMLInputElement {
  const input = doc.createElement('input');

  input.type = 'file';
  input.accept = 'image/*';
  input.setAttribute('display', 'none');

  return input;
}

export const insertButton: ToolBarButton<'buttonNameInsert' | 'insertLink' | 'insertImage'> = {
  key: 'buttonNameInsert',
  text: 'Insert',
  iconName: 'FaPlus',
  onClick: (editor, key) => {
    if (key === 'insertImage') {
      const document = editor.getDocument();
      const fileInput = createInput(document) as HTMLInputElement;
      document.body.appendChild(fileInput);

      fileInput.addEventListener('change', () => {
        if (fileInput.files) {
          for (let i = 0; i < fileInput.files.length; i++) {
            insertImage(editor, fileInput.files[i]);
          }
        }
      });

      try {
        fileInput.click();
      } finally {
        document.body.removeChild(fileInput);
      }
    }
  },
  dropDownMenu: {
    items: [
      {
        key: 'insertTable',
        label: 'Table',
        icon: 'FaTable',
        type: 'submenu',
        items: [
          {
            key: 'insertTablePane',
            label: '{0} x {1} table',
            type: 'item',
            renderItem: ({ item, onClick }) => {
              return <InsertTablePane item={item} onClick={onClick} />;
            },
            onClick: (editor, key) => {
              const { col, row } = parseKey(key);
              insertTable(editor, col, row);
            },
          },
        ],
      },
      {
        key: 'insertImage',
        label: 'Image',
        icon: 'FaImage',
        type: 'item',
      },
      {
        key: 'insertLink',
        label: 'Link',
        icon: 'FaLink',
        type: 'modal',
        modalTitle: 'Insert link',
        renderModalContent: ({ editor, onOk, onCancel }) => {
          const handleInsert = (url: string, displayText: string) => {
            insertLink(editor, url, url, displayText);
            onOk();
          };

          return <InsertLinkModal onInsert={handleInsert} onCancel={onCancel} />;
        },
      },
    ],
  },
};
