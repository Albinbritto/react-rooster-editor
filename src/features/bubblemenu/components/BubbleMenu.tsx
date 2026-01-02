import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  limitShift,
  size,
  useDismiss,
  useInteractions,
} from '@floating-ui/react';
import type { ContentModelFormatState } from 'roosterjs-content-model-types';
import { CommandBar } from '../../../shared/components/commandbar/CommandBar';
import { CommandBarItemType } from '../../../shared/components/commandbar/CommandBar.types';
import {
  DropDownMenuItem,
  DropDownMenuItemType,
} from '../../../shared/components/dropdownmenu/DropDownMenu.type';
import { ToolBarButton } from '../../toolbar/types/ToolBarButton.type';
import {
  IContextualMenuItem,
  ToolBarDropDownMenuItem,
} from '../../toolbar/types/ToolBarDropDown.type';
import { BubbleMenuPlugin, BubbleMenuPosition } from '../types/BubbleMenuPlugin.types';
import { Icon } from '../../../shared/components/icon/Icon';
import { ThemeProvider, useThemeContext } from '../../../shared/contexts/ThemeContext';
import { useDirection } from '../../../shared/contexts/DirectionContext';

const isInPortal = (node: Node | null): boolean => {
  if (!node) return false;

  let current = node as HTMLElement;
  while (current && current !== document.body) {
    if (
      current.hasAttribute?.('data-radix-portal') ||
      current.hasAttribute?.('data-radix-popper-content-wrapper') ||
      current.hasAttribute?.('data-radix-dropdown-menu-content') ||
      current.hasAttribute?.('data-radix-select-viewport') ||
      current.hasAttribute?.('data-radix-dialog-overlay') ||
      current.hasAttribute?.('data-radix-dialog-content') ||
      current.closest?.('[role="dialog"]') ||
      current.closest?.('[role="menu"]') ||
      current.closest?.('[role="listbox"]')
    ) {
      return true;
    }
    current = current.parentElement as HTMLElement;
  }
  return false;
};

export interface BubbleMenuProps<T extends string> {
  plugin: BubbleMenuPlugin;
  buttons?: ToolBarButton<T>[][];
}

