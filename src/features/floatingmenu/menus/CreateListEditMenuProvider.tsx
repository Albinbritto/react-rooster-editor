import { EditorPlugin, IEditor } from 'roosterjs-content-model-types';
import { createFloatingMenuProvider } from '../utils/createFloatingMenuProvider';
import { setListStartNumber } from 'roosterjs-content-model-api';
import { FloatingMenuItemType } from '../types/FloatingMenu.type';
import { getEditingList } from './listEditUtils';
import { Input } from '../../../shared/components/input';
import { useState, useEffect } from 'react';

function onClick(key: string, editor: IEditor) {
  if (key === 'restartAt1') {
    setListStartNumber(editor, 1);
  }
}

const menuItems: FloatingMenuItemType[] = [
  {
    key: 'restartAt1',
    type: 'item',
    label: 'Restart at 1',
    icon: 'FaRedo',
    onClick,
  },
  {
    key: 'setNumberingValue',
    type: 'modal',
    label: 'Set numbering value',
    icon: 'FaListOl',
    modalTitle: 'Set numbering value',
    renderModalContent: (editor, onOk, onCancel) => (
      <SetNumberingValue editor={editor} onOk={onOk} onCancel={onCancel} />
    ),
  },
];

function SetNumberingValue({
  editor,
  onOk,
  onCancel,
}: {
  editor: IEditor;
  onOk: () => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState<string>('1');

  useEffect(() => {
    // Get the current focus node from the editor
    const focusNode = editor.getDocument().getSelection()?.focusNode;
    const listAndLi = getEditingList(editor, focusNode || null);

    // Calculate current start number
    if (listAndLi) {
      const { list, li } = listAndLi;
      let startNumber = list.start || 1;

      for (let child = list.firstChild; child; child = child.nextSibling) {
        if (child === li) {
          break;
        } else if (child instanceof HTMLElement && child.tagName === 'LI') {
          startNumber += 1;
        }
      }

      setValue(startNumber.toString());
    }
  }, [editor]);

  const handleSave = () => {
    const result = parseInt(value);

    if (result > 0 && !isNaN(result)) {
      editor.focus();
      setListStartNumber(editor, Math.floor(result));
      onOk();
    }
  };

  return (
    <div className='p-4'>
      <div className='mb-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Set value to</label>
        <Input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min={1}
          autoFocus
        />
      </div>
      <div className='mt-4 flex justify-end gap-2'>
        <button
          onClick={onCancel}
          className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          OK
        </button>
      </div>
    </div>
  );
}

export function createListEditMenuProvider(): EditorPlugin {
  return createFloatingMenuProvider(
    'listEdit',
    menuItems,
    (editor, node) => !!getEditingList(editor, node)
  );
}
