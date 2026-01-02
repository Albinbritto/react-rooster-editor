import React, { useState } from 'react';
import type { CommandBarItemType } from './CommandBar.types';
import { CommandBarItemRenderer } from './CommandBarItemRenderer';
import { Popover } from '../popover/Popover';
import { Icon } from '../icon/Icon';

interface CommandBarOverflowMenuProps {
  items: CommandBarItemType[];
  isReady: boolean;
}

export const CommandBarOverflowMenu: React.FC<CommandBarOverflowMenuProps> = ({
  items,
  isReady,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isReady || items.length === 0) {
    return null;
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      triggerAsChild={true}
      trigger={
        <button
          className='flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors'
          aria-label='More options'
        >
          <Icon name='FaEllipsisH' className='text-gray-700' />
        </button>
      }
      side='bottom'
      align='end'
      sideOffset={4}
      avoidCollisions={true}
      collisionPadding={10}
      sticky='always'
      className='bg-white rounded-md shadow-lg border border-gray-200 p-1 z-60'
    >
      <div className='flex items-center gap-1 max-w-[600px] flex-wrap'>
        {items.map((item: CommandBarItemType) => (
          <CommandBarItemRenderer key={`overflow-${item.key}`} item={item} />
        ))}
      </div>
    </Popover>
  );
};
