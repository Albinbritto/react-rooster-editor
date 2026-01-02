import React from 'react';
import type { ContentModelFormatState, IEditor } from 'roosterjs-content-model-types';
import { ToolBarDropDown } from './ToolBarDropDown.type';
import { FontAwesomeIconName } from '../../../shared/components/icon/Icon.types';
import { UIUtilities } from '../../../shared/types/UIUtilities.type';

export interface ToolBarButton<T extends string> {
  /**
   * key of this button, needs to be unique
   */
  key: T;

  /**icon name of the button. */
  iconName?: FontAwesomeIconName;

  /**
   * Text of the button.
   */
  text?: React.ReactNode;

  /**
   * Click handler of this button.
   * @param editor the editor instance
   * @param key key of the button that is clicked
   */
  onClick?: (editor: IEditor, key: T, uiUtilities: UIUtilities) => void;

  /**
   * Get if the current button should be checked
   * @param formatState The current formatState of editor
   * @returns True to show the button in a checked state, otherwise false
   * @default False When not specified, it is treated as always returning false
   */
  isChecked?: (formatState: ContentModelFormatState) => boolean;

  /**
   * Get if the current button should be disabled
   * @param formatState The current formatState of editor
   * @returns True to show the button in a disabled state, otherwise false
   * @default False When not specified, it is treated as always returning false
   */
  isDisabled?: (formatState: ContentModelFormatState) => boolean;

  /**
   * A drop down menu of this button. When set this value, the button will has a "v" icon to let user
   * know it will open a drop down menu. And the onClick handler will only be triggered when user click
   * a menu item of the drop down.
   */
  dropDownMenu?: ToolBarDropDown;

  /**
   * Modal configuration for this button. When set, clicking the button will open a modal dialog.
   * The onClick handler will be triggered when the OK button in the modal is clicked.
   */
  modal?: ToolBarModal;
}

/**
 * Represent a modal configuration for a Toolbar button
 */
export interface ToolBarModal {
  /** Modal title */
  title?: string;

  /** Modal description */
  description?: string;

  /** Modal content to display */
  content?: React.ReactNode;

  /** Function to render modal content dynamically */
  renderContent?: (formatState: ContentModelFormatState | null) => React.ReactNode;

  /** OK button text */
  okText?: string;

  /** Cancel button text */
  cancelText?: string;

  /** Show footer buttons */
  showFooter?: boolean;

  /** Show close button */
  showCloseButton?: boolean;

  /** Custom width for the modal */
  width?: string | number;

  /** Prevent closing on overlay click */
  preventCloseOnOverlayClick?: boolean;

  /** Prevent closing on escape key */
  preventCloseOnEscape?: boolean;

  /** Callback function triggered when Cancel button is clicked */
  onCancel?: (editor: IEditor) => void;
}
