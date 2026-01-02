import { forwardRef } from 'react';
import { RadioButtonProps } from './Radio.types';

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      children,
      checked,
      defaultChecked,
      disabled = false,
      value,
      buttonStyle = 'outline',
      size = 'middle',
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

    // Size classes
    const sizeClasses = {
      small: 'h-6 px-3 text-xs',
      middle: 'h-8 px-4 text-sm',
      large: 'h-10 px-5 text-base',
    };

    // Style classes based on checked state
    const getStyleClasses = () => {
      if (checked) {
        if (buttonStyle === 'solid') {
          return 'bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:border-blue-600 dark:hover:border-blue-700';
        }
        return 'bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 border-blue-500 dark:border-blue-400';
      }
      return 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400';
    };

    const buttonClasses = `
      inline-flex items-center justify-center gap-2 flex-1
      ${sizeClasses[size]}
      border
      font-medium
      transition-all duration-200
      cursor-pointer
      focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 focus-within:ring-offset-0 dark:focus-within:ring-offset-gray-900
      ${getStyleClasses()}
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <label className={buttonClasses}>
        <input
          ref={ref}
          type='radio'
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className='sr-only'
          {...props}
        />
        {children}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';
