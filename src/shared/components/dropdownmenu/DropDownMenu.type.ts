import { JSX, ReactNode } from "react";
import { FontAwesomeIconName } from "../icon/Icon.types";

export interface DropDownMenuProps {
  /** Array of menu items to display in the dropdown */
  items: DropDownMenuItemType[];

  /** Callback function triggered when a menu item is clicked */
  onItemClick?: (item: DropDownMenuItem) => void;

  /** Additional CSS class name to apply to the dropdown */
  className?: string;

  /** Trigger element that opens the dropdown menu when clicked */
  children: ReactNode | JSX.Element;

  /** Height of the dropdown content area */
  contentHeight?: string | number;

  /** Callback function triggered when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Controls whether the dropdown is open (controlled mode) */
  open?: boolean;

  /** Container element where the dropdown portal should be rendered */
  container?: HTMLElement | null;
}

export interface DropDownMenuItem {
  /** Unique identifier for the menu item */
  key: string;

  /** Whether the menu item is disabled and cannot be interacted with */
  disabled?: boolean;

  /** Identifies this item as a regular menu item type */
  type?: "item";

  /** Text or element to display as the menu item label */
  label: ReactNode;

  /** FontAwesome icon name to display before the label */
  icon?: FontAwesomeIconName;

  /** Whether to display the item in a danger/destructive style (typically red) */
  danger?: boolean;

  /** Whether to show a checkmark indicating the item is selected */
  checked?: boolean;

  /** Additional text to display on the right side of the menu item */
  extra?: string;

  /** Additional data associated with the menu item */
  data?: any;

  /** Custom render function to override the default menu item rendering */
  onRender?: (item: DropDownMenuItem) => ReactNode;

  /** Callback function triggered when this specific menu item is clicked */
  onClick?: (item: DropDownMenuItem) => void;
}

export interface DropDownMenuDivider {
  /** Unique identifier for the divider */
  key: string;

  /** Identifies this item as a divider type */
  type: "divider";
}

export interface DropDownMenuHeader {
  /** Unique identifier for the header */
  key: string;

  /** Identifies this item as a header type */
  type: "header";

  /** Text or element to display as the header label */
  label: ReactNode;
}

export interface DropDownMenuModal {
  /** Unique identifier for the modal menu item */
  key: string;

  /** Whether the modal item is disabled and cannot be interacted with */
  disabled?: boolean;

  /** Identifies this item as a modal type */
  type: "modal";

  /** Text or element to display as the menu item label */
  label: ReactNode;

  /** FontAwesome icon name to display before the label */
  icon?: FontAwesomeIconName;

  /** Whether to display the item in a danger/destructive style (typically red) */
  danger?: boolean;

  /** Additional text to display on the right side of the menu item */
  extra?: string;

  /** Function that renders the modal content */
  renderModalContent: (onOk: () => void, onCancel: () => void) => ReactNode;

  /** Modal title */
  modalTitle?: string;

  /** Modal description */
  modalDescription?: string;

  /** Callback when OK button is clicked */
  onOk?: () => void;

  /** Callback when Cancel button is clicked */
  onCancel?: () => void;
}

export interface DropDownSubMenu {
  /** Unique identifier for the submenu */
  key: string;

  /** Whether the submenu is disabled and cannot be interacted with */
  disabled?: boolean;

  /** Identifies this item as a submenu type */
  type: "submenu";

  /** Text or element to display as the submenu label */
  label: ReactNode;

  /** FontAwesome icon name to display before the label */
  icon?: FontAwesomeIconName;

  /** Whether to show only the icon without the label */
  iconOnly?: boolean;

  /** Whether to display the submenu in a danger/destructive style (typically red) */
  danger?: boolean;

  /** Additional text to display on the right side of the submenu */
  extra?: string;

  /** Array of nested menu items to display in the submenu */
  items?: DropDownMenuItemType[];
}

/** Union type representing all possible dropdown menu item types */
export type DropDownMenuItemType =
  | DropDownMenuItem
  | DropDownMenuDivider
  | DropDownMenuHeader
  | DropDownSubMenu
  | DropDownMenuModal;

export interface DropDownMenuItemProps {
  /** The menu item to render */
  item: DropDownMenuItemType;

  /** Callback function triggered when a menu item is clicked */
  onItemClick?: (item: DropDownMenuItem) => void;
}
