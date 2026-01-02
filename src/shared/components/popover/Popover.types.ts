import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export interface PopoverProps {
  /**
   * The open state of the popover when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;

  /**
   * The controlled open state of the popover. Must be used in conjunction with onOpenChange.
   */
  open?: boolean;

  /**
   * Event handler called when the open state of the popover changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   * @default false
   */
  modal?: boolean;

  /**
   * The element that triggers the popover.
   */
  trigger?: React.ReactNode;

  /**
   * The content to display inside the popover.
   */
  children: React.ReactNode;

  /**
   * The preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and avoidCollisions is enabled.
   * @default "bottom"
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default "center"
   */
  align?: 'start' | 'center' | 'end';

  /**
   * The distance in pixels from the trigger.
   * @default 0
   */
  sideOffset?: number;

  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number;

  /**
   * When true, overrides the side and align preferences to prevent collisions with boundary edges.
   * @default true
   */
  avoidCollisions?: boolean;

  /**
   * The element used as the collision boundary. By default this is the viewport, though you can provide additional element(s) to be included in this check.
   * @default []
   */
  collisionBoundary?: Element | null | Array<Element | null>;

  /**
   * The distance in pixels from the boundary edges where collision detection should occur.
   * @default 0
   */
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>;

  /**
   * The sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless.
   * @default "partial"
   */
  sticky?: 'partial' | 'always';

  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   * @default false
   */
  hideWhenDetached?: boolean;

  /**
   * Custom class name for the popover content.
   */
  className?: string;

  /**
   * Custom styles for the popover content.
   */
  style?: React.CSSProperties;

  /**
   * Custom class name for the trigger wrapper.
   */
  triggerClassName?: string;

  /**
   * Whether the trigger should be rendered as a child (asChild pattern).
   * @default false
   */
  triggerAsChild?: boolean;

  /**
   * Whether to show an arrow pointing to the trigger.
   * @default false
   */
  showArrow?: boolean;

  /**
   * Custom class name for the arrow.
   */
  arrowClassName?: string;

  /**
   * Width of the arrow in pixels.
   * @default 10
   */
  arrowWidth?: number;

  /**
   * Height of the arrow in pixels.
   * @default 5
   */
  arrowHeight?: number;

  /**
   * The z-index of the popover content.
   */
  zIndex?: number;

  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.
   */
  forceMount?: true;

  /**
   * Event handler called when the escape key is down.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;

  /**
   * Event handler called when a pointer event occurs outside the bounds of the component.
   */
  onPointerDownOutside?: (event: CustomEvent) => void;

  /**
   * Event handler called when focus moves outside the bounds of the component.
   */
  onFocusOutside?: (event: CustomEvent) => void;

  /**
   * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component.
   */
  onInteractOutside?: (event: CustomEvent) => void;

  /**
   * The container where the popover content will be portaled to.
   */
  container?: HTMLElement;

  /**
   * Additional props to pass to the content element.
   */
  contentProps?: Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'children'>;
}
