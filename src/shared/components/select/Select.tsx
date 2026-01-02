import React, { useMemo, useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Icon } from '../icon/Icon';
import { Input } from '../input';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectOption,
  SelectItem as SelectItemType,
} from './Select.types';
import {
  getTriggerClasses,
  getContentClasses,
  getViewportClasses,
  getItemClasses,
  getLabelClasses,
  getSeparatorClasses,
  getScrollButtonClasses,
} from './Select.utils';
import { ThemeProvider, useThemeContext } from '../../contexts/ThemeContext';
import { useDirection } from '../../contexts/DirectionContext';

export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onValueChange,
  options = [],
  placeholder = 'Select an option',
  contentClassName = '',
  triggerClassName = '',
  disabled = false,
  required = false,
  open,
  defaultOpen,
  onOpenChange,
  name,
  container,
  position = 'popper',
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  maxHeight = 300,
  fullWidth = false,
  showIcon = true,
  showCheckmark = true,
  showArrow = true,
  arrowIcon,
  renderTrigger,
  renderValue,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  emptyMessage = 'No options available',
  loading = false,
  loadingMessage = 'Loading...',
  searchable = false,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useThemeContext();
  const dir = useDirection();
  const isRTL = dir === 'rtl';

  const selectedOption = useMemo(() => {
    return findSelectedOption(options, value);
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return filterOptions(options, searchQuery);
  }, [options, searchQuery, searchable]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onSearch?.(newValue);
  };

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      name={name}
    >
      {renderTrigger ? (
        <SelectPrimitive.Trigger asChild>
          {renderTrigger({
            value,
            placeholder,
            disabled,
            selectedOption,
          })}
        </SelectPrimitive.Trigger>
      ) : (
        <SelectTrigger
          className={triggerClassName}
          fullWidth={fullWidth}
          showArrow={showArrow}
          arrowIcon={arrowIcon}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        >
          <SelectPrimitive.Value placeholder={placeholder}>
            {selectedOption && (
              <div className='flex items-center gap-2'>
                {showIcon && selectedOption.icon && (
                  <span className='shrink-0'>{selectedOption.icon}</span>
                )}
                <span className='truncate'>
                  {renderValue ? renderValue(selectedOption) : selectedOption.label}
                </span>
              </div>
            )}
          </SelectPrimitive.Value>
        </SelectTrigger>
      )}

      <SelectPrimitive.Portal container={container}>
        <ThemeProvider isDarkMode={isDarkMode}>
          <SelectContent
            className={contentClassName}
            position={position}
            side={side}
            sideOffset={sideOffset}
            align={isRTL && align !== 'center' ? (align === 'start' ? 'end' : 'start') : align}
            alignOffset={alignOffset}
            maxHeight={maxHeight}
          >
            {searchable && (
              <div className='p-2 border-b border-gray-200'>
                <Input
                  type='text'
                  placeholder='Search...'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.stopPropagation()}
                  fullWidth
                  size='small'
                />
              </div>
            )}

            <SelectScrollUpButton />

            <SelectPrimitive.Viewport className={getViewportClasses()}>
              {loading ? (
                <div className='px-3 py-2 text-sm text-gray-500'>{loadingMessage}</div>
              ) : filteredOptions.length === 0 ? (
                <div className='px-3 py-2 text-sm text-gray-500'>{emptyMessage}</div>
              ) : (
                renderOptions(filteredOptions, showIcon, showCheckmark)
              )}
            </SelectPrimitive.Viewport>

            <SelectScrollDownButton />
          </SelectContent>
        </ThemeProvider>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className = '', fullWidth = false, showArrow = true, arrowIcon, ...props }, ref) => {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={`${getTriggerClasses(fullWidth, props.disabled)} ${className}`}
        {...props}
      >
        {children}
        {showArrow && (
          <SelectPrimitive.Icon asChild>
            {arrowIcon || <Icon name='FaChevronDown' size={14} className='text-gray-500' />}
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className = '', maxHeight, ...props }, ref) => {
    const contentStyles: React.CSSProperties = {
      ...(maxHeight && {
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      }),
    };

    return (
      <SelectPrimitive.Content
        ref={ref}
        className={`${getContentClasses()} ${className}`}
        style={contentStyles}
        {...props}
      >
        {children}
      </SelectPrimitive.Content>
    );
  }
);

