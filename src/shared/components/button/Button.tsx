import { forwardRef } from 'react';
import { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'default',
      size = 'middle',
      shape = 'default',
      icon,
      loading = false,
      danger = false,
      ghost = false,
      block = false,
      htmlType = 'button',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Size classes
    const sizeClasses = {
      small: 'h-6 px-2 text-xs',
      middle: 'h-8 px-4 text-sm',
      large: 'h-10 px-5 text-base',
    };

    // Icon-only button sizes
    const iconOnlySizeClasses = {
      small: 'h-6 w-6 p-0',
      middle: 'h-8 w-8 p-0',
      large: 'h-10 w-10 p-0',
    };

    // Shape classes
    const shapeClasses = {
      default: 'rounded',
      circle: 'rounded-full',
      round: 'rounded-full',
    };

    // Type classes
    const getTypeClasses = () => {
      if (danger) {
        if (ghost) {
          return 'bg-transparent text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 hover:text-red-600 dark:hover:text-red-300 hover:border-red-600 dark:hover:border-red-300';
        }
        if (type === 'primary') {
          return 'bg-red-500 text-white border border-red-500 hover:bg-red-600 hover:border-red-600 dark:hover:bg-red-600 dark:hover:border-red-600';
        }
        if (type === 'text' || type === 'link') {
          return 'bg-transparent text-red-500 dark:text-red-400 border-transparent hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20';
        }
        return 'bg-white dark:bg-gray-800 text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 hover:text-red-600 dark:hover:text-red-300 hover:border-red-600 dark:hover:border-red-300';
      }

      if (ghost) {
        return 'bg-transparent text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-600 dark:hover:border-blue-300';
      }

      switch (type) {
        case 'primary':
          return 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600';
        case 'dashed':
          return 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-dashed border-gray-300 dark:border-gray-600 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400';
        case 'text':
          return 'bg-transparent text-gray-700 dark:text-gray-300 border-transparent hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50';
        case 'link':
          return 'bg-transparent text-blue-500 dark:text-blue-400 border-transparent hover:text-blue-600 dark:hover:text-blue-300 p-0 h-auto';
        case 'default':
        default:
          return 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400';
      }
    };

    const baseClasses = `
      inline-flex items-center justify-center gap-2
      font-medium
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
      disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer
    `
      .trim()
      .replace(/\s+/g, ' ');

    const isIconOnly = icon && !children && !loading;
    const sizeClass = isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size];

    const buttonClasses = `
      ${baseClasses}
      ${sizeClass}
      ${shapeClasses[shape]}
      ${getTypeClasses()}
      ${block ? 'w-full' : ''}
      ${type === 'link' ? '' : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    const LoadingIcon = () => (
      <svg
        className='animate-spin h-4 w-4'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    );

    return (
      <button ref={ref} type={htmlType} disabled={isDisabled} className={buttonClasses} {...props}>
        {loading && <LoadingIcon />}
        {!loading && icon && <span className='inline-flex'>{icon}</span>}
        {children && <span>{children}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
