import React from 'react';
import { Icon } from '../icon/Icon';
import type { CommandBarButtonItem } from './CommandBar.types';

export const CommandBarButton: React.FC<{ item: CommandBarButtonItem }> = ({ item }) => {
  const { label, icon, iconOnly = false, disabled = false, active = false, onClick } = item;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick(item);
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        ${iconOnly ? 'min-w-8 px-1' : 'min-w-8 px-3'}
        h-8
        text-sm font-medium
        rounded
        transition-all duration-150
        ${
          disabled
            ? 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            : active
            ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 border border-blue-300 dark:border-blue-600'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
        }
      `.trim()}
    >
      {icon && <Icon name={icon} />}
      {!iconOnly && label && <span>{label}</span>}
    </button>
  );
};
