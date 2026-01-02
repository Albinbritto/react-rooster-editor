import { ReactNode } from 'react';
import type { IEditor } from 'roosterjs-content-model-types';
import { FontAwesomeIconName } from '../../../shared/components/icon/Icon.types';
import { IContextualMenuItem } from '../../toolbar/types/ToolBarDropDown.type';
import { UIUtilities } from '../../../shared/types/UIUtilities.type';

export interface FloatingMenuItem {
  /**unique key of this item */
  key: string;

  /** label to display for this item */
  label: ReactNode;

  /** The type of this item [item or divider or submenu] */
  type?: 'item';

  /** icon to display for this item */
  icon?: FontAwesomeIconName;

  /**If the item should only display the icon without label */
  iconOnly?: boolean;

  /** whether this is a dangerous action */
  danger?: boolean;

  /** custom render function for this item */
  renderItem?: (
    item: IContextualMenuItem,
    onClick: (item: IContextualMenuItem) => void
  ) => ReactNode;

  /**
   * Click event handler
   * @param key Key of the menu item that is clicked
   * @param editor The editor object that triggers this event
   * @param targetNode The node that user is clicking onto
   * @param uiUtilities UI Utilities to help render additional react component from this click event
   */
  onClick?: (key: string, editor: IEditor, targetNode: Node, uiUtilities: UIUtilities) => void;
}

export interface FloatingMenuDivider {
  /**unique key of this item */
  key: string;

  /** The type of this item [item or divider or submenu] */
  type: 'divider';
}

export interface FloatingMenuHeader {
  /**unique key of this item */
  key: string;

  /** The type of this item [item or divider or submenu] */
  type: 'header';

  /** label to display for this item */
  label: ReactNode;
}

export interface FloatingMenuSubMenu {
  /**unique key of this item */
  key: string;

  /** The type of this item [item or divider or submenu] */
  type: 'submenu';

  /** label to display for this item */
  label: ReactNode;

  /** icon to display for this item */
  icon?: FontAwesomeIconName;

  /**If the item should only display the icon without label */
  iconOnly?: boolean;

  /** child items of this sub menu */
  items?: FloatingMenuItemType[];
}

export interface FloatingMenuModal {
  /**unique key of this item */
  key: string;

  /** The type of this item */
  type: 'modal';

  /** label to display for this item */
  label: ReactNode;

  /** icon to display for this item */
  icon?: FontAwesomeIconName;

  /** whether this is a dangerous action */
  danger?: boolean;

  /** whether this item is disabled */
  disabled?: boolean;

  /** Function that renders the modal content */
  renderModalContent: (editor: IEditor, onOk: () => void, onCancel: () => void) => ReactNode;

  /** Modal title */
  modalTitle?: string;

  /** Modal description */
  modalDescription?: string;

  /** Callback when OK button is clicked */
  onOk?: (editor: IEditor) => void;

  /** Callback when Cancel button is clicked */
  onCancel?: (editor: IEditor) => void;
}

export type FloatingMenuItemType =
  | FloatingMenuItem
  | FloatingMenuDivider
  | FloatingMenuHeader
  | FloatingMenuSubMenu
  | FloatingMenuModal;
