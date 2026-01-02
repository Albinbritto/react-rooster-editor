import { IEditor } from 'roosterjs-content-model-types';

export function getEditingList(editor: IEditor, node: Node | null) {
  if (!node) return null;

  const domHelper = editor.getDOMHelper();
  const li = domHelper.findClosestElementAncestor(node, 'LI');
  const list = li && (domHelper.findClosestElementAncestor(li, 'ol') as HTMLOListElement | null);

  return list?.isContentEditable ? { list, li } : null;
}