SelectContent.displayName = 'SelectContent';

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className = '', showCheckmark = true, icon, description, ...props }, ref) => {
    return (
      <SelectPrimitive.Item
        ref={ref}
        className={`${getItemClasses(props.disabled)} ${className}`}
        {...props}
      >
        {showCheckmark && (
          <SelectPrimitive.ItemIndicator asChild>
            <Icon name='FaCheck' size={14} className='text-blue-500' />
          </SelectPrimitive.ItemIndicator>
        )}
        {icon && <span className='shrink-0'>{icon}</span>}
        <div className='flex-1 min-w-0'>
          <SelectPrimitive.ItemText>
            <span className='block truncate'>{children}</span>
          </SelectPrimitive.ItemText>
          {description && (
            <span className='block text-xs text-gray-500 truncate'>{description}</span>
          )}
        </div>
      </SelectPrimitive.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export const SelectGroup: React.FC<SelectGroupProps> = ({ label, children, ...props }) => {
  return (
    <SelectPrimitive.Group {...props}>
      <SelectPrimitive.Label className={getLabelClasses()}>{label}</SelectPrimitive.Label>
      {children}
    </SelectPrimitive.Group>
  );
};

export const SelectSeparator: React.FC = () => {
  return <SelectPrimitive.Separator className={getSeparatorClasses()} />;
};

export const SelectScrollUpButton: React.FC = () => {
  return (
    <SelectPrimitive.ScrollUpButton className={getScrollButtonClasses()}>
      <Icon name='FaChevronUp' size={14} />
    </SelectPrimitive.ScrollUpButton>
  );
};

export const SelectScrollDownButton: React.FC = () => {
  return (
    <SelectPrimitive.ScrollDownButton className={getScrollButtonClasses()}>
      <Icon name='FaChevronDown' size={14} />
    </SelectPrimitive.ScrollDownButton>
  );
};

const findSelectedOption = (items: SelectItemType[], value?: string): SelectOption | undefined => {
  for (const item of items) {
    if ('type' in item) {
      if (item.type === 'group') {
        const found = item.options.find((opt: SelectOption) => opt.value === value);
        if (found) return found;
      }
    } else if ('value' in item && item.value === value) {
      return item;
    }
  }
};

const filterOptions = (items: SelectItemType[], query: string): SelectItemType[] => {
  const lowerQuery = query.toLowerCase();

  return items
    .map((item) => {
      if ('type' in item) {
        if (item.type === 'group') {
          const filteredOptions = item.options.filter((opt: SelectOption) =>
            getOptionText(opt.label).toLowerCase().includes(lowerQuery)
          );
          if (filteredOptions.length > 0) {
            return { ...item, options: filteredOptions };
          }
          return null;
        }
        return item;
      } else if ('value' in item) {
        const text = getOptionText(item.label).toLowerCase();
        return text.includes(lowerQuery) ? item : null;
      }
      return null;
    })
    .filter((item): item is SelectItemType => item !== null);
};

const getOptionText = (label: React.ReactNode): string => {
  if (typeof label === 'string') return label;
  if (typeof label === 'number') return String(label);
  return '';
};

const renderOptions = (
  items: SelectItemType[],
  showIcon: boolean,
  showCheckmark: boolean
): React.ReactNode => {
  return items.map((item, index) => {
    if ('type' in item) {
      if (item.type === 'separator') {
        return <SelectSeparator key={`separator-${index}`} />;
      }
      if (item.type === 'group') {
        return (
          <SelectGroup key={item.label} label={item.label}>
            {item.options.map((option: SelectOption) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                showCheckmark={showCheckmark}
                icon={showIcon ? option.icon : undefined}
                description={option.description}
                className={option.className}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        );
      }
    } else if ('value' in item) {
      return (
        <SelectItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          showCheckmark={showCheckmark}
          icon={showIcon ? item.icon : undefined}
          description={item.description}
          className={item.className}
        >
          {item.label}
        </SelectItem>
      );
    }
    return null;
  });
};
