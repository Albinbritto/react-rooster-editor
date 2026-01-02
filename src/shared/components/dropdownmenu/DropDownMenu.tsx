import React, { useEffect, useState } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropDownMenuItemProps, DropDownMenuProps, DropDownMenuModal } from './DropDownMenu.type';
import { Icon } from '../icon/Icon';
import { Modal } from '../modal/Modal';
import { useThemeContext, ThemeProvider } from '../../contexts/ThemeContext';

export const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
  const {
    items,
    onItemClick,
    children,
    contentHeight,
    onOpenChange,
    open = false,
    container,
  } = props;
  const { isDarkMode } = useThemeContext();
  const [modalItem, setModalItem] = useState<DropDownMenuModal | null>(null);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleModalItemClick = (item: DropDownMenuModal) => {
    setModalItem(item);
  };

  const handleModalOk = () => {
    if (modalItem?.onOk) {
      modalItem.onOk();
    }
    setModalItem(null);
  };

  const handleModalCancel = () => {
    if (modalItem?.onCancel) {
      modalItem.onCancel();
    }
    setModalItem(null);
  };

  return (
    <>
      <RadixDropdownMenu.Root
        open={isOpen}
        onOpenChange={(open) => {
          onOpenChange?.(open);
          setIsOpen(open);
        }}
        modal={false}
      >
        <RadixDropdownMenu.Trigger asChild>{children}</RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal container={container}>
          <ThemeProvider isDarkMode={isDarkMode}>
            <RadixDropdownMenu.Content
              collisionBoundary={document.querySelector('.vive-editor')}
              className=' min-w-[200px]
            bg-white dark:bg-gray-800
            rounded-md
            shadow-lg
            border border-gray-200 dark:border-gray-700
            p-1
            z-50
            animate-in fade-in-0 zoom-in-95
          '
              style={{
                maxHeight: contentHeight
                  ? typeof contentHeight === 'number'
                    ? `${contentHeight}px`
                    : contentHeight
                  : undefined,
                overflowY: contentHeight ? 'auto' : undefined,
              }}
              sideOffset={4}
              //align={isRTL ? 'end' : 'start'}
            >
              {items.map((item) => (
                <DropDownMenuItem
                  key={item?.key}
                  item={item}
                  onItemClick={onItemClick}
                  onModalItemClick={handleModalItemClick}
                />
              ))}
            </RadixDropdownMenu.Content>
          </ThemeProvider>
        </RadixDropdownMenu.Portal>
      </RadixDropdownMenu.Root>

      <Modal
        open={!!modalItem}
        title={modalItem?.modalTitle}
        description={modalItem?.modalDescription}
        width={450}
        showFooter={false}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        renderChildren={(onOk, onCancel) => modalItem?.renderModalContent(onOk, onCancel)}
      />
    </>
  );
};

const DropDownMenuModalItem: React.FC<{
  item: any;
  onModalItemClick: (item: any) => void;
}> = ({ item, onModalItemClick }) => {
  return (
    <RadixDropdownMenu.Item
      onSelect={() => {
        if (!item.disabled) {
          onModalItemClick(item);
        }
      }}
      disabled={item.disabled}
      className={`
        flex items-center justify-between gap-2
        px-3 py-2
        text-sm
        rounded
        outline-none
        cursor-pointer
        select-none
        transition-colors
        ${
          item.disabled
            ? 'opacity-40 cursor-not-allowed'
            : item.danger
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 focus:bg-red-50 dark:focus:bg-red-900/30'
            : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700'
        }
      `.trim()}
    >
      <div className='flex items-center gap-2'>
        {item.icon && <Icon name={item.icon} size={16} />}
        <span>{item.label}</span>
      </div>
      {item.extra && (
        <span className='text-xs text-gray-400 dark:text-gray-500 ms-2'>{item.extra}</span>
      )}
    </RadixDropdownMenu.Item>
  );
};

export const DropDownMenuItem: React.FC<
  DropDownMenuItemProps & {
    onModalItemClick?: (item: any) => void;
  }
> = ({ item, onItemClick, onModalItemClick }) => {
  const { isDarkMode } = useThemeContext();
  if (!item) return null;

  if (item.type === 'divider') {
    return <RadixDropdownMenu.Separator className='h-px bg-gray-200 dark:bg-gray-700 my-1' />;
  }

  if (item.type === 'header') {
    return (
      <RadixDropdownMenu.Label className='px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
        {item.label}
      </RadixDropdownMenu.Label>
    );
  }

  if (item.type === 'submenu') {
    return (
      <RadixDropdownMenu.Sub>
        <RadixDropdownMenu.SubTrigger
          className={`
            flex items-center justify-between gap-2
            px-3 py-2
            text-sm
            rounded
            outline-none
            cursor-pointer
            select-none
            transition-colors
            text-gray-900 dark:text-gray-100
            ${
              item.disabled
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700'
            }
          `.trim()}
          disabled={item.disabled}
        >
          <div className='flex items-center gap-2'>
            {item.icon && <Icon name={item.icon} size={16} />}
            <span>{item.label}</span>
          </div>
          <Icon name='FaChevronRight' size={12} className='opacity-70' />
        </RadixDropdownMenu.SubTrigger>

        <RadixDropdownMenu.Portal>
          <ThemeProvider isDarkMode={isDarkMode}>
            <RadixDropdownMenu.SubContent
              className='
                min-w-[200px]
                bg-white dark:bg-gray-800
                rounded-md
                shadow-lg
                border border-gray-200 dark:border-gray-700
                p-1
                z-50
                animate-in fade-in-0 zoom-in-95
              '
              sideOffset={4}
            >
              {item.items?.map((subItem) => (
                <DropDownMenuItem
                  key={subItem?.key}
                  item={subItem}
                  onItemClick={onItemClick}
                  onModalItemClick={onModalItemClick}
                />
              ))}
            </RadixDropdownMenu.SubContent>
          </ThemeProvider>
        </RadixDropdownMenu.Portal>
      </RadixDropdownMenu.Sub>
    );
  }

  if (item.type === 'modal') {
    return <DropDownMenuModalItem item={item} onModalItemClick={onModalItemClick!} />;
  }

  if (item.onRender)
    return (
      <RadixDropdownMenu.Item className='focus:outline-none'>
        {item.onRender(item)}
      </RadixDropdownMenu.Item>
    );

  return (
    <RadixDropdownMenu.Item
      onSelect={() => {
        if (!item.disabled) {
          onItemClick?.(item);
          item.onClick?.(item);
        }
      }}
      disabled={item.disabled}
      className={`
        flex items-center justify-between gap-2
        px-3 py-2
        text-sm
        rounded
        outline-none
        cursor-pointer
        select-none
        transition-colors
        ${
          item.disabled
            ? 'opacity-40 cursor-not-allowed'
            : item.danger
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 focus:bg-red-50 dark:focus:bg-red-900/30'
            : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700'
        }
      `.trim()}
    >
      <div className='flex items-center gap-2'>
        {item.icon && <Icon name={item.icon} size={16} />}
        <span>{item.label}</span>
      </div>
      <div className='flex items-center gap-2'>
        {item.checked && (
          <Icon name='FaCheck' size={12} className='text-blue-600 dark:text-blue-400' />
        )}
        {item.extra && (
          <span className='text-xs text-gray-400 dark:text-gray-500 ms-2'>{item.extra}</span>
        )}
      </div>
    </RadixDropdownMenu.Item>
  );
};
