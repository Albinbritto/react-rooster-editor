export const getTriggerClasses = (fullWidth?: boolean, disabled?: boolean): string => {
  const baseClasses = `
    inline-flex items-center justify-between gap-2
    h-8 px-3 text-sm
    rounded-md
    bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500
    text-gray-900 dark:text-gray-100
    outline-none
    transition-colors
    data-[placeholder]:text-gray-500 dark:data-[placeholder]:text-gray-400
  `.trim();

  const widthClass = fullWidth ? 'w-full' : 'min-w-[180px]';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return `${baseClasses} ${widthClass} ${disabledClasses}`;
};

export const getContentClasses = (): string => {
  return `
    overflow-hidden
    bg-white dark:bg-gray-800
    rounded-md
    shadow-lg
    border border-gray-200 dark:border-gray-700
    w-full
    z-50
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2
    data-[side=left]:slide-in-from-right-2
    data-[side=right]:slide-in-from-left-2
    data-[side=top]:slide-in-from-bottom-2
  `.trim();
};

export const getViewportClasses = (): string => {
  return 'p-1';
};

export const getItemClasses = (disabled?: boolean): string => {
  const baseClasses = `
    relative flex items-center gap-2
    w-full
    px-3 py-2
    text-sm
    rounded
    outline-none
    select-none
    cursor-pointer
    transition-colors
    data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700
    data-[highlighted]:text-gray-900 dark:data-[highlighted]:text-gray-100
    text-gray-900 dark:text-gray-100
  `.trim();

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return `${baseClasses} ${disabledClasses}`;
};

export const getLabelClasses = (): string => {
  return 'px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider';
};

export const getSeparatorClasses = (): string => {
  return 'h-px bg-gray-200 dark:bg-gray-700 my-1';
};

export const getScrollButtonClasses = (): string => {
  return `
    flex items-center justify-center
    h-6
    bg-white dark:bg-gray-800
    cursor-default
    text-gray-700 dark:text-gray-300
  `.trim();
};
