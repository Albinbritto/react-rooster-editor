import {
  forwardRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { RadioGroupProps } from "./Radio.types";
import { Radio } from "./Radio";

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      options,
      disabled = false,
      name,
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
      inline-flex
      ${direction === "vertical" ? "flex-col gap-2" : "flex-row gap-2"}
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    // If options are provided, render them as radio buttons
    if (options && options.length > 0) {
      return (
        <div ref={ref} className={containerClasses} role="radiogroup">
          {options.map((option, index) => {
            const isChecked = currentValue === option.value;
            const isDisabled = disabled || option.disabled;

            return (
              <Radio
                key={`${option.value}-${index}`}
                checked={isChecked}
                disabled={isDisabled}
                value={option.value}
                name={name}
                onChange={() => handleChange(option.value)}
              >
                {option.icon && (
                  <span className="inline-flex">{option.icon}</span>
                )}
                {option.label}
              </Radio>
            );
          })}
        </div>
      );
    }

    // If children are provided, clone them with necessary props
    if (children) {
      return (
        <div ref={ref} className={containerClasses} role="radiogroup">
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child as any, {
                checked: currentValue === (child.props as any).value,
                disabled: disabled || (child.props as any).disabled,
                name: name || (child.props as any).name,
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

RadioGroup.displayName = "RadioGroup";
