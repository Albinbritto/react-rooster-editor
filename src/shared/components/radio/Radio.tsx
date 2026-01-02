import { forwardRef } from 'react';
import { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      children,
      checked,
      defaultChecked,
      disabled = false,
      value,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <label
        className={`
          inline-flex items-center gap-2 cursor-pointer
          ${
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:text-blue-500 dark:hover:text-blue-400'
          }
          ${className}
        `
          .trim()
          .replace(/\s+/g, ' ')}
      >
        <input
          ref={ref}
          type='radio'
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className='
            w-4 h-4 cursor-pointer
            text-blue-500 dark:accent-blue-500
            border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0 dark:focus:ring-offset-gray-900
            disabled:cursor-not-allowed
            dark:bg-gray-800
          '
          {...props}
        />
        {children && <span className='text-sm select-none'>{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
