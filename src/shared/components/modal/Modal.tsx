import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ModalProps } from './Modal.types';
import { Button } from '../button';
import { useThemeContext, ThemeProvider } from '../../contexts/ThemeContext';
import { useDirection } from '../../contexts/DirectionContext';

export const Modal: React.FC<ModalProps> = ({
  open = false,
  onOpenChange,
  title,
  description,
  renderChildren,
  children,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  showFooter = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  okDisabled = false,
  cancelDisabled = false,
  okLoading = false,
  width,
  preventCloseOnOverlayClick = false,
  preventCloseOnEscape = false,
  trigger,
}) => {
  const { isDarkMode } = useThemeContext();
  const dir = useDirection();

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (preventCloseOnOverlayClick) {
      e.preventDefault();
      return;
    }
    handleCancel();
  };

  const contentStyles: React.CSSProperties = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 z-50 bg-black/50 dark:bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${overlayClassName}`}
          onClick={handleOverlayClick}
        />
        <ThemeProvider isDarkMode={isDarkMode}>
          <Dialog.Content
            className={`fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white dark:bg-gray-800 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ${className}`}
            style={contentStyles}
            dir={dir}
            onEscapeKeyDown={(e) => {
              if (preventCloseOnEscape) {
                e.preventDefault();
              }
            }}
          >
            {title && (
              <Dialog.Title className='border-b border-gray-200 dark:border-gray-700 text-lg font-semibold text-gray-900 dark:text-gray-100 px-6 py-3'>
                {title}
              </Dialog.Title>
            )}
            {description && (
              <Dialog.Description className='mb-4 px-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
                {description}
              </Dialog.Description>
            )}

            <div className='flex-1 overflow-y-auto'>
              <div className='p-6 py-3'>
                {renderChildren ? renderChildren(handleOk, handleCancel) : children}
              </div>
            </div>

            {showFooter && (
              <div className='mt-auto flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-3'>
                <Button onClick={handleCancel} disabled={cancelDisabled} htmlType='button'>
                  {cancelText}
                </Button>
                <Button
                  type='primary'
                  onClick={handleOk}
                  disabled={okDisabled || okLoading}
                  loading={okLoading}
                  htmlType='button'
                >
                  {okText}
                </Button>
              </div>
            )}

            {showCloseButton && (
              <Dialog.Close asChild onClick={handleCancel}>
                <button
                  className='absolute end-4 top-4 flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2'
                  aria-label='Close'
                >
                  <span className='text-2xl leading-none text-gray-500 dark:text-gray-400'>×</span>
                </button>
              </Dialog.Close>
            )}
          </Dialog.Content>
        </ThemeProvider>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
