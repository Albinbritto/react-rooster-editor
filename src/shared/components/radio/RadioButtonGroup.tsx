import {
  forwardRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { RadioGroupProps } from "./Radio.types";
import { RadioButton } from "./RadioButton";

export const RadioButtonGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      options,
      disabled = false,
      name,
      size = "middle",
      buttonStyle = "outline",
      direction = "horizontal",
      className = "",
      onChange,
      children,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (newValue: any) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    };

    const containerClasses = `
      inline-flex w-full
      ${direction === "vertical" ? "flex-col" : "flex-row"}
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    const buttonGroupClasses = `
      ${containerClasses}
      ${
        direction === "horizontal"
          ? "[&>label]:rounded-none [&>label:first-child]:rounded-l [&>label:last-child]:rounded-r [&>label:not(:first-child)]:border-l-0"
          : "[&>label]:rounded-none [&>label:first-child]:rounded-t [&>label:last-child]:rounded-b [&>label:not(:first-child)]:border-t-0"
      }
    `
      .trim()
      .replace(/\s+/g, " ");

    if (options && options.length > 0) {
      return (
        <div ref={ref} className={buttonGroupClasses} role="radiogroup">
          {options.map((option, index) => {
            const isChecked = currentValue === option.value;
            const isDisabled = disabled || option.disabled;

            return (
              <RadioButton
                key={`${option.value}-${index}`}
                checked={isChecked}
                disabled={isDisabled}
                value={option.value}
                name={name}
                size={size}
                buttonStyle={buttonStyle}
                onChange={() => handleChange(option.value)}
              >
                {option.icon && (
                  <span className="inline-flex">{option.icon}</span>
                )}
                {option.label}
              </RadioButton>
            );
          })}
        </div>
      );
    }

    if (children) {
      return (
        <div ref={ref} className={buttonGroupClasses} role="radiogroup">
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child as any, {
                checked: currentValue === (child.props as any).value,
                disabled: disabled || (child.props as any).disabled,
                name: name || (child.props as any).name,
                size: size || (child.props as any).size,
                buttonStyle: buttonStyle || (child.props as any).buttonStyle,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange((child.props as any).value);
                  if ((child.props as any).onChange) {
                    (child.props as any).onChange(e);
                  }
                },
              });
            }
            return child;
          })}
        </div>
      );
    }

    return null;
  }
);

RadioButtonGroup.displayName = "RadioButtonGroup";
