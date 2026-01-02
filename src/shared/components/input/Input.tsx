import React, { forwardRef, useState } from 'react';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'middle',
      status,
      prefix,
      suffix,
      allowClear,
      onClear,
      className = '',
      fullWidth = false,
      disabled,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;

      setInternalValue('');
      if (onChange) {
        onChange(syntheticEvent);
      }
      if (onClear) {
        onClear();
      }
    };

    const currentValue = value !== undefined ? value : internalValue;
    const showClear = allowClear && currentValue && !disabled;

    // Size classes
    const sizeClasses = {
      small: 'h-6 px-2 text-xs',
      middle: 'h-8 px-3 text-sm',
      large: 'h-10 px-3 text-base',
    };

    // Status classes
    const statusClasses = {
      error: 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500',
      warning:
        'border-orange-500 hover:border-orange-500 focus:border-orange-500 focus:ring-orange-500',
    };

    const baseClasses = `
      bg-white dark:bg-gray-800 
      border border-gray-300 dark:border-gray-600
      rounded-md
      text-gray-900 dark:text-gray-100 
      placeholder-gray-400 dark:placeholder-gray-500
      transition-colors duration-200
      focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
      hover:border-blue-400 dark:hover:border-blue-500
      disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed disabled:border-gray-200 dark:disabled:border-gray-700
      leading-none
    `
      .trim()
      .replace(/\s+/g, ' ');

    const containerClasses = `
      relative inline-flex items-center
      ${fullWidth ? 'w-full' : ''}
    `
      .trim()
      .replace(/\s+/g, ' ');

    const inputClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${status ? statusClasses[status] : ''}
      ${prefix ? 'ps-8' : ''}
      ${suffix || showClear ? 'pe-8' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <div className={containerClasses}>
        {prefix && (
          <span className='absolute start-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none'>
            {prefix}
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          className={inputClasses}
          {...props}
        />

        {showClear && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer'
            tabIndex={-1}
          >
            <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
              <path
                d='M6 6L10 2M6 6L2 10M6 6L10 10M6 6L2 2'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </button>
        )}

        {!showClear && suffix && (
          <span className='absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none'>
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
