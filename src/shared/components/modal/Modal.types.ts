import { DialogPortalProps } from '@radix-ui/react-dialog';

export interface ModalProps {
  /**
   * Whether the modal is open or not
   */
  open?: boolean;
  /**
   * Callback when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal description
   */
  description?: string;
  /**
   * Function that returns the modal content
   */
  renderChildren?: (onOk: () => void, onCancel: () => void) => React.ReactNode;
  /**
   * Children to render in the modal
   */
  children?: React.ReactNode;
  /**
   * Callback when OK button is clicked
   */
  onOk?: () => void;
  /**
   * Callback when Cancel button is clicked
   */
  onCancel?: () => void;
  /**
   * OK button text
   */
  okText?: string;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Show footer buttons
   */
  showFooter?: boolean;
  /**
   * Show close button
   */
  showCloseButton?: boolean;
  /**
   * Custom className for the content
   */
  className?: string;
  /**
   * Custom className for overlay
   */
  overlayClassName?: string;
  /**
   * Disable OK button
   */
  okDisabled?: boolean;
  /**
   * Disable Cancel button
   */
  cancelDisabled?: boolean;
  /**
   * Loading state for OK button
   */
  okLoading?: boolean;
  /**
   * Custom width
   */
  width?: string | number;
  /**
   * Prevent closing on overlay click
   */
  preventCloseOnOverlayClick?: boolean;
  /**
   * Prevent closing on escape key
   */
  preventCloseOnEscape?: boolean;

  /**
   * Specify a container element to portal the content into.
   */

  container?: DialogPortalProps['container'];

  /**
   * Trigger element to open the modal
   */
  trigger?: React.ReactNode;
}
