import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PopoverProps } from './Popover.types';
import { useThemeContext, ThemeProvider } from '../../contexts/ThemeContext';
import { useDirection } from '../../contexts/DirectionContext';

export const Popover: React.FC<PopoverProps> = ({
  defaultOpen,
  open,
  onOpenChange,
  modal = false,
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 0,
  alignOffset = 0,
  avoidCollisions = true,
  collisionBoundary,
  collisionPadding,
  sticky = 'partial',
  hideWhenDetached = false,
  className,
  style,
  triggerClassName,
  triggerAsChild = false,
  showArrow = false,
  arrowClassName,
  arrowWidth = 10,
  arrowHeight = 5,
  zIndex,
  forceMount,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  container,
  contentProps,
}) => {
  const { isDarkMode } = useThemeContext();
  const dir = useDirection();
  const isRTL = dir === 'rtl';

  // Flip align for RTL
  const rtlAlign = isRTL && align !== 'center' ? (align === 'start' ? 'end' : 'start') : align;

  return (
    <PopoverPrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <PopoverPrimitive.Trigger asChild={triggerAsChild} className={triggerClassName}>
        {trigger}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal container={container}>
        <ThemeProvider isDarkMode={isDarkMode}>
          <PopoverPrimitive.Content
            side={side}
            dir={dir}
            align={rtlAlign}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
            className={className}
            style={{
              zIndex: zIndex ?? 50,
              ...style,
            }}
            forceMount={forceMount}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={onFocusOutside}
            onInteractOutside={onInteractOutside}
            {...contentProps}
          >
            {children}
            {showArrow && (
              <PopoverPrimitive.Arrow
                className={arrowClassName}
                width={arrowWidth}
                height={arrowHeight}
              />
            )}
          </PopoverPrimitive.Content>
        </ThemeProvider>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