export function BubbleMenu<T extends string>(props: BubbleMenuProps<T>) {
  const { plugin, buttons = [] } = props;
  const [formatState, setFormatState] = React.useState<ContentModelFormatState | null>(null);
  const [position, setPosition] = React.useState<BubbleMenuPosition | null>(null);
  const { isDarkMode } = useThemeContext();
  const dir = useDirection();
  const isRTL = dir === 'rtl';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const SCROLL_AMOUNT = 150;

  const boundary = useMemo(() => {
    const editor = plugin.getEditor();
    if (editor) {
      const editorElement = editor.getDocument().querySelector('[contenteditable="true"]');
      if (editorElement) {
        return editorElement;
      }
    }
  }, [plugin]);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: !!position,
    onOpenChange: (open) => {
      if (!open) {
        setPosition(null);
      }
    },
    middleware: [
      offset(10),
      flip({
        fallbackPlacements: ['bottom', 'top'],
        boundary: boundary,
      }),
      shift({
        limiter: limitShift(),
        padding: 10,
        boundary: boundary,
      }),
      size({
        boundary: boundary,
        padding: 10,
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    outsidePress: (event) => {
      const target = event.target as Node;
      return !isInPortal(target);
    },
    ancestorScroll: true,
    escapeKey: true,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  React.useEffect(() => {
    if (position) {
      refs.setReference(position);
    }
  }, [position, refs]);

  const onClick = React.useCallback(
    (item: IContextualMenuItem) => {
      if (item) {
        plugin.onButtonClick(item.data, item.key);
      }
    },
    [plugin]
  );

  const commandBarItems = React.useMemo((): CommandBarItemType[] => {
    const items: CommandBarItemType[] = [];

    buttons.forEach((buttonGroup, groupIndex) => {
      buttonGroup.forEach((button): void => {
        const dropDownMenu = button.dropDownMenu;

        const convertToItems = (items: ToolBarDropDownMenuItem[]): DropDownMenuItemType[] => {
          const selectedKeys = formatState && dropDownMenu?.getSelectedItemKey?.(formatState);

          return items.map((item): DropDownMenuItemType => {
            if (item.type === 'submenu') {
              return {
                ...item,
                items: item.items ? convertToItems(item.items) : [],
              };
            }

            if (item.type === 'modal') {
              const editor = plugin.getEditor();
              return {
                ...item,
                type: item.type,
                renderModalContent: (onOk, onCancel) => {
                  if (formatState && editor) {
                    return item.renderModalContent({ editor, onOk, onCancel, formatState });
                  }
                },
                onOk: item.onOk && editor ? () => item.onOk?.(editor) : undefined,
                onCancel: item.onCancel && editor ? () => item.onCancel?.(editor) : undefined,
              };
            }

            if (item.type === 'item' || item.type === undefined) {
              const hasCustomRender = item.renderItem && formatState;

              return {
                ...(item as DropDownMenuItem),
                data: item.onClick ? item : button,
                checked: selectedKeys === item.key,
                onRender: hasCustomRender
                  ? ({ key, label, data }) => {
                      return item.renderItem?.({
                        item: {
                          key,
                          label,
                          data,
                        },
                        formatState,
                        onClick,
                      });
                    }
                  : undefined,
              };
            }

            return item as DropDownMenuItemType;
          });
        };

        if (dropDownMenu) {
          const commandBarItem: CommandBarItemType = {
            key: button.key,
            label: button.text,
            icon: button.iconName,
            type: 'dropdown',
            iconOnly: !button.text,
            contentHeight: dropDownMenu.contentHeight,
            onItemClick: ({ key, data, label }) =>
              onClick({
                key,
                data,
                label,
              }),
            items: convertToItems(dropDownMenu.items),
          };
          items.push(commandBarItem);
          return;
        }

        const commandBarItem: CommandBarItemType = {
          key: button.key,
          type: 'button',
          label: button.text,
          icon: button.iconName,
          iconOnly: !button.text,
          data: button,
          onClick: ({ key, label, data }) =>
            onClick({
              key,
              label,
              data,
            }),
          active: (formatState && button.isChecked?.(formatState)) || false,
          disabled: (formatState && button.isDisabled?.(formatState)) || false,
        };
        items.push(commandBarItem);
      });

      if (groupIndex < buttons.length - 1) {
        items.push({
          type: 'divider',
          key: `divider-${groupIndex}`,
        });
      }
    });

    return items;
  }, [buttons, formatState, onClick, plugin]);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    const isScrollable = scrollWidth > clientWidth;
    setShowScrollButtons(isScrollable);

    if (isScrollable) {
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  const handleScrollNavigation = useCallback(() => {
    updateScrollState();
  }, [updateScrollState]);

  const scrollLeft = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: isRTL ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  }, [SCROLL_AMOUNT, isRTL]);

  const scrollRight = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: isRTL ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  }, [SCROLL_AMOUNT, isRTL]);

  useEffect(() => {
    updateScrollState();

    const container = scrollContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [commandBarItems, updateScrollState]);

  React.useEffect(() => {
    const disposer = plugin?.registerFormatChangedCallback(setFormatState);

    return () => {
      disposer?.();
    };
  }, [plugin]);

  React.useEffect(() => {
    const disposer = plugin?.registerSelectionChangedCallback(setPosition);

    return () => {
      disposer?.();
    };
  }, [plugin]);

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as Node;
      if (isInPortal(target)) return;

      const bubbleMenuElement = document.getElementById('bubble-menu');
      if (bubbleMenuElement && bubbleMenuElement.contains(target)) return;

      setPosition(null);
    };

    boundary?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      boundary?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [position, boundary]);

  if (!position) {
    return null;
  }

  const bubbleMenu = (
    <ThemeProvider isDarkMode={isDarkMode}>
      <div
        ref={refs.setFloating}
        id='bubble-menu'
        className='bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 min-w-[200px] overflow-hidden'
        style={floatingStyles}
        dir={dir}
        {...getFloatingProps()}
      >
        <div className='flex items-center gap-1 relative'>
          {/* Left fade indicator */}
          {showScrollButtons && canScrollLeft && (
            <div
              className={`absolute start-0 top-0 bottom-0 w-8 pointer-events-none z-10 ${
                isRTL ? 'bubble-menu-fade-right' : 'bubble-menu-fade-left'
              }`}
            />
          )}

          {/* Right fade indicator */}
          {showScrollButtons && canScrollRight && (
            <div
              className={`absolute end-16 top-0 bottom-0 w-8 pointer-events-none z-10 ${
                isRTL ? 'bubble-menu-fade-left' : 'bubble-menu-fade-right'
              }`}
            />
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScrollNavigation}
            className='overflow-x-auto'
            style={{ scrollbarWidth: 'none' }}
          >
            <CommandBar items={commandBarItems} />
          </div>

          {showScrollButtons && (
            <div className='flex items-center gap-1 pe-2 bg-white dark:bg-gray-800'>
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`
                p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
                aria-label={isRTL ? 'Scroll right' : 'Scroll left'}
                type='button'
              >
                <Icon name={isRTL ? 'FaChevronRight' : 'FaChevronLeft'} size={12} />
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`
                p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
                aria-label={isRTL ? 'Scroll left' : 'Scroll right'}
                type='button'
              >
                <Icon name={isRTL ? 'FaChevronLeft' : 'FaChevronRight'} size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );

  return createPortal(bubbleMenu, document.body);
}
