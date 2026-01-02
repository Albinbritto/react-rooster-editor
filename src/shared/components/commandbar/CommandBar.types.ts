import { ReactNode } from 'react';
import { FontAwesomeIconName } from '../icon/Icon.types';
import { DropDownMenuItem, DropDownMenuItemType } from '../dropdownmenu/DropDownMenu.type';

export interface CommandBarButtonItem {
  /** Unique identifier for the button item */
  key: string;

  /** Text or element to display as the button label */
  label?: ReactNode;

  /** Whether the button is disabled and cannot be interacted with */
  disabled?: boolean;

  /** Identifies this item as a button type */
  type: 'button';

  /** FontAwesome icon name to display in the button */
  icon?: FontAwesomeIconName;

  /** Whether to show only the icon without the label */
  iconOnly?: boolean;

  /** Whether the button is in an active/selected state */
  active?: boolean;

  /** Additional data associated with the button */
  data?: any;

  /** Callback function triggered when the button is clicked */
  onClick?: (item: CommandBarButtonItem) => void;
}

export interface CommandBarDropdownItem {
  /** Unique identifier for the dropdown item */
  key: string;

  /** Text or element to display as the dropdown label */
  label?: ReactNode;

  /** Whether the dropdown is disabled and cannot be interacted with */
  disabled?: boolean;

  /** Identifies this item as a dropdown type */
  type: 'dropdown';

  /** FontAwesome icon name to display in the dropdown button */
  icon?: FontAwesomeIconName;

  /** Whether to show only the icon without the label */
  iconOnly?: boolean;

  /** Array of menu items to display in the dropdown */
  items?: DropDownMenuItemType[];

  /** Callback function triggered when a dropdown menu item is clicked */
  onItemClick?: (item: DropDownMenuItem) => void;

  /** Height of the dropdown content area */
  contentHeight?: string | number;
}

export interface CommandBarDividerItem {
  /** Identifies this item as a divider type */
  type: 'divider';

  /** Unique identifier for the divider item */
  key: string;
}

export interface CommandBarModalItem {
  /** Unique identifier for the modal item */
  key: string;

  /** Text or element to display as the button label */
  label?: ReactNode;

  /** Whether the button is disabled and cannot be interacted with */
  disabled?: boolean;

  /** Identifies this item as a modal type */
  type: 'modal';

  /** FontAwesome icon name to display in the button */
  icon?: FontAwesomeIconName;

  /** Whether to show only the icon without the label */
  iconOnly?: boolean;

  /** Whether the button is in an active/selected state */
  active?: boolean;

  /** Additional data associated with the modal */
  data?: any;

  /** Modal title */
  modalTitle?: string;

  /** Modal description */
  modalDescription?: string;

  /** Modal content to display */
  modalContent?: ReactNode;

  /** Function to render modal content dynamically */
  renderModalContent?: () => ReactNode;

  /** OK button text */
  okText?: string;

  /** Cancel button text */
  cancelText?: string;

  /** Show footer buttons */
  showFooter?: boolean;

  /** Show close button */
  showCloseButton?: boolean;

  /** Custom width for the modal */
  modalWidth?: string | number;

  /** Prevent closing on overlay click */
  preventCloseOnOverlayClick?: boolean;

  /** Prevent closing on escape key */
  preventCloseOnEscape?: boolean;

  /** Callback function triggered when OK button is clicked */
  onOk?: (item: CommandBarModalItem) => void;

  /** Callback function triggered when Cancel button is clicked */
  onCancel?: (item: CommandBarModalItem) => void;

  /** Callback when modal open state changes */
  onModalOpenChange?: (open: boolean) => void;
}

/** Union type representing all possible command bar item types */
export type CommandBarItemType =
  | CommandBarButtonItem
  | CommandBarDropdownItem
  | CommandBarDividerItem
  | CommandBarModalItem;

export interface CommandBarProps {
  /** Primary items displayed on the left side of the command bar */
  items?: CommandBarItemType[];

  /** Additional CSS class name to apply to the command bar */
  className?: string;

  style?: React.CSSProperties;

  /** Callback to determine which items should be reduced/hidden when space is limited */
  onReduceData?: (data: CommandBarItemType[]) => CommandBarItemType[];

  /** Whether to shift items on reduce instead of hiding them */
  shiftOnReduce?: boolean;
}
