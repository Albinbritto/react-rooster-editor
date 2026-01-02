import { ReactNode } from 'react';
import type { ContentModelFormatState, IEditor } from 'roosterjs-content-model-types';
import { DropDownMenuItem } from '../../../shared/components/dropdownmenu/DropDownMenu.type';
import { FontAwesomeIconName } from '../../../shared/components/icon/Icon.types';

/**
 * Represent a drop down menu of a Toolbar button
 */
export interface ToolBarDropDown {
  /**
   * A list of drop down items
   * When click on a child item, onClick handler will be triggered with the key of the clicked child item passed in as the second parameter
   */
  items: ToolBarDropDownMenuItem[];

  /**
   * Whether live preview feature is enabled for this plugin.
   * When live preview is enabled, hovering on a sub item will show the format result immediately in editor.
   * This option needs dropDownItems to have values
   */
  allowLivePreview?: boolean;

  /**
   * Custom render of drop down item
   * @param item This menu item
   * @param onClick click handler of this menu item
   */
  itemRender?: (item: DropDownMenuItem, onClick: (item: DropDownMenuItem) => void) => ReactNode;

  /**
   * Get the key of current selected item
   * @param formatState The current formatState of editor
   * @returns the key of selected item, it needs to be the same with the key in dropDownItems
   */
  getSelectedItemKey?: (formatState: ContentModelFormatState) => string | null;

  /** The height of the drop down content */
  contentHeight?: string | number;
}

export interface IContextualMenuItem {
  /**unique key of this item */
  key: string;

  /** label to display for this item */
  label: ReactNode;

  /** custom data associated with this item */
  data?: any;
}

export interface ToolBarDropDownItem {
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

  /** custom data associated with this item */
  data?: any;

  /** custom render function for this item */
  renderItem?: ({
    item,
    formatState,
    onClick,
  }: {
    item: IContextualMenuItem;
    formatState: ContentModelFormatState;
    onClick: (item: IContextualMenuItem) => void;
  }) => ReactNode;

  /**
   * Click handler of this button.
   * @param editor the editor instance
   * @param key key of the item that is clicked
   */
  onClick?: (editor: IEditor, key: string) => void;
}

export interface ToolBarDropDownDivider {
  /**unique key of this item */
  key: string;

  /** The type of this item [item or divider or submenu] */
  type: 'divider';
}

export interface ToolBarDropDownHeader {
  /**unique key of this item */
  key: string;

  /** The type of this item [item or divider or submenu] */
  type: 'header';

  /** label to display for this item */
  label: ReactNode;
}

export interface ToolBarDropDownSubMenu {
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
  items?: ToolBarDropDownMenuItem[];
}

export interface ToolBarDropDownModal {
  /**unique key of this item */
  key: string;

  /** The type of this item [modal] */
  type: 'modal';

  /** label to display for this item */
  label: ReactNode;

  /** icon to display for this item */
  icon?: FontAwesomeIconName;

  /** whether this is a dangerous action */
  danger?: boolean;

  /** additional text to display on the right */
  extra?: string;

  /** Function that renders the modal content */
  renderModalContent: ({
    editor,
    onOk,
    onCancel,
    formatState,
  }: {
    editor: IEditor;
    onOk: () => void;
    onCancel: () => void;
    formatState?: ContentModelFormatState;
  }) => ReactNode;

  /** Modal title */
  modalTitle?: string;

  /** Modal description */
  modalDescription?: string;

  /** Callback when OK button is clicked */
  onOk?: (editor: IEditor) => void;

  /** Callback when Cancel button is clicked */
  onCancel?: (editor: IEditor) => void;
}

export type ToolBarDropDownMenuItem =
  | ToolBarDropDownItem
  | ToolBarDropDownDivider
  | ToolBarDropDownHeader
  | ToolBarDropDownSubMenu
  | ToolBarDropDownModal;
