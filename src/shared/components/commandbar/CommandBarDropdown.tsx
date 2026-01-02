import React from 'react';
import { Icon } from '../icon/Icon';
import type { CommandBarDropdownItem } from './CommandBar.types';
import { DropDownMenu } from '../dropdownmenu/DropDownMenu';

export const CommandBarDropdown: React.FC<{ item: CommandBarDropdownItem }> = ({ item }) => {
  const {
    label,
    icon,
    iconOnly = false,
    disabled = false,
    items: menuItems = [],
    onItemClick,
    contentHeight,
  } = item;

  const [open, setOpen] = React.useState(false);

  return (
    <DropDownMenu
      items={menuItems}
      onItemClick={onItemClick}
      contentHeight={contentHeight}
      open={open}
      onOpenChange={setOpen}
    >
      <button
        type='button'
        disabled={disabled}
        aria-expanded={open}
        className={`
            inline-flex items-center justify-center gap-1 cursor-pointer
            ${iconOnly ? 'min-w-8 px-1' : 'min-w-8 px-2'}
            h-8
            text-sm font-medium
            rounded
            transition-all duration-150
            ${
              disabled
                ? 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                : open
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-100 dark:border-gray-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent cursor-pointer'
            }
          `.trim()}
      >
        {icon && <Icon name={icon} />}
        {!iconOnly && label && <span className='mx-1'>{label}</span>}
        <Icon name={open ? 'FaChevronUp' : 'FaChevronDown'} size={10} className='opacity-70' />
      </button>
    </DropDownMenu>
  );
};
