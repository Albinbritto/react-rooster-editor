import React from 'react';
import { Icon } from '../icon/Icon';
import { Modal } from '../modal/Modal';
import type { CommandBarModalItem } from './CommandBar.types';

export const CommandBarModal: React.FC<{ item: CommandBarModalItem }> = ({ item }) => {
  const {
    label,
    icon,
    iconOnly = false,
    disabled = false,
    active = false,
    modalTitle,
    modalDescription,
    modalContent,
    renderModalContent,
    okText,
    cancelText,
    showFooter,
    showCloseButton,
    modalWidth,
    preventCloseOnOverlayClick,
    preventCloseOnEscape,
    onOk,
    onCancel,
    onModalOpenChange,
  } = item;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onModalOpenChange) {
      onModalOpenChange(open);
    }
  };

  const handleOk = () => {
    if (onOk) {
      onOk(item);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(item);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={handleButtonClick}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center gap-2
          ${iconOnly ? 'min-w-[32px] px-1' : 'min-w-[32px] px-3'}
          h-8
          text-sm font-medium
          rounded
          transition-all duration-150
          ${
            disabled
              ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400'
              : active
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-300'
              : 'bg-white text-gray-700 border border-transparent hover:bg-gray-100'
          }
        `.trim()}
      >
        {icon && <Icon name={icon} />}
        {!iconOnly && label && <span>{label}</span>}
      </button>

      <Modal
        container={document.querySelector('.vive-editor')}
        open={isOpen}
        onOpenChange={handleModalOpenChange}
        title={modalTitle}
        description={modalDescription}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
        showFooter={showFooter}
        showCloseButton={showCloseButton}
        width={modalWidth}
        preventCloseOnOverlayClick={preventCloseOnOverlayClick}
        preventCloseOnEscape={preventCloseOnEscape}
        renderChildren={renderModalContent}
      >
        {modalContent}
      </Modal>
    </>
  );
};
