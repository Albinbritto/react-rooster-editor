import React from 'react';
import type { ContentModelFormatState } from 'roosterjs-content-model-types';
import { CommandBar } from '../../../shared/components/commandbar/CommandBar';
import { CommandBarItemType } from '../../../shared/components/commandbar/CommandBar.types';
import {
  DropDownMenuItem,
  DropDownMenuItemType,
} from '../../../shared/components/dropdownmenu/DropDownMenu.type';
import { ToolBarProps } from '../types/ToolBarProps.types';
import { IContextualMenuItem, ToolBarDropDownMenuItem } from '../types/ToolBarDropDown.type';

export function ToolBar<T extends string>(props: ToolBarProps<T>) {
  const { plugin, buttons = [] } = props;
  const [formatState, setFormatState] = React.useState<ContentModelFormatState | null>(null);

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

  React.useEffect(() => {
    const disposer = plugin?.registerFormatChangedCallback(setFormatState);

    return () => {
      disposer?.();
    };
  }, [plugin]);

  return (
    <div className='border-b border-gray-200'>
      <CommandBar items={commandBarItems} className='flex-wrap' />
    </div>
  );
}
