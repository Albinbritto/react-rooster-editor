import { ReactNode, InputHTMLAttributes } from "react";

export type RadioSize = "small" | "middle" | "large";

export interface RadioOption<T = any> {
  label: ReactNode;
  value: T;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Radio label */
  children?: ReactNode;
  /** Checked state */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Value */
  value?: any;
  /** Custom className */
  className?: string;
  /** onChange callback */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  /** Current selected value */
  value?: any;
  /** Default selected value */
  defaultValue?: any;
  /** Options for radio group */
  options?: RadioOption[];
  /** Disabled state for all radios */
  disabled?: boolean;
  /** Radio group name */
  name?: string;
  /** Size of radio buttons */
  size?: RadioSize;
  /** Button style */
  buttonStyle?: "outline" | "solid";
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Custom className */
  className?: string;
  /** onChange callback */
  onChange?: (value: any) => void;
  /** Children (Radio components) */
  children?: ReactNode;
}

export interface RadioButtonProps extends RadioProps {
  /** Button style */
  buttonStyle?: "outline" | "solid";
  /** Size */
  size?: RadioSize;
}
