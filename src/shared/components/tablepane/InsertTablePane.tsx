import React, { JSX } from 'react';
import { isNodeOfType } from 'roosterjs-content-model-dom';
import { IContextualMenuItem } from '../../../features/toolbar/types/ToolBarDropDown.type';
import { Button } from '../button';

const MaxRows = 10;
const MaxCols = 10;

export const InsertTablePane: React.FC<{
  item: IContextualMenuItem;
  onClick: (item: IContextualMenuItem) => void;
}> = ({ item, onClick }) => {
  const [col, setCol] = React.useState(1);
  const [row, setRow] = React.useState(1);

  const updateSize = React.useCallback(
    (t?: Node) => {
      if (t && isNodeOfType(t, 'ELEMENT_NODE')) {
        const col = parseInt(t.dataset.col ?? '-1');
        const row = parseInt(t.dataset.row ?? '-1');

        if (col > 0 && col <= MaxCols && row > 0 && row <= MaxRows) {
          setCol(col);
          setRow(row);
        }
      }
    },
    [setCol, setRow]
  );

  const onMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      updateSize(e.target as Node);
    },
    [updateSize]
  );

  const onClickButton = React.useCallback(() => {
    onClick({
      ...item,
      key: createKey(row, col),
    });
  }, [row, col, item.data.onClick]);

  const items = React.useMemo(() => {
    const items: JSX.Element[] = [];

    for (let i = 1; i <= MaxRows; i++) {
      for (let j = 1; j <= MaxCols; j++) {
        const key = `cell_${i}_${j}`;
        const isSelected = j <= col && i <= row;
        items.push(
          <Button
            key={key}
            id={key}
            data-col={j}
            data-row={i}
            data-is-focusable={true}
            onMouseEnter={onMouseEnter}
            onClick={onClickButton}
            className={`
              w-4! h-4! p-0! min-w-0!
              border transition-all duration-150 cursor-pointer
              ${
                isSelected
                  ? 'bg-blue-100! border-blue-500!'
                  : 'bg-white! border-gray-300! hover:border-gray-400!'
              }
            `.trim()}
          />
        );
      }
    }
    return items;
  }, [col, row, onMouseEnter]);

  const text = formatText('{0} x {1} table', row, col);

  return (
    <div className='p-2 cursor-pointer'>
      <div className='mb-1 text-sm font-medium text-gray-700 text-center'>{text}</div>
      <div className='grid grid-cols-10 gap-1 w-full'>{items}</div>
    </div>
  );
};

function formatText(text: string, row: number, col: number) {
  return text.replace('{0}', col.toString()).replace('{1}', row.toString());
}

function createKey(row: number, col: number) {
  return `${row},${col}`;
}
