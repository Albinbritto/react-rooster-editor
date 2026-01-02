import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

export interface SelectOptionGroup {
  type: 'group';
  label: string;
  options: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export interface SelectSeparator {
  type: 'separator';
}

export type SelectItem = SelectOption | SelectOptionGroup | SelectSeparator;

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: SelectItem[];
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  name?: string;
  autoComplete?: string;
  dir?: 'ltr' | 'rtl';

  container?: HTMLElement | null;

  position?: 'item-aligned' | 'popper';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;

  maxHeight?: number | string;
  fullWidth?: boolean;

  showIcon?: boolean;
  showCheckmark?: boolean;
  showArrow?: boolean;
  arrowIcon?: React.ReactNode;

  renderTrigger?: (props: {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    selectedOption?: SelectOption;
  }) => React.ReactNode;
  renderValue?: (option: SelectOption) => React.ReactNode;

  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;

  emptyMessage?: string;
  loading?: boolean;
  loadingMessage?: string;
  searchable?: boolean;
  onSearch?: (value: string) => void;
}

export interface SelectTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, 'asChild'> {
  fullWidth?: boolean;
  showArrow?: boolean;
  arrowIcon?: React.ReactNode;
}

export interface SelectContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, 'asChild'> {
  className?: string;
  maxHeight?: number | string;
}

export interface SelectItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, 'asChild'> {
  showCheckmark?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface SelectGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>, 'asChild'> {
  label: string;
}
